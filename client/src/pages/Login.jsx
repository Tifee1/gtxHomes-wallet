import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useRef } from 'react'
import axios from 'axios'
import useGlobalContext from '../context/globalContext'
import { toast } from 'react-toastify'

const Login = () => {
  const { setToken, token } = useGlobalContext()

  const navigate = useNavigate()
  const emailRef = useRef(null)
  const passRef = useRef(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const email = emailRef.current.value
    const pass = passRef.current.value
    if (!email || !pass) {
      toast.error('Please fill all values')
      return
    }
    try {
      const resp = await axios.post('/api/v1/auth/login', {
        email,
        password: pass,
      })
      const data = await resp.data
      setToken(data.user)
      toast.success('Login successful')
      emailRef.current.value = ''
      passRef.current.value = ''
    } catch (error) {
      toast.error(error.response.data.msg)
    }
  }
  useEffect(() => {
    if (token !== '') {
      setTimeout(() => {
        navigate('/')
      }, 2000)
    }
    // eslint-disable-next-line
  }, [token])

  return (
    <section className='my-20 w-[90%] max-w-2xl mx-auto'>
      <div className='text-center'>
        <h2 className='font-bold'>please enter your details</h2>
      </div>
      <form
        className='mt-12 w-[90%] max-w-sm mx-auto grid gap-4'
        onSubmit={handleSubmit}
      >
        <div className='relative'>
          <input
            type='text'
            id='email'
            className='block px-2.5 pb-2.5 pt-4 w-full text-sm text-black bg-transparent rounded-lg border border-pry appearance-none focus:outline-none focus:ring-0 focus:border-pry/75 peer'
            placeholder=' '
            ref={emailRef}
          />
          <label
            htmlFor=''
            className='absolute text-sm text-black duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-[#f4f3f3]  px-2 peer-focus:px-2 peer-focus:text-pry/75 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1'
          >
            Email
          </label>
        </div>
        <div className='relative'>
          <input
            type='password'
            id='password'
            className='block px-2.5 pb-2.5 pt-4 w-full text-sm text-black bg-transparent rounded-lg border border-pry appearance-none focus:outline-none focus:ring-0 focus:border-pry/75 peer'
            placeholder=' '
            ref={passRef}
          />
          <label
            htmlFor='password'
            className='absolute text-sm text-black duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-[#f4f3f3]  px-2 peer-focus:px-2 peer-focus:text-pry/75 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1'
          >
            Password
          </label>
        </div>

        <div className='flex items-center justify-center'>
          <button
            type='submit'
            className='trans bg-pry text-white w-full py-2.5 rounded-full hover:bg-pry/70'
          >
            Login
          </button>
        </div>
        <h3 className='text-center'>
          Dont have an account,{' '}
          <Link to='/register' className='text-blue-500'>
            Register
          </Link>
        </h3>
      </form>
    </section>
  )
}

export default Login
