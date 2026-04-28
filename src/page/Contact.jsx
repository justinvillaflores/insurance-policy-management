import React from 'react';
import { Mail, Phone, MapPin, Send, MessageCircle } from 'lucide-react';

const Contact = () => {
    return (
        <div className="min-h-screen bg-white pt-32 pb-20 px-6">
            <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-start">

                {/* Info */}
                <div className="space-y-10">
                    <div className="space-y-4">
                        <h2 className="text-blue-600 font-black text-xs uppercase tracking-[0.3em]">Contact Us</h2>
                        <h1 className="text-5xl font-black text-slate-900 leading-tight">
                            We’re Here to <br /> Help You.
                        </h1>
                        <p className="text-slate-500 text-lg leading-relaxed font-medium">
                            Have questions about a policy or a claim? Our dedicated support team is available 24/7 to assist you.
                        </p>
                    </div>

                    <div className="space-y-6">
                        <div className="flex items-center gap-6 p-6 rounded-3xl bg-slate-50 border border-slate-100">
                            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-blue-600 shadow-sm">
                                <Phone size={20} />
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Call Center</p>
                                <p className="text-lg font-bold text-slate-900">+1 (234) 567-890</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-6 p-6 rounded-3xl bg-slate-50 border border-slate-100">
                            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-blue-600 shadow-sm">
                                <Mail size={20} />
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Email Support</p>
                                <p className="text-lg font-bold text-slate-900">insureguard@gmail.com</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-6 p-6 rounded-3xl bg-slate-50 border border-slate-100">
                            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-blue-600 shadow-sm">
                                <MapPin size={20} />
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Headquarters</p>
                                <p className="text-lg font-bold text-slate-900">123 Gordon Ave, OC, NY 10001</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* contact form */}
                <div className="bg-white rounded-[3rem] p-10 border border-slate-200 shadow-2xl shadow-blue-900/5 relative">
                    <div className="mb-8 flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white">
                            <MessageCircle size={20} />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900">Send us a Message</h3>
                    </div>

                    <form className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase ml-1">Full Name</label>
                                <input type="text" placeholder="Justin Villaflores" className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl text-sm outline-none focus:ring-2 focus:ring-blue-600/20 transition-all" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase ml-1">Email Address</label>
                                <input type="email" placeholder="justin@example.com" className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl text-sm outline-none focus:ring-2 focus:ring-blue-600/20 transition-all" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase ml-1">Inquiry Type</label>
                            <select className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl text-sm outline-none focus:ring-2 focus:ring-blue-600/20 transition-all appearance-none">
                                <option>General Inquiry</option>
                                <option>Policy Questions</option>
                                <option>Claims Assistance</option>
                                <option>Billing & Payments</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase ml-1">Message</label>
                            <textarea placeholder="How can we help you?" rows="4" className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl text-sm outline-none focus:ring-2 focus:ring-blue-600/20 transition-all resize-none"></textarea>
                        </div>

                        <button type="submit" className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] shadow-lg shadow-blue-100 hover:bg-blue-700 hover:shadow-xl transition-all flex items-center justify-center gap-3">
                            Send Message <Send size={16} />
                        </button>
                    </form>
                </div>

            </div>
        </div>
    );
};

export default Contact;