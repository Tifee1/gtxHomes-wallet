import { Link } from 'react-router-dom'

const Home = () => {
  const savings = ['hello', 'food', 'drinks']
  if (savings.length === 0) {
    return (
      <section className='w-[90%] max-w-4xl mx-auto'>
        <h2 className='text-center pt-6'>your have no savings</h2>
        <div className='flex items-center justify-center mt-6'>
          <Link
            to='/savings'
            className='trans uppercase px-2.5 py-1.5 text-lg bg-pry text-white rounded-lg hover:bg-pry/70'
          >
            create new savings
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className='w-[90%] max-w-4xl mx-auto grid gap-4 pt-12'>
      <h2 className='text-center'>Your savings</h2>
      <div className='flex items-center justify-center mt-6'>
        <Link
          to='/savings'
          className='trans uppercase px-2.5 py-1.5 text-lg bg-pry text-white rounded-lg hover:bg-pry/70'
        >
          create new savings
        </Link>
      </div>
      <article className='grid gap-2 w-full max-w-xl mx-auto'>
        {savings.map((item, index) => {
          return (
            <div
              className='bg-gray-500 block text-white py-1.5 px-2.5 capitalize rounded-md'
              key={index}
            >
              <Link to={`/savings/${index + 1}`}>{item}</Link>
            </div>
          )
        })}
      </article>
    </section>
  )
}

export default Home
