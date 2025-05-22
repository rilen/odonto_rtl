// Salvar em: frontend/src/components/Reports.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { jsPDF } from 'jspdf';

const Reports = ({ userRole }) => {
  const [patients, setPatients] = useState([]);
  const [finances, setFinances] = useState([]);
  const [surveys, setSurveys] = useState([]);
  const [maintenances, setMaintenances] = useState([]);

  useEffect(() => {
    if (['secretary', 'dentist'].includes(userRole)) {
      axios.get('/api/patients').then(res => setPatients(res.data));
      axios.get('/api/surveys').then(res => setSurveys(res.data));
    }
    if (['finance', 'secretary'].includes(userRole)) {
      axios.get('/api/payments').then(res => setFinances(res.data));
    }
    if (['secretary', 'dentist'].includes(userRole)) {
      axios.get('/api/maintenance').then(res => setMaintenances(res.data));
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

  const generateSurveyReport = () => {
    const doc = new jsPDF();
    doc.text('Relatório de Satisfação', 10, 10);
    surveys.forEach((s, i) => {
      doc.text(`Paciente: ${s.patient_id}, Atendimento: ${s.attendance}, Conforto: ${s.comfort}`, 10, 20 + i * 10);
    });
    doc.save('relatorio_satisfacao.pdf');
  };

  const generateMaintenanceReport = () => {
    const doc = new jsPDF();
    doc.text('Relatório de Manutenção', 10, 10);
    maintenances.forEach((m, i) => {
      doc.text(`Equipamento: ${m.equipment}, Fornecedor: ${m.supplier}, Data: ${m.date}`, 10, 20 + i * 10);
    });
    doc.save('relatorio_manutencao.pdf');
  };

  return (
    <div className="container">
      <h2 className="text-2xl font-bold mb-6">Relatórios</h2>
      {['secretary', 'dentist'].includes(userRole) && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Relatório de Pacientes</h3>
          <button onClick={generatePatientReport} className="button mb-4">Gerar PDF</button>
          <table className="table">
            <thead>
              <tr><th>Nome</th><th>CPF</th><th>Status</th></tr>
            </thead>
            <tbody>
              {patients.map(p => (
                <tr key={p.id}><td>{p.name}</td><td>{p.cpf}</td><td>{p.status || 'Ativo'}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {['finance', 'secretary'].includes(userRole) && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Relatório Financeiro</h3>
          <button onClick={generateFinanceReport} className="button mb-4">Gerar PDF</button>
          <table className="table">
            <thead>
              <tr><th>Paciente</th><th>Valor</th><th>Status</th></tr>
            </thead>
            <tbody>
              {finances.map(f => (
                <tr key={f.id} className={f.status === 'paid' ? 'bg-green-100' : f.status === 'pending' ? 'bg-yellow-100' : 'bg-red-100'}>
                  <td>{f.patient_id}</td><td>R${f.amount}</td><td>{f.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {['secretary', 'dentist'].includes(userRole) && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Relatório de Satisfação</h3>
          <button onClick={generateSurveyReport} className="button mb-4">Gerar PDF</button>
          <table className="table">
            <thead>
              <tr><th>Paciente</th><th>Atendimento</th><th>Conforto</th><th>Dor</th><th>Confiança</th></tr>
            </thead>
            <tbody>
              {surveys.map(s => (
                <tr key={s.id}><td>{s.patient_id}</td><td>{s.attendance}</td><td>{s.comfort}</td><td>{s.pain}</td><td>{s.confidence}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {['secretary', 'dentist'].includes(userRole) && (
        <div>
          <h3 className="text-lg font-semibold mb-2">Relatório de Manutenção</h3>
          <button onClick={generateMaintenanceReport} className="button mb-4">Gerar PDF</button>
          <table className="table">
            <thead>
              <tr><th>Equipamento</th><th>Fornecedor</th><th>Data</th></tr>
            </thead>
            <tbody>
              {maintenances.map(m => (
                <tr key={m.id}><td>{m.equipment}</td><td>{m.supplier}</td><td>{m.date}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Reports;
