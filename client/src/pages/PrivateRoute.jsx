import { Navigate } from 'react-router-dom'
import useGlobalContext from '../context/globalContext'

const PrivateRoute = ({ children }) => {
  const { token } = useGlobalContext()

  if (token === '') {
    return <Navigate to='/login' />
  }
  return children
}
export default PrivateRoute
