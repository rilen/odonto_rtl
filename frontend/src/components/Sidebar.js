// Salvar em: frontend/src/components/Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Sidebar = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="h-full p-4">
      <h2 className="text-xl font-bold mb-4">Odonto RTL</h2>
      <nav className="space-y-2">
        <Link to="/" className="block text-white hover:bg-indigo-700 p-2 rounded">{t('sidebar.dashboard')}</Link>
        <Link to="/appointments" className="block text-white hover:bg-indigo-700 p-2 rounded">{t('sidebar.appointments')}</Link>
        <Link to="/patients" className="block text-white hover:bg-indigo-700 p-2 rounded">{t('sidebar.patients')}</Link>
        <Link to="/finance" className="block text-white hover:bg-indigo-700 p-2 rounded">{t('sidebar.finance')}</Link>
        <Link to="/stock" className="block text-white hover:bg-indigo-700 p-2 rounded">{t('sidebar.stock')}</Link>
        <Link to="/reports" className="block text-white hover:bg-indigo-700 p-2 rounded">{t('sidebar.reports')}</Link>
      </nav>
      <div className="mt-4">
        <button onClick={() => changeLanguage('pt')} className="button mr-2">PT</button>
        <button onClick={() => changeLanguage('en')} className="button">EN</button>
      </div>
    </div>
  );
};

export default Sidebar;
