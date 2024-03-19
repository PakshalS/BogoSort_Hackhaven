import React from "react";
import axios from 'axios';
import './style.css';
import Webcam from "../../webcam";

export default function Signup() {
  const[action,setAction] = React.useState("Login");
  const [datatype,setDatatype] = React.useState("");
  const [msg,setMsg] = React.useState({
    username: "",
    email: "",
    password: ""
  });

  const handleInput = (event) => {
    setMsg({...msg,[event.target.name]:  event.target.value,datatype: action === "Login" ? "" : action})
  }

  React.useEffect(() => {
    setDatatype(action)
  })
  const submit = async(e) =>{
    console.log(msg,datatype);
    e.preventDefault()

    try {
      await axios.post("http://localhost:5000/",{
        msg
      })
    } catch (error) {
      alert(error)
    }
  }
   
    return(
      <div className="container">
       
       <form action="POST"> 
         <div className="header">
          <h2 className="header-text">{action}</h2>
         </div>
         <div className="underline"> </div>
         <div className="inputs">
          {action === "Login"?<div></div>:   <div className="input">
            {/* <img src={user_icon} alt=""/> */}
            <input type="text" name="username" onChange={handleInput} placeholder="UserName"/>
          </div>}
       
          <div className="input">
            {/* <img src={email_icon} alt=""/> */}
            <input type="email" name="email" onChange={handleInput} placeholder="E-mail"/>
          </div>
          <div className="input">
            {/* <img src={password_icon} alt=""/> */}
            <input type="password" name="password" onChange={handleInput} placeholder="Password"/>
          </div>
          {action === "Sign Up"?<div></div>:<div className="forgot-password">Lost Password? <span>Click Here!</span></div>
}
          <div className="submit-container" >
            <div className={action === "Login"?"submit gray":"submit"}onClick={() => {setAction("Sign Up")}}>
              <h3>SignUp</h3>
            </div>
            <div className={action === "Sign Up"?"submit gray":"submit"} onClick={() => {setAction("Login")}}>
              <h3>Login</h3>
            </div>
            <div><button type="submit" onClick={submit}>Submit</button></div>
          </div>
         </div>
         </form>
      </div>
    )
}

