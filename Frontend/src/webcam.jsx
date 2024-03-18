import React from "react";
import axios from "axios";




export default function Webcam() {
 const [video,setVideo] = React.useState(true);
 const [image,setImage] = React.useState(true);
 const [imageData, setImageData] = React.useState();

let videoRef = React.useRef(null);
let photoRef = React.useRef(null);



const getUserCamera = ()=> {
navigator.mediaDevices.getUserMedia({
    video:true
})
.then((stream) => {
    let video = videoRef.current

    video.srcObject = stream

    if (video.paused && !video.ended) {
        video.play()
      }
})
.catch(err => console.log(err))
}
const takeImage = () => {
    if (!photoRef.current) {
        return;
      }

    let width = 500

    let height = width/(16 / 9)

    let photo = photoRef.current
    let video = videoRef.current
    
    photo.width = width

    photo.height = height

    let ctx = photo.getContext('2d')

    ctx.drawImage(video,0,0,photo.width,photo.height)
    setVideo((prev) => !prev)
    setImage(true)
    setImageData(photo.toDataURL())

    
}
const Videotoggle = () => {
    setVideo((prev) => true)
    
    let photo = photoRef.current
    
    let ctx = photo.getContext('2d')
    
    ctx.clearRect(0,0,photo.width,photo.height)
    setImage((prev)=> false)
}

const clearImage = () => {
    let photo = photoRef.current

    let ctx = photo.getContext('2d')

    ctx.clearRect(0,0,photo.width,photo.height)
}

   React.useEffect(() => {
    getUserCamera()
},[videoRef,video,image])


const submit = async(e) =>{
    e.preventDefault()

    try {
      await axios.post("http://localhost:5000/",{
        imageData
      })
    } catch (error) {
      alert(error)
    }
  }


    return(
    <div>
        {video && <video className="container" ref={videoRef}></video>}
       <button onClick={takeImage}>Image</button>
       {image && <canvas ref={photoRef}></canvas>}
       <button onClick={Videotoggle}>Retake</button>
       <button type="submit" onClick={submit}>Submit</button>
    
    </div>
)
}