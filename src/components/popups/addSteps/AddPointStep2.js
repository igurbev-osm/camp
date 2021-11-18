import React, { useState } from "react";
import {Form} from "react-bootstrap";
import { readFile } from "../../../utils/cropImage";
import CropImage from "../CropImage";
import "./AddPointStep2.scss";
import _uploadService from "../../../server/upload";
import { addPointCoing } from "../../../config/config";

import { useSelector, useDispatch } from 'react-redux';
import initUserManager from "../../../utils/userManager";


const AddPointStep2 = ({next, point }) => {
    const user = initUserManager(useSelector, useDispatch).getUser();    

    const [imageData, setImageData] = useState(null);
    const [uploadedList, setUploadedList] = useState([]);

    const onUploaded = async (poitId)=>{
        setImageData(null);
        const pointImages = await _uploadService.getImages(point.id, user ? user.sid : null);
        if(pointImages && addPointCoing.maxImagesPerPoint > pointImages.length){
            setUploadedList(pointImages);
        }else{
           next();
        }
    }

    return (
        <>
            <Form className="upload-form">
                <Form.Group controlId="formFileSm" className="mb-3 uploadFile">
                    <Form.Label>Select Image to upload</Form.Label>
                    <Form.Control type="file" size="sm" onChange={async (e) => {
                        const file = e.target.files[0];
                        let imageDataUrl = await readFile(file)
                        setImageData({ src: imageDataUrl, name: file.name });

                    }} />
                </Form.Group>
                {uploadedList.map(img => {
                    return <p key={img.id}> {img.title}</p>
                })}
                {imageData &&
                <div className="crop-containter"><CropImage
                    imageSrc={imageData.src}
                    imageName={imageData.name}
                    onUpload={onUploaded}
                    point={point}
                    sid={user ? user.sid : null}
                />
                </div>}
            </Form>
            
        </>
    );
}

export default AddPointStep2;