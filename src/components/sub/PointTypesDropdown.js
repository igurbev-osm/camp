import { useContext, useEffect, useState } from "react";
import _pointServeceF from "../../server/point";
import { Row, Col, Image, Form } from "react-bootstrap";
import { SessionContext } from "../../context/SessionContext";

const PointTypesDropdown = ({ initTypeId, onChange }) => {
    const _axios = useContext(SessionContext);    
    
    const [pointTypes, setPointTypes] = useState(null);
    const [pointTypeId, setPointTypeId] = useState(initTypeId);

    useEffect(() => {
        (async () => {
            const _pointService = (_pointServeceF.bind(_axios))();
            const types = await _pointService.getPointTypes();
            setPointTypes(types);            
        })()
    }, [_axios]
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
            {pointTypes && <Form.Select
                    defaultValue={pointTypeId}
                    aria-label="Floating label select example" 
                    onChange={e => {
                        const newValue = e.target.value;
                        setPointTypeId(newValue);
                        onChange({ id: newValue, url: getIconUrl(newValue) });
                    }}

                >
                    {pointTypes.map((type) => {
                        return <option key={type.id} value={type.id}>{type.name}</option>
                    })}
                </Form.Select>}
            </Col>
        </Row>
    );
}

export default PointTypesDropdown;