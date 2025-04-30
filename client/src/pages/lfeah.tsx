
import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
 import '../css/login.css'

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [cookies, setCookie] = useCookies(['token']);

  const handleLogin = async () => {
    const res = await fetch('http://localhost:3000/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    const data = await res.json();

    if (data.accessToken) {
      setCookie('token', data.accessToken, {
        path: '/',
        maxAge: 3600, // שעה
        secure: true,
        sameSite: 'strict',
      });
    }
  };

  return (
    <div>
      <h2>התחברות</h2>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="שם משתמש"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="סיסמה"
      />
      <button onClick={handleLogin}>התחבר</button>
    </div>
  );
};

export default Login;