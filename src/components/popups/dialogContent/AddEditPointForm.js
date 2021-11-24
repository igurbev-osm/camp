import { useContext, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import _pointServece from "../../../server/point";
import { SessionContext } from "../../../utils/session";
import PointTypesDropdown from "../../PointTypesDropdown";

const AddEditPointForm = ({ point, addStack, done }) => {

    const sid = useContext(SessionContext);
    //const [point, setPoint] = useState(selection);
    const [pointType, setPointType] = useState({ id: point.typeId, url: point.url });

    const onSubmit = async (event) => {
        event.preventDefault();
        let newPoint = { lat: point.lat, lng: point.lng, typeid: pointType.id };
        const form = event.target;
        const formData = new FormData(form);

        for (var pair of formData.entries()) {
            newPoint[pair[0]] = pair[1];
        }

        if (!checkValidity(newPoint)) {
            console.log("validation failed: ", newPoint);
            //TODO            
        } else {
            if (point.id) {
                newPoint = await _pointServece.updatePoint(sid, { ...point, ...newPoint });
            } else {
                newPoint = await _pointServece.addPoint(sid, newPoint);
            }

            newPoint.url = pointType.url;
            resetValues(form);
            //onHide(point);
            done(newPoint);
        }
    }

    const checkValidity = (newPoint) => {
        return newPoint.title && newPoint.title.length >= 4 && newPoint.description && newPoint.description.length >= 10;
    }

    const resetValues = (form) => {
        form.title.value = "";
        form.description.value = "";
    }

    return (
        <Form onSubmit={onSubmit}>
            <Container>
                <Row>
                    <Col>
                        <Form.Control type="text" placeholder={`lat: ${point.lat} lng: ${point.lng}`} readOnly />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group md="4" >
                            <Form.Control
                            name="title"
                                as="input"
                                required
                                placeholder="Place your Point Name here"
                                defaultValue={point.title}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please provide a valid point name.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group md="4" controlId="validationCustom02" >
                            <Form.Control
                                as="textarea"
                                name="description"
                                required
                                placeholder="Place your Description here"
                                style={{ height: '100px' }}
                                defaultValue={point.description}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please provide a valid description.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>

                <PointTypesDropdown initTypeId={point.typeId || 1} onChange={(pointType) => { setPointType(pointType) }} />
                <Button variant="primary" type="submit"> Save </Button>
                {point.id && <Button variant="primary" onClick={() => done(point)}>Next</Button>}
            </Container>
        </Form>
    );
}

export default AddEditPointForm;