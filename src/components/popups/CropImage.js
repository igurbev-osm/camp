import React, { useState, useCallback } from "react";
import Cropper from 'react-easy-crop';
import { Button } from "react-bootstrap";
import getCroppedImg from "../../utils/cropImage";
import _uploadService from "../../server/upload";

const CropImage = (props) => {
    const { imageSrc, imageName, next, point, sid } = { ...props };

    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels)
    }, []);

    const showCroppedImage = async () => {
        const croppedImage = await getCroppedImg(
            imageSrc,
            croppedAreaPixels
        )
        await _uploadService.upload(new File([croppedImage], imageName), point.id, sid);
        next();
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
                        onClick={showCroppedImage}
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