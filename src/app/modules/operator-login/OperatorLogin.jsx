import { useRef } from 'react'
import { useAuth } from '../auth/core/Auth'

const OperatorLogin = () => {
  const {operatorLogin, opMessage} = useAuth()
  const username = useRef("")
  const password = useRef("")
  
  const handleLogin = () => {
    if(username.current == "" || password.current == "") {
      alert("Isikan Username & Password")
    } else 
    operatorLogin(password.current.value, username.current.value)
  }
  return (
    <>
      <h1>Operator Login</h1>
      {opMessage}
      <input type='text' placeholder='Operator Name' ref={username} />
      <input type='password' placeholder='Password' ref={password} />
      <button onClick={handleLogin}>Signin</button>
    </>
  )
}

export default OperatorLogin