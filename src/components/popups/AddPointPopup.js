import { Modal} from "react-bootstrap";
import "./AddPointPopup.scss";
import React, { useState } from "react";



import AddPointStep1 from "./addSteps/AddPointStep1";
import AddPointStep2 from "./addSteps/AddPointStep2";
import {addPointCoing} from "../../config/config"


function AddPointPopup({onHide, selection, pointTypes, show, selectedPoint}) {    
    const [step, setStep] = useState(1);
    const [point, setPoint] = useState(null);
 
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
            show={show}
            dialogClassName="modal-90w"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            onHide={()=> {
                setStep(1);
                onHide(point);}}
        >
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter" className="modal-title-text" >
                    Good, now lets do some work!
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              
              {step === 1 && <AddPointStep1 pointTypes={pointTypes} selection={selection} next={next} point={selectedPoint} />}
              {step === 2 && <AddPointStep2  next={next} point={point} />}


            </Modal.Body>
        </Modal>
    );
}
export default AddPointPopup;