import PropTypes from 'prop-types'

function GeneralButton({isActive, text, leadingIcon, onClick}) {
  return (
    <div className='flex justify-center flex-col'>
      <div>
        <div className={`flex w-full max-w-[480px] mx-auto md:px-[27px]`} onClick={() => onClick()}>
          
          <div className={`${isActive ? 'bg-primary' : 'bg-inactive'} shadow-primary rounded-[20px] h-[78px] flex justify-center px-[30px] items-center text-white text-[19px] gap-2 w-full `}>
            {leadingIcon && <img src={leadingIcon} alt="" />} {text}
          </div>
          
        </div>
      </div>
    </div>
  )
}

GeneralButton.propTypes = {
  isActive: PropTypes.bool,
  onClick: PropTypes.func,
  text: PropTypes.string,
  leadingIcon: PropTypes.node
}

export default GeneralButton