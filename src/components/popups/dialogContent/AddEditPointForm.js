import { useContext, useState } from "react";
import { Container, Row, Col, Form, Button, Image } from "react-bootstrap";
import _pointServeceF from "../../../server/point";
import { SessionContext } from "../../../context/SessionContext";
import PointTypesDropdown from "../../sub/PointTypesDropdown";

const AddEditPointForm = ({ point, addStack, done }) => {
    const _axios = useContext(SessionContext);   
    const _pointService = (_pointServeceF.bind(_axios))();
    const [pointType, setPointType] = useState({ id: (point.typeid || 1), url: point.url });

    const [errors, setErrors] = useState({name: false, descr: false});

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
                newPoint = await _pointService.updatePoint( { ...point, ...newPoint });
            } else {
                newPoint = await _pointService.addPoint( newPoint);
            }

            newPoint.url = pointType.url;
            resetValues(form);
            done(newPoint);
        }
    };

    const checkValidity = newPoint => {
        return newPoint.title && newPoint.title.length >= 4 && newPoint.description && newPoint.description.length >= 10;
    };

    const resetValues = form => {
        form.title.value = "";
        form.description.value = "";
    };   

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
                            <Form.Group md="4" controlId="validationCustom01" >
                                <Form.Control
                                    name="title"
                                    as="input"
                                    required
                                    placeholder="Place your Point Name here"
                                    defaultValue={point.id ? point.title : ""}
                                    isInvalid={errors.name}                                    
                                    onChange={e=>{
                                        const newValue = !(e.currentTarget.value.length > 3);                                       
                                        setErrors(errors => errors.name === newValue ? errors : {...errors, name: newValue});                                        
                                    }}
                                />
                                                                <Form.Control.Feedback type="invalid" className="validation-feedback">
                                    The point name must be at least 4 characters long.
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
                                    isInvalid={errors.descr}
                                    onChange={e=>{
                                        const newValue = !(e.currentTarget.value.length > 9);                                       
                                        setErrors(errors => errors.descr === newValue ? errors : {...errors, descr: newValue});                                        
                                    }}
                                />
                                <Form.Control.Feedback type="invalid" className="validation-feedback">
                                    The point description must be at least 10 characters long.
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
                    </Container>
                    <PointTypesDropdown initTypeId={point.typeid || 1} onChange={(pointType) => { setPointType(pointType) }} />
<div className="add-point-logo-holder">
                    <Image src="/img/CamPointLogo.png" className="add-point-logo"/>
</div>
                
                <div className="content-footer">
                    <Button variant="primary" type="submit" className="next-button" > Next </Button>
                    <Button variant="primary" className="btn-secondary" onClick={() => done(point, true)} > Close </Button>
                </div>
            </Form>
        </div>
    );
}

export default AddEditPointForm;