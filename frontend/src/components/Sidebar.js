// Salvar em: frontend/src/components/Sidebar.js
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const Sidebar = ({ toggleTheme, theme }) => {
  const { t } = useTranslation();
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div
      className={`fixed inset-y-0 left-0 w-64 bg-gray-800 text-white transform ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-transform md:translate-x-0 z-50`}
    >
      <img src="/logo.png" alt="Logo" className="h-12 m-4" />
      <nav className="mt-4">
        <Link to="/dashboard" className="block p-4 hover:bg-gray-700">
          {t('sidebar.dashboard')}
        </Link>
        <Link to="/profile" className="block p-4 hover:bg-gray-700">
          {t('sidebar.profile')}
        </Link>
        <Link to="/appointments" className="block p-4 hover:bg-gray-700">
          {t('sidebar.appointments')}
        </Link>
        <Link to="/patients" className="block p-4 hover:bg-gray-700">
          {t('sidebar.patients')}
        </Link>
        <Link to="/finance" className="block p-4 hover:bg-gray-700">
          {t('sidebar.finance')}
        </Link>
        <Link to="/stock" className="block p-4 hover:bg-gray-700">
          {t('sidebar.stock')}
        </Link>
        <Link to="/reports" className="block p-4 hover:bg-gray-700">
          {t('sidebar.reports')}
        </Link>
      </nav>
      <button
        onClick={toggleTheme}
        className="block w-full p-4 text-left hover:bg-gray-700"
      >
        {theme === 'light' ? t('sidebar.dark') : t('sidebar.light')}
      </button>
      <button
        onClick={() => setSidebarOpen(false)}
        className="md:hidden p-4 text-white absolute top-0 right-0"
      >
        Fechar
      </button>
    </div>
  );
};

export default Sidebar;
