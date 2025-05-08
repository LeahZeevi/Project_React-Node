import { RouterProvider } from 'react-router'
import './App.css'
import { Cookies, CookiesProvider, useCookies } from 'react-cookie'
import Login from './pages/Login'
import { Provider } from 'react-redux'
import store from './redux/store'
import router from './routes/AppRoute'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { setCurrentUser } from './redux/slices/userSlice'
import { Users } from './interfaces/Users'
import { jwtDecode } from 'jwt-decode'


function App() {

  const [cookies] = useCookies(['token'], { doNotParse: true });
  const dispatch = useDispatch();

  useEffect(() => {
    const userToken = cookies.token;
    if (userToken) {
      // אם הטוקן קיים, שלח אותו ל-Redux
      const currentUser: Users = jwtDecode<Users>(userToken);
      dispatch(setCurrentUser(currentUser));
      console.log('Token from cookie:', currentUser); // אופציונלי: לוג לבדיקה
    } else {
      console.log('No token found in cookies.'); // אופציונלי: לוג אם אין טוקן
      // כאן תוכל לבצע פעולות אחרות אם אין טוקן (למשל, ניתוב לדף התחברות)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cookies.token, dispatch])
 
  return (
        <Provider store={store}>
          {cookies.token ?
            <RouterProvider router={router}>
            </RouterProvider>
            : <Login />}
        </Provider>
  )
}

export default App

