import React, { useState, useEffect, useContext } from 'react'
import { Button, Carousel } from "react-bootstrap";
import ReactStars from 'react-stars';
import "./PointDetailsPopup.scss";
import _pointService from "../../../server/point";
import _userService from "../../../server/user";
import { serviceConfig } from "../../../config/config.js";

import FacilityIcons from '../../facility/FacilityIcons';
import { SessionContext } from '../../../utils/session';
import Confirm from '../../sub/Confirm';

const PointDetailsPopup = ({ point, addStack, done }) => {
    const sid = useContext(SessionContext);
    const [user, setUser] = useState(null);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

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
            {selectedPointDetails && <div className="point-details-popup dialog-content-holder">

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
                    size={20}
                    color2={'#ffd700'}
                    className='rating' />
                <div className="point-description-box">
                    <p>
                        {selectedPointDetails.description}
                    </p>
                </div>


                <FacilityIcons pointId={selectedPointDetails.id} />


                <div className="content-footer">
                                    
                    {user && user.id === point.userid && <Button onClick={() => {
                        done(selectedPointDetails || point);
                    }} className="next-button">Edit</Button>}
                    <Button variant="primary" className="next-button" onClick={() => setShowDeleteConfirm(true)} > Delete </Button> 
                    <Button variant="primary" className="btn-secondary" onClick={() => done(selectedPointDetails || point, true)} > Close </Button>
                </div>


                {showDeleteConfirm && <Confirm title={selectedPointDetails.title} onConfirm={() => {
                    (async () => {
                        await _pointService.deletePoint(point.id, sid);
                        setShowDeleteConfirm(false);
                        done(null, true); 
                    })();
                }} onCancel={() => setShowDeleteConfirm(false)} />}

                {selectedPointDetails && <p>{selectedPointDetails.error}</p>}
            </div>}
        </>
    );
}

export default PointDetailsPopup;