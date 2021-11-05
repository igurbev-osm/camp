import React, { useState } from 'react';
import MapComponent from './components/MapComponent';


const DefaultLocation = { lat: 42.69140841618888, lng: 23.99100942655395 };
const DefaultZoom = 10;

const App = () => {

  return <MapComponent />
}

export default App