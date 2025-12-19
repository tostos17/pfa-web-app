
import './App.css'
import { Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import RegistrationPage from './pages/RegistrationPage';
import PlayerListPage from './pages/PlayerListPage';
import LoginPage from './pages/LoginPage';
import Layout from './components/Layout';
import RequireAuth from './components/RequireAuth';

function App() {

  return (
    <Routes>
      <Route path='/' element={<Layout />} >
        
        <Route path='login' element={<LoginPage />} />
        <Route path='/' element={<Landing />} /> 

        <Route element={<RequireAuth />} >
          <Route path='reg' element={<RegistrationPage />} />
          <Route path='players' element={<PlayerListPage />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App
