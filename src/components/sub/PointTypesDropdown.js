import { useEffect, useState } from "react";
import _pointServece from "../../server/point";
import { Row, Col, Image, Form } from "react-bootstrap";

const PointTypesDropdown = ({ initTypeId, onChange }) => {
    const [pointTypes, setPointTypes] = useState(null);
    const [pointTypeId, setPointTypeId] = useState(initTypeId);

    useEffect(() => {
        (async () => {
            const types = await _pointServece.getPointTypes();
            setPointTypes(types);
            const defaultType = types.find(t => t.id === Number(initTypeId));
            if(defaultType){
                onChange({id: defaultType.id, url: defaultType.url});
            }
        })()}, []
    );

    const getIconUrl = (tId) => {
        const f = pointTypes.find(t => t.id === (!isNaN(tId) ? Number(tId) : tId));
        if (f) {
            return f.url;
        }
        return null;
    }

    return (
        <Row>
            <Col column="lg" lg={1}>
                {pointTypes && <Image className="point-icon" src={getIconUrl(pointTypeId)} />}
            </Col>
            <Col>
                <Form.Select aria-label="Floating label select example" onChange={e => {
                    const newValue = e.target.value;
                    setPointTypeId(newValue);
                    onChange({id: newValue, url: getIconUrl(newValue)});
                }}>
                    {pointTypes && pointTypes.map((type) => {
                        return <option key={type.id} value={type.id}>{type.name}</option>
                    })}
                </Form.Select>
            </Col>
        </Row>
    );
}

export default PointTypesDropdown;