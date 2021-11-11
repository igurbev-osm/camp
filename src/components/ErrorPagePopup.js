import { Modal, Button } from "react-bootstrap";

function ErrorPagePopup(props) {
    return (
        <Modal
            {...props}
            //size="lg"
            dialogClassName="modal-90w"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter" style={{textAlign:"center"}}>
                    Oops!
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4 style={{textAlign:"center"}}>An error occurred while processing your request.</h4>
                {/* <p>
                    Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
                    dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
                    consectetur ac, vestibulum at eros.
                </p> */}
                <img src="/img/Doggo.jpg" className="img-fluid" /> 
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}
export default ErrorPagePopup;