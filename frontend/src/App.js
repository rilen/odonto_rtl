// Salvar em: frontend/src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Reports from './components/Reports';
import Chat from './components/Chat';
import Admin from './pages/Admin';
import Assistant from './pages/Assistant';
import Secretary from './pages/Secretary';
import Finance from './pages/Finance';
import Dentist from './pages/Dentist';
import Patient from './pages/Patient';
import { useTranslation } from 'react-i18next';

const App = () => {
  const { t } = useTranslation();
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className={theme}>
      <Router>
        <Sidebar toggleTheme={toggleTheme} theme={theme} />
        <div className="md:ml-64">
          <Routes>
  <Route path="/" element={<Dashboard />} />
  <Route path="/login" element={<Login />} />
  <Route path="/reports" element={<Reports userRole="secretary" />} />
  <Route path="/chat" element={<Chat userId={1} userRole="secretary" />} />
  <Route path="/admin" element={<Admin />} />
  <Route path="/assistant" element={<Assistant />} />
  <Route path="/secretary" element={<Secretary />} />
  <Route path="/finance" element={<Finance />} />
  <Route path="/dentist" element={<Dentist />} />
  <Route path="/patient" element={<Patient userId={1} />} />
</Routes>

        </div>
      </Router>
    </div>
  );
};

export default App;
