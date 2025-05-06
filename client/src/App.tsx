import { RouterProvider } from 'react-router'
import './App.css'
import { CookiesProvider, useCookies } from 'react-cookie'
import Login from './pages/Login'
import { Provider } from 'react-redux'
import store from './redux/store'
import router from './routes/AppRoute'


function App() {
  const [cookies] = useCookies(['token'])
  return (
    <>
      <Provider store={store}>
        {cookies.token?
        <RouterProvider router={router}>
          </RouterProvider>
          :<Login/>}
      </Provider>

    </>
  )
}

export default App

