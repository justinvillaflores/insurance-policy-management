import { useState } from 'react';
import {
    LayoutDashboard, FileText, Clock, CreditCard,
    MessageSquare, User, Bell, HelpCircle, Search,
    Headphones, ShieldCheck, CreditCard as CardIcon, UserCircle,
    LogOut, ChevronUp, AlertCircle
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const HelpCenter = () => {
    const navigate = useNavigate();
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

    const handleLogout = () => {
        console.log("Logging out...");
        navigate('/login');
    };

    const categories = [
        { icon: <ShieldCheck className="text-blue-600" />, label: 'Policies' },
        { icon: <Clock className="text-blue-600" />, label: 'Claims' },
        { icon: <CardIcon className="text-blue-600" />, label: 'Payments' },
        { icon: <UserCircle className="text-blue-600" />, label: 'Account' },
    ];

    const faqs = [
        { q: 'How to renew my auto insurance policy?', desc: 'You can renew your policy directly from the policies tab 30 days before expiry...' },
        { q: 'What documents are needed for a claim?', desc: 'Standard requirements include a police report, photos of damage, and your ID...' },
        { q: 'Can I change my payment method?', desc: 'Yes, go to the Payments tab and select "Manage Methods" to update your card...' },
    ];

    return (
        <div className="min-h-screen bg-slate-50 flex">
            {showLogoutConfirm && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"></div>
                    <div className="relative bg-white w-full max-w-sm rounded-3xl shadow-2xl p-8 border border-slate-100 animate-in zoom-in-95 duration-200 text-center">
                        <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-4 mx-auto">
                            <AlertCircle size={32} className="text-red-500" />
                        </div>
                        <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight mb-2">Confirm Logout</h3>
                        <p className="text-sm text-slate-500 font-medium mb-8">Are you sure you want to log out of your account?</p>
                        <div className="flex flex-col w-full gap-3">
                            <button onClick={handleLogout} className="w-full py-4 bg-red-500 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-red-600 transition-all shadow-lg shadow-red-100">Yes, Log me out</button>
                            <button onClick={() => setShowLogoutConfirm(false)} className="w-full py-4 bg-slate-50 text-slate-500 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-slate-100 transition-all">Cancel</button>
                        </div>
                    </div>
                </div>
            )}

            <aside className="w-64 bg-white border-r border-slate-200 hidden lg:flex flex-col sticky top-0 h-screen">
                <div className="p-6 border-b border-slate-100 flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">I</div>
                    <span className="text-xl font-bold text-slate-900">InsureGuard</span>
                </div>
                <nav className="flex-1 p-4 space-y-2 mt-4">
                    <Link to="/dashboard" className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm text-slate-500 hover:bg-slate-50 hover:text-blue-600 transition-all">
                        <LayoutDashboard size={20}/> <span>Dashboard</span>
                    </Link>
                    <Link to="/policies" className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm text-slate-500 hover:bg-slate-50 hover:text-blue-600 transition-all">
                        <FileText size={20}/> <span>Policies</span>
                    </Link>
                    <Link to="/claims" className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm text-slate-500 hover:bg-slate-50 hover:text-blue-600 transition-all">
                        <Clock size={20}/> <span>Claims</span>
                    </Link>
                    <Link to="/payments" className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm text-slate-500 hover:bg-slate-50 hover:text-blue-600 transition-all">
                        <CreditCard size={20}/> <span>Payments</span>
                    </Link>
                    <Link to="/messages" className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm text-slate-500 hover:bg-slate-50 hover:text-blue-600 transition-all">
                        <MessageSquare size={20}/> <span>Messages</span>
                    </Link>
                    <Link to="/profiles" className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm text-slate-500 hover:bg-slate-50 hover:text-blue-600 transition-all">
                        <User size={20}/> <span>Profiles</span>
                    </Link>
                    <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm bg-blue-600 text-white shadow-lg shadow-blue-100 text-left cursor-default">
                        <HelpCircle size={20}/> <span>Help Center</span>
                    </button>
                </nav>

                <div className="p-4 border-t border-slate-100 relative">
                    {isProfileOpen && (
                        <div className="absolute bottom-20 left-4 right-4 bg-white border border-slate-200 rounded-2xl shadow-xl p-2 z-50 animate-in fade-in slide-in-from-bottom-2">
                            <button onClick={() => { setShowLogoutConfirm(true); setIsProfileOpen(false); }} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm text-red-500 hover:bg-red-50 transition-all text-left">
                                <LogOut size={18}/> <span>Sign Out</span>
                            </button>
                        </div>
                    )}
                    <button onClick={() => setIsProfileOpen(!isProfileOpen)} className={`w-full flex items-center justify-between p-2 rounded-2xl transition-all ${isProfileOpen ? 'bg-slate-100' : 'hover:bg-slate-50'}`}>
                        <div className="flex items-center gap-3 overflow-hidden text-left">
                            <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center text-[10px] font-black text-slate-500 shrink-0">JV</div>
                            <div className="overflow-hidden">
                                <p className="text-sm font-bold text-slate-900 truncate">Justin M. V.</p>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Standard Plan</p>
                            </div>
                        </div>
                        <ChevronUp size={16} className={`text-slate-400 transition-transform ${isProfileOpen ? 'rotate-0' : 'rotate-180'}`} />
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto">
                <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-30">
                    <h1 className="text-lg font-bold text-slate-800 uppercase tracking-tight">Help Center</h1>
                    <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-full transition"><Bell size={20} /></button>
                </header>

                <div className="p-8 max-w-5xl mx-auto space-y-12">
                    <div className="relative max-w-3xl mx-auto">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                        <input type="text" placeholder="Search for help, articles, and more..." className="w-full pl-12 pr-6 py-4 bg-white border border-slate-200 rounded-2xl shadow-sm text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
                    </div>

                    <div className="space-y-6">
                        <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] text-center">Categories</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {categories.map((cat, idx) => (
                                <button key={idx} className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-200 transition-all flex flex-col items-center gap-4 group">
                                    <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">{cat.icon}</div>
                                    <span className="text-xs font-black text-slate-700 uppercase tracking-widest">{cat.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-6">
                        <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Frequently Asked Questions</h3>
                        <div className="space-y-4">
                            {faqs.map((item, idx) => (
                                <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 flex items-center justify-between group hover:shadow-sm transition-all">
                                    <div className="space-y-1">
                                        <h4 className="font-bold text-slate-900 text-sm">{item.q}</h4>
                                        <p className="text-xs text-slate-500 max-w-2xl">{item.desc}</p>
                                    </div>
                                    <button className="px-5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-600 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all">Full Article</button>
                                </div>
                            ))}
                            <div className="bg-blue-600 p-8 rounded-3xl shadow-xl shadow-blue-100 flex flex-col md:flex-row items-center justify-between mt-8 gap-4">
                                <div className="text-white space-y-1 text-center md:text-left">
                                    <h4 className="font-bold text-lg">Still need help?</h4>
                                    <p className="text-sm text-blue-100">Our support agents are available 24/7 to assist you.</p>
                                </div>
                                <button className="px-8 py-3 bg-white text-blue-600 rounded-xl font-black text-xs uppercase tracking-widest flex items-center gap-2 hover:bg-blue-50 transition-colors">
                                    <Headphones size={18} /> Contact Support
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default HelpCenter;