
import './App.css'
import { Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import RegistrationPage from './pages/RegistrationPage';
import PlayerListPage from './pages/PlayerListPage';
import LoginPage from './pages/LoginPage';
import Layout from './components/Layout';
import RequireAuth from './components/RequireAuth';
import { useIdleTimeout } from './hooks/useIdleTimeout';
import { useAuth } from './context/UserContext';
import PlayerDetailsPage from './pages/PlayerDetailsPage';

function App() {

  const {logout} = useAuth();

  const IDLE_TIMEOUT_MS = 15 * 60 * 1000;

  useIdleTimeout({
    timeoutMs: IDLE_TIMEOUT_MS,
    onIdle: () => {
      console.log("User idle — resetting auth");
      logout();
      window.location.href = "/";
    },
  });

  return (
    <Routes>
      <Route path='/' element={<Layout />} >
        
        <Route path='login' element={<LoginPage />} />
        <Route path='/' element={<Landing />} /> 

        <Route element={<RequireAuth />} >
          <Route path='reg' element={<RegistrationPage />} />
          <Route path='players' element={<PlayerListPage />} />
          <Route path='playerbyid' element={<PlayerDetailsPage />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App
