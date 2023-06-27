import axios from 'axios'
import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import useGlobalContext from '../context/globalContext'

const NewSavings = () => {
  const { token } = useGlobalContext()
  const savingsRef = useRef(null)
  const navigate = useNavigate()

  const onSubmit = async (e) => {
    e.preventDefault()
    const savings = savingsRef.current.value
    if (!savings) {
      toast.error('please enter savings name')
      return
    }
    try {
      await axios.post(
        '/api/v1/savings',
        { name: savings },
        {
          headers: { Authorization: `Bearer ${token.token}` },
        }
      )

      await toast.success('Savings Created')
      await navigate('/')
      savingsRef.current.value = ''
    } catch (error) {
      toast.error(error.response.data.msg)
    }
  }

  return (
    <section className='w-[90%] max-w-4xl mx-auto grid gap-4 pt-12'>
      <h2 className='text-center'>create a new savings</h2>
      <form className='grid gap-4 w-full max-w-md mx-auto' onSubmit={onSubmit}>
        <input
          type='text'
          className='bg-transparent border border-black rounded-lg w-full py-1.5 px-1.5'
          ref={savingsRef}
        />
        <div className='text-center'>
          <button
            type='submit'
            className='trans bg-pry text-white hover:bg-pry/70 px-2.5 py-2 tracking-wide rounded-lg uppercase'
          >
            create
          </button>
        </div>
      </form>
    </section>
  )
}
export default NewSavings
