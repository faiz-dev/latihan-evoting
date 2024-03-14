import SCELogo from '../../../assets/logo.png'
import './LoginPage.css'
import copywrite from '../../consts/copywrite'
import { useNavigate } from 'react-router-dom'
import FooterText from '../../components/FooterText'
import { useState } from 'react'
import LoginButton from '../../components/LoginButton'
import { useGoogleLogin } from '@react-oauth/google'
import axios from 'axios'
import { useAuth } from './core/Auth'
import { requestLoginVoteApi } from './core/_requests'

function LoginPage() {
  // const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const {saveAuth, setCurrentUser} = useAuth()

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const userInfo = await axios.get(
        'https://www.googleapis.com/oauth2/v3/userinfo',
        { headers: { Authorization: `Bearer ${tokenResponse.access_token}` } }
      )

      const userGoogleProfile = {
        id: userInfo.data.sub,
        email: userInfo.data.email,
        nickname: userInfo.data.name,
        role: 'user',
      }

      handleLoginVoteApi(userGoogleProfile)
    },
    onError: (error) => {
      console.log("failed to do oauth", error)
      setLoading(false)
    },
    onNonOAuthError: (error) => {
      console.log("non oauth error", error)
      setLoading(false)
    }
  })

  const handleLoginVoteApi = async (gProfile) => {
    try {
      const voteUser = await requestLoginVoteApi(gProfile.email)
      const {token, id, username} = voteUser.data.data
      saveAuth({api_token: token})
      setCurrentUser({id, username})
    } catch (error) {
      setLoading(false)
    }
  }

  const handleLogin = async () => {
    if(loading) return false
    setLoading(true)
    login()
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
      
      <div className='fixed bottom-0 left-0 right-0 px-[27px] pb-[27px]'>
        <div className='flex flex-col '>
          <LoginButton isLoading={loading} onClick={handleLogin} />
          <FooterText />
        </div>
      </div>
      
    </div>
  )

}

export default LoginPage