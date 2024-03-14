import VoteButton from '../../components/VoteButton'
import CandidateCard from '../../components/CandidateCard'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import FooterText from '../../components/FooterText'
import { useCandidates } from './core/Candidates'
import MessageBox from '../../components/MessageBox'
import copywrite from '../../consts/copywrite'
import { useVoteAction } from './core/Vote'
import { useAuth } from '../auth/core/Auth'

function VotePage() {
  const [selected, setSelected] = useState(0)
  const navigate = useNavigate()
  const {id} = useParams()

  const {auth} = useAuth()
  const {candidates, election, fetchData, fetchElection, isLoading: isCandidateLoading, isError: isCandidateError} = useCandidates()
  const {isLoading: voteLoading, isError: voteError, sendVote, message: errMsg} = useVoteAction()

  useEffect(() => {
    fetchData()
    fetchElection()
    console.log(isCandidateLoading, isCandidateError)
  }, [])

  const handleClick = (id) => {
    setSelected(id)
  }

  const handleSubmit = async () => {
    console.log(auth.api_token, election.id, selected)
    const sending = await sendVote(auth.api_token, election.id, selected)
    if(sending) {
      navigate(`/app/vote/${id}/success`)
      // setTimeout(() => {
      // }, 2000)
    }

  }

  return (
    <div className='h-full flex flex-col justify-between'>
      <div>
        <div className="greeting text-center">
          <h1 className='text-[31px] font-bold'>{election && election.title}</h1>
          <p className='text-[24px]'>Choose one Candidate below</p>
        </div>
        <div className='content mt-5 sm:mt-[100px]'>
          <div className="flex flex-col sm:flex-row gap-5">
            
            {candidates.length == 0 && isCandidateLoading
              ? <MessageBox text={copywrite('en', 'loading')} className={"w-full"} />
              : <></>
            }
            {!isCandidateLoading && candidates.length == 0 
              ? <MessageBox text={copywrite('en', 'no-data')} />
              : <></>}
            {candidates.map(data => (
              <CandidateCard key={data.id} data={data} selected={selected} onClick={handleClick} />
            ))}
          </div>
        </div>

      </div>

      <div className='fixed bottom-0 left-0 right-0 px-[27px] pb-[10px]'>
        <div className='flex flex-col '>
          <VoteButton isActive={selected != 0} isLoading={voteLoading} isError={voteError} errMsg={errMsg} onClick={handleSubmit} />
          <FooterText />
        </div>
      </div>

    </div>
  )
}

export default VotePage