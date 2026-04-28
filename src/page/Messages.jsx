import { useState } from 'react';
import {
    LayoutDashboard,
    FileText,
    Clock,
    CreditCard,
    MessageSquare,
    User,
    Search,
    Bell,
    Plus,
    Send,
    MoreHorizontal,
    HelpCircle,
    LogOut,
    ChevronUp,
    AlertCircle
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Messages = () => {
    const navigate = useNavigate();
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

    const handleLogout = () => {
        console.log("Logging out...");
        navigate('/login');
    };

    const contacts = [
        { id: 1, name: 'Support Agent - Mark', lastMsg: 'Your claim CL-102 has been...', time: '10:24 AM', active: true },
        { id: 2, name: 'Policy Advisor', lastMsg: 'Let me check the renewal options...', time: 'Yesterday', active: false },
        { id: 3, name: 'Billing Dept', lastMsg: 'Your payment was successful.', time: 'Oct 15', active: false },
    ];

    return (
        <div className="min-h-screen bg-slate-50 flex">
            {showLogoutConfirm && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" onClick={() => setShowLogoutConfirm(false)}></div>
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

            <aside className="w-64 bg-white border-r border-slate-200 hidden lg:flex flex-col sticky top-0 h-screen shrink-0">
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
                    <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm bg-blue-600 text-white shadow-lg shadow-blue-100 text-left">
                        <MessageSquare size={20}/> <span>Messages</span>
                    </button>
                    <Link to="/profiles" className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm text-slate-500 hover:bg-slate-50 hover:text-blue-600 transition-all">
                        <User size={20}/> <span>Profiles</span>
                    </Link>
                    <Link to="/help" className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm text-slate-500 hover:bg-slate-50 hover:text-blue-600 transition-all">
                        <HelpCircle size={20}/> <span>Help Center</span>
                    </Link>
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

            <main className="flex-1 flex flex-col h-screen overflow-hidden">
                <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shrink-0">
                    <h1 className="text-lg font-bold text-slate-800 uppercase tracking-tight">Messages</h1>
                    <div className="flex items-center gap-4">
                        <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-full transition relative">
                            <Bell size={20} />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                        </button>
                        <button className="bg-blue-600 text-white px-5 py-2 rounded-xl text-xs font-black hover:bg-blue-700 transition uppercase tracking-widest shadow-lg shadow-blue-100 flex items-center gap-2">
                            <Plus size={16}/> New Message
                        </button>
                    </div>
                </header>

                <div className="flex-1 flex overflow-hidden">
                    <div className="w-80 bg-white border-r border-slate-200 flex flex-col shrink-0">
                        <div className="p-4">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                <input type="text" placeholder="Search conversations..." className="w-full pl-10 pr-4 py-2 bg-slate-100 border-none rounded-xl text-xs outline-none" />
                            </div>
                        </div>
                        <div className="flex-1 overflow-y-auto divide-y divide-slate-50">
                            {contacts.map(c => (
                                <div key={c.id} className={`p-4 cursor-pointer hover:bg-slate-50 transition-colors ${c.active ? 'bg-blue-50/50 border-r-4 border-r-blue-600' : ''}`}>
                                    <div className="flex items-center gap-3 mb-1">
                                        <div className="w-10 h-10 bg-slate-200 rounded-full shrink-0"></div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex justify-between items-center">
                                                <p className="text-sm font-bold text-slate-900 truncate">{c.name}</p>
                                                <span className="text-[10px] text-slate-400 font-bold">{c.time}</span>
                                            </div>
                                            <p className="text-xs text-slate-500 truncate">{c.lastMsg}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex-1 flex flex-col bg-slate-50/30 overflow-hidden">
                        <div className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between shrink-0">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-slate-200 rounded-full"></div>
                                <p className="font-bold text-slate-900 text-sm">Support Agent - Mark</p>
                            </div>
                            <button className="text-slate-400 hover:text-slate-600 transition"><MoreHorizontal size={20}/></button>
                        </div>

                        {/* Example Messages History */}
                        <div className="flex-1 overflow-y-auto p-8 space-y-6">
                            <div className="flex gap-4 max-w-lg">
                                <div className="w-8 h-8 bg-slate-200 rounded-full shrink-0"></div>
                                <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                                    <p className="text-sm text-slate-700 leading-relaxed">Hi Justin! I've received your inquiry about Policy #POL-8821. How can I help you today?</p>
                                    <p className="text-[10px] text-slate-400 font-bold mt-2 uppercase tracking-tighter">10:20 AM</p>
                                </div>
                            </div>

                            <div className="flex gap-4 max-w-lg ml-auto flex-row-reverse">
                                <div className="w-8 h-8 bg-blue-600 rounded-full shrink-0 flex items-center justify-center text-white text-[10px] font-bold">JV</div>
                                <div className="bg-blue-600 p-4 rounded-2xl shadow-lg shadow-blue-100 text-white">
                                    <p className="text-sm leading-relaxed">Hello Mark, I just wanted to verify if the latest payment for this policy has been reflected in your system.</p>
                                    <p className="text-[10px] text-blue-100 font-bold mt-2 uppercase tracking-tighter">10:22 AM</p>
                                </div>
                            </div>

                            <div className="flex gap-4 max-w-lg">
                                <div className="w-8 h-8 bg-slate-200 rounded-full shrink-0"></div>
                                <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                                    <p className="text-sm text-slate-700 leading-relaxed">Let me check that for you. One moment please...</p>
                                    <p className="text-[10px] text-slate-400 font-bold mt-2 uppercase tracking-tighter">10:24 AM</p>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 bg-white border-t border-slate-200 shrink-0">
                            <div className="max-w-4xl mx-auto flex items-center gap-4 bg-slate-100 rounded-2xl p-2 px-4 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all">
                                <input type="text" placeholder="Type your messages here..." className="flex-1 bg-transparent border-none outline-none py-2 text-sm text-slate-700" />
                                <button className="w-10 h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center hover:bg-blue-700 transition shadow-lg shadow-blue-100">
                                    <Send size={18} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Messages;