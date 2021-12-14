import { Modal, Button } from "react-bootstrap";

const Alert = ({message, onCancel, title, show}) => {    
  
    return (
      <>      
  
        <Modal show={show} dialogClassName="alert-confirm-dialog">
          <Modal.Header>
            <Modal.Title className="">{title}</Modal.Title>
          </Modal.Header>
          <Modal.Body className="alert-text">{message}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={onCancel}>
              OK
            </Button>            
          </Modal.Footer>
        </Modal>
      </>
    );
}

export default Alert;