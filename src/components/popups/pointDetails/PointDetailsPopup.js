import React, { useState, useEffect, useContext } from 'react'
import { Button, Carousel } from "react-bootstrap";
import ReactStars from 'react-rating-stars-component';
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
    const [rating, setRating] = useState(null);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    const [selectedPointDetails, setSelectedPointDetails] = useState(null);
    useEffect(
        () => {
            getPointDetails();
            getUserInfo();
            getPointRating();
        }, []
    );

    const getPointDetails = async () => {
        setSelectedPointDetails(await _pointService.getPoint(sid, point.id));
    }

    const getUserInfo = async () => {
        if (sid) {
            setUser(await _userService.getUserInfo(sid));
        }
    }

    const getPointRating = async () => {
        setRating(await _pointService.getPointRating(point.id, sid));
    }

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
                <div className="rating-box">
                    {rating &&
                        <ReactStars
                            count={5}
                            isHalf={true}
                            value={rating.value / 2}
                            edit={rating.canvote}
                            size={20}
                            color2={'#ffd700'}
                            className='rating'
                            onChange={async (vote) => {
                                setRating(null);
                                const newValue = await _pointService.ratePoint(sid, point.id, Math.round(vote * 2));
                                setRating(newValue);
                            }} />}

                    {rating && rating.value > 0 && <div className="voted-text">
                        {rating.value / 2}/{rating.voted}
                    </div>
                    }
                </div>
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