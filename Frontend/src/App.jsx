import './App.css'
import {Routes, Route} from 'react-router-dom'
import Meeting from './pages/Room/meeting'


function App() {
  return (
      <Routes>
        <Route path='/' element={<Meeting/>}></Route>
        <Route path='/room/:roomId' element={<Routes/>}></Route>
       </Routes>
  )
}

export default App
