// import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.jsx'
import './index.css'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { AuthProvider } from './app/modules/auth/core/Auth.jsx'
import AppRoutes from './app/routing/AppRoutes.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <GoogleOAuthProvider clientId='4896337701-l6naptf27jg1jj98r94hrc1ev2manof9.apps.googleusercontent.com'>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </GoogleOAuthProvider>
  // </React.StrictMode>,
)
