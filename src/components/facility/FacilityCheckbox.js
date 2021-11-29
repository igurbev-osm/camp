import { Form } from "react-bootstrap";
import "./facility.scss";
import FacilityIcon from "./FacilityIcon";

const FacilityCheckbox = ({ url, title, id, checked }) => {

    return (
        <div className="facility-checkbox" >
            <div>
                <FacilityIcon className="cbx-icon" url={url} title={title} />
            </div>
            <div sm="3" className="cbx-col-lg">
                <Form.Check className="cbx-label" type="checkbox" label={title} name="facility" value={id} defaultChecked ={checked}/>
            </div>
        </div>
    )
}

export default FacilityCheckbox;
