import FacilityIcon from "./FacilityIcon";
import "./facility.scss"

const FacilityIcons = () => {

    const cbxServices = [
        {
            "id": "1",
            "title": "drinking water",
            "url": "/img/checkbox/01_drinking_water.png",
            "typeId": "1"
        },
        {
            "id": "2",
            "title": "water suply",
            "url": "/img/checkbox/02_water_suply.png",
            "typeId": "1"
        },
        {
            "id": "3",
            "title": "fire place",
            "url": "/img/checkbox/03_fire_place.png",
            "typeId": "1"
        },
        {

            "id": "4",
            "title": "lighting",
            "url": "/img/checkbox/04_lighting.png",
            "typeId": "1"
        },
        {
            "id": "5",
            "title": "electricity",
            "url": "/img/checkbox/05_electricity.png",
            "typeId": "1"
        },
        {
            "id": "6",
            "title": "shed",
            "url": "/img/checkbox/06_shed.png",
            "typeId": "1"
        },
        {
            "id": "7",
            "title": "tree",
            "url": "/img/checkbox/07_tree.png",
            "typeId": "1"
        },
        {
            "id": "8",
            "title": "forest",
            "url": "/img/checkbox/08_forest.png",
            "typeId": "1"
        }
    ]

    const cbxActivities = [
        {
            "id": "15",
            "title": "tourism",
            "url": "/img/checkbox/activity01_tourism.png",
            "typeId": "2"
        },
        {
            "id": "16",
            "title": "biking",
            "url": "/img/checkbox/activity02_biking.png",
            "typeId": "2"
        },
        {
            "id": "17",
            "title": "fishing",
            "url": "/img/checkbox/activity03_fishing.png",
            "typeId": "2"
        }
    ]

    return (
        <>
            <div className="facility-block" >
                {cbxServices.map(img => (
                    <FacilityIcon key={img.id} title={img.title} url={img.url} className="facility-icon" />
                ))}
            </div>
            <div className="facility-block" >
                {cbxActivities.map(img => (
                    <FacilityIcon key={img.id} title={img.title} url={img.url} className="facility-icon" />
                ))}
            </div>
        </>
    )
}

export default FacilityIcons;
