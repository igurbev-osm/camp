import { useContext, useState } from "react";
import { Col, Container, Form, Image, Row, Button } from "react-bootstrap";
import { SessionContext } from "../../../context/SessionContext";
import _pointServiceF from "./../../../server/point";

const AddComment = ({ point, addStack, done }) => {

    const _axios = useContext(SessionContext);
    const _pointService = _pointServiceF.bind(_axios)();
    const [error, setError] = useState(false);
    const onSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const comment = formData.get("comment");

        if (isValid(comment)) {
            postComment(comment);
        } else {
            console.log("invalid comment: ", comment);
            //TODO: show invalid comment message
        }
    };

    const postComment = async (comment) => {
        await _pointService.commentPoint(point.id, comment);
        point.ccount++;
        done(point);
    }

    const isValid = (comment) => {
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
                                    isInvalid={error}
                                    onChange={e => {
                                        const newValue = !(e.currentTarget.value.length > 19);
                                        setError(error => error === newValue ? error : newValue);
                                    }}
                                />
                                <Form.Control.Feedback type="invalid" className="validation-feedback">
                                    The comment must be at least 20 characters long.
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
                </Container>
                <div className="add-point-logo-holder">
                    <Image src="/img/CamPointLogo.png" className="add-point-logo" />
                </div>
                <div className="content-footer">
                    <Button variant="primary" type="submit" className="next-button" > Add </Button>
                    <Button variant="primary" className="btn-secondary" onClick={() => done(point)} > Close </Button>
                </div>
            </Form>
        </div>
    );
}

export default AddComment;