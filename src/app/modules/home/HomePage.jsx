import MenuBar from '../../components/MenuBar'
import VoteThumbnail from '../../../assets/vote-thumbnail.png'

import './HomePage.css'
import copywrite from '../../consts/copywrite'
import { useNavigate } from 'react-router-dom'
import VoteCard from '../../components/VoteCard'
import FooterText from '../../components/FooterText'
import { useElections } from './core/Elections'
import { useEffect } from 'react'
import { useAuth } from '../auth/core/Auth'
import LoadingBox from '../../components/MessageBox'
import MessageBox from '../../components/MessageBox'

function HomePage() {

  const {elections, fetchData, isLoading, isError} = useElections()
  const {currentUser} = useAuth()

  useEffect(() => {
    fetchData()
  },[])

  const navigate  = useNavigate()
  const goToVote = (id) => {
    console.log(id)
    navigate("/vote/"+id)
  }
  return (
    <div className='h-full flex flex-col justify-between'>
      <div>
        <div className="greeting">
          <h1 className='text-xl font-bold'>Hello, {currentUser.nickname[0].toUpperCase() + currentUser.nickname.slice(1)}! </h1>
          <p className='text-lg'>{copywrite("eng", "slogan")}</p>
        </div>
        <div className='content mt-10'>
          <h1 className='font-bold text-gray-500 text-2xl mb-3'>{copywrite("id", "available-voting")}</h1>
          <div className="flex flex-col gap-5">
            {
              isError 
              // ? <p className='font-bold text-lg  rounded-lg text-center py-5'>{copywrite("id","error")}</p>
              ? <MessageBox text={copywrite('en', 'error')} className={'bg-red-400'} />
              : ""
            }
            {
              !isError && isLoading 
              ? <MessageBox text={copywrite('en', 'loading')} />
              : elections.map(e => (
                <VoteCard key={e.id} voteData={e} onClick={goToVote} />
              ))
            }
          </div>
        </div>

      </div>

      <div className='fixed bottom-0 left-0 right-0 px-[27px] pb-[27px]'>
        <div className='flex flex-col '>
          <MenuBar />
          <FooterText />
        </div>
      </div>
      
    </div>
  )
}

export default HomePage