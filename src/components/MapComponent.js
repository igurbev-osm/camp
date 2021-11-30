import React, { useContext, useEffect, useState } from 'react'
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import _pointService from "../server/point";
import { reloadConf } from "../utils/reloadConfig";
import { mapConfig, googleMapConfig } from '../config/config';
import PointDetailsPopup from './popups/pointDetails/PointDetailsPopup';
import { SessionContext } from '../context/SessionContext';
import DialogContainer from './popups/dialogContainer/DialogContaiter';
import FacilityForm from './popups/dialogContent/FacilityForm';
import UploadForm from './popups/dialogContent/UploadForm';
import AddEditPointForm from './popups/dialogContent/AddEditPointForm';
import { useNavigate } from 'react-router';


function MapComponent({ pointId, view }) {
    const sid = useContext(SessionContext);
    const [map, setMap] = useState(null);
    const [mapCenter, setMapCenter] = useState(mapConfig.center);
    const [markers, setMarkers] = useState([]);
    const [popupQueue, setPopupQueue] = useState(false);
    const [showDetails, setShowDetails] = useState(false);
    const [currentSelection, setSelection] = useState(null);
    let navigate = useNavigate();

    useEffect(
        () => {
            const loadCcontextPoint = async () => {
                const pointDetails = await _pointService.getPoint(sid, pointId);
                if (!pointDetails.error) {
                    setMapCenter({ lat: pointDetails.lat, lng: pointDetails.lng, zoom: 9 });
                    (function () {
                        setPopupQueue([PointDetailsPopup, AddEditPointForm, FacilityForm, UploadForm]);
                        setSelection(this);
                        setShowDetails(true);
        
                    }).bind(pointDetails)();
                }      
            }
            if (pointId && pointId !== '0') {
                loadCcontextPoint();
            }
        }, [pointId]
    );

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: googleMapConfig.googleMapsApiKey
    });

    const markerOpacity = (marker) => {
        if (view === "mypoints") {
            return marker.my ? 1 : 0.3;
        }
        return 1;
    }

    return (<> {isLoaded && <GoogleMap
        mapContainerStyle={mapConfig.size}
        center={mapCenter}
        zoom={mapCenter.zoom || mapConfig.zoom}
        onClick={e => {
            if (sid) {
                setSelection({ lat: e.latLng.lat(), lng: e.latLng.lng(), title: "Add new point", url: "/img/add-point.png" });
                setPopupQueue([AddEditPointForm, FacilityForm, UploadForm]);
                setShowDetails(true);
            }
        }}
        onBoundsChanged={() => {
            (
                async () => {
                    if (!reloadConf.isRequestStart) {
                        reloadConf.currentBounds = map.getBounds();
                        reloadConf.isRequestStart = true;
                        setTimeout(async () => {
                            setMarkers(await _pointService.getPoints(sid ? sid : 0, reloadConf.currentBounds));
                            reloadConf.isRequestStart = false;
                            reloadConf.reloadInterval = reloadConf.nextStepInterval;
                        }, reloadConf.reloadInterval);

                    }
                }
            )();
        }}
        onLoad={async mapRef => {
            setMap(mapRef);
        }}
    >

        {markers && markers.map((mark, index) => <Marker opacity={markerOpacity(mark)}
            onClick={(function () {
                navigate(`/point/${this.id}`);

            }).bind(mark)}
            key={mark.id}
            position={{ lat: mark.lat, lng: mark.lng }}
            title={mark.title}
            icon={mark.url ? { url: mark.url } : { url: "/img/tourism_camp_site.png" }} />)}

    </GoogleMap>}


        {showDetails && currentSelection && <DialogContainer

            onHide={async (point) => {
                setMarkers(await _pointService.getPoints(sid ? sid : 0, map.getBounds()));
                setShowDetails(false);
                navigate(`/${view || "map"}/~`)
            }}
            initQueue={popupQueue}
            initData={currentSelection}
            title={"Add point popup"}
        />}
    </>)
}

export default MapComponent;