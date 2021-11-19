import React, { useState } from "react";
import { Button, Form, Image, Row, Col } from "react-bootstrap";
import _pointServece from "../../../server/point";
import "./AddPointStep1.scss";

import { useSelector, useDispatch } from 'react-redux';
import initUserManager from "../../../utils/userManager";


const AddPointStep1 = ({ selection, pointTypes, next, point }) => {
    selection = selection || point;
    const user = initUserManager(useSelector, useDispatch).getUser();
    const [name, setName] = useState(point ? point.title : "");
    const [description, setDescription] = useState(point ? point.description : "");
    const [pointTypeId, setPointTypeId] = useState(point ? point.typeid : 1);
    const [validated, setValidated] = useState(false);

    const getIconUrl = _ => {
        const f = pointTypes.find(t => t.id === (!isNaN(pointTypeId) ? Number(pointTypeId) : pointTypeId));
        if (f) {
            return f.url;
        }
        return null;
    }
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

    return (
        <>
            <Form validated={validated} >

                <Form.Control type="text" placeholder={`lat: ${selection.lat} lng: ${selection.lng}`} readOnly />
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
                        {pointTypes && <Image className="point-icon" src={getIconUrl()} />}
                    </Col>
                    <Col>
                        <Form.Select aria-label="Floating label select example" onChange={e => setPointTypeId(e.target.value)}>
                            {pointTypes && pointTypes.map((type) => {
                                return <option key={type.id} value={type.id}>{type.name}</option>
                            })}
                        </Form.Select>
                    </Col>
                </Row>
                <Row style={{ paddingTop: "20px" }}>
                    <Col sm="1" className="cbx-col-sm">
                        <Image className="cbx-icon" src="/img/checkbox/drinking_water.png" />
                    </Col>
                    <Col sm="3" className="cbx-col-lg">
                        <Form.Check className="cbx-label" type="checkbox" label="drinking water" />
                    </Col>
                    <Col sm="1" className="cbx-col-sm">
                        <Image className="cbx-icon" src="/img/checkbox/water.png" />
                    </Col>
                    <Col sm="3" className="cbx-col-lg">
                        <Form.Check className="cbx-label" type="checkbox" label="water suply" />
                    </Col>
                    <Col sm="1" className="cbx-col-sm">
                        <Image className="cbx-icon" src="/img/checkbox/campfire.png" />
                    </Col>
                    <Col sm="3" className="cbx-col-lg">
                        <Form.Check className="cbx-label" type="checkbox" label="fire place" />
                    </Col>
                </Row>
                <Row>
                    <Col sm="1" className="cbx-col-sm">
                        <Image className="cbx-icon" src="/img/checkbox/lighting.png" />
                    </Col>
                    <Col sm="3" className="cbx-col-lg">
                        <Form.Check className="cbx-label" type="checkbox" label="lighting" />
                    </Col>
                    <Col sm="1" className="cbx-col-sm">
                        <Image className="cbx-icon" src="/img/checkbox/electricity.png" />
                    </Col>
                    <Col sm="3" className="cbx-col-lg">
                        <Form.Check className="cbx-label" type="checkbox" label="electricity" />
                    </Col>
                    <Col sm="1" className="cbx-col-sm">
                        <Image className="cbx-icon" src="/img/checkbox/shed.png" />
                    </Col>
                    <Col sm="3" className="cbx-col-lg">
                        <Form.Check className="cbx-label" type="checkbox" label="shed" />
                    </Col>
                </Row>
                <Row>
                    <Col sm="1" className="cbx-col-sm">
                        <Image className="cbx-icon" src="/img/checkbox/tree.png" />
                    </Col>
                    <Col sm="3" className="cbx-col-lg">
                        <Form.Check className="cbx-label" type="checkbox" label="tree" />
                    </Col>
                    <Col sm="1" className="cbx-col-sm">
                        <Image className="cbx-icon" src="/img/checkbox/forest.png" />
                    </Col>
                    <Col sm="3" className="cbx-col-lg">
                        <Form.Check className="cbx-label" type="checkbox" label="forest" />
                    </Col>
                    <Col sm="1" className="cbx-col-sm">
                        <Image className="cbx-icon" src="/img/checkbox/road.png" />
                    </Col>
                    <Col sm="3" className="cbx-col-lg">
                        <Form.Check className="cbx-label" type="checkbox" label="road access" />
                    </Col>
                </Row>
                <Row>
                    <Col sm="1" className="cbx-col-sm">
                        <Image className="cbx-icon" src="/img/checkbox/wc.png" />
                    </Col>
                    <Col sm="3" className="cbx-col-lg">
                        <Form.Check className="cbx-label" type="checkbox" label="WC" />
                    </Col>
                    <Col sm="1" className="cbx-col-sm">
                        <Image className="cbx-icon" src="/img/checkbox/table.png" />
                    </Col>
                    <Col sm="3" className="cbx-col-lg">
                        <Form.Check className="cbx-label" type="checkbox" label="table" />
                    </Col>
                    <Col sm="1" className="cbx-col-sm">
                        <Image className="cbx-icon" src="/img/checkbox/bench.png" />
                    </Col>
                    <Col sm="3" className="cbx-col-lg">
                        <Form.Check className="cbx-label" type="checkbox" label="bench" />
                    </Col>
                </Row>
                <Row>
                    <Col sm="1" className="cbx-col-sm">
                        <Image className="cbx-icon" src="/img/checkbox/4g.png" />
                    </Col>
                    <Col sm="3" className="cbx-col-lg">
                        <Form.Check className="cbx-label" type="checkbox" label="4G" />
                    </Col>
                    <Col sm="1" className="cbx-col-sm">
                        <Image className="cbx-icon" src="/img/checkbox/quiet.png" />
                    </Col>
                    <Col sm="3" className="cbx-col-lg">
                        <Form.Check className="cbx-label" type="checkbox" label="quiet" />
                    </Col>
                    <Col sm="1" className="cbx-col-sm">
                        <Image className="cbx-icon" src="/img/checkbox/trash.png" />
                    </Col>
                    <Col sm="3" className="cbx-col-lg">
                        <Form.Check className="cbx-label" type="checkbox" label="trash bin" />
                    </Col>
                </Row>
                <Row>
                    <Col sm="1" className="cbx-col-sm">
                        <Image className="cbx-icon" src="/img/checkbox/tourist.png" />
                    </Col>
                    <Col sm="3" className="cbx-col-lg">
                        <Form.Check className="cbx-label" type="checkbox" label="tourism" />
                    </Col>
                    <Col sm="1" className="cbx-col-sm">
                        <Image className="cbx-icon" src="/img/checkbox/bike.png" />
                    </Col>
                    <Col sm="3" className="cbx-col-lg">
                        <Form.Check className="cbx-label" type="checkbox" label="biking" />
                    </Col>
                    <Col sm="1" className="cbx-col-sm">
                        <Image className="cbx-icon" src="/img/checkbox/fish.png" />
                    </Col>
                    <Col sm="3" className="cbx-col-lg">
                        <Form.Check className="cbx-label" type="checkbox" label="fishing" />
                    </Col>
                </Row>
                <Row>
                    <Col sm="1" className="cbx-col-sm">
                        <Image className="cbx-icon" src="/img/checkbox/kids.png" />
                    </Col>
                    <Col sm="3" className="cbx-col-lg">
                        <Form.Check className="cbx-label" type="checkbox" label="okay for kids" />
                    </Col>
                    <Col sm="1" className="cbx-col-sm">
                        <Image className="cbx-icon" src="/img/checkbox/dog.png" />
                    </Col>
                    <Col sm="3" className="cbx-col-lg">
                        <Form.Check className="cbx-label" type="checkbox" label="okay for dogs" />
                    </Col>
                    <Col sm="1" className="cbx-col-sm">
                        <Image className="cbx-icon" src="/img/checkbox/view.png" />
                    </Col>
                    <Col sm="3" className="cbx-col-lg">
                        <Form.Check className="cbx-label" type="checkbox" label="view" />
                    </Col>
                </Row>

            </Form>
            <Button variant="primary" onClick={
                async (event) => {
                    if (!checkValidity()) {
                        event.preventDefault();
                        event.stopPropagation();
                        setValidated(true);
                    } else {
                        let newPoint = { title: name, lat: selection.lat, lng: selection.lng, typeid: pointTypeId, description: description };
                        if(point){  
                            newPoint = await _pointServece.updatePoint(user.sid, {...point, ...newPoint});
                            
                        }else{
                            newPoint = await _pointServece.addPoint(user.sid, newPoint);
                        }
                        
                        newPoint.url = getIconUrl()
                        resetValues();                
                        //onHide(point);
                        next(newPoint);
                    }
                }
            }>
                Save
            </Button>
            {point && <Button variant="primary" onClick={()=> next(point)}>Next</Button>}
        </>
    );
}

export default AddPointStep1;