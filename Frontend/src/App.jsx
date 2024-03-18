import './App.css'
import {Routes, Route} from 'react-router-dom'
import HomePage from './pages/Home'
import Meeting from './pages/Room/meeting'
import Signup from './pages/Auth/signup'

function App() {

  return (
      <Routes>
        <Route path='/' element={<Meeting/>}></Route>
        <Route path='/room/:roomId' element={<Routes/>}></Route>
       </Routes>
      
  )
}
export default App
