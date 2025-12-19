import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './redux/store.ts'
import { AuthProvider } from './context/UserContext.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route path='/*' element={<App />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
    </Provider>
  </StrictMode>,
)
