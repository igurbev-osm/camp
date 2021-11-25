import React, { useState, useEffect, useContext } from 'react'
import { Modal, Button, Carousel, Image } from "react-bootstrap";
import ReactStars from 'react-stars'
import "./PointDetailsPopup.scss";
import _pointService from "../../../server/point";
import _userService from "../../../server/user";
import { serviceConfig } from "../../../config/config.js";

import FacilityIcons from '../../facility/FacilityIcons';
import { SessionContext } from '../../../utils/session';

const PointDetailsPopup = ({ point, show, onHide, onEdit }) => {
    
    const sid = useContext(SessionContext);
    const [user, setUser] = useState(null);

    const [selectedPointDetails, setSelectedPointDetails] = useState(null);
    useEffect(
        () => {
            (async () => {
                setSelectedPointDetails(await _pointService.getPoint(sid, point.id));
            })();
            (async() => {
                if(sid){
                    setUser(await _userService.getUserInfo(sid));
                }
            }

            )();
        }, [sid, point]
    );
    return (
        <>
            {selectedPointDetails && <>
                <Modal
                    show={show}
                    dialogClassName="modal-90w"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header >
                        <Modal.Title id="contained-modal-title-vcenter" style={{ textAlign: "center" }}>
                            <Image src={selectedPointDetails.url} style={{ marginRight: "10px" }} />
                            {selectedPointDetails.title}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <p>

                            {selectedPointDetails.description}
                        </p>
                        <Carousel interval={null}>
                            {selectedPointDetails.images.map(img => (
                                <Carousel.Item key={img.id}>
                                    <img
                                        className="d-block w-100"
                                        src={serviceConfig.serviceUrl + img.url}
                                        alt="some slide"
                                    />
                                </Carousel.Item>
                            ))}
                        </Carousel>
                        <ReactStars
                            count={5}
                            half={true}
                            value={4.5}
                            edit={false}
                            size={30}
                            color2={'#ffd700'}
                            className='rating' />
                        <FacilityIcons />
                        <Button onClick={onHide}>Close</Button>
                        {user && user.id === point.userid && <Button onClick={() => { onEdit(point) }}>Edit</Button>}
                        {user && user.id === point.userid && <Button onClick={async () => {
                            await _pointService.deletePoint(point.id, sid);
                            onHide();
                        }
                        }>Delete</Button>}


                    </Modal.Body>
                </Modal>
                {selectedPointDetails && <p>{selectedPointDetails.error}</p>}
            </>}
        </>
    );
}

export default PointDetailsPopup;