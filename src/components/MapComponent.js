import React, { useState } from 'react'
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

import { mapConfig } from '../config/config';


function MapComponent(props) {
  
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyD07E1VvpsN_0FvsmKAj4nK9GnLq-9jtj8"
  });

  const [markers, setMarkers] = useState( mapConfig.initialMarkers);
  const [map, setMap] = useState(null);

  const onLoad = React.useCallback(function callback(map) {
    // const bounds = new window.google.maps.LatLngBounds();
    // map.fitBounds(bounds);
    
    setMap(map);
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, [])

  const onMapClick = (e)=>{
    setMarkers(markers.concat([{lat: e.latLng.lat(), lng: e.latLng.lng()}]));
    props.onMapClick(e);
  }

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={mapConfig.size}
      center={mapConfig.center}
      zoom={mapConfig.zoom}
      onLoad={onLoad}
      onUnmount={onUnmount}
      onClick={onMapClick}
    >

      {markers.map((mark, index) => <Marker onClick={props.onMarkerClick} key={index} position={mark} title={"marker " + index} icon={{url: "/img/tourism_camp_site.png"}}/>)}

    </GoogleMap>
  ) : <></>
}

export default React.memo(MapComponent)