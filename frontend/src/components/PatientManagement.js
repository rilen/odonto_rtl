// Salvar em: frontend/src/components/PatientManagement.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

const PatientManagement = () => {
  const { t } = useTranslation();
  const [patients, setPatients] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/api/patients', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPatients(response.data);
      } catch (err) {
        setError(t('patients.error_fetch') || 'Erro ao buscar pacientes');
      }
    };
    fetchPatients();
  }, [t]);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">{t('patients.title')}</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-700">
              <th className="p-2 text-left">{t('patients.name')}</th>
              <th className="p-2 text-left">{t('patients.cpf')}</th>
              <th className="p-2 text-left">{t('patients.status')}</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient) => (
              <tr key={patient.id} className="border-b dark:border-gray-600">
                <td className="p-2">{patient.name}</td>
                <td className="p-2">{patient.cpf}</td>
                <td className="p-2">{patient.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PatientManagement;
