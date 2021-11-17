import React, { useState } from "react";
import { Modal, Button, Form, Image, Row, Col } from "react-bootstrap";
import { readFile } from "../../../utils/cropImage";
import CropImage from "../CropImage";
import "./AddPointStep2.scss";

const AddPointStep2 = (props) => {
    const { selection, pointtypes, sid, next, point } = { ...props };

    const [imageData, setImageData] = useState(null);


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
                {imageData &&
                <div className="crop-containter"><CropImage
                    imageSrc={imageData.src}
                    imageName={imageData.name}
                    next={() => {
                        setImageData(null);
                        next();
                    }}
                    point={point}
                    {...props}
                />
                </div>}
            </Form>
            
        </>
    );
}

export default AddPointStep2;