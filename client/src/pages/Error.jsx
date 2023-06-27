import { Link } from 'react-router-dom'

const Error = () => {
  return (
    <section className='w-[90%] max-w-4xl mx-auto grid gap-6 justify-center items-center text-center mt-40'>
      <h2 className='text-8xl font-bold'>404</h2>
      <h3 className='text-4xl'>Page not found</h3>
      <h3 className='text-gray-500'>
        The page you are looking for dosen't exist
      </h3>
      <div>
        <Link
          to='/'
          className='trans bg-pry px-2.5 py-2 text-white tracking-wider hover:bg-pry/80 rounded-lg capitalize'
        >
          Back to home
        </Link>
      </div>
    </section>
  )
}

export default Error
