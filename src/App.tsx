
import './App.css'
import { Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import RegistrationPage from './pages/RegistrationPage';
import PlayerListPage from './pages/PlayerListPage';
import LoginPage from './pages/LoginPage';
import Layout from './components/Layout';

function App() {

  return (
    <Routes>
      <Route path='/' element={<Layout />} >
        <Route path='reg' element={<RegistrationPage />} />
        <Route path='players' element={<PlayerListPage />} />
        <Route path='/' element={<LoginPage />} />
        <Route path='home' element={<Landing />} /> 
      </Route>
    </Routes>
  )
}

export default App
