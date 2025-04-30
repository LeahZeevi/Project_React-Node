import { RouterProvider } from 'react-router'
import './App.css'
import router from './routes/AppRoute'
import { CookiesProvider } from 'react-cookie'
import Login from './pages/Login'
import { Provider } from 'react-redux'
import store from './redux/store'




function App(){

  return (
    <>
    <CookiesProvider>
      <Provider store={store}>
     <Login/>
     </Provider>
    </CookiesProvider>
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
