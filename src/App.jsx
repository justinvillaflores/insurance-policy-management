import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate
} from 'react-router-dom';

import React, { useContext } from 'react';
import { AuthContext } from './context/AuthContext';

import Navbar from './components/Navbar';
import Register from './components/Register';

import Landing from './page/Landing';
import Login from './page/Login';
import PoliciesLanding from './page/PoliciesLanding';
import Contact from './page/Contact';

import Dashboard from './page/Dashboard';
import Policies from './page/Policies';
import Claims from './page/Claims';
import Payments from './page/Payments';
import Messages from './page/Messages';
import Profiles from './page/Profiles';
import HelpCenter from './page/HelpCenter';
import Users from './page/Users';
import Reports from './page/Reports'; // <--- Inimport ang Reports page

import ClientDashboard from './page/ClientDashboard';
import ClientPolicies from './page/ClientPolicies';
import ClientPayments from './page/ClientPayments';
import ClientMessages from './page/ClientMessages';
import ClientSupport from './page/ClientSupport';

import './index.css';

function NavigationControl() {
  const location = useLocation();

  // DITO ILALAGAY ANG LAHAT NG PAGES NA GUMAGAMIT NG SIDEBAR
  // Kapag wala ang route dito, ipapakita ang public Navbar
  const sidebarPages = [
    '/dashboard',
    '/policies',
    '/claims',
    '/payments',
    '/messages',
    '/reports',    // <--- Idinagdag dito para hindi mag-conflict sa Navbar
    '/profiles',
    '/users',
    '/help',
    '/client-dashboard',
    '/client-policies',
    '/client-payments',
    '/client-messages',
    '/client-support',
  ];

  return !sidebarPages.includes(location.pathname) ? <Navbar /> : null;
}

function App() {
  const { userData, loading } = useContext(AuthContext);

  if (loading) return null;

  return (
      <Router>
        <div className="font-sans antialiased text-slate-900">
          <NavigationControl />

          <Routes>
            {/* PUBLIC ROUTES */}
            <Route path="/" element={<Landing />} />
            <Route path="/policies-landing" element={<PoliciesLanding />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/register" element={<Register />} />

            {/* LOGIN REDIRECT */}
            <Route
                path="/login"
                element={
                  userData?.role === 'admin'
                      ? <Navigate to="/dashboard" replace />
                      : userData?.role === 'client'
                          ? <Navigate to="/client-dashboard" replace />
                          : <Login />
                }
            />

            {/* ADMIN ROUTES (Protected) */}
            <Route path="/dashboard" element={userData?.role === 'admin' ? <Dashboard /> : <Navigate to="/login" replace />} />
            <Route path="/policies" element={userData?.role === 'admin' ? <Policies /> : <Navigate to="/login" replace />} />
            <Route path="/claims" element={userData?.role === 'admin' ? <Claims /> : <Navigate to="/login" replace />} />
            <Route path="/payments" element={userData?.role === 'admin' ? <Payments /> : <Navigate to="/login" replace />} />
            <Route path="/messages" element={userData?.role === 'admin' ? <Messages /> : <Navigate to="/login" replace />} />
            <Route path="/reports" element={userData?.role === 'admin' ? <Reports /> : <Navigate to="/login" replace />} /> {/* <--- KONEKTADO NA */}
            <Route path="/profiles" element={userData?.role === 'admin' ? <Profiles /> : <Navigate to="/login" replace />} />
            <Route path="/users" element={userData?.role === 'admin' ? <Users /> : <Navigate to="/login" replace />} />
            <Route path="/help" element={userData?.role === 'admin' ? <HelpCenter /> : <Navigate to="/login" replace />} />

            {/* CLIENT ROUTES (Protected) */}
            <Route path="/client-dashboard" element={userData?.role === 'client' ? <ClientDashboard /> : <Navigate to="/login" replace />} />
            <Route path="/client-policies" element={userData?.role === 'client' ? <ClientPolicies /> : <Navigate to="/login" replace />} />
            <Route path="/client-payments" element={userData?.role === 'client' ? <ClientPayments /> : <Navigate to="/login" replace />} />
            <Route path="/client-messages" element={userData?.role === 'client' ? <ClientMessages /> : <Navigate to="/login" replace />} />
            <Route path="/client-support" element={userData?.role === 'client' ? <ClientSupport /> : <Navigate to="/login" replace />} />

            {/* FALLBACK */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
  );
}

export default App;