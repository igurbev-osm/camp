import FacilityIcon from "./FacilityIcon";
import "./facility.scss"
import { useEffect, useState } from "react";
import _facilityService from "../../server/facility";

const FacilityIcons = ({pointId}) => {

    const [facilities, setFacilities] = useState(null);
    useEffect(() => {
        (async () => {
            const fcs = await _facilityService.getPointFacilities(pointId);
            setFacilities(fcs);
        })();
    }, [pointId]);

    return (
        <>
            {facilities && <>
                <div className="facility-block" >
                    {facilities.map(img => (
                        (img.typeid === 1) && <FacilityIcon key={img.id} title={img.title} url={img.url} className="facility-icon" />
                    ))}
                </div>
                <div className="facility-block" >
                    {facilities.map(img => (
                        (img.typeid === 2) && <FacilityIcon key={img.id} title={img.title} url={img.url} className="facility-icon" />
                    ))}
                </div>
            </>
            }
        </>
    )
}

export default FacilityIcons;
