import { useContext, useState } from "react";
import { Container, Row, Col, Form, Button, Image } from "react-bootstrap";
import _pointServece from "../../../server/point";
import { SessionContext } from "../../../context/SessionContext";
import PointTypesDropdown from "../../sub/PointTypesDropdown";

const AddEditPointForm = ({ point, addStack, done }) => {
    const sid = useContext(SessionContext);
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
        <div className="dialog-content-holder">
            <Form onSubmit={onSubmit} className="add-point-form">
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
                                    defaultValue={point.id ? point.title : ""}
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
                                    style={{ height: '200px' }}
                                    defaultValue={point.description}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please provide a valid description.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row >
                        <Col >
                            <div className="empty-content">
                                
                            </div>
                        </Col>
                    </Row>
                    <PointTypesDropdown initTypeId={point.typeid || 1} onChange={(pointType) => { setPointType(pointType) }} />

                    <Image src="/img/CamPointLogo.png" className="add-point-logo"/>

                </Container>
                <div className="content-footer">
                    <Button variant="primary" type="submit" className="next-button" > Next </Button>
                    <Button variant="primary" className="btn-secondary" onClick={() => done(point, true)} > Close </Button>
                </div>
            </Form>
        </div>
    );
}

export default AddEditPointForm;