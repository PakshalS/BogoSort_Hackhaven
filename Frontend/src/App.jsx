import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Routes, Route} from 'react-router-dom'
import HomePage from './pages/Home'
import Meeting from './pages/Room/meeting'
import Signup from './pages/Auth/signup'
function App() {
  const [count, setCount] = useState(0)

  return (
      <Routes>
        <Route path='/' element={<Signup/>}></Route>
        <Route path='/room/:roomId' element={<Meeting/>}></Route>
      </Routes>
  )
}

export default App
