import { Suspense, lazy } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

const PrivateRoutes = () => {
  const HomePageWrapper = lazy(() => import('../modules/home/HomePageWrapper'))
  const VotePageWrapper = lazy(() => import('../modules/vote/VotePageWrapper'))
  const SuccessPageWrapper = lazy(() => import('../modules/success/SuccessVoteWrapper'))
  const AvailableResultPageWrapper = lazy(() => import('../modules/results/AvailableResultPageWrapper'))
  const ResultPageWrapper = lazy(() => import('../modules/results/ResultPageWrapper'))


  return (
    <Routes>
      <Route path='*' element={<Navigate to='/app/vote/1' />} />
      <Route path='dashboard' 
        element={
          <Suspense>
            <HomePageWrapper />
          </Suspense>
        } />
      <Route path='vote/:id' 
        element={
          <Suspense>
            <VotePageWrapper />
          </Suspense>
        } />
      <Route path='vote/:id/success' 
        element={
          <Suspense>
            <SuccessPageWrapper />
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

export default PrivateRoutes