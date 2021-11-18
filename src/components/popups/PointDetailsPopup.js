import React, { useState, useEffect } from 'react'
import { Modal, Button, Carousel, Image } from "react-bootstrap";
import ReactStars from 'react-stars'
import "./PointDetailsPopup.scss";
import _pointService from "../../server/point";
import { serviceConfig } from "../../config/config.js";

const PointDetailsPopup = (props) => {
    const { point, pointtypes, sid } = { ...props }
    const [selectedPointDetails, setSelectedPointDetails] = useState(null);
    useEffect(
        () => {
            (async () => {
                setSelectedPointDetails(await _pointService.getPoint(sid, point.id));
            })();
        }, []
    );

    return (
        <>
            {selectedPointDetails && <>
                <Modal
                    {...props}
                    dialogClassName="modal-90w"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter" style={{ textAlign: "center" }}>
                        <Image src={selectedPointDetails.url} style={{marginRight: "10px"}}/>
                            {selectedPointDetails.title}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>                       
                         
                        <p>
                        
                            {selectedPointDetails.description}
                        </p>
                        <Carousel>
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
                            slide = {false}
                            edit={false}
                            size={30}
                            color2={'#ffd700'}
                            className='rating' />
                        <Button onClick={props.onHide}>Close</Button>
                    </Modal.Body>
                </Modal>
                {selectedPointDetails && <p>{selectedPointDetails.error}</p>}
            </>}
        </>
    );
}

export default PointDetailsPopup;