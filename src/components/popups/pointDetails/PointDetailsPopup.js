import React, { useState, useEffect, useContext } from 'react'
import { Modal, Button, Carousel, Image } from "react-bootstrap";
import ReactStars from 'react-stars'
import "./PointDetailsPopup.scss";
import _pointService from "../../../server/point";
import _userService from "../../../server/user";
import { serviceConfig } from "../../../config/config.js";

import FacilityIcons from '../../facility/FacilityIcons';
import { SessionContext } from '../../../utils/session';

const PointDetailsPopup = ({ point, addStack, done }) => {

    const sid = useContext(SessionContext);
    const [user, setUser] = useState(null);

    const [selectedPointDetails, setSelectedPointDetails] = useState(null);
    useEffect(
        () => {
            (async () => {
                setSelectedPointDetails(await _pointService.getPoint(sid, point.id));
            })();
            (async () => {
                if (sid) {
                    setUser(await _userService.getUserInfo(sid));
                }
            }

            )();
        }, []
    );
    return (
        <>
            {selectedPointDetails && <>
                
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
                            <Carousel.Item key={-1}>
                                    <img
                                        className="d-block w-100"
                                        src="/img/CamPointLogoBg.png"
                                        alt="some slide"
                                    />
                                </Carousel.Item>
                        </Carousel>
                        <ReactStars
                            count={5}
                            half={true}
                            value={4.5}
                            edit={false}
                            size={30}
                            color2={'#ffd700'}
                            className='rating' />
                        <FacilityIcons pointId={selectedPointDetails.id} />

                        {user && user.id === point.userid && <Button onClick={() => {                            
                            done(selectedPointDetails || point);

                        }}>Edit</Button>}



                    </Modal.Body>
               
                {selectedPointDetails && <p>{selectedPointDetails.error}</p>}
            </>}
        </>
    );
}

export default PointDetailsPopup;