import { useContext } from "react";
import { Col, Container, Form, Image, Row, Button } from "react-bootstrap";
import { SessionContext } from "../../../context/SessionContext";
import _pointService from "./../../../server/point";

const AddComment = ({ point, addStack, done }) => {

    const sid = useContext(SessionContext);
    const onSubmit = (e) =>{
        e.preventDefault();        
        const form = e.target;
        const formData = new FormData(form);
        const comment = formData.get("comment");

        if(isValid(comment)){
            postComment(comment);
        }else{
            console.log("invalid comment: ", comment);
            //TODO: show invalid comment message
        }
    };

    const postComment = async (comment)=>{
        await _pointService.commentPoint(point.id, sid, comment);
        done(point);
    }

    const isValid = (comment) =>{
        return comment && comment.length > 20;
    }

    return (
        <div className="dialog-content-holder">
            <Form onSubmit={onSubmit} className="add-point-form">
                <Container>            

                    <Row>
                        <Col>
                            <Form.Group md="4" controlId="validationCustom02" >
                                <Form.Control
                                    as="textarea"
                                    name="comment"
                                    required
                                    placeholder="Add your comment here."
                                    style={{ height: '320px' }}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Add your comment here.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row >
                        <Col >
                            <div className="empty-content">

                            </div>
                        </Col>
                    </Row>
                   

                    <Image src="/img/CamPointLogo.png" className="add-point-logo" />

                </Container>
                <div className="content-footer">
                    <Button variant="primary" type="submit" className="next-button" > Add </Button>
                    <Button variant="primary" className="btn-secondary" onClick={() => done(point)} > Close </Button>
                </div>
            </Form>
        </div>
    );
}

export default AddComment;