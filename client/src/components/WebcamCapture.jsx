
import React, { Component, useState } from 'react';
// import './cameraStyles.css'
import Webcam from "react-webcam";
const WebcamComponent = () => <WebcamCapture />;
const videoConstraints = {
    width: 260,
    height: 200,
    facingMode: "user"
};

const WebcamCapture = ({handleVerifyImage}) => {
    const webcamRef = React.useRef(null);

    const [src, setSrc] = useState('');

    const capture = React.useCallback(
        () => {
            const imageSrc = webcamRef.current.getScreenshot();
            setSrc(imageSrc)
            console.log(imageSrc)
            handleVerifyImage(imageSrc)
        },
        [webcamRef]
    );

    const handleClick = function (e) {
        e.preventDefault();
        capture();
    }

    return (
        <>
            {src == '' ? <Webcam
                audio={false}
                height={200}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                width={260}
                videoConstraints={videoConstraints}
            /> : <img src={src}/>}
            <button
                onClick={handleClick}>
                Capture</button>
        </>
    );
};

export default WebcamCapture;