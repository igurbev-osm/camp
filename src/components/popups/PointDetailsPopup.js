import React, { useState, useEffect } from 'react'
import { Modal, Button, Carousel, Image } from "react-bootstrap";
import ReactStars from 'react-stars'
import "./PointDetailsPopup.scss";
import _pointService from "../../server/point";
import { serviceConfig } from "../../config/config.js";

import { useSelector, useDispatch } from 'react-redux';
import initUserManager from "../../utils/userManager";
import InfoPnl from './addSteps/InfoPnl';

const PointDetailsPopup = ({ point, show, onHide, onEdit }) => {
    const user = initUserManager(useSelector, useDispatch).getUser();
    const [selectedPointDetails, setSelectedPointDetails] = useState(null);
    useEffect(
        () => {
            (async () => {
                setSelectedPointDetails(await _pointService.getPoint(user ? user.sid : null, point.id));
            })();
        }, [user, point]
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
                        <InfoPnl />
                        <Button onClick={onHide}>Close</Button>
                        {user && user.id === point.userid && <Button onClick={() => { onEdit(point) }}>Edit</Button>}
                        {user && user.id === point.userid && <Button onClick={async () => {
                            await _pointService.deletePoint(point.id, user?.sid);
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