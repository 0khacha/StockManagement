// components/Login.js

import React, { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Add your login logic here
  };

  return (
      <form onSubmit={handleLogin}>
          <h2>Login</h2>

          <input className={'login-input'}
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
              />
          <input className={'login-input'}
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
              />

              <button type="submit" className={'submit'}>Login</button>

      </form>

);
};

export default Login;
