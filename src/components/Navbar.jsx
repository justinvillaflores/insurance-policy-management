import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-md z-[100] border-b border-slate-100">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-2 group">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-white transition-transform group-hover:scale-110">
                        I
                    </div>
                    <span className="text-2xl font-bold text-slate-900 tracking-tight">InsureGuard</span>
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-8 text-slate-600 font-semibold text-sm">
                    <Link to="/" className="hover:text-blue-600 transition">Home</Link>
                    <Link to="/policies-landing" className="hover:text-blue-600 transition">Policies</Link>
                    <Link to="/contact" className="hover:text-blue-600 transition">Contact</Link>
                </div>

                {/* Auth Action */}
                <div className="flex items-center gap-4">
                    <Link
                        to="/login"
                        className="px-6 py-2.5 rounded-xl border border-slate-200 text-sm font-bold text-slate-700 hover:bg-slate-50 transition"
                    >
                        Sign In
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;