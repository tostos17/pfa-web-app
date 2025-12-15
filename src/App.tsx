
import './App.css'
import { Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import RegistrationPage from './pages/RegistrationPage';
import PlayerListPage from './pages/PlayerListPage';

function App() {

  return (
    <Routes>
      <Route path='/' element={<Landing />} />
      <Route path='/reg' element={<RegistrationPage />} />
      <Route path='/players' element={<PlayerListPage />} />
    </Routes>
  )
}

export default App
