import React, { useState } from 'react';
import { jsPDF } from 'jspdf';

const Odontogram = ({ patientId }) => {
  const [teeth, setTeeth] = useState(Array(32).fill({ condition: '', material: '', notes: '' }));

  const updateTooth = (index, field, value) => {
    const newTeeth = [...teeth];
    newTeeth[index] = { ...newTeeth[index], [field]: value };
    setTeeth(newTeeth);
    fetch('/api/odontogram', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ patientId, tooth_number: index + 1, ...newTeeth[index], date: new Date().toISOString() })
    });
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text('Odontograma', 10, 10);
    teeth.forEach((tooth, i) => {
      doc.text(`Dente ${i + 1}: ${tooth.condition} - ${tooth.material} - ${tooth.notes}`, 10, 20 + i * 10);
    });
    doc.save(`odontogram_${patientId}.pdf`);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl mb-4">Odontograma</h2>
      <div className="grid grid-cols-8 gap-2">
        {teeth.map((tooth, i) => (
          <div key={i} className="p-2 border">
            <p>Dente {i + 1}</p>
            <select onChange={(e) => updateTooth(i, 'condition', e.target.value)} value={tooth.condition}>
              <option value="">Selecione</option>
              <option value="caries">Cárie</option>
              <option value="restoration">Restauração</option>
              <option value="extraction">Extração</option>
              <option value="implant">Implante</option>
            </select>
            <input
              type="text"
              placeholder="Material"
              value={tooth.material}
              onChange={(e) => updateTooth(i, 'material', e.target.value)}
              className="border p-1 mt-2 w-full"
            />
            <textarea
              placeholder="Notas"
              value={tooth.notes}
              onChange={(e) => updateTooth(i, 'notes', e.target.value)}
              className="border p-1 mt-2 w-full"
            />
          </div>
        ))}
      </div>
      <button onClick={exportPDF} className="mt-4 bg-blue-500 text-white p-2">Exportar PDF</button>
    </div>
  );
};

export default Odontogram;
