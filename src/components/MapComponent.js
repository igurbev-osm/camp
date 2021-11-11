import React, { useState, useImperativeHandle } from 'react'
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

import { mapConfig } from '../config/config';


function MapComponent(props, ref) {
  
  useImperativeHandle(
    ref,
    () => ({
        addMarkers(newMarkers, isAdd) {
          let markersArr = isAdd ? markers.concat(newMarkers) : [].concat(newMarkers);
          setMarkers(markersArr);
        }
    }),
  )

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyD07E1VvpsN_0FvsmKAj4nK9GnLq-9jtj8"
  });

  const [markers, setMarkers] = useState( props.markers);

  return isLoaded ? (
    <GoogleMap
      // mapContainerStyle={{width: 'calc(100%', height: '600px' }}
      mapContainerStyle={{width: 'calc(100%)', height: '600px' }}
      center={mapConfig.center}
      zoom={mapConfig.zoom}     
      onClick={props.onMapClick}
    >

      {markers.map((mark, index) => <Marker
       onClick={props.onMarkerClick} 
       key={index} 
       position={mark.position} 
       title={mark.title} 
       icon={mark.icon ? mark.icon : {url: "/img/tourism_camp_site.png"}}/>)}

    </GoogleMap>
  ) : <></>
}

export default MapComponent;