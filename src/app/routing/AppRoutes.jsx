import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { useAuth } from '../modules/auth/core/Auth'
import MainApp from '../../MainApp'
import LoginPage from '../modules/auth/LoginPage'
import PrivateRoutes from './PrivateRoutes'
import OperatorApp from '../../OperatorApp'
import OperatorLogin from '../modules/operator-login/OperatorLogin'
import OperatorRoutes from './OperatorRoutes'
import TokenLoginPage from '../modules/auth/TokenLoginPage'
import PublicRoutes from './PublicRoutes'
const {PUBLIC_URL} = 'localhost:5173'

const AppRoutes = () => {
  const {currentUser, operator} = useAuth()

  return (
    <BrowserRouter basename={PUBLIC_URL}>
      <Routes>
        <Route element={<MainApp />}>
          <Route path='/*' element={<PublicRoutes />} />
          {currentUser ? (
            <>
              <Route path='app/*' element={<PrivateRoutes />} />
              <Route index element={<Navigate to='app/dashboard' />} />
            </>
          ) : (
            <>
              <Route path='app/oauth-login' element={<LoginPage />} />
              <Route path='app/token-login' element={<TokenLoginPage />} />
              <Route path='/*' element={<Navigate to='/app/token-login' />} />
            </>
          )}
        </Route>
        <Route element={<OperatorApp />}>
          {
            operator != "" 
              ? <>
                  <Route path='/operator/*' element={<OperatorRoutes />} />
                  <Route index element={<Navigate to='/operator/dashboard' />} />
                </>
              : <>
                  <Route path="/tps-login" element={<TokenLoginPage/>} />
                  <Route path='/operator/login' element={<OperatorLogin />} />
                  <Route path='/operator/*' element={<Navigate to="/operator/login" />} />
                </>
          }

        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes