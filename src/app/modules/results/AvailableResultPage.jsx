import MenuBar from '../../components/MenuBar'
import VoteResultThumbnail from '../../../assets/voting-result-thumbnail.png'

// import './AvailableResultPage.css'
import copywrite from '../../consts/copywrite'
import { useNavigate } from 'react-router-dom'
import { useResult } from './core/Result'
import { useEffect } from 'react'
import MessageBox from '../../components/MessageBox'

function AvailableResultPage() {
  const navigate = useNavigate()
  const {availableResult, getAvailableResult, isLoading, isError, message} = useResult()

  useEffect(() => {
    getAvailableResult()
  }, [])

  const handleClick = (id) => {
    navigate("/result/"+id)
  }

  return (
    <div className='h-full flex flex-col justify-between'>
      <div>
        <div className="greeting text-center">
          <h1 className='text-[31px] font-bold'>Election Result Page</h1>
          <p className='text-[24px]'>Choose one available Election below</p>
        </div>
        <div className='content mt-10'>
          <h1 className='font-bold text-gray-500 text-2xl mb-3'>{copywrite("id", "available-voting")}</h1>
          <div className="flex flex-col sm:flex-row gap-5">
            { isLoading && <MessageBox text={copywrite("en", "loading")} /> }
            { isError && <MessageBox text={copywrite("en", 'error')} className={'bg-red-300'} />}
            {availableResult.map(
              r => (
                <img key={r.id} src={VoteResultThumbnail} className='shadow-primary rounded-[20px] w-full sm:w-[50%]' onClick={() => handleClick(1)} />
              )
            )}
            
          </div>
        </div>

      </div>

      <div className='fixed bottom-0 left-0 right-0 px-[27px] pb-[27px]'>
        <div className='flex flex-col '>
          <MenuBar />
          <span className='footer-text'><b className='text-primary'>evoting</b> by pplgskansaka.com</span>
        </div>
      </div>
      
    </div>
  )
}

export default AvailableResultPage