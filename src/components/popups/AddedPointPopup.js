import { Modal, Button } from "react-bootstrap";


function AddedPointPopup(props) {
    return (
        <Modal
            {...props}
            dialogClassName="modal-90w"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter" style={{textAlign:"center"}}>
                    Great! Your point was added.
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <img src="/img/CamPointLogo2.png" className="img-fluid" /> 
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}
export default AddedPointPopup;