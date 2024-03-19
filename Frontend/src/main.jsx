import React from 'react'
import Signup from './pages/Auth/signup.jsx'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Webcam from './webcam.jsx'

import {BrowserRouter} from 'react-router-dom'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <Signup /> 
    {/* <Canvas /> */}
    <App></App>
    {/* <Webcam/> */}
    </BrowserRouter> 
  </React.StrictMode>,
)
