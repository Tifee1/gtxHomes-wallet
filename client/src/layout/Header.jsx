import { Link } from "react-router-dom"

const Header = () => {
  return (
    <header className='bg-pry text-white h-16 grid items-center justify-center'>
     <Link to='/'>
       GText Wallet
      </Link>
    </header>
  )
}

export default Header
