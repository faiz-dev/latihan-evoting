import MenuHome from '../../assets/menu-home.svg'
import MenuResult from '../../assets/menu-result.svg'
import MenuInfo from '../../assets/menu-info.svg'
import MenuSaran from '../../assets/menu-saran.svg'
import { useNavigate } from 'react-router-dom'

function MenuBar() {
  const navigate = useNavigate()

  const handleNav = (address, external) => {
    if(external) {
      window.location.href = address
    } else {
      navigate(address)
    }
  }

  return (
    <div className='flex justify-center flex-col'>
      <div>
        <div className='flex w-full max-w-[480px] mx-auto md:px-[27px]'>
          <div className='bg-primary shadow-primary rounded-[20px] h-[78px] flex justify-between px-[30px] items-center text-white text-[19px] gap-2 w-full'>
            {/* <img src={MenuHome} onClick={() => handleNav("/")} /> */}
            <img src={MenuResult} onClick={() => handleNav("/public/result/1", true)}  />
            <img src={MenuInfo} onClick={() => handleNav("https://sce.pplgskansaka.com", true)}  />
            <img src={MenuSaran} onClick={() => handleNav("https://wa.me/6287765119600?text=Salam,%20saya%20ingin%20memberikan%20saran%20tentang%20pemilihan%20ketua%20osis%202024", true)}  />
          </div>
        </div>
      </div>
    </div>
  )
}

export default MenuBar