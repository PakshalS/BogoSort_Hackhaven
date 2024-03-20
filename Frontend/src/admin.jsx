import React from 'react'

export default function Admin ()  {


    const [msg,setMsg] = React.useState({
        email: "",
        image:""
      });
  return (
<div>
    <form>
    <input type="email" name="email" onChange="" placeholder="email"/>
    <ImageUploader/>
    </form>
</div>
    )
}
