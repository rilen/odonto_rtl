import React, { useState } from 'react';
import { jsPDF } from 'jspdf';

const Odontogram = ({ patientId }) => {
  const [teeth, setTeeth] = useState(Array(32).fill({ condition: '', material: '', notes: '' }));
  const [selectedTooth, setSelectedTooth] = useState(null);

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
      <svg width="400" height="200" viewBox="0 0 400 200" className="mb-4">
        {Array(32).fill().map((_, i) => (
          <rect
            key={i}
            x={(i % 16) * 25}
            y={i < 16 ? 10 : 110}
            width="20"
            height="40"
            fill={selectedTooth === i ? 'yellow' : 'white'}
            stroke="black"
            onClick={() => setSelectedTooth(i)}
          />
        ))}
      </svg>
      {selectedTooth !== null && (
        <div className="border p-4">
          <h3>Dente {selectedTooth + 1}</h3>
          <select
            onChange={(e) => updateTooth(selectedTooth, 'condition', e.target.value)}
            value={teeth[selectedTooth].condition}
            className="border p-1 w-full"
          >
            <option value="">Selecione</option>
            <option value="caries">Cárie</option>
            <option value="restoration">Restauração</option>
            <option value="extraction">Extração</option>
            <option value="implant">Implante</option>
          </select>
          <input
            type="text"
            placeholder="Material"
            value={teeth[selectedTooth].material}
            onChange={(e) => updateTooth(selectedTooth, 'material', e.target.value)}
            className="border p-1 mt-2 w-full"
          />
          <textarea
            placeholder="Notas"
            value={teeth[selectedTooth].notes}
            onChange={(e) => updateTooth(selectedTooth, 'notes', e.target.value)}
            className="border p-1 mt-2 w-full"
          />
        </div>
      )}
      <button onClick={exportPDF} className="bg-blue-500 text-white p-2 mt-4">Exportar PDF</button>
    </div>
  );
};

export default Odontogram;
