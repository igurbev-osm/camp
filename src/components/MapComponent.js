import React, { useState } from 'react'
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import _pointService from "../server/point";
import { useSelector, useDispatch } from 'react-redux';
import initUserManager from "../utils/userManager";
import { reloadConf } from "../utils/reloadConfig"

import { mapConfig, googleMapConfig } from '../config/config';
import AddPointPopup from './popups/AddPointPopup';

function MapComponent(props) {
  const userManager = initUserManager(useSelector, useDispatch);
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [currentSelection, setSelection] = useState(null);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: googleMapConfig.googleMapsApiKey
  });


  return (<> {isLoaded && <GoogleMap
    mapContainerStyle={{ width: 'calc(100%)', height: '600px' }}
    center={mapConfig.center}
    zoom={mapConfig.zoom}
    onClick={e => {
      if (userManager.sid) {
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
      onClick={props.onMarkerClick}
      key={index}
      position={{ lat: mark.lat, lng: mark.lng }}
      title={mark.title}
      icon={mark.url ? { url: mark.url } : { url: "/img/tourism_camp_site.png" }} />)}

  </GoogleMap>
  }
    <AddPointPopup
      show={modalShow}
      onHide={(point) => {
        if (point) {
          setMarkers(markers.concat([point]));
        }
        setModalShow(false);
      }}
      selection={currentSelection}
      pointtypes={props.pointTypes}
      sid={userManager.sid}
    />
  </>)
}

export default MapComponent;