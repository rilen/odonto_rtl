import React, { useEffect, useState } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend, Filler } from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend, Filler);

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const [consultations, setConsultations] = useState([]);
  const [revenue, setRevenue] = useState([]);

  useEffect(() => {
    fetch('/api/appointments').then(res => res.json()).then(data => setConsultations(data));
    fetch('/api/payments').then(res => res.json()).then(data => setRevenue(data));
  }, []);

  const barData = {
    labels: consultations.map(c => c.date),
    datasets: [{ label: 'Consultas', data: consultations.map(c => c.count), backgroundColor: 'rgba(75, 192, 192, 0.2)' }]
  };

  const lineData = {
    labels: revenue.map(r => r.date),
    datasets: [{ label: 'Faturamento', data: revenue.map(r => r.amount), borderColor: 'rgba(255, 99, 132, 1)', fill: false }]
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-gray-100">Consultas: {consultations.length}</div>
        <div className="p-4 bg-gray-100">Faturamento: R${revenue.reduce((sum, r) => sum + r.amount, 0)}</div>
        <div className="p-4 bg-gray-100">Estoque Crítico: {consultations.filter(c => c.quantity < c.critical_level).length}</div>
      </div>
      <div className="mt-4">
        <Bar data={barData} options={{ plugins: { zoom: { zoom: { wheel: { enabled: true } } } } }} />
        <Line data={lineData} options={{ plugins: { zoom: { zoom: { wheel: { enabled: true } } } } }} />
      </div>
    </div>
  );
};

export default Dashboard;
