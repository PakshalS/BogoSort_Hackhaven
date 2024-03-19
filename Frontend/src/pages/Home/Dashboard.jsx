import Navbar from "../../components/navbar"
import '../../components/navstyle.css'
import ImageUploader from "./profile"
export default function Dash()
{
    return(
    <div>
    <Navbar></Navbar>
    <ImageUploader></ImageUploader>
    </div>
    )
}