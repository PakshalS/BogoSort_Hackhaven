import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Webcam from './webcam.jsx'
import './index.css'
import Canvas from './whiteboard.jsx'
import Signup from './pages/Auth/signup.jsx'
import {BrowserRouter} from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    {/* <Signup /> */}
    <Canvas />
    {/* <App></App> */}
    {/* <Webcam/> */}
    </BrowserRouter> 
  </React.StrictMode>,
)
