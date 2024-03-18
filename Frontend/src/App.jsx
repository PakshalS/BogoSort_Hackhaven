import './App.css'
import {Routes, Route} from 'react-router-dom'
import HomePage from './pages/Home'
import Roompage from './pages/Room'
function App() {

  return (
      <Routes>
        <Route path='/' element={<HomePage/>}></Route>
        <Route path='/room/:roomId' element={<Roompage/>}></Route>
      </Routes>
  )
}

export default App
