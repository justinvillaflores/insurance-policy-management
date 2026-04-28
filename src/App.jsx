import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Landing from './page/Landing';
import Login from './page/Login';
import Dashboard from './page/Dashboard';
import Policies from './page/Policies';
import Claims from './page/Claims';
import Payments from './page/Payments';
import Messages from './page/Messages';
import Profiles from './page/Profiles';
import HelpCenter from './page/HelpCenter';
import PoliciesLanding from './page/PoliciesLanding';
import Contact from './page/Contact';
import './index.css';

function NavigationControl() {
  const location = useLocation();

  const sidebarPages = [
    '/dashboard',
    '/policies',
    '/claims',
    '/payments',
    '/messages',
    '/profiles',
    '/help'
  ];

  const shouldHideNavbar = sidebarPages.includes(location.pathname);

  return !shouldHideNavbar ? <Navbar /> : null;
}

function App() {
  return (
      <Router>
        <div className="font-sans antialiased text-slate-900">
          <NavigationControl />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/policies-landing" element={<PoliciesLanding />} />
            <Route path="/contact" element={<Contact />} />

            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/policies" element={<Policies />} />
            <Route path="/claims" element={<Claims />} />
            <Route path="/payments" element={<Payments />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/profiles" element={<Profiles />} />
            <Route path="/help" element={<HelpCenter />} />
          </Routes>
        </div>
      </Router>
  );
}

export default App;