import SendVoteIcon from '../../assets/send-vote.svg'
import PropTypes from 'prop-types'
import copywrite from '../consts/copywrite'

function VoteButton({isActive, isLoading, isError, onClick, errMsg = "null"}) {
  return (
    <div className='flex justify-center flex-col'>
      <div>
        <div className={`flex w-full max-w-[480px] mx-auto md:px-[27px]`} onClick={() => onClick()}>
          
          {
            isError 
            ? <div className={`bg-red-300 shadow-primary rounded-[20px] h-[78px] flex justify-center px-[30px] items-center text-black text-[19px] text-center gap-2 w-full `}>
              {errMsg}
            </div>
            : <div className={`${isActive ? 'bg-primary' : 'bg-inactive'} shadow-primary rounded-[20px] h-[78px] flex justify-center px-[30px] items-center text-white text-[19px] gap-2 w-full `}>
              <img src={SendVoteIcon} alt="" /> {isLoading ? copywrite('en', 'sending'): 'Kirim Vote'}
            </div>
          }
          
        </div>
      </div>
    </div>
  )
}

VoteButton.propTypes = {
  isActive: PropTypes.bool,
  onClick: PropTypes.func,
  isError: PropTypes.bool,
  isLoading: PropTypes.bool,
  errMsg: PropTypes.string
}

export default VoteButton