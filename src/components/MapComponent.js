import React, { useState } from 'react'
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

import { mapConfig } from '../config/config';


let marks = [];

//create your forceUpdate hook
function useForceUpdate() {
  let [value, setState] = useState(true);
  return () => setState(!value);
}

function MapComponent() {
  const forceUpdate = useForceUpdate();
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyD07E1VvpsN_0FvsmKAj4nK9GnLq-9jtj8"
  });

  const [map, setMap] = useState(null)

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map);
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, [])


  function mapClick(e) {
    marks.push({ lat: e.latLng.lat(), lng: e.latLng.lng() });    
    console.log("click: ", e.latLng.lat(), e.latLng.lng());
    forceUpdate();
  }

  function markerClick(e){
    console.log("marker click: ", e.latLng.lat(), e.latLng.lng());
  }

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={mapConfig.size}
      center={mapConfig.center}
      zoom={9}
      onLoad={onLoad}
      onUnmount={onUnmount}
      onClick={mapClick}
    >

      {marks.map((mark, index) => <Marker onClick={markerClick} key={index} position={mark} />)}

    </GoogleMap>
  ) : <></>
}

export default React.memo(MapComponent)