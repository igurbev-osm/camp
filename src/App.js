import React, {useRef} from 'react';
import { forwardRef } from 'react/cjs/react.development';
import MapComponent from './components/MapComponent';

const testMarkers =  [
  {lat: 41.45421566068876, lng: 23.193529220368312},
  {lat: 41.57350003430605, lng: 25.434740157868312}, 
  {lat: 42.071957644054976, lng: 27.858505339820198},
  {lat: 43.57565735928308, lng: 28.508634922011076},
  {lat: 43.85087890833986, lng: 22.641482755831912},
  {lat: 42.813242432306595, lng: 25.529219828423443}
];

const App = () => {

  const childRef = useRef();
  const Map = forwardRef(MapComponent);
  return <Map 
    onMapClick={e => {
        console.log(`{lat: ${e.latLng.lat()}, lng: ${e.latLng.lng()}}`);              
        childRef.current.addMarkers([{lat: e.latLng.lat(), lng: e.latLng.lng()}], true);
      }
    }
    onMarkerClick = {e => {
      console.log(`{lat: ${e.latLng.lat()}, lng: ${e.latLng.lng()}}`);
      alert(`MarkerClicked: ${e.domEvent.currentTarget.title} | {lat: ${e.latLng.lat()}, lng: ${e.latLng.lng()}}`);
      childRef.current.addMarkers(testMarkers, false);
    }}
    ref={childRef}
  />
}

export default App