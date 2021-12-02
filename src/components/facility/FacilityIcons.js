import FacilityIcon from "./FacilityIcon";
import "./facility.scss"
import { useContext, useEffect, useState } from "react";
import _facilityService from "../../server/facility";
import { SessionContext } from "../../context/SessionContext";

const FacilityIcons = ({ pointId }) => {
    const _axios = useContext(SessionContext);
    const [facilities, setFacilities] = useState(null);
    useEffect(() => {       
            (async () => {
                const fcs = await (_facilityService.bind(_axios)()).getPointFacilities(pointId);
                setFacilities(fcs);
            })();
    }, [pointId, _axios],);

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
