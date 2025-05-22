// Salvar em: frontend/src/components/Reports.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { jsPDF } from 'jspdf';
import { useTranslation } from 'react-i18next';
import Chart from 'chart.js/auto';

const Reports = ({ userRole }) => {
  const { t } = useTranslation();
  const [patients, setPatients] = useState([]);
  const [finances, setFinances] = useState([]);
  const [surveys, setSurveys] = useState([]);
  const [maintenances, setMaintenances] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [filters, setFilters] = useState({ startDate: '', endDate: '', status: '' });

  useEffect(() => {
    const query = new URLSearchParams({
      page,
      pageSize,
      startDate: filters.startDate,
      endDate: filters.endDate,
      status: filters.status,
    }).toString();

    if (['secretary', 'dentist'].includes(userRole)) {
      axios.get(`/api/reports/patients?${query}`).then(res => setPatients(res.data));
      axios.get(`/api/reports/surveys?${query}`).then(res => setSurveys(res.data));
      axios.get(`/api/reports/maintenance?${query}`).then(res => setMaintenances(res.data));
    }
    if (['finance', 'secretary'].includes(userRole)) {
      axios.get(`/api/reports/payments?${query}`).then(res => setFinances(res.data));
    }
  }, [userRole, page, filters]);

  useEffect(() => {
    if (finances.length > 0) {
      const ctx = document.getElementById('financeChart').getContext('2d');
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: finances.map(f => f.patient_id),
          datasets: [{
            label: t('reports.amount'),
            data: finances.map(f => f.amount),
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }]
        },
        options: { scales: { y: { beginAtZero: true } } }
      });
    }
  }, [finances, t]);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
    setPage(1);
  };

  const exportToCSV = (data, filename, headers) => {
    const csvRows = [headers.join(',')];
    data.forEach(item => {
      const values = headers.map(header => `"${item[header.toLowerCase()] || ''}"`);
      csvRows.push(values.join(','));
    });
    const csvString = csvRows.join('\n');
    const blob = new Blob([csvString], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('href', url);
    a.setAttribute('download', `${filename}.csv`);
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const generatePatientReport = () => {
    const doc = new jsPDF();
    doc.text(t('reports.patient_report'), 10, 10);
    patients.forEach((p, i) => {
      doc.text(`Nome: ${p.name}, CPF: ${p.cpf}, Status: ${p.status || t('reports.active')}`, 10, 20 + i * 10);
    });
    doc.save('relatorio_pacientes.pdf');
  };

  const exportPatientCSV = () => {
    exportToCSV(patients, 'relatorio_pacientes', ['Name', 'CPF', 'Status']);
  };

  const generateFinanceReport = () => {
    const doc = new jsPDF();
    doc.text(t('reports.finance_report'), 10, 10);
    finances.forEach((f, i) => {
      doc.text(`Paciente: ${f.patient_id}, Valor: R$${f.amount}, Status: ${f.status}`, 10, 20 + i * 10);
    });
    doc.save('relatorio_financeiro.pdf');
  };

  const exportFinanceCSV = () => {
    exportToCSV(finances, 'relatorio_financeiro', ['Patient_ID', 'Amount', 'Status']);
  };

  const generateSurveyReport = () => {
    const doc = new jsPDF();
    doc.text(t('reports.survey_report'), 10, 10);
    surveys.forEach((s, i) => {
      doc.text(`Paciente: ${s.patient_id}, Atendimento: ${s.attendance}, Conforto: ${s.comfort}`, 10, 20 + i * 10);
    });
    doc.save('relatorio_satisfacao.pdf');
  };

  const exportSurveyCSV = () => {
    exportToCSV(surveys, 'relatorio_satisfacao', ['Patient_ID', 'Attendance', 'Comfort', 'Pain', 'Confidence']);
  };

  const generateMaintenanceReport = () => {
    const doc = new jsPDF();
    doc.text(t('reports.maintenance_report'), 10, 10);
    maintenances.forEach((m, i) => {
      doc.text(`Equipamento: ${m.equipment}, Fornecedor: ${m.supplier}, Data: ${m.date}`, 10, 20 + i * 10);
    });
    doc.save('relatorio_manutencao.pdf');
  };

  const exportMaintenanceCSV = () => {
    exportToCSV(maintenances, 'relatorio_manutencao', ['Equipment', 'Supplier', 'Date']);
  };

  return (
    <div className="container" role="region" aria-label={t('reports.title')}>
      <h2 className="text-2xl font-bold mb-6">{t('reports.title')}</h2>
      <div className="mb-4 flex space-x-4">
        <input
          type="date"
          name="startDate"
          value={filters.startDate}
          onChange={handleFilterChange}
          className="input"
          aria-label={t('reports.start_date')}
        />
        <input
          type="date"
          name="endDate"
          value={filters.endDate}
          onChange={handleFilterChange}
          className="input"
          aria-label={t('reports.end_date')}
        />
        <select
          name="status"
          value={filters.status}
          onChange={handleFilterChange}
          className="input"
          aria-label={t('reports.status_filter')}
        >
          <option value="">{t('reports.all_status')}</option>
          <option value="active">{t('reports.active')}</option>
          <option value="inactive">{t('reports.inactive')}</option>
        </select>
      </div>
      {['secretary', 'dentist'].includes(userRole) && (
        <section className="mb-6" aria-labelledby="patient-report">
          <h3 id="patient-report" className="text-lg font-semibold mb-2">{t('reports.patient_report')}</h3>
          <div className="flex space-x-2 mb-4">
            <button onClick={generatePatientReport} className="button">{t('reports.generate_pdf')}</button>
            <button onClick={exportPatientCSV} className="button">{t('reports.generate_csv')}</button>
          </div>
          <table className="table" aria-describedby="patient-report">
            <thead>
              <tr><th scope="col">{t('reports.name')}</th><th scope="col">{t('reports.cpf')}</th><th scope="col">{t('reports.status')}</th></tr>
            </thead>
            <tbody>
              {patients.map(p => (
                <tr key={p.id}><td>{p.name}</td><td>{p.cpf}</td><td>{p.status || t('reports.active')}</td></tr>
              ))}
            </tbody>
          </table>
          <nav className="mt-4 flex justify-between" aria-label={t('reports.pagination')}>
            <button onClick={() => setPage(p => Math.max(p - 1, 1))} className="button" disabled={page === 1}>{t('reports.previous')}</button>
            <button onClick={() => setPage(p => p + 1)} className="button">{t('reports.next')}</button>
          </nav>
        </section>
      )}
      {['finance', 'secretary'].includes(userRole) && (
        <section className="mb-6" aria-labelledby="finance-report">
          <h3 id="finance-report" className="text-lg font-semibold mb-2">{t('reports.finance_report')}</h3>
          <div className="flex space-x-2 mb-4">
            <button onClick={generateFinanceReport} className="button">{t('reports.generate_pdf')}</button>
            <button onClick={exportFinanceCSV} className="button">{t('reports.generate_csv')}</button>
          </div>
          <canvas id="financeChart" className="mb-4" aria-label={t('reports.finance_chart')} role="img"></canvas>
          <table className="table" aria-describedby="finance-report">
            <thead>
              <tr><th scope="col">{t('reports.patient')}</th><th scope="col">{t('reports.amount')}</th><th scope="col">{t('reports.status')}</th></tr>
            </thead>
            <tbody>
              {finances.map(f => (
                <tr key={f.id} className={f.status === 'paid' ? 'bg-green-100 dark:bg-green-900' : f.status === 'pending' ? 'bg-yellow-100 dark:bg-yellow-900' : 'bg-red-100 dark:bg-red-900'}>
                  <td>{f.patient_id}</td><td>R${f.amount}</td><td>{f.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <nav className="mt-4 flex justify-between" aria-label={t('reports.pagination')}>
            <button onClick={() => setPage(p => Math.max(p - 1, 1))} className="button" disabled={page === 1}>{t('reports.previous')}</button>
            <button onClick={() => setPage(p => p + 1)} className="button">{t('reports.next')}</button>
          </nav>
        </section>
      )}
      {['secretary', 'dentist'].includes(userRole) && (
        <section className="mb-6" aria-labelledby="survey-report">
          <h3 id="survey-report" className="text-lg font-semibold mb-2">{t('reports.survey_report')}</h3>
          <div className="flex space-x-2 mb-4">
            <button onClick={generateSurveyReport} className="button">{t('reports.generate_pdf')}</button>
            <button onClick={exportSurveyCSV} className="button">{t('reports.generate_csv')}</button>
          </div>
          <table className="table" aria-describedby="survey-report">
            <thead>
              <tr><th scope="col">{t('reports.patient')}</th><th scope="col">{t('reports.attendance')}</th><th scope="col">{t('reports.comfort')}</th><th scope="col">{t('reports.pain')}</th><th scope="col">{t('reports.confidence')}</th></tr>
            </thead>
            <tbody>
              {surveys.map(s => (
                <tr key={s.id}><td>{s.patient_id}</td><td>{s.attendance}</td><td>{s.comfort}</td><td>{s.pain}</td><td>{s.confidence}</td></tr>
              ))}
            </tbody>
          </table>
          <nav className="mt-4 flex justify-between" aria-label={t('reports.pagination')}>
            <button onClick={() => setPage(p => Math.max(p - 1, 1))} className="button" disabled={page === 1}>{t('reports.previous')}</button>
            <button onClick={() => setPage(p => p + 1)} className="button">{t('reports.next')}</button>
          </nav>
        </section>
      )}
      {['secretary', 'dentist'].includes(userRole) && (
        <section aria-labelledby="maintenance-report">
          <h3 id="maintenance-report" className="text-lg font-semibold mb-2">{t('reports.maintenance_report')}</h3>
          <div className="flex space-x-2 mb-4">
            <button onClick={generateMaintenanceReport} className="button">{t('reports.generate_pdf')}</button>
            <button onClick={exportMaintenanceCSV} className="button">{t('reports.generate_csv')}</button>
          </div>
          <table className="table" aria-describedby="maintenance-report">
            <thead>
              <tr><th scope="col">{t('reports.equipment')}</th><th scope="col">{t('reports.supplier')}</th><th scope="col">{t('reports.date')}</th></tr>
            </thead>
            <tbody>
              {maintenances.map(m => (
                <tr key={m.id}><td>{m.equipment}</td><td>{m.supplier}</td><td>{m.date}</td></tr>
              ))}
            </tbody>
          </table>
          <nav className="mt-4 flex justify-between" aria-label={t('reports.pagination')}>
            <button onClick={() => setPage(p => Math.max(p - 1, 1))} className="button" disabled={page === 1}>{t('reports.previous')}</button>
            <button onClick={() => setPage(p => p + 1)} className="button">{t('reports.next')}</button>
          </nav>
        </section>
      )}
    </div>
  );
};

export default Reports;
