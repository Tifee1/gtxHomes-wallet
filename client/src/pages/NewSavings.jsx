import { useRef } from 'react'

const NewSavings = () => {
  const savingsRef = useRef(null)

  const onSubmit = (e) => {
    e.preventDefault()
    const savings = savingsRef.current.value
    if (!savings) return
    console.log(savings)
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
