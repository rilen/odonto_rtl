// Salvar em: frontend/src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
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
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route path="/login" component={Login} />
            <Route path="/reports" render={(props) => <Reports {...props} userRole="secretary" />} />
            <Route path="/chat" render={(props) => <Chat {...props} userId={1} userRole="secretary" />} />
            <Route path="/admin" component={Admin} />
            <Route path="/assistant" component={Assistant} />
            <Route path="/secretary" component={Secretary} />
            <Route path="/finance" component={Finance} />
            <Route path="/dentist" component={Dentist} />
            <Route path="/patient" render={(props) => <Patient {...props} userId={1} />} />
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default App;
