import { Modal, Button } from "react-bootstrap";

const Confirm = ({onConfirm, onCancel, title}) => {    
  
    return (
      <>      
  
        <Modal show={true} dialogClassName="delete-confirm-dialog">
          <Modal.Header>
            <Modal.Title>Delete</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to delete {title}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={onCancel}>
              Cancel
            </Button>
            <Button variant="primary" onClick={onConfirm}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
}

export default Confirm;