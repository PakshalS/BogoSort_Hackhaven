import React from "react";





export default function Webcam() {
let videoRef = React.useRef(null);
let photoRef = React.useRef(null);


const getUserCamera = ()=> {
navigator.mediaDevices.getUserMedia({
    video:true
})
.then((stream) => {
    let video = videoRef.current

    video.srcObject = stream

    video.play()
})
.catch(err => console.log(err))
}
const takeImage = () => {
    let width = 500

    let height = width/(16 / 9)

    let photo = photoRef.current
    let video = videoRef.current
    
    photo.width = width

    photo.height = height

    let ctx = photo.getContext('2d')

    ctx.drawImage(video,0,0,photo.width,photo.height)

}

React.useEffect(() => {
    getUserCamera()
},[videoRef])

    return(
    <div>
        <video className="container" ref={videoRef}></video>
       <button onClick={takeImage}>Image</button>
       <canvas ref={photoRef}></canvas>
    
    </div>
)
}