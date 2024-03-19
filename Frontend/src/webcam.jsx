import React from "react";
import axios from "axios";

export default function Webcam() {
  const [video, setVideo] = React.useState(true);
  const [image, setImage] = React.useState(true);
  const [imageData, setImageData] = React.useState();

  const videoRef = React.useRef(null);
  const photoRef = React.useRef(null);

  const getUserCamera = () => {
    navigator.mediaDevices
      .getUserMedia({
        video: true
      })
      .then((stream) => {
        const videoElement = videoRef.current;
        if (videoElement) {
          videoElement.srcObject = stream;
          if (videoElement.paused && !videoElement.ended) {
            videoElement.play();
          }
        }
      })
      .catch((err) => console.log(err));
  };

  const takeImage = () => {
    if (!photoRef.current) {
      return;
    }

    const width = 500;
    const height = width / (16 / 9);
    const photo = photoRef.current;
    const video = videoRef.current;

    photo.width = width;
    photo.height = height;

    const ctx = photo.getContext("2d");
    ctx.drawImage(video, 0, 0, photo.width, photo.height);

    setVideo((prev) => !prev);
    setImage(true);
    setImageData(photo.toDataURL());
  };

  React.useEffect(() => {
    getUserCamera();
  });

  const submit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/",{
        "msg" : {
          "DataType":"Image",
          "image":imageData
        }
      })
    } catch (error) {
      alert(error);
    }
  };

  console.log(imageData);

  return (
    <div>
      {video && <video className="container" ref={videoRef}></video>}
      <button onClick={takeImage}>Image</button>
      {image && <canvas ref={photoRef}></canvas>}
      <button type="submit" onClick={submit}>
        Submit
      </button>
    </div>
  );
}