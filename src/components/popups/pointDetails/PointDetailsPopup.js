import React, { useState, useEffect, useContext } from 'react'
import { Button, Carousel } from "react-bootstrap";
import ReactStars from 'react-rating-stars-component';
import "./PointDetailsPopup.scss";
import _pointServiceF from "../../../server/point";
import { serviceConfig } from "../../../config/config.js";

import FacilityIcons from '../../facility/FacilityIcons';
import { SessionContext } from '../../../context/SessionContext';
import Confirm from '../../sub/Confirm';
import AddComment from '../dialogContent/AddComment';
import Comments from '../dialogContent/Comments';
import { isLoggedIn } from '../../../utils/session';

const PointDetailsPopup = ({ point, addStack, done }) => {
    const _axios = useContext(SessionContext);
    
    const _isLoggedIn = isLoggedIn(_axios);
    const [rating, setRating] = useState(null);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    const [selectedPointDetails, setSelectedPointDetails] = useState(null);
    useEffect(
        () => {
            const _pointService = (_pointServiceF.bind(_axios))();
            (async () => {
                setSelectedPointDetails(await _pointService.getPoint(point.id));
                setRating(await _pointService.getPointRating(point.id));
            })();
        }, [point.id, _axios]
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
                                const newValue = await (_pointServiceF.bind(_axios))().ratePoint(point.id, Math.round(vote * 2));
                                setRating(newValue);
                            }} />}

                    {rating && rating.value > 0 && <div className="voted-text">
                        {rating.value / 2}/{rating.voted}
                    </div>
                    }
                    <div onClick={() => {
                        addStack(Comments, point);
                    }}>
                        <img className="comments-icon" src="/img/comments.png" alt="Comments" />
                        <span className="voted-text">({point.ccount}) </span>
                    </div>
                </div>
                <div className="point-description-box">
                    <p>
                        {selectedPointDetails.description}
                    </p>
                </div>


                <FacilityIcons pointId={selectedPointDetails.id} />


                <div className="content-footer">
                    <Button variant="primary" className="btn-secondary" onClick={() => done(selectedPointDetails || point, true)} > Close </Button>
                    {_isLoggedIn && point.my && <Button onClick={() => {
                        done(selectedPointDetails || point);
                    }} className="next-button">Edit</Button>}

                    {_isLoggedIn && point.my && <Button variant="primary" className="next-button" onClick={() => setShowDeleteConfirm(true)} > Delete </Button>}

                    {_isLoggedIn && <Button variant="primary" className="btn-secondary" onClick={() => addStack(AddComment, selectedPointDetails || point)} > Add Comment </Button>}
                </div>


                {showDeleteConfirm && <Confirm title={selectedPointDetails.title} onConfirm={() => {
                    (async () => {
                        await (_pointServiceF.bind(_axios))().deletePoint(point.id);
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