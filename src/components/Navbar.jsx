import React, { useState, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, LayoutDashboard } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
    const { userData } = useContext(AuthContext);
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const toggleMenu = () => setIsOpen(!isOpen);

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="fixed top-0 left-0 w-full bg-white/90 backdrop-blur-md z-[100] border-b border-slate-100 shadow-sm">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-2 group">
                    <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center font-black text-white transition-transform group-hover:scale-110 shadow-lg shadow-indigo-100">I</div>
                    <span className="text-xl font-black text-slate-900 tracking-tighter uppercase italic">Insurance Policy Management</span>
                </Link>

                <div className="hidden md:flex items-center gap-8 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                    <Link to="/" className={`${isActive('/') ? 'text-indigo-600' : 'hover:text-indigo-600'} transition-colors`}>Home</Link>
                    <Link to="/policies-landing" className={`${isActive('/policies-landing') ? 'text-indigo-600' : 'hover:text-indigo-600'} transition-colors`}>Policies</Link>
                    <Link to="/contact" className={`${isActive('/contact') ? 'text-indigo-600' : 'hover:text-indigo-600'} transition-colors`}>Contact</Link>
                </div>

                <div className="hidden md:flex items-center gap-4">
                    {userData ? (
                        <Link
                            to="/dashboard"
                            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 text-[10px] font-black uppercase tracking-[0.15em] text-white hover:bg-slate-900 transition-all shadow-xl shadow-indigo-100"
                        >
                            <LayoutDashboard size={14}/> Dashboard
                        </Link>
                    ) : (
                        <Link
                            to="/login"
                            className="px-6 py-3 rounded-xl border-2 border-slate-100 text-[10px] font-black uppercase tracking-[0.15em] text-slate-600 hover:border-indigo-600 hover:text-indigo-600 transition-all"
                        >
                            Sign In
                        </Link>
                    )}
                </div>

                <div className="md:hidden">
                    <button onClick={toggleMenu} className="text-slate-600 hover:text-indigo-600 p-2 transition-colors">
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {isOpen && (
                <div className="md:hidden bg-white border-b border-slate-100 animate-in slide-in-from-top duration-300">
                    <div className="flex flex-col p-6 gap-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                        <Link to="/" onClick={toggleMenu} className="py-2 hover:text-indigo-600">Home</Link>
                        <Link to="/policies-landing" onClick={toggleMenu} className="py-2 hover:text-indigo-600">Policies</Link>
                        <Link to="/contact" onClick={toggleMenu} className="py-2 hover:text-indigo-600">Contact</Link>
                        <hr className="border-slate-100" />
                        {userData ? (
                            <Link to="/dashboard" onClick={toggleMenu} className="w-full text-center px-6 py-4 rounded-xl bg-indigo-600 text-white shadow-lg">Dashboard</Link>
                        ) : (
                            <Link to="/login" onClick={toggleMenu} className="w-full text-center px-6 py-4 rounded-xl bg-slate-900 text-white shadow-lg">Sign In</Link>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;