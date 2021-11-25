import { Image, OverlayTrigger, Tooltip } from "react-bootstrap";

const FacilityIcon = ({ title, url, className }) => {

    return (
        <>
            <div className={className}>
                <OverlayTrigger
                    placement='bottom'
                    overlay={
                        <Tooltip id={`tooltip-bottom`}>
                            {title}
                        </Tooltip>
                    }
                >
                    <Image className="cbx-icon" src={url} />
                </OverlayTrigger>

            </div>
        </>
    )
}

export default FacilityIcon;
