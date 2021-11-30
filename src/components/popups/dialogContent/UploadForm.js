import React, { useContext, useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { readFile } from "../../../utils/cropImage";
import CropImage from "../../sub/CropImage";
import _uploadService from "../../../server/upload";
import { addPointCoing } from "../../../config/config";
import { SessionContext } from "../../../context/SessionContext";

const UploadForm = ({ point, addStack, done }) => {
    const sid = useContext(SessionContext);

    useEffect(
        () => {
            (async () => {
                const pointImages = await _uploadService.getImages(point.id, sid);
                setUploadedList(pointImages);
            })();
        }, []
    );

    const [imageData, setImageData] = useState(null);
    const [uploadedList, setUploadedList] = useState([]);

    const onUploaded = async (poitId) => {
        setImageData(null);
        const pointImages = await _uploadService.getImages(point.id, sid);
        if (pointImages && addPointCoing.maxImagesPerPoint > pointImages.length) {
            setUploadedList(pointImages);
        } else {
            done(point);
        }
    }

    return (
        <div className="dialog-content-holder">
            <div className="dialog-custom-contnet">
                <Form className="upload-form">
                    <Form.Group controlId="formFileSm" className="mb-3 uploadFile">
                        <Form.Label>Select Image to upload</Form.Label>
                        <Form.Control type="file" size="sm" onChange={async (e) => {
                            const file = e.target.files[0];
                            let imageDataUrl = await readFile(file)
                            setImageData({ src: imageDataUrl, name: file.name });

                        }} />
                    </Form.Group>
                    <div className="uploaded-list">
                    {uploadedList.map(img => {
                        return <li key={img.id}> {img.title}</li>
                    })}
                    </div>
                    {imageData &&
                        <div className="crop-containter"><CropImage
                            imageSrc={imageData.src}
                            imageName={imageData.name}
                            onUpload={onUploaded}
                            point={point}
                            sid={sid}
                        />
                        </div>}
                </Form>
                <div className="content-footer">
                    <Button variant="primary" type="submit" className="next-button" onClick={(e) => {
                        e.preventDefault();
                        done(point);
                    }}> Next</Button>
                </div>
            </div>
        </div>
    );
}

export default UploadForm;