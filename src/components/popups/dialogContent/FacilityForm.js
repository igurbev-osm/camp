import { Button } from "react-bootstrap";
import "./dialogContent.scss";
import FacilityCheckbox from "../../facility/FacilityCheckbox";
import { useEffect, useState } from "react";
import _facilityService from "../../../server/facility";

const FacilityForm = ({ point, addStack, done }) => {

    const [facilities, setFacilities] = useState(null);
    useEffect(() => {
        (async () => {
            const fcs = await _facilityService.getFacilities();
            setFacilities(fcs);
        })();
    }, []);

    return (
        <div className="dialog-content-holder">
            <div className="dialog-custom-contnet">
                {facilities && <div>
                    <div className="facility-box" >
                        {facilities.map(img => (
                            (img.typeid === 1) && <FacilityCheckbox key={img.id} title={img.title} url={img.url} />
                        ))}
                    </div>
                    <div className="facility-box" >
                        {facilities.map(img => (
                            (img.typeid === 2) && <FacilityCheckbox key={img.id} title={img.title} url={img.url} />
                        ))}
                    </div>

                </div>}
                <div className="content-footer">
                    <Button variant="primary" type="submit" className="next-button" onClick={(e)=>{
                        e.preventDefault();
                        done(point);
                    }}> Next </Button>
                </div>
            </div>
        </div>
    )
}

export default FacilityForm;
