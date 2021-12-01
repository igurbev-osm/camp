import { useState } from "react";
import { Modal, Image } from "react-bootstrap";
import "./dialogContainer.scss";
import "../dialogContent/dialogContent.scss";
import "../dialogContent/AddPointPopup.scss";

const DialogContainer = ({ initQueue, initData, onHide}) => {
    const [data, setData] = useState(initData);
    const [currentStep, setStep] = useState(0);
    const [stack, setStack] = useState([]);        

    const getComponentToShow = () => {
        if(stack.length > 0){
            return stack[stack.length - 1];
        }
        return initQueue[currentStep];
    }

    const done = (result, exit) => {
        if(stack.length > 0){
           const tStack = [...stack];
           tStack.pop();
           setStack(tStack); 
           setData(result);
        }else if (!exit && currentStep < initQueue.length - 1) {
            let step = currentStep;
            step++;
            setData(result)
            setStep(step)
        } else {
            setStep(0)
            onHide(result);
            setData(undefined);
        }
    }

    const addStack = (StackComponent, result) => {
        const tStack = [...stack];
        tStack.push(StackComponent);
        setStack(tStack);
        setData(result);
    }

    const ContentComponent = getComponentToShow();

    return (
        <>
            {data && <Modal               
                show={true} onHide={onHide}
                dialogClassName="modal-90w dialog-container"
                contentClassName="dialog-content"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >                
               <Modal.Header className="dialog-header">
                        <Modal.Title id="contained-modal-title-vcenter" style={{ textAlign: "center" }}>
                            <Image src={data.url} style={{ marginRight: "10px" }} />
                            {data.title}
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