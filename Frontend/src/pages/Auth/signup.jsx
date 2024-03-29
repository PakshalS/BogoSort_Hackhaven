import React from "react";
import axios from 'axios';
import './style.css';
import {useNavigate} from 'react-router-dom';
import Dash from "../Home/Dashboard";



export default function Signup() {
const navigate = useNavigate()
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
    console.log(msg);
    e.preventDefault()

    try {
      const response = await axios.post("http://localhost:5000/",{
        msg
      });
      const {redirect_url} = response.data;

      navigate(redirect_url);
    } catch (error) {
      alert(error)
    }
    const email = getEmailFromSession();
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
         {/* if(msg.email === ""){console.log("not yet initialised")}else{<Dash data={msg.email}/>} */}
      </div>
    )
}

// Access session cookie and extract email
function getEmailFromSession() {
  const cookies = document.cookie.split(';');
  for (const cookie of cookies) {
      const [name, value] = cookie.split('=');
      if (name.trim() === 'session_cookie_name') { // Replace 'session_cookie_name' with the name of your session cookie
          const sessionData = JSON.parse(decodeURIComponent(value));
          const email = sessionData.email; // Assuming email is stored in session data
          console.log('Email:', email);
          return email;
      }
  }
  console.log('Email not found');
  return null;
}

// Call the function to get and print the email

