import { useState } from 'react';
import {
    LayoutDashboard, FileText, Clock, CreditCard,
    MessageSquare, User, Search, Bell, Plus,
    ChevronRight, HelpCircle, LogOut, ChevronUp, AlertCircle
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

    const handleLogout = () => {
        console.log("Logging out...");
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-slate-50 flex">
            {/* logout confirmation */}
            {showLogoutConfirm && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"></div>

                    <div className="relative bg-white w-full max-w-sm rounded-3xl shadow-2xl p-8 border border-slate-100 animate-in zoom-in-95 duration-200">
                        <div className="flex flex-col items-center text-center">
                            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-4">
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
                </div>
            )}

            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-slate-200 hidden lg:flex flex-col sticky top-0 h-screen">
                <div className="p-6 border-b border-slate-100 flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">I</div>
                    <span className="text-xl font-bold text-slate-900">InsureGuard</span>
                </div>

                <nav className="flex-1 p-4 space-y-2 mt-4">
                    <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm bg-blue-600 text-white shadow-lg shadow-blue-100 text-left transition-all cursor-default">
                        <LayoutDashboard size={20}/> <span>Dashboard</span>
                    </button>
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
                    <Link to="/help" className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm text-slate-500 hover:bg-slate-50 hover:text-blue-600 transition-all">
                        <HelpCircle size={20}/> <span>Help Center</span>
                    </Link>
                </nav>

                {/* Interactive Profile Section */}
                <div className="p-4 border-t border-slate-100 relative">
                    {/* Logout Dropdown Toggle */}
                    {isProfileOpen && (
                        <div className="absolute bottom-20 left-4 right-4 bg-white border border-slate-200 rounded-2xl shadow-xl shadow-slate-200/50 p-2 z-50 animate-in fade-in slide-in-from-bottom-2">
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
                        <div className="flex items-center gap-3 overflow-hidden">
                            <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center text-[10px] font-black text-slate-500 shrink-0">JV</div>
                            <div className="text-left overflow-hidden">
                                <p className="text-sm font-bold text-slate-900 truncate">Justin M. V.</p>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Standard Plan</p>
                            </div>
                        </div>
                        <ChevronUp size={16} className={`text-slate-400 transition-transform ${isProfileOpen ? 'rotate-0' : 'rotate-180'}`} />
                    </button>
                </div>
            </aside>

            {/* Main content */}
            <main className="flex-1 overflow-y-auto">
                <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-30">
                    <h1 className="text-lg font-bold text-slate-800 uppercase tracking-tight">Dashboard</h1>
                    <div className="flex items-center gap-6">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <input type="text" placeholder="Search..." className="pl-10 pr-4 py-2 bg-slate-100 border-none rounded-xl text-sm focus:ring-2 focus:ring-blue-500 w-64 outline-none transition-all" />
                        </div>
                        <button className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-full transition">
                            <Bell size={20} />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                        </button>
                        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-100">
                            <Plus size={18} /> New Policy
                        </button>
                    </div>
                </header>

                <div className="p-8 max-w-6xl mx-auto space-y-8">
                    <div>
                        <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Welcome back, Justin!</h2>
                        <div className="w-20 h-1.5 bg-blue-600 rounded-full mt-2"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <StatCard label="ACTIVE POLICIES" value="3" sub="All current" color="blue" />
                        <StatCard label="PENDING CLAIMS" value="1" sub="In review" color="orange" />
                        <StatCard label="PAYMENT DUE" value="$145.50" sub="Due Apr 17" color="green" />
                    </div>

                    <section>
                        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Quick Actions</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <ActionButton label="FILE CLAIM" linkTo="/claims" />
                            <ActionButton label="RENEW" linkTo="/policies" />
                            <ActionButton label="PAY BILL" linkTo="/payments" />
                            <ActionButton label="ID CARD" linkTo="/dashboard" />
                        </div>
                    </section>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                                <h3 className="font-bold text-slate-900">Active Policies List</h3>
                                <Link to="/policies" className="text-xs font-bold text-blue-600 hover:underline px-3 py-1 bg-blue-50 rounded-lg transition uppercase">VIEW ALL</Link>
                            </div>
                            <div className="divide-y divide-slate-50">
                                <PolicyItem title="Life Insurance" id="POL-8821" status="ACTIVE" />
                                <PolicyItem title="Vehicle Shield" id="POL-4412" status="ACTIVE" />
                                <PolicyItem title="Home Protection" id="POL-0992" status="ACTIVE" />
                            </div>
                        </div>

                        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
                            <h3 className="font-bold text-slate-900 mb-6 border-b border-slate-100 pb-4">Recent Activity</h3>
                            <div className="space-y-6">
                                <ActivityItem text="Premium payment received" time="2 hours ago" />
                                <ActivityItem text="Claim #CL-102 updated" time="Yesterday" />
                                <ActivityItem text="New policy document added" time="3 days ago" />
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

const StatCard = ({ label, value, sub, color }) => {
    const colors = { blue: 'border-l-blue-600', orange: 'border-l-orange-500', green: 'border-l-green-500' };
    return (
        <div className={`bg-white p-6 rounded-3xl border border-slate-200 border-l-4 ${colors[color]} shadow-sm`}>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{label}</p>
            <p className="text-3xl font-black text-slate-900 mb-1">{value}</p>
            <p className="text-xs text-slate-500 font-bold">{sub}</p>
        </div>
    );
};

const ActionButton = ({ label, linkTo }) => (
    <Link to={linkTo} className="bg-white border border-slate-200 p-6 rounded-2xl flex flex-col items-center justify-center gap-3 hover:border-blue-600 hover:shadow-xl hover:shadow-blue-900/5 transition group text-center">
        <div className="w-12 h-12 bg-slate-100 rounded-full group-hover:bg-blue-50 transition flex items-center justify-center">
            <div className="w-5 h-5 bg-slate-300 rounded-full group-hover:bg-blue-400 transition-colors"></div>
        </div>
        <span className="text-[10px] font-black text-slate-600 tracking-widest uppercase">{label}</span>
    </Link>
);

const PolicyItem = ({ title, id, status }) => (
    <div className="p-6 flex items-center justify-between hover:bg-slate-50/50 transition cursor-pointer group">
        <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400 group-hover:text-blue-600 group-hover:bg-blue-50 transition-colors">
                <FileText size={20} />
            </div>
            <div>
                <p className="font-bold text-slate-900 text-sm">{title}</p>
                <p className="text-[10px] text-slate-400 font-bold uppercase">{id}</p>
            </div>
        </div>
        <div className="flex items-center gap-4 text-right">
            <span className="px-3 py-1 bg-green-100 text-green-700 text-[10px] font-black rounded-full uppercase tracking-widest">{status}</span>
            <ChevronRight size={16} className="text-slate-300" />
        </div>
    </div>
);

const ActivityItem = ({ text, time }) => (
    <div className="flex gap-4">
        <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5 shrink-0 ring-4 ring-blue-50"></div>
        <div>
            <p className="text-xs font-bold text-slate-800 leading-tight">{text}</p>
            <p className="text-[10px] text-slate-400 font-bold mt-1 uppercase">{time}</p>
        </div>
    </div>
);

export default Dashboard;