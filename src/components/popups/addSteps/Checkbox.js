import { Form, Image, Col } from "react-bootstrap";

const Checkbox = ({ img }) => {

    return (
        <>
            <Col sm="1" className="cbx-col-sm">
                <Image className="cbx-icon" src={img.url} />
            </Col>
            <Col sm="3" className="cbx-col-lg">
                <Form.Check className="cbx-label" type="checkbox" label={img.title} />
            </Col>
        </>
    )
}

export default Checkbox;
