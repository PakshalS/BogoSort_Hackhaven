import './App.css'
import {Routes, Route} from 'react-router-dom'
import HomePage from './pages/Home'
import Meeting from './pages/Room/meeting'
function App() {

  return (
      <Routes>
        <Route path='/' element={<HomePage/>}></Route>
        <Route path='/room/:roomId' element={<Meeting/>}></Route>
      </Routes>
  )
}
export default App
