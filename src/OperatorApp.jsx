import './OperatorApp.css'
import { Outlet } from 'react-router-dom'

const OperatorApp = () => {
  return (
    <div className='operator-container'>
      <Outlet />
    </div>
  )
}

export default OperatorApp