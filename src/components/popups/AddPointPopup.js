import { Modal, Button, Form, Image, Row, Col } from "react-bootstrap";
import ReactStars from 'react-stars'
import "./AddPointPopup.scss";
import React, { useState } from "react";



import AddPointStep1 from "./addSteps/AddPointStep1";
import AddPointStep2 from "./addSteps/AddPointStep2";
import {addPointCoing} from "../../config/config"


function AddPointPopup(props) {
      
    const {onHide } = { ...props }; 
    
    const [step, setStep] = useState(1);
    const [point, setPoint] = useState(null);
 
    const ratingChanged = (newRating) => {
        console.log(newRating)
    }    

    const next = (point)=>{
        setPoint(point);
        if(step >= addPointCoing.steps){
            setStep(1);
            onHide(point);
        }else{
            setStep(step + 1);
        }
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
              
              {step === 1 && <AddPointStep1 {...props} next={next} />}
              {step === 2 && <AddPointStep2  {...props} next={next} point={point} />}


            </Modal.Body>
        </Modal>
    );
}
export default AddPointPopup;