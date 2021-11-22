import React, { useState } from "react";
import { Button, Form, Image, Row, Col } from "react-bootstrap";
import _pointServece from "../../../server/point";
import "./AddPointStep1.scss";
import CheckboxPnl from "./CheckboxPnl";

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

                <Row style={{ paddingBottom: "20px" }}>
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
                <CheckboxPnl />
            </Form>
            <Button variant="primary" onClick={
                async (event) => {
                    if (!checkValidity()) {
                        event.preventDefault();
                        event.stopPropagation();
                        setValidated(true);
                    } else {
                        let newPoint = { title: name, lat: selection.lat, lng: selection.lng, typeid: pointTypeId, description: description };
                        if (point) {
                            newPoint = await _pointServece.updatePoint(user.sid, { ...point, ...newPoint });

                        } else {
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
            {point && <Button variant="primary" onClick={() => next(point)}>Next</Button>}
        </>
    );
}

export default AddPointStep1;