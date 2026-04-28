import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Lock, User } from 'lucide-react';

const Login = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();
        // Frontend logic: kahit walang input, papasok na ito sa dashboard
        navigate('/dashboard');
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
            <div className="max-w-md w-full bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-100">
                <div className="p-10">
                    <div className="text-center mb-10 space-y-2">
                        <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white mx-auto mb-4 shadow-lg shadow-blue-100">
                            <span className="text-3xl font-black">I</span>
                        </div>
                        <h2 className="text-3xl font-black text-slate-900 tracking-tight">Client Portal</h2>
                        <p className="text-sm text-slate-500 font-medium tracking-tight">Access your insurance dashboard</p>
                    </div>

                    <form className="space-y-6" onSubmit={handleLogin}>
                        {/* Username Field */}
                        <div className="space-y-2">
                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Username / Email</label>
                            <div className="relative group">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={18} />
                                <input
                                    type="text"
                                    // TINANGGAL ANG 'required' DITO
                                    className="w-full pl-12 pr-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:border-blue-600 focus:bg-white focus:outline-none transition-all placeholder:text-slate-300 font-medium text-sm shadow-sm"
                                    placeholder="n.john@email.com"
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div className="space-y-2">
                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Password</label>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={18} />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    // TINANGGAL ANG 'required' DITO
                                    className="w-full pl-12 pr-12 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:border-blue-600 focus:bg-white focus:outline-none transition-all placeholder:text-slate-300 font-medium text-sm shadow-sm"
                                    placeholder="••••••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center justify-between px-1">
                            <label className="flex items-center gap-2 cursor-pointer group">
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                                />
                                <span className="text-xs font-bold text-slate-500 group-hover:text-slate-700 transition-colors">Remember me</span>
                            </label>
                            <button type="button" className="text-xs font-black text-blue-600 hover:text-blue-700 uppercase tracking-widest">
                                Forgot Password?
                            </button>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-slate-900 hover:bg-blue-600 text-white font-black py-5 rounded-2xl shadow-xl shadow-slate-200 transition-all active:scale-[0.98] mt-4 uppercase text-[10px] tracking-[0.2em]"
                        >
                            Sign In to Account
                        </button>
                    </form>

                    <div className="mt-10 text-center">
                        <p className="text-xs font-bold text-slate-400">
                            Don't have an account? <button className="text-blue-600 hover:underline">Contact your agent</button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;