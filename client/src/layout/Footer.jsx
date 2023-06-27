import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className='bg-pry text-white h-10 grid justify-center items-center'>
      <div>
        &copy; {new Date().getFullYear()}{' '}
        <Link to='https://tifee-portfolio.vercel.app' className='text-gray-400'>
          Tifee
        </Link>
      </div>
    </footer>
  )
}

export default Footer
