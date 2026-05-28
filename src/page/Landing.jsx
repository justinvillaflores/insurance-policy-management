import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, CheckCircle, ArrowRight } from 'lucide-react';
import heroIllustration from '../assets/hero-illustration.png';

const Landing = () => {
    return (
        <div className="min-h-screen bg-white overflow-x-hidden">
            <main className="max-w-7xl mx-auto px-6 pt-24 md:pt-40 pb-24 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">

                {/* Text Content */}
                <div className="space-y-6 md:space-y-8 order-2 md:order-1 text-center md:text-left">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 leading-tight">
                        Protect What <br className="hidden md:block" />
                        <span className="text-blue-600">Matters Most.</span>
                    </h1>

                    <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-lg mx-auto md:mx-0">
                        Manage your insurance policies with ease. InsureGuard provides a secure,
                        all-in-one platform for your life, health, and property protection.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center md:justify-start">
                        <Link
                            to="/login"
                            className="px-8 py-4 rounded-xl bg-blue-600 text-white font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 text-center"
                        >
                            Explore Policies <ArrowRight size={20} />
                        </Link>
                        <button className="px-8 py-4 rounded-xl bg-white border border-slate-200 text-slate-700 font-bold hover:bg-slate-50 hover:border-slate-300 transition-all text-center">
                            Talk to Admin
                        </button>
                    </div>

                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 md:gap-6 pt-4 text-slate-500">
                        <div className="flex items-center gap-2 font-medium text-sm md:text-base">
                            <CheckCircle size={18} className="text-green-500" /> Fast Claims
                        </div>
                        <div className="flex items-center gap-2 font-medium text-sm md:text-base">
                            <CheckCircle size={18} className="text-green-500" /> 24/7 Support
                        </div>
                    </div>
                </div>

                {/* Hero Image Section */}
                <div className="relative order-1 md:order-2 animate-in fade-in zoom-in duration-1000">
                    <div className="relative w-full aspect-square max-w-[400px] md:max-w-none mx-auto rounded-[2.5rem] md:rounded-[3rem] bg-blue-600/5 flex items-center justify-center overflow-hidden">
                        <img
                            src={heroIllustration}
                            alt="Hero"
                            className="w-full h-full object-contain p-6 md:p-10 z-10"
                        />
                        <div className="absolute w-3/4 h-3/4 bg-blue-600/10 rounded-full blur-3xl"></div>
                    </div>

                    {/* Floating Badge (Responsive Position) */}
                    <div className="absolute -bottom-4 -left-2 md:-bottom-6 md:-left-6 bg-white p-4 md:p-6 rounded-2xl shadow-xl border border-slate-100 z-20">
                        <p className="text-slate-500 text-[10px] font-black uppercase mb-1 tracking-widest">Coverage Status</p>
                        <p className="text-lg md:text-2xl font-black text-green-600">FULLY INSURED</p>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Landing;