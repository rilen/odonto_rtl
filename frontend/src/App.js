// Salvar em: frontend/src/App.js
import React, { useState, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Login from './components/Login';
import VisitorForm from './components/VisitorForm';
import Secretary from './pages/Secretary';
import Finance from './pages/Finance';
import Dentist from './pages/Dentist';
import Patient from './pages/Patient';
import Visitor from './pages/Visitor';
import './styles.css';

const Dashboard = React.lazy(() => import('./components/Dashboard'));
const Reports = React.lazy(() => import('./components/Reports'));
const Odontogram = React.lazy(() => import('./components/Odontogram'));

const App = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Router>
      <div className="flex min-h-screen">
        <div className={`sidebar ${!isSidebarOpen ? 'sidebar-closed' : ''}`}>
          <Sidebar />
        </div>
        <div className="flex-1 container">
          <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="md:hidden button mb-4">Menu</button>
          <Suspense fallback={<div className="text-center p-4">Carregando...</div>}>
            <Switch>
              <Route path="/login" component={Login} />
              <Route path="/visitor" component={VisitorForm} />
              <Route path="/secretary" component={Secretary} />
              <Route path="/finance" component={Finance} />
              <Route path="/dentist" component={Dentist} />
              <Route path="/patient" component={Patient} />
              <Route path="/reports" component={Reports} />
              <Route path="/odontogram" component={Odontogram} />
              <Route path="/" component={Dashboard} />
            </Switch>
          </Suspense>
        </div>
      </div>
    </Router>
  );
};

export default App;
