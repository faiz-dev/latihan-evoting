import VotePage from './VotePage'
import { CandidatesProvider } from './core/Candidates'
import { VoteActionProvider } from './core/Vote'

const VotePageWrapper = () => {
  return (
    <VoteActionProvider>
      <CandidatesProvider>
        <VotePage />
      </CandidatesProvider>
    </VoteActionProvider>
  )
}

export default VotePageWrapper