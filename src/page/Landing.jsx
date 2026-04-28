import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, CheckCircle, ArrowRight } from 'lucide-react';
import heroIllustration from '../assets/hero-illustration.png';

const Landing = () => {
    return (
        <div className="min-h-screen bg-white">
            <main className="max-w-7xl mx-auto px-6 pt-40 pb-24 grid md:grid-cols-2 gap-16 items-center">
                <div className="space-y-8">

                    <h1 className="text-6xl font-extrabold text-slate-900 leading-tight">
                        Protect What <br />
                        <span className="text-blue-600">Matters Most.</span>
                    </h1>

                    <p className="text-xl text-slate-600 leading-relaxed max-w-lg">
                        Manage your insurance policies with ease. InsureGuard provides a secure,
                        all-in-one platform for your life, health, and property protection.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                        <Link
                            to="/login"
                            className="px-8 py-4 rounded-xl bg-blue-600 text-white font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all flex items-center justify-center gap-2 text-center"
                        >
                            Explore Policies <ArrowRight size={20} />
                        </Link>
                        <button className="px-8 py-4 rounded-xl bg-white border border-slate-200 text-slate-700 font-bold hover:bg-slate-50 transition-all text-center">
                            Talk to an Agent
                        </button>
                    </div>

                    <div className="flex items-center gap-6 pt-4 text-slate-500">
                        <div className="flex items-center gap-2 font-medium">
                            <CheckCircle size={18} className="text-green-500" /> Fast Claims
                        </div>
                        <div className="flex items-center gap-2 font-medium">
                            <CheckCircle size={18} className="text-green-500" /> 24/7 Support
                        </div>
                    </div>
                </div>

                <div className="relative">
                    <div className="relative w-full aspect-square rounded-[3rem] bg-blue-600/5 flex items-center justify-center overflow-hidden">
                        <img
                            src={heroIllustration}
                            alt="Hero"
                            className="w-full h-full object-contain p-4 z-10"
                        />
                        <div className="absolute w-3/4 h-3/4 bg-blue-600/10 rounded-full blur-3xl"></div>
                    </div>

                    <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl border border-slate-100 z-20">
                        <p className="text-slate-500 text-xs font-bold uppercase mb-1 tracking-widest">Coverage Status</p>
                        <p className="text-2xl font-black text-green-600">FULLY INSURED</p>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Landing;