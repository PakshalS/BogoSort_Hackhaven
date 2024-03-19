import React from 'react'

import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
// import Whitebtn from './btn-whiteboard.jsx'


import {BrowserRouter} from 'react-router-dom'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <App></App>

    {/* <Whitebtn /> */}
    </BrowserRouter> 
  </React.StrictMode>,
)
