import React, {useState, useEffect } from "react";
import _pointService from "../server/point";
import MapComponent from "./MapComponent";

function Main() {
  
  const [pointTypes, setPointTypes] = useState(null);
  useEffect(() => {
    (
      async () => {
        setPointTypes(await _pointService.getPointTypes());
      }
    )();
  }, []);

  return <> {
    pointTypes &&
    <MapComponent
      pointTypes={pointTypes}     
    />}
  </>

}

export default Main;