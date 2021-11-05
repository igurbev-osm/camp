import React, { useState } from 'react';
import MapPicker from 'react-google-map-picker';
import ReactWeather, { useOpenWeather } from 'react-open-weather';
import MyComponent from './components/MyComponent';
 import { MarkerClusterer } from '@react-google-maps/api';


const DefaultLocation = { lat: 42.69140841618888, lng: 23.99100942655395 };
const DefaultZoom = 10;

const App = () => {

  return <MyComponent />
}

export default App