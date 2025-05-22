// Salvar em: frontend/src/components/Reports.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { jsPDF } from 'jspdf';
import { useTranslation } from 'react-i18next';

const Reports = ({ userRole }) => {
  const { t } = useTranslation();
  const [patients, setPatients] = useState([]);
  const [finances, setFinances] = useState([]);
  const [surveys, setSurveys] = useState([]);
  const [maintenances, setMaintenances] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);

  useEffect(() => {
    if (['secretary', 'dentist'].includes(userRole)) {
      axios.get(`/api/reports/patients?page=${page}&pageSize=${pageSize}`).then(res => setPatients(res.data));
      axios.get(`/api/reports/surveys?page=${page}&pageSize=${pageSize}`).then(res => setSurveys(res.data));
      axios.get(`/api/reports/maintenance?page=${page}&pageSize=${pageSize}`).then(res => setMaintenances(res.data));
    }
    if (['finance', 'secretary'].includes(userRole)) {
      axios.get(`/api/reports/payments?page=${page}&pageSize=${pageSize}`).then(res => setFinances(res.data));
    }
  }, [userRole, page]);

  const generatePatientReport = () => {
    const doc = new jsPDF();
    doc.text(t('reports.patient_report'), 10, 10);
    patients.forEach((p, i) => {
      doc.text(`Nome: ${p.name}, CPF: ${p.cpf}, Status: ${p.status || t('reports.active')}`, 10, 20 + i * 10);
    });
    doc.save('relatorio_pacientes.pdf');
  };

  const generateFinanceReport = () => {
    const doc = new jsPDF();
    doc.text(t('reports.finance_report'), 10, 10);
    finances.forEach((f, i) => {
      doc.text(`Paciente: ${f.patient_id}, Valor: R$${f.amount}, Status: ${f.status}`, 10, 20 + i * 10);
    });
    doc.save('relatorio_financeiro.pdf');
  };

  const generateSurveyReport = () => {
    const doc = new jsPDF();
    doc.text(t('reports.survey_report'), 10, 10);
    surveys.forEach((s, i) => {
      doc.text(`Paciente: ${s.patient_id}, Atendimento: ${s.attendance}, Conforto: ${s.comfort}`, 10, 20 + i * 10);
    });
    doc.save('relatorio_satisfacao.pdf');
  };

  const generateMaintenanceReport = () => {
    const doc = new jsPDF();
    doc.text(t('reports.maintenance_report'), 10, 10);
    maintenances.forEach((m, i) => {
      doc.text(`Equipamento: ${m.equipment}, Fornecedor: ${m.supplier}, Data: ${m.date}`, 10, 20 + i * 10);
    });
    doc.save('relatorio_manutencao.pdf');
  };

  return (
    <div className="container">
      <h2 className="text-2xl font-bold mb-6">{t('reports.title')}</h2>
      {['secretary', 'dentist'].includes(userRole) && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">{t('reports.patient_report')}</h3>
          <button onClick={generatePatientReport} className="button mb-4">{t('reports.generate_pdf')}</button>
          <table className="table">
            <thead>
              <tr><th>{t('reports.name')}</th><th>{t('reports.cpf')}</th><th>{t('reports.status')}</th></tr>
            </thead>
            <tbody>
              {patients.map(p => (
                <tr key={p.id}><td>{p.name}</td><td>{p.cpf}</td><td>{p.status || t('reports.active')}</td></tr>
              ))}
            </tbody>
          </table>
          <div className="mt-4 flex justify-between">
            <button onClick={() => setPage(p => Math.max(p - 1, 1))} className="button">{t('reports.previous')}</button>
            <button onClick={() => setPage(p => p + 1)} className="button">{t('reports.next')}</button>
          </div>
        </div>
      )}
      {['finance', 'secretary'].includes(userRole) && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">{t('reports.finance_report')}</h3>
          <button onClick={generateFinanceReport} className="button mb-4">{t('reports.generate_pdf')}</button>
          <table className="table">
            <thead>
              <tr><th>{t('reports.patient')}</th><th>{t('reports.amount')}</th><th>{t('reports.status')}</th></tr>
            </thead>
            <tbody>
              {finances.map(f => (
                <tr key={f.id} className={f.status === 'paid' ? 'bg-green-100' : f.status === 'pending' ? 'bg-yellow-100' : 'bg-red-100'}>
                  <td>{f.patient_id}</td><td>R${f.amount}</td><td>{f.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-4 flex justify-between">
            <button onClick={() => setPage(p => Math.max(p - 1, 1))} className="button">{t('reports.previous')}</button>
            <button onClick={() => setPage(p => p + 1)} className="button">{t('reports.next')}</button>
          </div>
        </div>
      )}
      {['secretary', 'dentist'].includes(userRole) && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">{t('reports.survey_report')}</h3>
          <button onClick={generateSurveyReport} className="button mb-4">{t('reports.generate_pdf')}</button>
          <table className="table">
            <thead>
              <tr><th>{t('reports.patient')}</th><th>{t('reports.attendance')}</th><th>{t('reports.comfort')}</th><th>{t('reports.pain')}</th><th>{t('reports.confidence')}</th></tr>
            </thead>
            <tbody>
              {surveys.map(s => (
                <tr key={s.id}><td>{s.patient_id}</td><td>{s.attendance}</td><td>{s.comfort}</td><td>{s.pain}</td><td>{s.confidence}</td></tr>
              ))}
            </tbody>
          </table>
          <div className="mt-4 flex justify-between">
            <button onClick={() => setPage(p => Math.max(p - 1, 1))} className="button">{t('reports.previous')}</button>
            <button onClick={() => setPage(p => p + 1)} className="button">{t('reports.next')}</button>
          </div>
        </div>
      )}
      {['secretary', 'dentist'].includes(userRole) && (
        <div>
          <h3 className="text-lg font-semibold mb-2">{t('reports.maintenance_report')}</h3>
          <button onClick={generateMaintenanceReport} className="button mb-4">{t('reports.generate_pdf')}</button>
          <table className="table">
            <thead>
              <tr><th>{t('reports.equipment')}</th><th>{t('reports.supplier')}</th><th>{t('reports.date')}</th></tr>
            </thead>
            <tbody>
              {maintenances.map(m => (
                <tr key={m.id}><td>{m.equipment}</td><td>{m.supplier}</td><td>{m.date}</td></tr>
              ))}
            </tbody>
          </table>
          <div className="mt-4 flex justify-between">
            <button onClick={() => setPage(p => Math.max(p - 1, 1))} className="button">{t('reports.previous')}</button>
            <button onClick={() => setPage(p => p + 1)} className="button">{t('reports.next')}</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reports;
