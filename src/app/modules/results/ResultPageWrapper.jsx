import { CandidatesProvider } from '../vote/core/Candidates'
import ResultPage from './ResultPage'
import { ResultProvider } from './core/Result'

const ResultPageWrapper = () => {
  return (
    <CandidatesProvider>
      <ResultProvider>
        <ResultPage />
      </ResultProvider>
    </CandidatesProvider>
  )
}

export default ResultPageWrapper