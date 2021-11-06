import React, {useRef, forwardRef,  useState} from "react";
import _server from "../server/server";
import MapComponent from "./MapComponent";

function Main(){    
        const childRef = useRef();
        const Map = forwardRef(MapComponent);

        const [markers, setMarkers] = useState([]);
        const [isInitDone, setInitDone] = useState(false);

        if(!isInitDone){           
            setInitDone(true);
            (
                async _ => {
                    
                    let points =  await _server.getPoints();             
                    if(!points.error){
                        setMarkers(points);
                    }else {
                        //TODO handle the error
                        alert(points.error);
                    }
                   
                }
            )();
        }
               

        return <Map 
          onMapClick={
              e => {
              console.log(`{lat: ${e.latLng.lat()}, lng: ${e.latLng.lng()}}`);              
              childRef.current.addMarkers([
                  {position: {lat: e.latLng.lat(), lng: e.latLng.lng()}, title: "Added by click"}
                ], true);
            }
          }
          onMarkerClick = {e => {
            console.log(`MarkerClicked: ${e.domEvent.currentTarget.title} | {lat: ${e.latLng.lat()}, lng: ${e.latLng.lng()}}`);           
          }}
          ref={childRef}
          markers={markers}
        />
    
}

export default Main;