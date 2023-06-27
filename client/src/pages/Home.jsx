import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import useGlobalContext from '../context/globalContext'
import { toast } from 'react-toastify'

const Home = () => {
  const { setToken, token } = useGlobalContext()
  const [savings, setSavings] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const fetchSavings = async () => {
    setError(false)
    setLoading(true)
    try {
      const resp = await axios('/api/v1/savings', {
        headers: { Authorization: `Bearer ${token.token}` },
      })
      const data = await resp.data
      setSavings(data)
      setLoading(false)
    } catch (error) {
      setError(true)
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSavings()
  }, [])

  const logOut = () => {
    setToken('')
    toast.success('Logging out')
  }

  if (loading) {
    return <div className='loading'></div>
  }
  if (error) {
    return (
      <section className='w-[90%] max-w-4xl mx-auto'>
        <h2 className='text-center pt-6'>your have no savings</h2>
      </section>
    )
  }

  if (savings.length === 0) {
    return (
      <section className='w-[90%] max-w-4xl mx-auto'>
        <h2 className='text-center pt-6'>
          Welcome {token.name}, <button onClick={logOut}>Logout</button>
        </h2>
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
      <h2 className='text-center pt-6'>
        Welcome {token.name}, <button onClick={logOut}>Logout</button>
      </h2>
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
              {item}
            </div>
          )
        })}
      </article>
    </section>
  )
}

export default Home
