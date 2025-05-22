// Salvar em: frontend/src/components/Chat.js
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const Chat = ({ userId, userRole }) => {
  const { t } = useTranslation();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [ws, setWs] = useState(null);

  useEffect(() => {
    const websocket = new WebSocket('ws://localhost:3000');
    setWs(websocket);

    websocket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setMessages((prev) => [...prev, message]);
    };

    return () => websocket.close();
  }, []);

  const sendMessage = () => {
    if (!newMessage.trim() || !ws) return;
    const message = { user_id: userId, role: userRole, content: newMessage, timestamp: new Date().toISOString() };
    ws.send(JSON.stringify(message));
    setNewMessage('');
  };

  return (
    <div className="container" role="region" aria-label={t('chat.title')}>
      <h2 className="text-2xl font-bold mb-4">{t('chat.title')}</h2>
      <div className="border rounded-lg p-4 mb-4 h-96 overflow-y-auto">
        {messages.map((msg, i) => (
          <div key={i} className={`mb-2 ${msg.user_id === userId ? 'text-right' : 'text-left'}`}>
            <p className="inline-block bg-indigo-100 p-2 rounded dark:bg-gray-700">{msg.content}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{new Date(msg.timestamp).toLocaleString()}</p>
          </div>
        ))}
      </div>
      <div className="flex">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="input flex-1 mr-2"
          placeholder={t('chat.placeholder')}
          aria-label={t('chat.input')}
        />
        <button onClick={sendMessage} className="button">{t('chat.send')}</button>
      </div>
    </div>
  );
};

export default Chat;
