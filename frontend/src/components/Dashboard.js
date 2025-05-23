import React, { useEffect, useState } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  LineElement, 
  PointElement, 
  Title, 
  Tooltip, 
  Legend, 
  Filler 
} from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';

// ✅ Registro correto dos componentes e plugins
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  zoomPlugin
);

// ✅ Configuração do plugin de zoom
const options = {
  plugins: {
    zoom: {
      pan: { enabled: true, mode: 'x' },
      zoom: {
        wheel: { enabled: true },
        pinch: { enabled: true },
        mode: 'x'
      }
    }
  }
};

const Dashboard = () => {
  const [consultations, setConsultations] = useState([]);
  const [revenue, setRevenue] = useState([]);

  useEffect(() => {
    fetch('/api/appointments')
      .then(res => res.json())
      .then(data => setConsultations(data))
      .catch(error => console.error("Erro ao buscar consultas:", error));

    fetch('/api/payments')
      .then(res => res.json())
      .then(data => setRevenue(data))
      .catch(error => console.error("Erro ao buscar faturamento:", error));
  }, []);

  // ✅ Tratamento para evitar erros em gráficos vazios
  const barData = {
    labels: consultations.length ? consultations.map(c => c.date) : ["Sem Dados"],
    datasets: [
      {
        label: "Consultas",
        data: consultations.length ? consultations.map(c => c.count || 0) : [0],
        backgroundColor: "rgba(75, 192, 192, 0.2)"
      }
    ]
  };

  const lineData = {
    labels: revenue.length ? revenue.map(r => r.date) : ["Sem Dados"],
    datasets: [
      {
        label: "Faturamento",
        data: revenue.length ? revenue.map(r => r.amount || 0) : [0],
        borderColor: "rgba(255, 99, 132, 1)",
        fill: false
      }
    ]
  };

  // ✅ Corrigida filtragem do estoque crítico
  const criticalStockCount = consultations.filter(c =>
    typeof c.quantity === "number" &&
    typeof c.critical_level === "number" &&
    c.quantity < c.critical_level
  ).length;

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-gray-100">Consultas: {consultations.length}</div>
        <div className="p-4 bg-gray-100">Faturamento: R${revenue.reduce((sum, r) => sum + r.amount, 0)}</div>
        <div className="p-4 bg-gray-100">Estoque Crítico: {criticalStockCount}</div>
      </div>
      <div className="mt-4">
        <Bar data={barData} options={options} />
        <Line data={lineData} options={options} />
      </div>
    </div>
  );
};

export default Dashboard;
