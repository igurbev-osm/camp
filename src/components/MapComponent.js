import React, { useState, useImperativeHandle } from 'react'
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import _pointService from "../server/point";
import { useSelector, useDispatch } from 'react-redux';
import initUserManager from "../store/userManager";
import {reloadConf} from "../config/config"

import { mapConfig } from '../config/config';

function MapComponent(props, ref) {
  const userManager = initUserManager(useSelector, useDispatch);
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState( []);
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

  

 

  return isLoaded ? (
    <GoogleMap      
      mapContainerStyle={{width: 'calc(100%)', height: '600px' }}
      center={mapConfig.center}
      zoom={mapConfig.zoom}     
      onClick={props.onMapClick}
      onBoundsChanged={ () => {
        (
          async ()=>{                       
            reloadConf.currentBounds =  map.getBounds();
            if(!reloadConf.isRequestStart){
              reloadConf.isRequestStart = true;
              setTimeout(async () => {  
                setMarkers(await _pointService.getPoints(0, reloadConf.currentBounds));
                reloadConf.isRequestStart = false;
                reloadConf.reloadInterval = 5000;
              }, reloadConf.reloadInterval);              
            }
            
          }
        )();
      }}      
      onLoad= {async mapRef => {        
        setMap(mapRef);        
      }}
    >

      {markers.map((mark, index) => <Marker
       onClick={props.onMarkerClick} 
       key={index} 
       position={{lat: mark.lat, lng: mark.lng}} 
       title={mark.title} 
       icon={mark.url ? {url: mark.url} : {url: "/img/tourism_camp_site.png"}}/>)}

    </GoogleMap>
  ) : <></>
}

export default MapComponent;