import { useState, useContext } from 'react';
import {
    LayoutDashboard, FileText, Clock, CreditCard,
    MessageSquare, User, Users, HelpCircle, LogOut, ChevronUp, AlertCircle, Menu, X, PieChart
} from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Sidebar = () => {
    const { userData, logout } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();

    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleLogoutAction = () => {
        logout();
        navigate('/login');
    };

    const isActive = (path) => location.pathname === path;

    const navItems = [
        { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
        { to: '/policies', icon: FileText, label: 'Policies' },
        { to: '/claims', icon: Clock, label: 'Claims' },
        { to: '/payments', icon: CreditCard, label: 'Payments' },
        { to: '/messages', icon: MessageSquare, label: 'Messages' },
        { to: '/reports', icon: PieChart, label: 'Reports' }, // Idinagdag ang Reports
        { to: '/profiles', icon: User, label: 'Profiles' },
        { to: '/users', icon: Users, label: 'Users' },
        { to: '/help', icon: HelpCircle, label: 'Help Center' },
    ];

    const getCleanName = () => {
        if (userData?.full_name) return userData.full_name;

        const rawName = userData?.username || userData?.email || 'Admin Node';
        if (rawName.includes('@')) {
            const handle = rawName.split('@')[0];
            return handle
                .replace(/[._-]/g, ' ')
                .replace(/\b\w/g, (l) => l.toUpperCase());
        }
        return rawName;
    };

    const displayName = getCleanName();

    const getInitials = (name) => {
        const parts = name.trim().split(' ');
        if (parts.length >= 2) {
            return (parts[0][0] + parts[1][0]).toUpperCase();
        }
        return name.substring(0, 2).toUpperCase();
    };

    const avatarInitials = getInitials(displayName);

    return (
        <>
            {/* Mobile Toggle */}
            <div className="lg:hidden fixed top-4 left-4 z-[60]">
                <button
                    onClick={() => setIsMobileMenuOpen(true)}
                    className="p-3 bg-white border border-slate-200 rounded-xl shadow-sm text-slate-600"
                >
                    <Menu size={20} />
                </button>
            </div>

            {/* Logout Modal */}
            {showLogoutConfirm && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
                    <div className="bg-white w-full max-w-sm rounded-3xl shadow-2xl p-8 text-center animate-in zoom-in-95">
                        <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-4 mx-auto">
                            <AlertCircle size={32} className="text-red-500" />
                        </div>
                        <h3 className="text-xl font-black text-slate-900 uppercase mb-2">Logout?</h3>
                        <p className="text-sm text-slate-500 mb-8">Are you sure you want to sign out, {displayName}?</p>
                        <div className="flex flex-col gap-3">
                            <button onClick={handleLogoutAction} className="w-full py-4 bg-red-500 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-red-600 transition-all">Yes, Log out</button>
                            <button onClick={() => setShowLogoutConfirm(false)} className="w-full py-4 bg-slate-50 text-slate-500 rounded-2xl font-black text-[10px] uppercase tracking-widest">Cancel</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Mobile Backdrop */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[70] lg:hidden" onClick={() => setIsMobileMenuOpen(false)} />
            )}

            {/* Sidebar Content */}
            <aside className={`
                fixed inset-y-0 left-0 z-[80] w-64 bg-white border-r border-slate-200 flex flex-col h-screen transition-transform duration-300
                lg:sticky lg:translate-x-0
                ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            `}>
                <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">I</div>
                        <span className="text-xl font-bold text-slate-900">Insurance Policy</span>
                    </div>
                    <button onClick={() => setIsMobileMenuOpen(false)} className="lg:hidden p-2"><X size={20}/></button>
                </div>

                {/* Navigation Items */}
                <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                    {navItems.map((item) => (
                        <Link
                            key={item.to}
                            to={item.to}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${
                                isActive(item.to)
                                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-100'
                                    : 'text-slate-500 hover:bg-slate-50 hover:text-blue-600'
                            }`}
                        >
                            <item.icon size={20}/> <span>{item.label}</span>
                        </Link>
                    ))}
                </nav>

                {/* User Profile Footer */}
                <div className="p-4 border-t border-slate-100 relative bg-white">
                    {isProfileOpen && (
                        <div className="absolute bottom-20 left-4 right-4 bg-white border border-slate-200 rounded-2xl shadow-xl p-2 z-50 animate-in slide-in-from-bottom-2">
                            <button
                                onClick={() => { setShowLogoutConfirm(true); setIsProfileOpen(false); }}
                                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm text-red-500 hover:bg-red-50 transition-all"
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
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-[10px] font-black text-blue-600 shrink-0 uppercase">
                                {avatarInitials}
                            </div>
                            <div className="text-left overflow-hidden">
                                <p className="text-sm font-bold text-slate-900 truncate" title={displayName}>{displayName}</p>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest truncate">{userData?.username || 'Admin'}</p>
                            </div>
                        </div>
                        <ChevronUp size={16} className={`text-slate-400 transition-transform ${isProfileOpen ? 'rotate-0' : 'rotate-180'}`} />
                    </button>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;