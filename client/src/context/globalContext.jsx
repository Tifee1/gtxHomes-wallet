import * as React from 'react'
import { useContext, useState, useEffect } from 'react'
import axios from 'axios'

const AppContext = React.createContext(null)

export const AppProvider = ({ children }) => {
  const [token, setToken] = useState('')
  const [logged, setLogged] = useState(false)
  const [name, setName] = useState('')

  return (
    <AppContext.Provider
      value={{
        setToken,
        token,
        logged,
        setLogged,
        name,
        setName,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

const useGlobalContext = () => {
  return useContext(AppContext)
}

export default useGlobalContext
