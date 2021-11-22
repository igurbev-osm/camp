import { Image, Col, OverlayTrigger, Tooltip } from "react-bootstrap";

const Info = ({ img }) => {

    return (
        <>
            <Col sm="1" className="cbx-col-sm">
                <OverlayTrigger
                    placement='bottom'
                    overlay={
                        <Tooltip id={`tooltip-bottom`}>
                            {img.title}
                        </Tooltip>
                    }
                >
                    <Image className="cbx-icon" src={img.url} />
                </OverlayTrigger>

            </Col>
        </>
    )
}

export default Info;
