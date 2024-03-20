import './App.css'
import {Routes, Route} from 'react-router-dom'
import Meeting from './pages/Room/meeting'
import Dash from './pages/Home/Dashboard'
import Signup from './pages/Auth/signup';
import Canvas from './whiteboard';
// import Appclient from './components/filesharing/client/src/App';
export default function App() {
  return (
      <Routes>
        <Route path='/' element={<Signup/>}></Route>
        <Route path='/dashboard' element={<Dash/>}></Route>
        <Route path='/meeting' element={<>
          <Meeting/>
          <Canvas/>
        </>}></Route>
       </Routes>
  )
}

