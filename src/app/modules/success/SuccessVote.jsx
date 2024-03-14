import MenuBar from '../../components/MenuBar'
import SuccessIcon from '../../../assets/success-icon.svg'
import FooterText from '../../components/FooterText'
import { useEffect } from 'react'
import { useCandidates } from '../vote/core/Candidates'
import VoteButton from '../../components/VoteButton'
import GeneralButton from '../../components/GeneralButton'

const SuccessVote = () => {

  const {election, fetchElection} = useCandidates()

  useEffect(() => {
    fetchElection()
  }, [])

  useEffect(() => {
    setTimeout(() => {
      handleFinish()
    }, 4000)
  }, [election])

  const handleFinish = () => {
    window.location.reload()
  }

  return (
    <div className='h-full flex flex-col justify-start'>
      <div className="greeting text-center">
        <h1 className='text-[31px] font-bold'>{election && election.title}</h1>
        <p className='text-[24px]'>Your Vote successfully recorded</p>
      </div>

      <div className='content mt-[200px]'>
        <div className="flex flex-col justify-center items-center h-full">
          <img src={SuccessIcon} alt="" />
          <h1 className='font-bold text-[31px]'>Hurray!</h1>
          <p className='text-[31px] mt-2'>Vote Sent Successfully!</p>
        </div>
      </div>

      <div className='fixed bottom-[30px] left-0 right-0 px-[27px] pb-[10px]'>
        <div className='flex flex-col '>
          <GeneralButton text={"✓ Oke Selesai"} isActive={true} onClick={handleFinish}/>
          <FooterText />
        </div>
      </div>
    </div>
  )
}

export default SuccessVote