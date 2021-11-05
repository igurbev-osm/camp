import React, { useState }  from 'react'
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
  width: '1600px',
  height: '900px'
};

const center = {
  lat: 42,
  lng: 23
};

let marks = [
    {lat: -3.745, lng: -38.523},
    {lat: -3.845, lng: -38.523},
    {lat: -3.745, lng: -38.523},
    {lat: -3.755, lng: -38.523},
    {lat: -3.765, lng: -38.523},
    {lat: -3.775, lng: -38.523}];

//create your forceUpdate hook
function useForceUpdate() {
    let [value, setState] = useState(true);
    return () => setState(!value);
  }

function MyComponent() {
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
  

    function mapClick(e){
        const ln = marks.push({lat:  e.latLng.lat(), lng: e.latLng.lng() });
        console.log("array: ", ln)
       console.log("click: ", e.latLng.lat(), e.latLng.lng(), marks );
       forceUpdate();
    }

  return isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={9}
        onLoad={onLoad}
        onUnmount={onUnmount}
        onClick={mapClick}
    

      >

          

       {marks.map((mark, index) => <Marker onClick={(e)=> console.log("click!!111", e.latLng.lat(), e.latLng.lng())}key={index} position={mark} />)}
       
      
      </GoogleMap>
  ) : <></>
}

export default React.memo(MyComponent)