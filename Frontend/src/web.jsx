import React, { useRef, useEffect } from "react";
import axios from "axios";

export default function Web() {
  const videoRef = useRef(null);
  const photoRef = useRef(null);

  // const getUserCamera = () => {
  //   navigator.mediaDevices.getUserMedia({ video: true })
  //     .then((stream) => {
  //       let video = videoRef.current;
  //       if (video) {
  //         video.srcObject = stream;
  //         video.play();
  //       }
  //     })
  //     .catch(err => console.log(err));
  // };
  const getUserCamera = () => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        let video = videoRef.current;
        if (video) {
          video.srcObject = stream;
          video.addEventListener('loadedmetadata', () => {
            video.play();
          });
        }
      })
      .catch(err => console.log(err));
  };
  
   const takeAndSendImage = () => {
    let width = 500;
    let height = width / (16 / 9);

    let photo = photoRef.current;
    let video = videoRef.current;

    if (!photo || !video) return;

    photo.width = width;
    photo.height = height;

    let ctx = photo.getContext('2d');
    ctx.drawImage(video, 0, 0, photo.width, photo.height);

    // Convert canvas to base64 image
    let imageData = photo.toDataURL('image/png');

    // Send image data using axios.post
    axios.post('http://localhost:5025/', { imageData })
      .then(response => {
        console.log("Image sent successfully:", response);
      })
      .catch(error => {
        console.error("Error sending image:", error);
        console.log(imageData)
      });
  };

  useEffect(() => {
    getUserCamera();

    // Automatically capture and send image every 10 seconds
    const intervalId = setInterval(() => {
      takeAndSendImage();
    }, 20000);

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <video className="container" ref={videoRef} style={{ display: 'none' }}></video>
      <canvas ref={photoRef} style={{ display: 'none' }}></canvas>
    </div>
  );
}