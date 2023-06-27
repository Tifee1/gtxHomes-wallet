import * as React from 'react'
import { useContext, useState, useEffect } from 'react'
import axios from 'axios'

const AppContext = React.createContext(null)

export const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [isModal, setIsModal] = useState(false)
  const [index, setIndex] = useState(0)
  const [votingQuestions, setVotingQuestions] = useState([])

  const fetchData = async () => {
    setLoading(true)
    setError(false)
    try {
      const resp = await axios('/src/data/candidate.json')
      const data = await resp.data
      setVotingQuestions(data.results)
      setLoading(false)
    } catch (error) {
      setError(true)
      setLoading(false)
    }
  }

  const nextQuestion = () => {
    setIndex((old) => {
      let newNum = old + 1
      if (newNum > votingQuestions.length - 1) {
        openModal()
        newNum = votingQuestions.length - 1
      }
      return newNum
    })
  }

  // const correctAnswer = (value) => {
  //   if (value) {
  //     setCorrect((old) => old + 1)
  //   }
  //   nextQuestion()
  // }
  const openModal = () => {
    setIsModal(true)
  }
  const closeModal = () => {
    setIsModal(false)
    // setCorrect(0)
    // setWaiting(true)
    setIndex(0)
    // setError(false)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <AppContext.Provider
      value={{
        loading,
        error,
        votingQuestions,
        index,
        isModal,
        nextQuestion,
        openModal,
        closeModal,
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
