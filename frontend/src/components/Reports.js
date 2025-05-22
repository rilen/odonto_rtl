// Salvar em: frontend/src/components/Reports.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { jsPDF } from 'jspdf';

const Reports = ({ userRole }) => {
  const [patients, setPatients] = useState([]);
  const [finances, setFinances] = useState([]);

  useEffect(() => {
    if (['secretary', 'dentist'].includes(userRole)) {
      axios.get('/api/patients').then(res => setPatients(res.data));
    }
    if (['finance', 'secretary'].includes(userRole)) {
      axios.get('/api/payments').then(res => setFinances(res.data));
    }
  }, [userRole]);

  const generatePatientReport = () => {
    const doc = new jsPDF();
    doc.text('Relatório de Pacientes', 10, 10);
    patients.forEach((p, i) => {
      doc.text(`Nome: ${p.name}, CPF: ${p.cpf}, Status: ${p.status || 'Ativo'}`, 10, 20 + i * 10);
    });
    doc.save('relatorio_pacientes.pdf');
  };

  const generateFinanceReport = () => {
    const doc = new jsPDF();
    doc.text('Relatório Financeiro', 10, 10);
    finances.forEach((f, i) => {
      doc.text(`Paciente: ${f.patient_id}, Valor: R$${f.amount}, Status: ${f.status}`, 10, 20 + i * 10);
    });
    doc.save('relatorio_financeiro.pdf');
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Relatórios</h2>
      {['secretary', 'dentist'].includes(userRole) && (
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Relatório de Pacientes</h3>
          <button onClick={generatePatientReport} className="bg-blue-500 text-white p-2 rounded mt-2">Gerar PDF</button>
          <table className="w-full border mt-2">
            <thead>
              <tr><th className="border p-2">Nome</th><th className="border p-2">CPF</th><th className="border p-2">Status</th></tr>
            </thead>
            <tbody>
              {patients.map(p => (
                <tr key={p.id}><td className="border p-2">{p.name}</td><td className="border p-2">{p.cpf}</td><td className="border p-2">{p.status || 'Ativo'}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {['finance', 'secretary'].includes(userRole) && (
        <div>
          <h3 className="text-lg font-semibold">Relatório Financeiro</h3>
          <button onClick={generateFinanceReport} className="bg-blue-500 text-white p-2 rounded mt-2">Gerar PDF</button>
          <table className="w-full border mt-2">
            <thead>
              <tr><th className="border p-2">Paciente</th><th className="border p-2">Valor</th><th className="border p-2">Status</th></tr>
            </thead>
            <tbody>
              {finances.map(f => (
                <tr key={f.id} className={f.status === 'paid' ? 'bg-green-100' : f.status === 'pending' ? 'bg-yellow-100' : 'bg-red-100'}>
                  <td className="border p-2">{f.patient_id}</td><td className="border p-2">R${f.amount}</td><td className="border p-2">{f.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Reports;
