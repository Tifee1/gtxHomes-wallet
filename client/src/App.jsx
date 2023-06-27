import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './layout/MainLayout'
import Error from './pages/Error'
import Home from './pages/Home'
import Login from './pages/Login'
import NewSavings from './pages/NewSavings'
import PrivateRoute from './pages/PrivateRoute'
import Register from './pages/Register'

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route
            path='/'
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path='/savings'
            element={
              <PrivateRoute>
                <NewSavings />
              </PrivateRoute>
            }
          />
          <Route path='*' element={<Error />} />
        </Routes>
      </Layout>
    </Router>
  )
}
export default App
