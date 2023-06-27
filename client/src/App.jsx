import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './layout/MainLayout'
import Error from './pages/Error'
import Home from './pages/Home'
import Login from './pages/Login'
import NewSavings from './pages/NewSavings'

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<Home />} />
          <Route path='/savings' element={<NewSavings />} />
          <Route path='*' element={<Error />} />
        </Routes>
      </Layout>
    </Router>
  )
}
export default App
