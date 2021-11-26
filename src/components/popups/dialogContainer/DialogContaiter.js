import { useState } from "react";
import { Modal } from "react-bootstrap";
import "./dialogContainer.scss";
import "../dialogContent/dialogContent.scss";

const DialogContainer = ({ initQueue, initData, onHide, title, show }) => {
    const [data, setData] = useState(initData);
    const [currentStep, setStep] = useState(0);
    // const [stack, setStack] = useState([]); TODO

    const ContentComponent = initQueue[currentStep];



    const done = (result) => {
        let step = currentStep;
        if (step < initQueue.length - 1) {
            step++;
            setData(result)
            setStep(step)
        } else {
            setStep(0)
            onHide(result);
            setData(undefined);
        }

    }

    const addStack = (componentName, result) => {
        //TODO
        console.log(" >>>>>>>>>>>>>>>>> addStack");
    }
    return (
        <>
            {data && <Modal
                show={show} onHide={onHide}
                dialogClassName="modal-90w dialog-container"
                contentClassName="dialog-content"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter" style={{ textAlign: "center" }}>
                        {title}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ContentComponent done={done} addStack={addStack} point={data} />                    
                </Modal.Body>
            </Modal>}

        </>
    );
}

export default DialogContainer;