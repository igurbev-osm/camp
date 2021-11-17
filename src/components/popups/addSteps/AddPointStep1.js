import React, {useState} from "react";
import { Modal, Button, Form, Image, Row, Col } from "react-bootstrap";

const AddPointStep1 = (props) => {
    const { selection, pointtypes, sid, onNext } = { ...props };
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [pointTypeId, setPointTypeId] = useState(1);

    const [validated, setValidated] = useState(false);

    const getIconUrl = _ => {
        const f = pointtypes.find(t=>t.id === pointTypeId);
        if(f){
            return f.url;
        }
        return null;
    }
    
    return (
        <>
            <Form validated={validated} >

                <Form.Control type="text" placeholder={"lat: " + (selection && selection.lat) + " lng: " + (selection && selection.lng)} readOnly />
                <Form.Group md="4" controlId="validationCustom01" >
                    <Form.Control onChange={e => setName(e.target.value)}
                        as="input"
                        required
                        placeholder="Place your Point Name here"
                        value={name}
                    />
                    <Form.Control.Feedback type="invalid">
                        Please provide a valid point name.
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group md="4" controlId="validationCustom02" >
                    <Form.Control onChange={e => setDescription(e.target.value)}
                        as="textarea"
                        required
                        placeholder="Place your Description here"
                        value={description}
                        style={{ height: '100px' }}
                    />
                    <Form.Control.Feedback type="invalid">
                        Please provide a valid description.
                    </Form.Control.Feedback>
                </Form.Group>

                <Row>
                    <Col column="lg" lg={1}>
                        {pointtypes && <Image className="point-icon" src={getIconUrl()} />}
                    </Col>
                    <Col>
                        <Form.Select aria-label="Floating label select example" onChange={e => setPointTypeId(e.target.value)}>
                            {pointtypes && pointtypes.map((type) => {
                                return <option key={type.id} value={type.id}>{type.name}</option>
                            })}
                        </Form.Select>
                    </Col>
                </Row>
                
                                </Form>
            </>
            );
}

            export default AddPointStep1;