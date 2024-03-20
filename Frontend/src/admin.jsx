import React from 'react'
import ImageUploader from './pages/Home/profile';

export default function Admin ()  {


    // const [msg,setMsg] = React.useState({
    //     username: "",
    //     email: "",
    //     password: ""
    //   });
  return (
<div>
    <form>
    <input type="email" name="email" onChange="" placeholder="email"/>
    <ImageUploader/>
    </form>
</div>
    )
}
