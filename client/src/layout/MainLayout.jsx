import * as React from 'react'
import Footer from './Footer'
import Header from './Header'

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <main className='min-h-[calc(100vh_-_104px)]'>{children}</main>
      <Footer />
    </>
  )
}

export default Layout
