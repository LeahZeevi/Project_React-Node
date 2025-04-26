
import { RouterProvider } from 'react-router'
import './App.css'
import router from './routes/AppRoute'
import { CookiesProvider } from 'react-cookie';


function App() {
  return (
    <>
   <CookiesProvider>
   <RouterProvider router={router}/>
  </CookiesProvider>
    </>
  )
}

export default App






// import React from 'react';
// import { useCookies } from 'react-cookie';

// import NameForm from './NameForm';

// interface CookieValues {
//   name?: string;
// }

// function App(): React.ReactElement {
//   const [cookies, setCookie] = useCookies<'name', CookieValues>(['name']);

//   function onChange(newName: string): void {
//     setCookie('name', newName);
//   }

//   return (
//     <div>
//       <NameForm name={cookies.name || ''} onChange={onChange} />
//       {cookies.name && <h1>Hello {cookies.name}!</h1>}
//     </div>
//   );
// }

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
