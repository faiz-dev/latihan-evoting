import './MainApp.css'
import { Outlet } from 'react-router-dom'

const MainApp = () => {
  return (
    <>
      <div className='main-container'>
        <Outlet />
      </div>
    </>
  )
}

export default MainApp