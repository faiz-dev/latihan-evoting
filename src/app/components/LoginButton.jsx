
import GoogleLoginLogo from '../../assets/google-login-icon.svg'
import copywrite from '../consts/copywrite'
import PropTypes from 'prop-types'

const LoginButton = ({ isLoading, onClick }) => {

  return (

    <div className='flex justify-center flex-col'>
      <div>
        <div className='flex w-full max-w-[480px] mx-auto md:px-[27px]'>
          <div
            className='bg-primary shadow-primary rounded-[20px] h-[78px] flex justify-center px-[30px] items-center text-white text-[19px] gap-2 w-full'
            onClick={() => onClick()}
          >
            <img src={GoogleLoginLogo} className='' />
            {isLoading ? "Loading ..." : copywrite('en', 'login-button')}
          </div>
        </div>
      </div>
    </div>


  )
}

LoginButton.propTypes = {
  isLoading: PropTypes.bool,
  onClick: PropTypes.func
}

export default LoginButton