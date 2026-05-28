import React from 'react';
import { Shield, Car, Home, Heart, Plane, ArrowRight, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

const PoliciesLanding = () => {
    const products = [
        {
            title: "Auto Insurance",
            desc: "Comprehensive coverage for your vehicles against accidents and theft.",
            icon: <Car size={24} />,
            features: ["Roadside Assistance", "Collision Coverage", "Rental Reimbursement"]
        },
        {
            title: "Life Insurance",
            desc: "Ensure your family's future stays bright and financially secure.",
            icon: <Heart size={24} />,
            features: ["Term Life", "Whole Life", "Fixed Benefits"]
        },
        {
            title: "Property Shield",
            desc: "Protect your home and valuables from fire, natural disasters, and more.",
            icon: <Home size={24} />,
            features: ["Flood Protection", "Burglary Cover", "Valuables Protection"]
        },
        {
            title: "Travel Secure",
            desc: "Worry-free travel with medical and trip cancellation protection.",
            icon: <Plane size={24} />,
            features: ["Medical Expenses", "Lost Luggage", "Flight Delays"]
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-20 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="text-center space-y-4 mb-16">
                    <h2 className="text-blue-600 font-black text-xs uppercase tracking-[0.3em]">Our Offerings</h2>
                    <h1 className="text-5xl font-black text-slate-900 leading-tight">
                        Coverage Built for <br /> Your Unique Lifestyle.
                    </h1>
                    <p className="text-slate-500 max-w-2xl mx-auto font-medium">
                        Explore our wide range of insurance products designed to provide peace of mind
                        and financial security at every stage of your life.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {products.map((item, index) => (
                        <div key={index} className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all group">
                            <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                {item.icon}
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                            <p className="text-sm text-slate-500 leading-relaxed mb-6 font-medium">
                                {item.desc}
                            </p>
                            <ul className="space-y-3 mb-8">
                                {item.features.map((f, i) => (
                                    <li key={i} className="flex items-center gap-2 text-[11px] font-black text-slate-400 uppercase tracking-wider">
                                        <Check size={14} className="text-green-500" /> {f}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="mt-20 bg-blue-600 rounded-[3rem] p-12 text-center text-white relative overflow-hidden shadow-2xl shadow-blue-200">
                    <div className="relative z-10 space-y-6">
                        <h2 className="text-3xl font-black">Not sure what you need?</h2>
                        <p className="text-blue-100 max-w-xl mx-auto">Our advisors are ready to help you build a custom protection plan that fits your budget and needs.</p>
                        <button className="bg-white text-blue-600 px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-100 transition-all">
                            Get Started
                        </button>
                    </div>
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
                </div>
            </div>
        </div>
    );
};

export default PoliciesLanding;