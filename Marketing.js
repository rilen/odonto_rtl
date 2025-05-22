import React, { useState } from 'react';
import axios from 'axios';

const Marketing = () => {
  const [message, setMessage] = useState('');
  const [image, setImage] = useState(null);

  const sendWhatsAppReminder = async () => {
    await axios.post('/api/marketing/whatsapp', { message });
    alert('Lembrete enviado via WhatsApp!');
  };

  const postInstagram = async () => {
    const formData = new FormData();
    formData.append('image', image);
    formData.append('caption', message);
    await axios.post('/api/marketing/instagram', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    alert('Postagem publicada no Instagram!');
  };

  return (
    <div className="p-4">
      <h2 className="text-xl mb-4">Marketing</h2>
      <div className="mb-4">
        <h3 className="text-lg">Lembrete WhatsApp</h3>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Mensagem de lembrete"
          className="border p-2 w-full"
        />
        <button onClick={sendWhatsAppReminder} className="bg-green-500 text-white p-2 mt-2">Enviar WhatsApp</button>
      </div>
      <div>
        <h3 className="text-lg">Postagem Instagram</h3>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          className="mb-2"
        />
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Legenda da postagem"
          className="border p-2 w-full"
        />
        <button onClick={postInstagram} className="bg-blue-500 text-white p-2 mt-2">Postar no Instagram</button>
      </div>
    </div>
  );
};

export default Marketing;
