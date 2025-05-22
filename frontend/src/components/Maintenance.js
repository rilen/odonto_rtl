import React, { useEffect, useState } from 'react';

const Maintenance = () => {
  const [maintenances, setMaintenances] = useState([]);
  const [newMaintenance, setNewMaintenance] = useState({ equipment: '', supplier: '', date: '' });

  useEffect(() => {
    fetch('/api/maintenance').then(res => res.json()).then(data => setMaintenances(data));
  }, []);

  const scheduleMaintenance = async () => {
    await fetch('/api/maintenance', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newMaintenance)
    });
    setMaintenances([...maintenances, newMaintenance]);
    setNewMaintenance({ equipment: '', supplier: '', date: '' });
  };

  return (
    <div className="p-4">
      <h2 className="text-xl mb-4">Gestão de Manutenção</h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Equipamento"
          value={newMaintenance.equipment}
          onChange={(e) => setNewMaintenance({ ...newMaintenance, equipment: e.target.value })}
          className="border p-2 mr-2"
        />
        <input
          type="text"
          placeholder="Fornecedor"
          value={newMaintenance.supplier}
          onChange={(e) => setNewMaintenance({ ...newMaintenance, supplier: e.target.value })}
          className="border p-2 mr-2"
        />
        <input
          type="date"
          value={newMaintenance.date}
          onChange={(e) => setNewMaintenance({ ...newMaintenance, date: e.target.value })}
          className="border p-2 mr-2"
        />
        <button onClick={scheduleMaintenance} className="bg-blue-500 text-white p-2">Agendar</button>
      </div>
      <table className="w-full border">
        <thead>
          <tr><th>Equipamento</th><th>Fornecedor</th><th>Data</th></tr>
        </thead>
        <tbody>
          {maintenances.map((m, i) => (
            <tr key={i}><td>{m.equipment}</td><td>{m.supplier}</td><td>{m.date}</td></tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Maintenance;
