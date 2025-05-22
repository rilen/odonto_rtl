// Salvar em: frontend/src/components/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import TwoFactorAuth from './TwoFactorAuth';

const Login = () => {
  const [cpf, setCpf] = useState('');
  const [password, setPassword] = useState('');
  const [userId, setUserId] = useState(null);
  const [show2FA, setShow2FA] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/auth', { cpf, password });
      if (res.data.twoFactorRequired) {
        await axios.post('/api/twofactor/generate', { userId: res.data.userId });
        setUserId(res.data.userId);
        setShow2FA(true);
      } else {
        localStorage.setItem('token', res.data.token);
        window.location.href = '/';
      }
    } catch (err) {
      alert('Erro de login: ' + err.response.data.error);
    }
  };

  return (
    <div className="container max-w-md">
      {show2FA ? (
        <TwoFactorAuth userId={userId} onSuccess={() => window.location.href = '/'} />
      ) : (
        <>
          <h2 className="text-2xl font-bold mb-4">Login</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              className="input"
              placeholder="CPF"
              required
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input"
              placeholder="Senha"
              required
            />
            <button type="submit" className="button w-full">Entrar</button>
          </form>
        </>
      )}
    </div>
  );
};

export default Login;
