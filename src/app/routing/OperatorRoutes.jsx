import { Suspense, lazy } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

const OperatorRoutes = () => {
  const TokenGeneratorPageWrapper = lazy(() => import('../modules/token-generator/TokenGeneratorPageWrapper'))
  return (
    <Routes>
      <Route path='*' element={<Navigate to='/operator/dashboard' />} />
      <Route path='dashboard' 
        element={
          <Suspense>
            <TokenGeneratorPageWrapper />
          </Suspense>
        } />
      
    </Routes>
  )
}

export default OperatorRoutes