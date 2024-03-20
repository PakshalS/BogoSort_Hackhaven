import Navbar from "../../components/navbar"
import '../../components/navstyle.css'
import ImageUploader from "./profile"
import Webcam from "../../webcam"
import axios from "axios"
export default function Dash()
{
    return(
    <div>
    <Navbar></Navbar>
    <ImageUploader></ImageUploader>
    <Webcam></Webcam>
    </div>
    )
}