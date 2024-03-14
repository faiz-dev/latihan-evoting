import { Suspense, lazy } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import MonitorPageWrapper from '../modules/monitor/MonitorPageWrapper'

const PublicRoutes = () => {
  const AvailableResultPageWrapper = lazy(() => import('../modules/results/AvailableResultPageWrapper'))
  const ResultPageWrapper = lazy(() => import('../modules/results/ResultPageWrapper'))


  return (
    <Routes>
      <Route path='*' element={<Navigate to='/result/1' />} />
      <Route path='monitor' 
        element={
          <Suspense>
            <MonitorPageWrapper />
          </Suspense>
        } />
      <Route path='result' 
        element={
          <Suspense>
            <AvailableResultPageWrapper />
          </Suspense>
        } />
      <Route path='result/:id' 
        element={
          <Suspense>
            <ResultPageWrapper />
          </Suspense>
        } />
    </Routes>
  )
}

export default PublicRoutes