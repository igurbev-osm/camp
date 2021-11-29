import { Button } from "react-bootstrap";
import "./dialogContent.scss";
import FacilityCheckbox from "../../facility/FacilityCheckbox";
import { useContext, useEffect, useState } from "react";
import _facilityService from "../../../server/facility";
import { SessionContext } from "../../../utils/session";

const FacilityForm = ({ point, addStack, done }) => {

    const sid = useContext(SessionContext);
    const [facilities, setFacilities] = useState(null);
    useEffect(() => {
        (async () => {
            let fcs = await _facilityService.getFacilities();
            if(point.id){
                let checked = await _facilityService.getPointFacilities(point.id);
                checked = checked.map(f=>f.id);
                if(checked && checked.length > 0){
                    fcs = fcs.map((f => {
                        if(checked.includes(f.id)){
                            f.checked = true;
                        }
                        return f;
                    }));
                }
            }
            setFacilities(fcs);
        })();
    }, []);

    const onSubmit = async (e) => {
        e.preventDefault();        
        const form = e.target;
        const formData = new FormData(form);

        const facilityIds = formData.getAll("facility");
        await _facilityService.addRemovePointFacilities(sid, point.id, facilityIds)
        done(point);
    }

    return (
        <div className="dialog-content-holder">
            <form className="dialog-custom-contnet" onSubmit={onSubmit}>
                {facilities && <div>
                    <div className="facility-box" >
                        {facilities.map(img => (
                            (img.typeid === 1) && <FacilityCheckbox key={img.id} title={img.title} url={img.url} id={img.id} checked={img.checked} />
                        ))}
                    </div>
                    <div className="facility-box" >
                        {facilities.map(img => (
                            (img.typeid === 2) && <FacilityCheckbox key={img.id} title={img.title} url={img.url} id={img.id} checked={img.checked}/>
                        ))}
                    </div>

                </div>}
                <div className="content-footer">
                    <Button variant="primary" type="submit" className="next-button"> Next </Button>
                </div>
            </form>
        </div>
    )
}

export default FacilityForm;
