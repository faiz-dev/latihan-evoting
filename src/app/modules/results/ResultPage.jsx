import MenuBar from '../../components/MenuBar'
import VoteResultThumbnail from '../../../assets/voting-result-thumbnail.png'
import boxElection from '../../../assets/box.png'
import CountUp from 'react-countup';

import copywrite from '../../consts/copywrite'
import FooterText from '../../components/FooterText'
import { useCandidates } from '../vote/core/Candidates'
import { useEffect, useState } from 'react'
import { useResult } from './core/Result'
import { useParams } from 'react-router-dom'
import GeneralButton from '../../components/GeneralButton';

function ResultPage() {
  const { candidates, fetchData: fetchCandidate, election, fetchElection, isLoading: isCandidateLoading, isError: isCandidateError } = useCandidates()
  const { electionsResult, getElectionResult } = useResult()
  const { id: electionsId } = useParams()
  const [showResult, setShowResult] = useState(false)

  useEffect(() => {
    fetchElection()
    fetchCandidate()
    getElectionResult(electionsId)
  }, [])

  // useEffect(() => {
  //   if(showResult)
  // }, [showResult])

  const getCandidateResult = (candidateId) => {
    const result = electionsResult.filter(c => c.candidateId == candidateId)
    return result.length > 0 ? result[0].count : 0
  }

  const handleOpen = () => {
    const code = prompt("Masukkan passcode")
    if (code == "SMK HEBAT") {
      setShowResult(true)
    } else {
      alert("Passcode Salah")
    }
  }

  return (
    <div className='h-full flex flex-col justify-between'>
      <div>
        <div className="greeting text-center">
          <h1 className='text-[31px] md:text-[2.5em] font-bold'>Hasil {election && election.title}</h1>
        </div>
        <div className='content mt-5 sm:mt-2'>
          {
            !showResult &&
            <>
              <h1 className='text-[1.5em] sm:text-[2rem] font-light text-center'>Suara telah diakumulasi dan siap ditampilkan</h1>
              <img src={boxElection} width={250} className='m-auto mt-10' />
            </>
          }

          {
            showResult &&
            <div className='flex flex-col sm:flex-row gap-5 items-center mt-[80px]'>
              {candidates.map(c =>
                <div key={c.id} className='resultbox w-full max-w-sm sm:max-w-full h-[157px] sm:h-[207px] relative'>
                  <div className='text-center text-white absolute left-[20px] top-[10px]'>
                    <span className='text-sm'>No Urut</span> <br />
                    <span className='text-4xl md:text-5xl'>{c.urutan}</span>
                  </div>
                  <div className='absolute left-[100px] top-[10px] text-lg md:text-2xl text-white font-normal'>
                    <p>{c.name.split(',')[0]} <br /> {c.name.split(',')[1]}</p>
                  </div>
                  <div className='absolute bottom-[20px] left-[26%] flex items-start text-white'>
                    <span className='text-6xl md:text-8xl font-bold'>
                      {
                        getCandidateResult(c.id) > 0 ? <CountUp end={getCandidateResult(c.id)} duration={5} /> : 0}
                    </span> <span className='text-lg'>Suara</span>
                  </div>
                </div>
              )}
            </div>
          }

        </div>

      </div>

      <div className='fixed bottom-5 left-0 right-0 px-[27px] pb-[27px]'>
        <div className='flex flex-col '>
          {showResult ? <MenuBar /> : <GeneralButton text={"Tampilkan Hasil"} isActive={true} onClick={handleOpen} />}
          <FooterText />
        </div>
      </div>

    </div>
  )
}

export default ResultPage