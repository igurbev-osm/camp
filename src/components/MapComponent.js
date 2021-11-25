import React, { useContext, useState } from 'react'
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import _pointService from "../server/point";
import { reloadConf } from "../utils/reloadConfig";
import { mapConfig, googleMapConfig } from '../config/config';
import PointDetailsPopup from './popups/pointDetails/PointDetailsPopup';
import { SessionContext } from '../utils/session';
import DialogContainer from './popups/dialogContainer/DialogContaiter';
import AddEditPointForm from './popups/dialogContent/AddEditPointForm';
import UploadForm from './popups/dialogContent/UploadForm';
import FacilityCheckbox from './facility/FacilityCheckbox';
import FacilityForm from './popups/dialogContent/FacilityForm';

function MapComponent({ pointTypes }) {
  const sid = useContext(SessionContext);
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [currentSelection, setSelection] = useState(null);
  const [selectedPoint, setSelectedPoint] = useState(null);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: googleMapConfig.googleMapsApiKey
  });
  return (<> {isLoaded && <GoogleMap
    mapContainerStyle={mapConfig.size}
    center={mapConfig.center}
    zoom={mapConfig.zoom}
    onClick={e => {
      if (sid) {
        setSelection({ lat: e.latLng.lat(), lng: e.latLng.lng() });
        setModalShow(true);     
      }
    }}
    onBoundsChanged={() => {
      (
        async () => {
          if (!reloadConf.isRequestStart) {
            reloadConf.currentBounds = map.getBounds();
            reloadConf.isRequestStart = true;
            setTimeout(async () => {
              setMarkers(await _pointService.getPoints(0, reloadConf.currentBounds));

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

    {markers.map((mark, index) => <Marker
      onClick={(function () {
        setSelectedPoint(this);
      }).bind(mark)}
      key={mark.id}
      position={{ lat: mark.lat, lng: mark.lng }}
      title={mark.title}
      icon={mark.url ? { url: mark.url } : { url: "/img/tourism_camp_site.png" }} />)}

  </GoogleMap>
  }

    {!!selectedPoint && !modalShow && <PointDetailsPopup
      show={!!selectedPoint}
      point={selectedPoint}
      onHide={() => {
        setSelectedPoint(null)
      }}
      onEdit={async (point) => {
        point = await _pointService.getPoint(sid, point.id);
        setSelectedPoint(point);
        setModalShow(true)
      }}
      pointTypes={pointTypes}
    />}

{modalShow && currentSelection &&    <DialogContainer
      show={modalShow}
      onHide={(point) => {
        if (point) {
          setMarkers(markers.concat([point]));
        }
        setModalShow(false);
      }} 
      initQueue={[AddEditPointForm, FacilityForm, UploadForm]}
      initData={currentSelection}
      title={"Add point popup"}
      />}   
  </>)
}

export default MapComponent;