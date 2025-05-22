// Salvar em: frontend/src/components/TwoFactorAuth.js
import React, { useState } from 'react';
import axios from 'axios';

const TwoFactorAuth = ({ userId, onSuccess }) => {
  const [code, setCode] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post('/api/twofactor/verify', { userId, code });
    if (res.data.success) {
      onSuccess();
    } else {
      alert('Código inválido!');
    }
  };

  return (
    <div className="container max-w-md">
      <h2 className="text-2xl font-bold mb-4">Autenticação de Dois Fatores</h2>
      <p className="mb-4">Digite o código enviado para seu WhatsApp</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="input mb-4"
          placeholder="Código 2FA"
          required
        />
        <button type="submit" className="button w-full">Verificar</button>
      </form>
    </div>
  );
};

export default TwoFactorAuth;
