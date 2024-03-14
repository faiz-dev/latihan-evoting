import { createBrowserRouter } from 'react-router-dom';

import LoginPage from '../modules/auth/LoginPage'
import HomePage from '../modules/home/HomePage'
import VotePage from '../modules/vote/VotePage'
import AvailableResultPage from '../modules/results/AvailableResultPage';
import SuccessVote from '../modules/success/SuccessVote';
import ResultPage from '../modules/results/ResultPage';

const approuter = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />
  },{
    path: "/",
    element: <HomePage />
  },
  {
    path: "/vote/:id",
    element: <VotePage />
  },
  {
    path: "/vote/:id/success",
    element: <SuccessVote />
  },
  {
    path: "/result",
    element: <AvailableResultPage />
  },
  {
    path: "/result/:id",
    element: <ResultPage />
  }
])

export default approuter