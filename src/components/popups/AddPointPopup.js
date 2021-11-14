import { Modal, Button, Form, FloatingLabel } from "react-bootstrap";
import ReactStars from 'react-stars'
import "./AddPointPopup.scss";

function AddPointPopup(props) {
    const ratingChanged = (newRating) => {
        console.log(newRating)
    }
    return (
        <Modal
            {...props}
            dialogClassName="modal-90w"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter" style={{ textAlign: "center" }}>
                    Good for you.<br /> Now lets gather some information!
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control type="text" placeholder="lat: xxxxx, lng: xxxxxx" readOnly />
                    <FloatingLabel controlId="PointName" label="Place your Point Name here">
                        <Form.Control
                            as="textarea"
                            placeholder="Place your Point Name here"
                            style={{ height: '60px' }}
                        />
                    </FloatingLabel>
                    <FloatingLabel controlId="PointDescription" label="Place your Description here">
                        <Form.Control
                            as="textarea"
                            placeholder="Place your Description here"
                            style={{ height: '100px' }}
                        />
                    </FloatingLabel>
                    <FloatingLabel controlId="PointRating" label="Rate the point" />
                    <ReactStars
                        count={5}
                        half={false}
                        onChange={ratingChanged}
                        size={30}
                        color2={'#ffd700'}
                        className='rating' />
                    <Form.Group controlId="formFileSm" className="mb-3 uploadFile">
                        <Form.Label>Select Image to upload</Form.Label>
                        <Form.Control type="file" size="sm" />
                    </Form.Group>
                    <Button variant="primary" onClick={props.onHide}>
                        Submit
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}
export default AddPointPopup;