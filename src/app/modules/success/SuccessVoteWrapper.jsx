import { CandidatesProvider } from '../vote/core/Candidates'
import SuccessVote from './SuccessVote'

const SuccessVoteWrapper = () => {
  return (
    <CandidatesProvider>
      <SuccessVote />
    </CandidatesProvider>
  )
}

export default SuccessVoteWrapper