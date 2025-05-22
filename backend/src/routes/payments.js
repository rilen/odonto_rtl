const express = require('express');
const router = express.Router();
const pool = require('../database');

// Buscar todos os pagamentos
router.get('/', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM payments');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar pagamentos' });
  }
});

// Atualizar um pagamento pelo ID
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status, method, amount } = req.body;

    await pool.query(
      'UPDATE payments SET status = $1, method = $2, amount = $3 WHERE id = $4',
      [status, method, amount, id]
    );

    res.json({ message: 'Pagamento atualizado com sucesso!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao atualizar pagamento' });
  }
});

module.exports = router;

import React, { useEffect, useState } from 'react';

const Chat = ({ userId, userRole }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    fetch(`/api/chat/${userId}`).then(res => res.json()).then(data => setMessages(data));
    const interval = setInterval(() => {
      fetch(`/api/chat/${userId}`).then(res => res.json()).then(data => {
        if (data.length > messages.length) {
          new Audio('/notification.mp3').play();
          alert('Nova mensagem!');
        }
        setMessages(data);
      });
    }, 5000);
    return () => clearInterval(interval);
  }, [messages.length]);

  const sendMessage = () => {
    fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sender_id: userId, role: userRole, content: newMessage })
    }).then(() => {
      setMessages([...messages, { sender_id: userId, content: newMessage }]);
      setNewMessage('');
    });
  };

  return (
    <div className="p-4">
      <h2 className="text-xl mb-4">Chat</h2>
      <div className="h-64 overflow-y-auto border p-2">
        {messages.map((msg, i) => (
          <div key={i} className={msg.sender_id === userId ? 'text-right' : ''}>
            <p>{msg.content}</p>
          </div>
        ))}
      </div>
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        className="border p-1 w-full mt-2"
      />
      <button onClick={sendMessage} className="bg-blue-500 text-white p-2 mt-2">Enviar</button>
    </div>
  );
};

export default Chat;
