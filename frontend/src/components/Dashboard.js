// Salvar em: frontend/src/components/Dashboard.js
   import React, { useState, useEffect } from 'react';
   import { useTranslation } from 'react-i18next';
   import { Chart as ChartJS, ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
   import { Pie, Bar } from 'react-chartjs-2';
   import axios from 'axios';

   ChartJS.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

   const Dashboard = () => {
     const { t } = useTranslation();
     const [metrics, setMetrics] = useState({ appointments: 0, patients: 0, revenue: 0 });
     const [error, setError] = useState('');

     useEffect(() => {
       const fetchMetrics = async () => {
         try {
           const token = localStorage.getItem('token');
           const response = await axios.get('/api/dashboard/metrics', {
             headers: { Authorization: `Bearer ${token}` },
           });
           setMetrics(response.data);
         } catch (err) {
           setError(t('dashboard.error_fetch') || 'Erro ao carregar métricas');
         }
       };
       fetchMetrics();
     }, [t]);

     const pieData = {
       labels: [t('dashboard.appointments'), t('dashboard.patients')],
       datasets: [
         {
           data: [metrics.appointments, metrics.patients],
           backgroundColor: ['#36A2EB', '#FF6384'],
           hoverBackgroundColor: ['#36A2EB', '#FF6384'],
         },
       ],
     };

     const barData = {
       labels: [t('dashboard.revenue')],
       datasets: [
         {
           label: t('dashboard.revenue'),
           data: [metrics.revenue],
           backgroundColor: '#4BC0C0',
         },
       ],
     };

     return (
       <div className="container mx-auto p-4">
         <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">{t('dashboard.title')}</h2>
         {error && <p className="text-red-500 mb-4">{error}</p>}
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
             <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">{t('dashboard.appointments_patients')}</h3>
             <Pie data={pieData} />
           </div>
           <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
             <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">{t('dashboard.revenue')}</h3>
             <Bar data={barData} />
           </div>
         </div>
       </div>
     );
   };

   export default Dashboard;
