import React from "react";
import axios from 'axios';
import './style.css';
import {useHistory} from 'react-router-dom';


export default function Signup() {
const history = useHistory()
  const[action,setAction] = React.useState("Login");
  const [msg,setMsg] = React.useState({
    username: "",
    email: "",
    password: ""
  });

  const handleInput = (event) => {
    setMsg({...msg,[event.target.name]:  event.target.value})
  }

  const submit = async(e) =>{
    console.log(msg);
    e.preventDefault()

    try {
      const response = await axios.post("http://localhost:5000/",{
        msg
      });
      const {redirect_url} = response.data;

      history.push(redirect_url);
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

