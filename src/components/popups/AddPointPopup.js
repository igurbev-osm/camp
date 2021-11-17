import { Modal, Button, Form, Image, Row, Col } from "react-bootstrap";
import ReactStars from 'react-stars'
import "./AddPointPopup.scss";
import React, { useState } from "react";
import _pointServece from "../../server/point";

import {readFile} from "../../utils/cropImage"
import CropImage from "./CropImage";


function AddPointPopup(props) {
    const { selection, pointtypes, sid, onHide } = { ...props };
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [pointTypeId, setPointTypeId] = useState(1);

    const [validated, setValidated] = useState(false);
    const [imageData, setImageData] = useState(null);

    const checkValidity = _ => {        
        return (           
            name && name.length >= 4
            && description && description.length > 10
        );
    }

    const resetValues = _ => {
        setName("");
        setDescription("");
        setPointTypeId(1);
        setValidated(false);
    }
    const ratingChanged = (newRating) => {
        console.log(newRating)
    }

    const getIconUrl = _ => {
        const f = pointtypes.find(t=>t.id === pointTypeId);
        if(f){
            return f.url;
        }
        return null;
    }

    return (
        <Modal className='modal'
            {...props}
            dialogClassName="modal-90w"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter" className="modal-title-text" >
                    Good, now lets do some work!
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
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

                 
                    <ReactStars
                        count={5}
                        half={false}
                        onChange={ratingChanged}
                        size={30}
                        color2={'#ffd700'}
                        className='rating' />

                    <Form.Group controlId="formFileSm" className="mb-3 uploadFile">
                        <Form.Label>Select Image to upload</Form.Label>
                        <Form.Control type="file" size="sm" onChange={async(e)=>{    
                            const file = e.target.files[0];
                            debugger
                            let imageDataUrl = await readFile(file)
                            setImageData({src: imageDataUrl, name: file.name});
                                                    
                        }}/>
                    </Form.Group>
                    
                    <Button variant="primary" onClick={
                        async (event) => {    
                            if (!checkValidity()) {
                                event.preventDefault();
                                event.stopPropagation();                                
                                setValidated(true);
                            }else{
                                let point = { title: name, lat: selection.lat, lng: selection.lng, typeid: pointTypeId, description: description };                            
                                point = await _pointServece.addPoint(sid, point);
                                point.url = getIconUrl()
                                resetValues();
                                onHide(point);                                
                            }
                        }
                    }>
                        Next
                    </Button>
                    
                </Form>
                    {imageData && <CropImage imageSrc={imageData.src} imageName={imageData.name} next={()=>{setImageData(null)}}/>}


            </Modal.Body>
        </Modal>
    );
}
export default AddPointPopup;