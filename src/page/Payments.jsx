import { useState } from 'react';
import {
    LayoutDashboard,
    FileText,
    Clock,
    CreditCard,
    MessageSquare,
    User,
    Bell,
    Download,
    Filter,
    HelpCircle,
    LogOut,
    ChevronUp,
    AlertCircle
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Payments = () => {
    const navigate = useNavigate();
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

    const handleLogout = () => {
        console.log("Logging out...");
        navigate('/login');
    };

    const transactions = [
        { id: 1, title: 'Auto Insurance Premium', date: 'Oct 24, 2023', amount: '$145.00', status: 'Due Soon', type: 'pay' },
        { id: 2, title: 'Life Insurance Monthly', date: 'Oct 01, 2023', amount: '$45.00', status: 'Paid', type: 'receipt' },
        { id: 3, title: 'Home Shield Protection', date: 'Sept 15, 2023', amount: '$150.00', status: 'Paid', type: 'receipt' },
        { id: 4, title: 'Vehicle Shield Add-on', date: 'Aug 20, 2023', amount: '$25.00', status: 'Paid', type: 'receipt' },
        { id: 5, title: 'Health Rider Premium', date: 'Aug 05, 2023', amount: '$60.00', status: 'Paid', type: 'receipt' },
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
                    <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm bg-blue-600 text-white shadow-lg shadow-blue-100 text-left">
                        <CreditCard size={20}/> <span>Payments</span>
                    </button>
                    <Link to="/messages" className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm text-slate-500 hover:bg-slate-50 hover:text-blue-600 transition-all">
                        <MessageSquare size={20}/> <span>Messages</span>
                    </Link>
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

            <main className="flex-1 overflow-y-auto">
                <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-30">
                    <h1 className="text-lg font-bold text-slate-800 uppercase tracking-tight">Payments & Billing</h1>
                    <div className="flex items-center gap-4">
                        <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-full transition"><Bell size={20} /></button>
                        <button className="bg-blue-600 text-white px-5 py-2 rounded-xl text-xs font-black hover:bg-blue-700 transition uppercase tracking-widest shadow-lg shadow-blue-100">Make a Payment</button>
                    </div>
                </header>

                <div className="p-8 max-w-6xl mx-auto space-y-10">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <PaymentSummaryCard title="Total Due Now" amount="$145.00" sub="Due Date: Oct 24, 2023" />
                        <PaymentSummaryCard title="Primary Method" amount="VISA **** 4242" sub="Manage Methods" />
                        <PaymentSummaryCard title="Auto-Pay" amount="ON" sub="Next draft: Oct 23, 2023" isStatus />
                    </div>

                    <section className="space-y-6">
                        <div className="flex justify-between items-end">
                            <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">Transaction History</h3>
                            <div className="flex gap-2">
                                <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-[10px] font-black text-slate-500 hover:bg-slate-50 transition uppercase tracking-widest"><Download size={14}/> Export</button>
                                <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-[10px] font-black text-slate-500 hover:bg-slate-50 transition uppercase tracking-widest"><Filter size={14}/> Filter</button>
                            </div>
                        </div>

                        <div className="space-y-3">
                            {transactions.map((t) => (
                                <div key={t.id} className="bg-white p-5 rounded-2xl border border-slate-200 flex items-center justify-between group hover:shadow-md transition-shadow">
                                    <div className="flex items-center gap-5">
                                        <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                                            <CreditCard size={20} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-slate-900 text-sm">{t.title}</h4>
                                            <p className="text-[10px] font-bold text-slate-400 uppercase mt-1 tracking-tight">{t.date}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-8">
                                        <span className="font-black text-slate-900 text-sm">{t.amount}</span>
                                        <div className="flex items-center gap-3">
                                            <span className={`px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase ${t.status === 'Paid' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'}`}>
                                                {t.status}
                                            </span>
                                            <button className="px-5 py-2 bg-white border border-slate-200 rounded-lg text-[10px] font-black text-slate-600 hover:bg-slate-50 transition tracking-widest uppercase">
                                                {t.type === 'pay' ? 'Pay Now' : 'Receipt'}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
};

const PaymentSummaryCard = ({ title, amount, sub, isStatus = false }) => (
    <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{title}</p>
        <p className={`text-3xl font-black ${isStatus ? 'text-blue-600' : 'text-slate-900'}`}>{amount}</p>
        <p className="text-xs font-bold text-slate-500 hover:text-blue-600 cursor-pointer transition-colors">{sub}</p>
    </div>
);

export default Payments;