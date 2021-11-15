import React, {useRef, forwardRef, useState, useEffect} from "react";
import _pointService from "../server/point";
import MapComponent from "./MapComponent";
import AddPointPopup from './popups/AddPointPopup';
import { useSelector, useDispatch } from 'react-redux';
import initUserManager from "../utils/userManager";

function Main(){    
        const userManager = initUserManager(useSelector, useDispatch);
        const childRef = useRef();
        const Map = forwardRef(MapComponent);
        const [modalShow, setModalShow] = useState(false); 
        const [currentSelection, setSelection] = useState(null);
        const [pointTypes, setPointTypes] = useState(null);

        useEffect(() => {
          (
            async()=>{
              setPointTypes(await _pointService.getPointTypes());
            }
          )();
        }, []);
       
        return <><Map 
          onMapClick={
              e => {
                if(userManager.sid){
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
                setSelection({lat: e.latLng.lat(), lng: e.latLng.lng()});
                setModalShow(true);
              }
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
            onHide={(point) => {
              if(point){
                childRef.current.addMarkers([point], true);
              }
              setModalShow(false);
            }}
            selection={currentSelection}
            pointtypes={pointTypes}
            sid={userManager.sid}
          />
        </>
    
}

export default Main;