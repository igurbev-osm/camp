import React from 'react';
import MapComponent from './components/MapComponent';


const App = () => {

  return <MapComponent 
    onMapClick={e => {
        console.log(`{lat: ${e.latLng.lat()}, lng: ${e.latLng.lng()}}`);
        alert("Selected point: " + `{lat: ${e.latLng.lat()}, lng: ${e.latLng.lng()}}`);
      }
    }
    onMarkerClick = {e => {
      console.log(`{lat: ${e.latLng.lat()}, lng: ${e.latLng.lng()}}`);
      alert(`MarkerClicked: ${e.domEvent.currentTarget.title} | {lat: ${e.latLng.lat()}, lng: ${e.latLng.lng()}}`);
    }}
  />
}

export default App