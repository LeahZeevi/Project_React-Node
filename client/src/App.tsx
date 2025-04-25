
import { RouterProvider } from 'react-router'
import './App.css'
import router from './routes/AppRoute'
import Login from './pages/Login'
// import A1 from './pages/A1'


function App() {
  return (
    <>
      {/* <RouterProvider router={router}/> */}
      <Login></Login>
    </>
  )
}

export default App
