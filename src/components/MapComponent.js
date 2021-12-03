import React, { useContext, useEffect, useState } from 'react'
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import _pointServiceF from "../server/point";
import { reloadConf } from "../utils/reloadConfig";
import { mapConfig, googleMapConfig } from '../config/config';
import PointDetailsPopup from './popups/pointDetails/PointDetailsPopup';
import { SessionContext } from '../context/SessionContext';
import DialogContainer from './popups/dialogContainer/DialogContaiter';
import FacilityForm from './popups/dialogContent/FacilityForm';
import UploadForm from './popups/dialogContent/UploadForm';
import AddEditPointForm from './popups/dialogContent/AddEditPointForm';
import { useNavigate } from 'react-router';
import { ViewContext } from '../context/ViewContext';
import { isLoggedIn } from "../utils/session"


function MapComponent({ pointId, currentView }) {
    const _axios = useContext(SessionContext);
    const _pointService = (_pointServiceF.bind(_axios))();
    const [map, setMap] = useState(null);
    const [mapCenter, setMapCenter] = useState(mapConfig.center);
    const [markers, setMarkers] = useState([]);
    const [popupQueue, setPopupQueue] = useState(false);
    const [showPopupQueue, setShowPopupQueue] = useState(false);
    const [currentSelection, setSelection] = useState(null);
    let navigate = useNavigate();
    const { view } = useContext(ViewContext);

    useEffect(
        () => {
            const loadCcontextPoint = async () => {
                const pointService = (_pointServiceF.bind(_axios))();
                const pointDetails = await pointService.getPoint(pointId);
                if (!pointDetails.error) {
                    setMapCenter({ lat: pointDetails.lat, lng: pointDetails.lng, zoom: 9 });
                    setPopupQueue([PointDetailsPopup, AddEditPointForm, FacilityForm, UploadForm]);
                    setSelection(pointDetails);
                    setShowPopupQueue(pointDetails);
                }
            }
            if (currentView === "point" && pointId && pointId !== '0') {
                loadCcontextPoint();
            }
        }, [pointId, _axios, currentView]
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
            if (isLoggedIn(_axios)) {
                setSelection({ lat: e.latLng.lat(), lng: e.latLng.lng(), title: "Add new point", url: "/img/add-point.png" });
                setPopupQueue([AddEditPointForm, FacilityForm, UploadForm]);
                setShowPopupQueue(true);
            }
        }}
        onBoundsChanged={() => {
            (
                async () => {
                    if (!reloadConf.isRequestStart) {
                        reloadConf.currentBounds = map.getBounds();
                        reloadConf.isRequestStart = true;
                        setTimeout(async () => {
                            const markersList = await _pointService.getPoints(reloadConf.currentBounds);
                            if (markersList && markersList.length) {
                                setMarkers(markersList);
                            }
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
            onClick={(function (e) {                
                navigate(`/point/${this.id}`);
            }).bind(mark)}
            key={mark.id}
            position={{ lat: mark.lat, lng: mark.lng }}
            title={mark.title}
            icon={mark.url ? { url: mark.url } : { url: "/img/tourism_camp_site.png" }} />)}

    </GoogleMap>}


        {showPopupQueue && currentSelection && <DialogContainer

            onHide={async (point) => {
                setMarkers(await _pointService.getPoints(map.getBounds()));
                setShowPopupQueue(false);
                navigate(`/${view || "map"}/~`)
            }}
            initQueue={popupQueue}
            initData={currentSelection}
            title={"Add point popup"}
        />}
    </>)
}

export default MapComponent;