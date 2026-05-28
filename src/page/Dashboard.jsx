import { useState, useEffect, useContext } from 'react';
import { Search, Plus, ExternalLink, SearchX, Shield, Users, Banknote, Clock, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Sidebar from '../components/Sidebar';

const Dashboard = () => {
    const navigate = useNavigate();
    const { userData } = useContext(AuthContext);

    const [policies, setPolicies] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);

    const [stats, setStats] = useState({
        totalPolicies: 0,
        activeUsers: 0,
        monthlyRevenue: 0,
        pendingClaims: 0
    });

    const fetchDashboardData = async () => {
        setLoading(true);
        try {
            const authToken = userData?.token || 'secure-admin-token';

            const policiesRes = await fetch(`http://localhost/insurance-api/api/admin/policies.php?token=${authToken}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });
            const policiesData = await policiesRes.json();
            let fetchedPolicies = policiesData.success && policiesData.data ? policiesData.data : [];
            setPolicies(fetchedPolicies);

            let registeredUsersCount = 0;
            try {
                const usersRes = await fetch(`http://localhost/insurance-api/api/users/index.php?token=${authToken}`, { method: 'GET' });
                const usersData = await usersRes.json();
                if (usersData.success && usersData.data) {
                    registeredUsersCount = usersData.data.length;
                } else {
                    registeredUsersCount = [...new Set(fetchedPolicies.map(p => p.client_email).filter(Boolean))].length;
                }
            } catch (e) {
                registeredUsersCount = [...new Set(fetchedPolicies.map(p => p.client_email).filter(Boolean))].length;
            }

            let openClaimsCount = 0;
            try {
                const claimsRes = await fetch(`http://localhost/insurance-api/api/reports/claims-status.php?token=${authToken}`, { method: 'GET' });
                const claimsData = await claimsRes.json();
                if (claimsData.success && claimsData.summary) {
                    const openRow = claimsData.summary.find(r => r.status && (r.status.toLowerCase() === 'open' || r.status.toLowerCase() === 'pending'));
                    openClaimsCount = openRow ? parseInt(openRow.total) : 0;
                }
            } catch (e) {
                openClaimsCount = 0;
            }

            let totalRevenue = 0;
            try {
                const revenueRes = await fetch(`http://localhost/insurance-api/api/reports/premium-collection.php?token=${authToken}`, { method: 'GET' });
                const revenueData = await revenueRes.json();
                if (revenueData.success && revenueData.report) {
                    totalRevenue = revenueData.report.reduce((sum, item) => sum + parseFloat(item.total_collected || 0), 0);
                } else {
                    totalRevenue = fetchedPolicies.filter(p => p.status === 'ACTIVE').reduce((sum, p) => sum + parseFloat(p.premium || 0), 0);
                }
            } catch (e) {
                totalRevenue = fetchedPolicies.filter(p => p.status === 'ACTIVE').reduce((sum, p) => sum + parseFloat(p.premium || 0), 0);
            }

            setStats({
                totalPolicies: fetchedPolicies.length,
                activeUsers: registeredUsersCount,
                monthlyRevenue: totalRevenue,
                pendingClaims: openClaimsCount
            });

        } catch (error) {
            console.error("Dashboard synchronization failure:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!userData) {
            navigate('/login');
            return;
        }
        fetchDashboardData();
    }, [userData, navigate]);

    const filteredPolicies = (Array.isArray(policies) ? policies : []).filter(p =>
            p && (
                p.type?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.model?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.id?.toString().includes(searchQuery) ||
                p.client_email?.toLowerCase().includes(searchQuery.toLowerCase())
            )
    );

    return (
        <div className="min-h-screen bg-slate-50 flex overflow-hidden relative font-sans">
            <Sidebar userDisplayName={userData?.full_name || userData?.username || 'Admin'} />
            <main className="flex-1 overflow-y-auto h-screen w-full bg-slate-50">
                <header className="h-auto lg:h-16 bg-white border-b border-slate-200 flex flex-col lg:flex-row items-center justify-between px-6 py-4 lg:py-0 sticky top-0 z-30 gap-4">
                    <h1 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] lg:block hidden">Dashboard Overview</h1>
                    <div className="flex items-center gap-3 w-full lg:w-auto">
                        <div className="relative flex-1 lg:w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                            <input
                                type="text"
                                placeholder="Search overview records..."
                                className="w-full pl-10 pr-4 py-2.5 bg-slate-100 border-none rounded-xl text-xs focus:ring-2 focus:ring-blue-500 outline-none font-bold"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <button onClick={() => navigate('/policies')} className="bg-blue-600 text-white px-4 py-2.5 rounded-xl text-xs font-bold hover:bg-blue-700 transition shadow-lg shrink-0">
                            <Plus size={16} /> <span className="hidden sm:inline">Manage Policies</span>
                        </button>
                    </div>
                </header>

                <div className="p-4 md:p-8 max-w-6xl mx-auto space-y-6 md:space-y-8">
                    <div>
                        <h2 className="text-2xl md:text-3xl font-black text-slate-900 uppercase tracking-tight">Welcome, Administrator!</h2>
                        <div className="w-16 h-1.5 bg-blue-600 rounded-full mt-2"></div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mt-10">
                        <StatCard title="Total Policies" value={stats.totalPolicies} icon={<Shield className="text-blue-600" size={20} />} trend="System Wide" />
                        <StatCard title="Active Users" value={stats.activeUsers} icon={<Users className="text-emerald-600" size={20} />} trend="Registered Clients" />
                        <StatCard title="Total Collection" value={`₱${Number(stats.monthlyRevenue).toLocaleString('en-US', { minimumFractionDigits: 2 })}`} icon={<Banknote className="text-orange-600" size={20} />} trend="Encrypted Store" />
                        <div onClick={() => navigate('/claims')} className="cursor-pointer">
                            <StatCard title="Pending Claims" value={stats.pendingClaims} icon={<Clock className="text-red-600" size={20} />} trend="Requires Review" />
                        </div>
                    </div>

                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-24 text-slate-400">
                            <Loader2 className="animate-spin mb-4" size={40} />
                            <p className="font-bold text-[10px] uppercase tracking-[0.3em]">Querying Engine Parameters...</p>
                        </div>
                    ) : (
                        <section className="space-y-4">
                            <div className="flex justify-between items-center">
                                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Recent Policy Records ({filteredPolicies.length})</h3>
                            </div>

                            <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden mb-10">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left border-collapse min-w-[750px]">
                                        <thead className="bg-slate-50/50 border-b border-slate-100">
                                        <tr>
                                            <th className="p-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Policy ID</th>
                                            <th className="p-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Client Assignment</th>
                                            <th className="p-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Coverage Type</th>
                                            <th className="p-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Premium Rate</th>
                                            <th className="p-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                                        </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-50">
                                        {filteredPolicies.length > 0 ? (
                                            filteredPolicies.map((policy) => (
                                                <tr key={policy.id} className="hover:bg-slate-50/50 transition-colors group text-sm">
                                                    <td className="p-5 text-xs font-bold text-blue-600">#POL-{policy.id?.toString().padStart(4, '0')}</td>
                                                    <td className="p-5 font-bold text-slate-900">
                                                        <span className="block">{policy.client_email || `User #${policy.user_id || 'Unknown'}`}</span>
                                                        <span className="text-[10px] text-slate-400 font-medium">UID Reference: #{policy.user_id}</span>
                                                    </td>
                                                    <td className="p-5 font-bold text-slate-700">
                                                        <span className="block">{policy.type}</span>
                                                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{policy.model}</span>
                                                    </td>
                                                    <td className="p-5 font-black text-slate-900">
                                                        {policy.decrypted_premium ? (
                                                            policy.decrypted_premium
                                                        ) : (
                                                            `₱${Number(policy.premium || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                                                        )}
                                                    </td>
                                                    <td className="p-5">
                                                        <span className={`px-3 py-1 text-[10px] font-black rounded-full uppercase tracking-wider ${policy.status === 'ACTIVE' ? 'bg-green-100 text-green-700' : policy.status === 'PENDING' ? 'bg-orange-100 text-orange-700' : 'bg-red-100 text-red-700'}`}>
                                                            {policy.status}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="5" className="p-12 text-center text-slate-400 uppercase tracking-widest font-black text-[10px]">
                                                    <SearchX size={32} className="mx-auto mb-2 text-slate-300" /> No records matched query parameters.
                                                </td>
                                            </tr>
                                        )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </section>
                    )}
                </div>
            </main>
        </div>
    );
};

const StatCard = ({ title, value, icon, trend }) => (
    <div className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm hover:shadow-md transition-all group h-full">
        <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-slate-50 rounded-2xl group-hover:bg-blue-50 transition-colors">{icon}</div>
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-tighter bg-slate-100 px-2 py-1 rounded-lg">Live</span>
        </div>
        <div className="space-y-1">
            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{title}</div>
            <p className="text-2xl font-black text-slate-900 italic leading-none">{value}</p>
        </div>
        <div className="mt-4 flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></div>
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{trend}</p>
        </div>
    </div>
);

export default Dashboard;