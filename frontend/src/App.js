// Salvar em: frontend/src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import Login from './components/Login';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Appointment from './components/Appointment';
import PatientManagement from './components/PatientManagement';
import Finance from './components/Finance';
import Stock from './components/Stock';
import Reports from './components/Reports';
import Chat from './components/Chat';
import Profile from './components/Profile';
import Admin from './pages/Admin';
import Secretary from './pages/Secretary';
import Dentist from './pages/Dentist';
import Patient from './pages/Patient';

const App = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [theme, setTheme] = useState('light');
  const isAuthenticated = !!localStorage.getItem('token');

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const ProtectedRoute = ({ children }) => {
    return isAuthenticated ? (
      <div className="flex h-screen">
        <Sidebar toggleTheme={toggleTheme} theme={theme} />
        <div className="flex-1 p-4 md:ml-64">
          <button
            onClick={() => setSidebarOpen(!isSidebarOpen)}
            className="md:hidden p-2 bg-gray-800 text-white rounded-md"
          >
            {isSidebarOpen ? 'Fechar Menu' : 'Abrir Menu'}
          </button>
          {children}
        </div>
      </div>
    ) : (
      <Navigate to="/" />
    );
  };

  return (
    <div className={theme}>
      <I18nextProvider i18n={i18n}>
        <Router>
          <Routes>
            <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/appointments"
              element={
                <ProtectedRoute>
                  <Appointment />
                </ProtectedRoute>
              }
            />
            <Route
              path="/patients"
              element={
                <ProtectedRoute>
                  <PatientManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="/finance"
              element={
                <ProtectedRoute>
                  <Finance />
                </ProtectedRoute>
              }
            />
            <Route
              path="/stock"
              element={
                <ProtectedRoute>
                  <Stock />
                </ProtectedRoute>
              }
            />
            <Route
              path="/reports"
              element={
                <ProtectedRoute>
                  <Reports />
                </ProtectedRoute>
              }
            />
            <Route
              path="/chat"
              element={
                <ProtectedRoute>
                  <Chat />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <Admin />
                </ProtectedRoute>
              }
            />
            <Route
              path="/secretary"
              element={
                <ProtectedRoute>
                  <Secretary />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dentist"
              element={
                <ProtectedRoute>
                  <Dentist />
                </ProtectedRoute>
              }
            />
            <Route
              path="/patient"
              element={
                <ProtectedRoute>
                  <Patient />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </I18nextProvider>
    </div>
  );
};

export default App;
