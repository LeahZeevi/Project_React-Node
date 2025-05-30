import { RouterProvider } from 'react-router'
import './App.css'
import { useCookies } from 'react-cookie'
import { Provider } from 'react-redux'
import store from './redux/store'
import router from './routes/AppRoute'
import Register from './pages/Register'
import './css/try.css'
import Register2 from './pages/Register2'



function App() {
  const [cookies] = useCookies(['token']);

  return (
    <>
      <Provider store={store}>
        {cookies.token ?
          <RouterProvider router={router}>
          </RouterProvider>
          : <Register2/>}
      </Provider>

    </>
  )
}

export default App

