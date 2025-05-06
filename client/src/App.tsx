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
<<<<<<< HEAD
      <Provider store={store}>
        {cookies.token?
        <RouterProvider router={router}>
          </RouterProvider>
          :<Login/>}
      </Provider>
=======
      <CookiesProvider>
        <Provider store={store}>
          <Login />
        </Provider>
      </CookiesProvider>
>>>>>>> 95375ad26a4c5d60aac0c92024e8bd78b9e67144
    </>
  )
}

export default App






// import React from 'react';
// import { useCookies } from 'react-cookie';

// import NameForm from './pages/NameForm';

// interface CookieValues {
//   name?: string;
// }

// function App(): React.ReactElement {
//   const [cookies, setCookie] = useCookies(['name']);

//   const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//       setCookie('name', event.target.value, { path: '/' });
//   };

//   return (
//       <NameForm name={cookies.name || ''} onChange={onChange} />
//   );
// };


// export default App;




//רישוםםםםםםםםםםם

// import { useCookies } from 'react-cookie';

// const handleLogin = async () => {
//   const res = await fetch('http://localhost:3000/users/login', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ username, password }),
//   });
//   const data = await res.json();

//   setCookie('token', data.accessToken, { path: '/' });
// };
