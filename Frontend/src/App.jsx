import './App.css'
import {Routes, Route} from 'react-router-dom'
import HomePage from './pages/Home'
import Meeting from './pages/Room/meeting'
import Signup from './pages/Auth/signup'
function App() {

  return (
      <Routes>
        <Route path='/' element={<Signup/>}></Route>
        <Route path='/room/:roomId' element={<Meeting/>}></Route>
      </Routes>
  )
}
export default App
