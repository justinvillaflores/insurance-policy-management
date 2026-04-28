import { useState } from 'react';
import {
    LayoutDashboard, FileText, Clock, CreditCard,
    MessageSquare, User, Search, Bell, Plus,
    ChevronRight, FileSearch, HelpCircle,
    LogOut, ChevronUp, AlertCircle
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Claims = () => {
    const navigate = useNavigate();
    const [filter, setFilter] = useState('All');
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

    const handleLogout = () => {
        console.log("Logging out...");
        navigate('/login');
    };

    const claimsData = [
        { id: 1, title: 'Vehicle Damage Claim', date: 'Oct 24, 2023', status: 'Open', type: 'status' },
        { id: 2, title: 'Medical Reimbursement', date: 'Oct 20, 2023', status: 'Open', type: 'action' },
        { id: 3, title: 'Home Maintenance Claim', date: 'Sept 15, 2023', status: 'Closed', type: 'receipt' },
        { id: 4, title: 'Travel Delay Claim', date: 'Aug 02, 2023', status: 'Closed', type: 'receipt' },
        { id: 5, title: 'Emergency Roadside Assist', date: 'Nov 05, 2023', status: 'Open', type: 'status' },
        { id: 6, title: 'Property Damage (Flood)', date: 'Nov 12, 2023', status: 'Open', type: 'action' },
        { id: 7, title: 'Hospitalization Cash', date: 'July 10, 2023', status: 'Closed', type: 'receipt' },
    ];

    const filteredClaims = filter === 'All'
        ? claimsData
        : claimsData.filter(claim => claim.status === filter);

    return (
        <div className="min-h-screen bg-slate-50 flex">
            {/* Logout modal */}
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

            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-slate-200 hidden lg:flex flex-col sticky top-0 h-screen">
                <div className="p-6 border-b border-slate-100 flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">I</div>
                    <span className="text-xl font-bold text-slate-900">InsureGuard</span>
                </div>

                <nav className="flex-1 p-4 space-y-2 mt-4">
                    <Link to="/dashboard" className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm text-slate-500 hover:bg-slate-50 hover:text-blue-600 transition-all">
                        <LayoutDashboard size={20}/> <span>Dashboard</span>
                    </Link>
                    <Link to="/policies" className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm text-slate-500 hover:bg-slate-50 hover:text-blue-600 transition-all text-left">
                        <FileText size={20}/> <span>Policies</span>
                    </Link>
                    <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm bg-blue-600 text-white shadow-lg shadow-blue-100 text-left">
                        <Clock size={20}/> <span>Claims</span>
                    </button>
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
                    <h1 className="text-lg font-bold text-slate-800">Claims</h1>
                    <div className="flex items-center gap-6">
                        <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-full transition"><Bell size={20} /></button>
                        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-100"><Plus size={18} /> File New Claim</button>
                    </div>
                </header>

                <div className="p-8 max-w-5xl mx-auto space-y-8">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div className="bg-white p-1.5 rounded-2xl border border-slate-200 flex gap-2 shadow-sm">
                            <TabButton label={`All (${claimsData.length})`} active={filter === 'All'} onClick={() => setFilter('All')} />
                            <TabButton label={`Open (${claimsData.filter(c => c.status === 'Open').length})`} active={filter === 'Open'} onClick={() => setFilter('Open')} />
                            <TabButton label={`Closed (${claimsData.filter(c => c.status === 'Closed').length})`} active={filter === 'Closed'} onClick={() => setFilter('Closed')} />
                        </div>
                        <div className="relative w-full md:w-80">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <input type="text" placeholder="Search claims..." className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 transition-all outline-none" />
                        </div>
                    </div>
                    <div className="space-y-4">
                        {filteredClaims.length > 0 ? (
                            filteredClaims.map((claim) => <ClaimRow key={claim.id} claim={claim} />)
                        ) : (
                            <div className="text-center py-20 text-slate-400 font-bold uppercase tracking-widest text-xs">No claims found.</div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

const TabButton = ({ label, active, onClick }) => (
    <button onClick={onClick} className={`px-6 py-2 rounded-xl text-[10px] font-black transition-all uppercase tracking-wider ${active ? 'bg-slate-900 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}>
        {label}
    </button>
);

const ClaimRow = ({ claim }) => (
    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex items-center justify-between group">
        <div className="flex items-center gap-5">
            <div className="w-14 h-14 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-500 transition-colors"><FileSearch size={24} /></div>
            <div>
                <h4 className="font-bold text-slate-900 text-sm mb-1">{claim.title}</h4>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{claim.date}</p>
            </div>
        </div>
        <div className="flex items-center gap-3">
            <span className={`px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase ${claim.status === 'Open' ? 'bg-orange-100 text-orange-600' : 'bg-green-100 text-green-600'}`}>
                {claim.status}
            </span>
            <button className="px-5 py-2 bg-white border border-slate-200 rounded-lg text-[10px] font-black text-slate-600 hover:bg-slate-50 transition tracking-widest uppercase">
                {claim.type === 'receipt' ? 'View Receipt' : 'Details'}
            </button>
            <div className="w-8 h-8 flex items-center justify-center text-slate-300"><ChevronRight size={20} /></div>
        </div>
    </div>
);

export default Claims;