import {Button} from "react-bootstrap";
import "./FacilityForm.scss";
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
        <>
        {facilities && <div>           
            <div className="facility-box" >
                {facilities.map(img => (
                    (img.typeid === 1) && <FacilityCheckbox key={img.id} title={img.title} url={img.url} />
                ))}
            </div>
            <div className="facility-box" >
                {facilities.map(img => (
                    (img.typeid === 2) && <FacilityCheckbox key={img.id} title={img.title} url={img.url}/>
                ))}
            </div>
            <Button onClick={e => done(point)}>Next</Button>
        </div>}
        </>
    )
}

export default FacilityForm;
