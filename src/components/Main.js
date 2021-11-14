import React, {useRef, forwardRef, useState} from "react";
import _pointService from "../server/point";
import MapComponent from "./MapComponent";
import { useSelector, useDispatch } from 'react-redux';
import initUserManager from "../store/userManager";
import AddPointPopup from './popups/AddPointPopup';

function Main(){    
        const childRef = useRef();
        const Map = forwardRef(MapComponent);
        const userManager = initUserManager(useSelector, useDispatch);
        const [modalShow, setModalShow] = useState(false); 
       
        return <><Map 
          onMapClick={
              e => {
                // const pointName = prompt("Enter point name");
                // if(pointName && pointName !== ""){
                // let point = {title: pointName, lat: e.latLng.lat(), lng: e.latLng.lng(), iconid: 1, description: "Wild camp"};
                // if(userManager.sid){
                // (
                //     async()=>{
                //         point = await _pointService.addPoint(userManager.sid, point);
                //         childRef.current.addMarkers([
                //             point
                //           ], true);
                //     }
                // )();
                // }
               
              //}
              setModalShow(true);
              console.log(`{lat: ${e.latLng.lat()}, lng: ${e.latLng.lng()}}`);              
              
            }
          }
          onMarkerClick = {e => {              
            console.log(`Marker: ${e.domEvent.currentTarget.title} | {lat: ${e.latLng.lat()}, lng: ${e.latLng.lng()}}`);           
          }}
          ref={childRef}
        />
         <AddPointPopup
            show={modalShow}
            onHide={() => setModalShow(false)}
          />
        </>
    
}

export default Main;