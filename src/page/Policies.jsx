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
    Car,
    HelpCircle,
    LogOut,
    ChevronUp,
    AlertCircle
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Policies = () => {
    const navigate = useNavigate();
    const [filter, setFilter] = useState('All');
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

    const handleLogout = () => {
        console.log("Logging out...");
        navigate('/login');
    };

    const policyData = [
        { id: 1, type: 'Auto Insurance', model: 'TESLA MODEL 3', status: 'ACTIVE', color: 'green', premium: '$120.00' },
        { id: 2, type: 'Auto Insurance', model: 'TOYOTA FORTUNER', status: 'ACTIVE', color: 'green', premium: '$95.00' },
        { id: 3, type: 'Life Insurance', model: 'FAMILY PROTECTION', status: 'PENDING', color: 'orange', premium: '$45.00' },
        { id: 4, type: 'Property Shield', model: 'LUXURY CONDO UNIT', status: 'EXPIRED', color: 'red', premium: '$150.00' },
        { id: 5, type: 'Auto Insurance', model: 'HONDA CIVIC', status: 'ACTIVE', color: 'green', premium: '$80.00' },
        { id: 6, type: 'Travel Secure', model: 'GLOBAL EXPLORER', status: 'EXPIRED', color: 'red', premium: '$30.00' },
    ];

    const filteredPolicies = filter === 'All'
        ? policyData
        : policyData.filter(p => p.status === filter);

    return (
        <div className="min-h-screen bg-slate-50 flex">
            {showLogoutConfirm && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div
                        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
                        onClick={() => setShowLogoutConfirm(false)}
                    ></div>
                    <div className="relative bg-white w-full max-w-sm rounded-3xl shadow-2xl p-8 border border-slate-100 animate-in zoom-in-95 duration-200 text-center">
                        <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-4 mx-auto">
                            <AlertCircle size={32} className="text-red-500" />
                        </div>
                        <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight mb-2">Confirm Logout</h3>
                        <p className="text-sm text-slate-500 font-medium mb-8">Are you sure you want to log out of your account?</p>
                        <div className="flex flex-col w-full gap-3">
                            <button
                                onClick={handleLogout}
                                className="w-full py-4 bg-red-500 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-red-600 transition-all shadow-lg shadow-red-100"
                            >
                                Yes, Log me out
                            </button>
                            <button
                                onClick={() => setShowLogoutConfirm(false)}
                                className="w-full py-4 bg-slate-50 text-slate-500 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-slate-100 transition-all"
                            >
                                Cancel
                            </button>
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
                    <Link to="/dashboard" className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm text-slate-500 hover:bg-slate-50 hover:text-blue-600 transition-all text-left">
                        <LayoutDashboard size={20}/> <span>Dashboard</span>
                    </Link>
                    {/* Active State */}
                    <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm bg-blue-600 text-white shadow-lg shadow-blue-100 text-left">
                        <FileText size={20}/> <span>Policies</span>
                    </button>
                    <Link to="/claims" className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm text-slate-500 hover:bg-slate-50 hover:text-blue-600 transition-all text-left">
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
                    <Link to="/help" className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm text-slate-500 hover:bg-slate-50 hover:text-blue-600 transition-all">
                        <HelpCircle size={20}/> <span>Help Center</span>
                    </Link>
                </nav>

                <div className="p-4 border-t border-slate-100 relative">
                    {isProfileOpen && (
                        <div className="absolute bottom-20 left-4 right-4 bg-white border border-slate-200 rounded-2xl shadow-xl p-2 z-50 animate-in fade-in slide-in-from-bottom-2">
                            <button
                                onClick={() => {
                                    setShowLogoutConfirm(true);
                                    setIsProfileOpen(false);
                                }}
                                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm text-red-500 hover:bg-red-50 transition-all text-left"
                            >
                                <LogOut size={18}/> <span>Sign Out</span>
                            </button>
                        </div>
                    )}
                    <button
                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                        className={`w-full flex items-center justify-between p-2 rounded-2xl transition-all ${isProfileOpen ? 'bg-slate-100' : 'hover:bg-slate-50'}`}
                    >
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
                    <h1 className="text-lg font-bold text-slate-800">Policies</h1>
                    <div className="flex items-center gap-6">
                        <div className="relative hidden md:block">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <input
                                type="text"
                                placeholder="Search policies..."
                                className="pl-10 pr-4 py-2 bg-slate-100 border-none rounded-xl text-sm w-64 outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                            />
                        </div>
                        <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-full transition relative">
                            <Bell size={20} />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                        </button>
                        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-100">
                            <Plus size={18} /> New Policy
                        </button>
                    </div>
                </header>

                <div className="p-8 max-w-6xl mx-auto space-y-8">
                    {/* Tabs Filter */}
                    <div className="bg-white p-1.5 rounded-2xl border border-slate-200 w-fit flex gap-2 shadow-sm">
                        <TabButton label={`All (${policyData.length})`} active={filter === 'All'} onClick={() => setFilter('All')} />
                        <TabButton label="Active" active={filter === 'ACTIVE'} onClick={() => setFilter('ACTIVE')} />
                        <TabButton label="Pending" active={filter === 'PENDING'} onClick={() => setFilter('PENDING')} />
                        <TabButton label="Expired" active={filter === 'EXPIRED'} onClick={() => setFilter('EXPIRED')} />
                    </div>

                    <h2 className="text-xl font-bold text-slate-900 uppercase tracking-tight">
                        {filter === 'All' ? 'Your' : filter} Policies ({filteredPolicies.length})
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredPolicies.map((policy) => (
                            <PolicyCard key={policy.id} policy={policy} />
                        ))}
                    </div>

                    {filteredPolicies.length === 0 && (
                        <div className="text-center py-20">
                            <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">No matching policies found.</p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};


const TabButton = ({ label, active, onClick }) => (
    <button
        onClick={onClick}
        className={`px-6 py-2.5 rounded-xl text-[10px] font-black transition-all uppercase tracking-widest ${
            active ? 'bg-slate-900 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'
        }`}
    >
        {label}
    </button>
);

const PolicyCard = ({ policy }) => {
    const statusColors = {
        green: 'bg-green-100 text-green-700',
        orange: 'bg-orange-100 text-orange-700',
        red: 'bg-red-100 text-red-700'
    };

    return (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:shadow-blue-900/5 transition-all overflow-hidden flex flex-col group">
            <div className="p-6 flex justify-between items-start border-b border-slate-50">
                <div className="flex gap-4">
                    <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                        <Car size={24} />
                    </div>
                    <div>
                        <h3 className="font-bold text-slate-900 leading-tight text-sm">{policy.type}</h3>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1">{policy.model}</p>
                    </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-[10px] font-black tracking-widest ${statusColors[policy.color]}`}>
                    {policy.status}
                </span>
            </div>

            <div className="p-6 space-y-4 flex-1">
                <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Monthly Premium</span>
                    <span className="text-sm font-black text-slate-900">{policy.premium}</span>
                </div>
                <div className="space-y-2">
                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div
                            className={`h-full bg-blue-600 transition-all duration-1000 ${policy.status === 'EXPIRED' ? 'w-full bg-slate-300' : 'w-2/3'}`}
                        ></div>
                    </div>
                    <p className="text-[9px] font-bold text-slate-400 uppercase">Renewal Progress</p>
                </div>
            </div>

            <div className="p-4 bg-slate-50/50 border-t border-slate-100 flex justify-end gap-3">
                <button className="px-5 py-2 bg-white border border-slate-200 rounded-xl text-[10px] font-black text-slate-600 hover:bg-slate-100 transition tracking-widest uppercase">
                    Details
                </button>
            </div>
        </div>
    );
};

export default Policies;