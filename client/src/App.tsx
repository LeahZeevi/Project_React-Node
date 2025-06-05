import { RouterProvider } from 'react-router'
import './App.css'
import { useCookies } from 'react-cookie'
import { Provider } from 'react-redux'
import store from './redux/store'
import router from './routes/AppRoute'
import './css/myWardrobe.css'
import LandingPage from './pages/LandingPage'



function App() {
  const [cookies] = useCookies(['token']);

  return (
    <>
      <Provider store={store}>
        {cookies.token ?
          <RouterProvider router={router}>
          </RouterProvider>
          : <LandingPage/>}
      </Provider>

    </>
  )
}

export default App

