import SCELogo from '../../../assets/logo.png'
import './LoginPage.css'
import copywrite from '../../consts/copywrite'
import FooterText from '../../components/FooterText'
import { useRef, useState } from 'react'
import LoginButton from '../../components/LoginButton'
import { useGoogleLogin } from '@react-oauth/google'
import axios from 'axios'
import { useAuth } from './core/Auth'
import { requestLoginUsingTokenVoteApi, requestLoginVoteApi } from './core/_requests'

function TokenLoginPage() {
  // const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [loginTokenInput, setLoginTokenInput] = useState("")
  const { saveAuth, setCurrentUser } = useAuth()
  const [message, setMessage] = useState("Insert token here")
  const [warning, setWarning] = useState(false)


  const handleLoginVoteApi = async () => {
    console.log('handle login api')
    try {
      const voteUser = await requestLoginUsingTokenVoteApi(loginTokenInput)
      console.log(voteUser)
      const { token, id, username } = voteUser.data
      console.log(voteUser)
      saveAuth({ api_token: token })
      setCurrentUser({ id, username })
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }

  const handleLogin = async () => {
    if(loginTokenInput == "") {
      // alert("Please Write your token first!")
      setMessage("Please type your token first!")
      setWarning(true)
      setTimeout(() => {
        setMessage("Insert token here")
        setWarning(false)
      }, 2000)
      return
    }
    if (loading) return false
    setLoading(true)
    handleLoginVoteApi()
  }

  return (
    <div className='h-[50%] flex flex-col justify-between'>
      <img src={SCELogo} width="350px" className='logo' />
      <div className='flex flex-col '>
        <div className='text-center'>
          <h1 className='text-2xl font-light'>{copywrite('en', 'welcome')} <b className='font-bold text-primary'>evoting</b></h1>
          <p>Voting made fast and easy</p>
        </div>
      </div>

      <div className='fixed bottom-4 left-0 right-0 px-[27px] pb-[27px]'>
        <div className='flex flex-col'>
          <div className='flex justify-center flex-col'>
            <div>
              <div className='flex w-full max-w-[480px] mx-auto md:px-[27px] mb-5'>
                <div className='bg-primary shadow-primary rounded-[20px] flex justify-center items-center text-black text-[25px] w-full'>
                  <input type='text' className={`w-full h-[78px] rounded-[20px] text-center border border-primary ${warning && 'placeholder:text-red-400'}`} maxLength={5} placeholder={message} value={loginTokenInput} onChange={(e) => {setLoginTokenInput(e.target.value.toUpperCase())}} />
                </div>
              </div>
            </div>
          </div>
          <LoginButton isLoading={loading} onClick={handleLogin} />
          <FooterText />
        </div>
      </div>

    </div>
  )

}

export default TokenLoginPage