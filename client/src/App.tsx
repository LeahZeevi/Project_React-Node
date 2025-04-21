
import { RouterProvider } from 'react-router'
import './App.css'
import router from './routes/AppRoute'
// import A1 from './pages/A1'


function App() {
  return (
    <>
   <RouterProvider router={router}/>
   {/* <A1 city="Jerusalem" /> */}

    </>
  )
}

export default App
