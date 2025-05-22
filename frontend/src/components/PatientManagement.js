import React, { useRef, useState } from 'react';

const PatientManagement = () => {
  const [patients, setPatients] = useState([]);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    fetch('/api/patients').then(res => res.json()).then(data => setPatients(data));
    navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
      videoRef.current.srcObject = stream;
    });
  }, []);

  const capturePhoto = (patientId) => {
    const context = canvasRef.current.getContext('2d');
    context.drawImage(videoRef.current, 0, 0, 320, 240);
    const photo = canvasRef.current.toDataURL('image/png');
    fetch(`/api/patients/${patientId}/photo`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ photo })
    });
  };

  return (
    <div className="p-4">
      <h2 className="text-xl mb-4">Gestão de Pacientes</h2>
      <video ref={videoRef} autoPlay className="w-80 h-60"></video>
      <canvas ref={canvasRef} width="320" height="240" className="hidden"></canvas>
      <table className="w-full border mt-4">
        <thead>
          <tr><th>Nome</th><th>CPF</th><th>Foto</th></tr>
        </thead>
        <tbody>
          {patients.map(p => (
            <tr key={p.id}>
              <td>{p.name}</td>
              <td>{p.cpf}</td>
              <td><button onClick={() => capturePhoto(p.id)} className="bg-blue-500 text-white p-1">Capturar Foto</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PatientManagement;
