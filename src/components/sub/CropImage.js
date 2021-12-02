import React, { useState, useCallback } from "react";
import Cropper from 'react-easy-crop';
import { Button } from "react-bootstrap";
import getCroppedImg from "../../utils/cropImage";
import _uploadService from "../../server/upload";

const CropImage = ({ imageSrc, imageName, onUpload, point, sid }) => {    

    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);   

    const reset = ()=>{
        setCrop({ x: 0, y: 0 });
        setCroppedAreaPixels(null);        
    }

    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels)
    }, []);

    const uploadImage = async () => {
        const croppedImage = await getCroppedImg(
            imageSrc,
            croppedAreaPixels
        );
        await _uploadService.upload(new File([croppedImage], imageName), point.id);        
        reset();
        onUpload(point.id);        
    };

    return (
        <>
            {imageSrc ? (
                <div >
                    <Cropper
                        image={imageSrc}
                        crop={crop}
                        aspect={4 / 3}
                        onCropChange={setCrop}
                        onCropComplete={onCropComplete}
                    />
                    <Button
                        onClick={uploadImage}
                        variant="primary"
                        style={{
                            position: 'absolute',
                            bottom: '2px',
                            left: '2px'
                        }}
                    >
                        Upload
                    </Button>
                </div>
            ) : (
                <div />
            )}
        </>
    );
}

export default CropImage;