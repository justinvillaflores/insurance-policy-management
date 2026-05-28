import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Plus, Loader2, X, Calendar, Info,
    ShieldCheck, Car, Heart, Home, Plane,
    CheckCircle2, FileText, Grid, List, Edit3, Trash2
} from 'lucide-react';
import Sidebar from '../components/Sidebar';
import CryptoJS from "crypto-js";

const Policies = () => {
    const navigate = useNavigate();
    const [filter, setFilter] = useState('All');
    const [viewMode, setViewMode] = useState('table'); // 'table' o 'grid' para sa Admin versatility
    const [userData, setUserData] = useState(null);
    const [policies, setPolicies] = useState([]);
    const [loading, setLoading] = useState(true);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [selectedPolicy, setSelectedPolicy] = useState(null);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

    const SECRET = "u9X!d2@kL0pQ7zWmR4tY8vBnC3sA6fGh";

    const [newPolicy, setNewPolicy] = useState({
        type: 'Auto Insurance',
        model: '',
        status: 'ACTIVE',
        premium: ''
    });

    const getPolicyMeta = (type) => {
        switch(type) {
            case 'Auto Insurance':
                return {
                    description: "Comprehensive coverage for vehicle damages, theft, and third-party liabilities.",
                    icon: <Car className="text-blue-500" size={20} />,
                    features: ["Collision Coverage", "Theft Protection", "Roadside Assistance"]
                };
            case 'Life Insurance':
                return {
                    description: "Financial security for your loved ones. Provides a tax-free death benefit.",
                    icon: <Heart className="text-red-500" size={20} />,
                    features: ["Term Life Benefit", "Critical Illness Cover", "Legacy Planning"]
                };
            case 'Property Shield':
                return {
                    description: "Protects your home and assets against fire, natural disasters, and burglary.",
                    icon: <Home className="text-emerald-500" size={20} />,
                    features: ["Fire & Natural Perils", "Home Content Cover", "Temporary Housing"]
                };
            case 'Travel Secure':
                return {
                    description: "Global protection for your trips. Covers medical emergencies abroad.",
                    icon: <Plane className="text-orange-500" size={20} />,
                    features: ["Emergency Medical", "Trip Cancellation", "Baggage Loss"]
                };
            default:
                return {
                    description: "Standard insurance protection plan tailored to your specific needs.",
                    icon: <ShieldCheck className="text-slate-500" size={20} />,
                    features: ["Standard Coverage", "Customer Support", "Easy Claims"]
                };
        }
    };

    const fetchPolicies = async () => {
        setLoading(true);

        try {
            const response = await fetch(
                "http://localhost/insurance-api/api/policies/index.php",
                {
                    method: "GET",
                    credentials: "include"
                }
            );

            const json = await response.json();

            const result = JSON.parse(atob(json.payload));

            if (result.success) {
                setPolicies(result.data);
            } else {
                setPolicies([]);
            }

        } catch (error) {
            console.error("Fetch error:", error);
            setPolicies([]);
        } finally {
            setLoading(false);
        }
    };

    const handleAddPolicy = async (e) => {
        e.preventDefault();
        setIsSaving(true);

        try {
            const response = await fetch(
                "http://localhost/insurance-api/api/policies/index.php",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                    body: JSON.stringify(newPolicy)
                }
            );

            const json = await response.json();

            const decoded = JSON.parse(atob(json.payload));

            if (decoded.success) {
                setIsModalOpen(false);

                // ✅ IMPORTANT: refresh list instead of using decoded.data
                await fetchPolicies();

            } else {
                alert(decoded.message);
            }

        } catch (error) {
            console.error(error);
            alert("Error saving policy");
        } finally {
            setIsSaving(false);
        }
    };

// 3. Iisang useEffect para sa initialization
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUserData(JSON.parse(storedUser));
            fetchPolicies(); // Tawagin ang function na walang arguments
        } else {
            navigate('/login');
        }
    }, [navigate]);

    const openDetails = (policy) => {
        setSelectedPolicy(policy);
        setIsDetailModalOpen(true);
    };

    const safePolicies = Array.isArray(policies) ? policies : [];
    const filteredPolicies = filter === 'All' ? safePolicies : safePolicies.filter(p => p && p.status === filter);

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col lg:flex-row overflow-hidden font-sans">
            <Sidebar userDisplayName={userData?.full_name || 'Admin'} />

            <main className="flex-1 overflow-y-auto h-screen w-full">
                <header className="h-auto lg:h-16 bg-white border-b border-slate-200 flex flex-col lg:flex-row items-center justify-between px-6 py-4 lg:py-0 sticky top-0 z-30 gap-4">
                    <div className="flex items-center gap-4 w-full lg:w-auto justify-between lg:justify-start">
                        <h1 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">System Insurance Policies (Admin)</h1>
                        <div className="bg-slate-100 p-1 rounded-xl flex gap-1">
                            <button onClick={() => setViewMode('table')} className={`p-1.5 rounded-lg transition-colors ${viewMode === 'table' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`} title="Table View"><List size={16}/></button>
                            <button onClick={() => setViewMode('grid')} className={`p-1.5 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`} title="Grid Cards View"><Grid size={16}/></button>
                        </div>
                    </div>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="w-full lg:w-auto flex items-center justify-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl text-[10px] font-black hover:bg-blue-700 transition shadow-lg shadow-blue-100 uppercase tracking-widest"
                    >
                        <Plus size={16} /> New Policy Blueprint
                    </button>
                </header>

                <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6">
                    <div className="overflow-x-auto no-scrollbar">
                        <div className="bg-white p-1.5 rounded-2xl border border-slate-200 w-fit flex gap-1 shadow-sm">
                            {['All', 'ACTIVE', 'PENDING', 'EXPIRED'].map((f) => (
                                <button
                                    key={f}
                                    onClick={() => setFilter(f)}
                                    className={`px-4 sm:px-6 py-2.5 rounded-xl text-[9px] sm:text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${filter === f ? 'bg-slate-900 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}
                                >
                                    {f === 'All' ? `All Plans (${safePolicies.length})` : f}
                                </button>
                            ))}
                        </div>
                    </div>

                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-24 text-slate-400">
                            <Loader2 className="animate-spin mb-4" size={40} />
                            <p className="font-bold text-[10px] uppercase tracking-[0.3em]">Syncing Records</p>
                        </div>
                    ) : viewMode === 'table' ? (
                        /* ADMIN MANAGEMENT TABLE VIEW */
                        <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                    <tr className="bg-slate-50 border-b border-slate-200 text-[9px] font-black text-slate-400 uppercase tracking-widest">
                                        <th className="p-5">Plan ID</th>
                                        <th className="p-5">Type / Category</th>
                                        <th className="p-5">Coverage Name</th>
                                        <th className="p-5">Monthly Premium</th>
                                        <th className="p-5">System Status</th>
                                        <th className="p-5 text-right">Actions</th>
                                    </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100 text-xs font-bold text-slate-700">
                                    {filteredPolicies.map((policy) => (
                                        <tr key={policy.id} className="hover:bg-slate-50/80 transition-colors">
                                            <td className="p-5 font-mono text-slate-400">#INS-{policy.id}</td>
                                            <td className="p-5">
                                                <div className="flex items-center gap-2">
                                                    {getPolicyMeta(policy.type).icon}
                                                    <span>{policy.type}</span>
                                                </div>
                                            </td>
                                            <td className="p-5 text-slate-900 font-extrabold">{policy.model || 'Standard Edition'}</td>
                                            <td className="p-5 text-slate-900 font-black">
                                                {policy.decrypted_premium ? policy.decrypted_premium : `₱${Number(policy.premium || 0).toLocaleString(undefined, {minimumFractionDigits: 2})}`}
                                            </td>
                                            <td className="p-5">
                                                    <span className={`px-2.5 py-1 rounded-full text-[8px] font-black tracking-widest ${policy.status === 'ACTIVE' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                                                        {policy.status}
                                                    </span>
                                            </td>
                                            <td className="p-5 text-right">
                                                <div className="flex justify-end gap-2">
                                                    <button onClick={() => openDetails(policy)} className="p-2 bg-slate-50 hover:bg-slate-900 hover:text-white rounded-lg transition-colors border border-slate-200 text-slate-500 font-black text-[10px] px-3 uppercase tracking-wider">View</button>
                                                    <button onClick={() => alert('Editing feature integration via dashboard hook...')} className="p-2 bg-blue-50 hover:bg-blue-600 hover:text-white rounded-lg text-blue-600 transition-colors"><Edit3 size={14}/></button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ) : (
                        /* GRID LAYOUT (PANG-REVIEW NG MGA CARDS) */
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {filteredPolicies.map((policy) => (
                                <div key={policy.id} className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col group hover:shadow-md transition-all">
                                    <div className="p-6 flex justify-between items-start">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-slate-50 rounded-xl">{getPolicyMeta(policy.type).icon}</div>
                                            <div>
                                                <h3 className="font-bold text-slate-900 text-sm leading-tight">{policy.type}</h3>
                                                <p className="text-[9px] text-slate-400 font-black uppercase mt-0.5">{policy.model}</p>
                                            </div>
                                        </div>
                                        <span className={`px-2.5 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest ${policy.status === 'ACTIVE' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>{policy.status}</span>
                                    </div>
                                    <div className="px-6 pb-4 flex-1">
                                        <p className="text-[10px] text-slate-400 leading-relaxed line-clamp-2">{getPolicyMeta(policy.type).description}</p>
                                        <div className="bg-slate-50 p-3 rounded-xl flex justify-between items-center mt-3 border border-slate-100">
                                            <span className="text-[8px] font-black text-slate-400 uppercase tracking-wider">Premium Rate</span>
                                            <span className="text-xs font-black text-slate-900">{policy.decrypted_premium || `₱${Number(policy.premium || 0).toLocaleString()}`}</span>
                                        </div>
                                    </div>
                                    <div className="p-3 bg-slate-50 border-t border-slate-100">
                                        <button onClick={() => openDetails(policy)} className="w-full py-2 bg-white border border-slate-200 rounded-lg text-[9px] font-black uppercase text-slate-600 hover:bg-slate-900 hover:text-white transition-all">Full View</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {!loading && filteredPolicies.length === 0 && (
                        <div className="text-center py-20 bg-white rounded-[2rem] border border-dashed border-slate-200">
                            <Info className="mx-auto text-slate-300 mb-2" size={32} />
                            <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest">No matching blueprints found.</h4>
                        </div>
                    )}
                </div>

                {/* MODAL: ADD POLICY */}
                {isModalOpen && (
                    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
                        <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden">
                            <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                                <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest">Create System Policy</h3>
                                <button onClick={() => setIsModalOpen(false)} className="p-1.5 hover:bg-slate-200 rounded-full transition text-slate-400"><X size={16}/></button>
                            </div>
                            <form onSubmit={handleAddPolicy} className="p-6 space-y-4">
                                <div className="space-y-1">
                                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-wider">Insurance Category</label>
                                    <select className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold outline-none" value={newPolicy.type} onChange={(e) => setNewPolicy({...newPolicy, type: e.target.value})}>
                                        <option>Auto Insurance</option>
                                        <option>Life Insurance</option>
                                        <option>Property Shield</option>
                                        <option>Travel Secure</option>
                                    </select>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-wider">Coverage Plan Name</label>
                                    <input required placeholder="e.g. Platinum Family Tier" type="text" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold outline-none" value={newPolicy.model} onChange={(e) => setNewPolicy({...newPolicy, model: e.target.value})} />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-[9px] font-black text-slate-400 uppercase tracking-wider">Monthly Premium (PHP)</label>
                                        <input required type="number" placeholder="5000" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold outline-none" value={newPolicy.premium} onChange={(e) => setNewPolicy({...newPolicy, premium: e.target.value})} />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[9px] font-black text-slate-400 uppercase tracking-wider">Status</label>
                                        <select className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold outline-none" value={newPolicy.status} onChange={(e) => setNewPolicy({...newPolicy, status: e.target.value})}>
                                            <option value="ACTIVE">ACTIVE</option>
                                            <option value="PENDING">PENDING</option>
                                        </select>
                                    </div>
                                </div>
                                <button type="submit" disabled={isSaving} className="w-full py-3.5 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-blue-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-100">
                                    {isSaving ? <Loader2 className="animate-spin" size={14}/> : "Publish Plan"}
                                </button>
                            </form>
                        </div>
                    </div>
                )}

                {/* MODAL: DETAILS */}
                {isDetailModalOpen && selectedPolicy && (
                    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
                        <div className="bg-white w-full max-w-md rounded-[2rem] shadow-2xl overflow-hidden">
                            <div className="bg-slate-900 p-6 text-white flex justify-between items-center">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-white/10 rounded-xl">{getPolicyMeta(selectedPolicy.type).icon}</div>
                                    <h3 className="font-black text-sm uppercase tracking-wider">{selectedPolicy.type}</h3>
                                </div>
                                <button onClick={() => setIsDetailModalOpen(false)} className="text-white/60 hover:text-white"><X size={18}/></button>
                            </div>
                            <div className="p-6 space-y-4">
                                <div className="space-y-1">
                                    <p className="text-[9px] font-black text-slate-400 uppercase">Coverage Description</p>
                                    <p className="text-xs text-slate-600 font-bold leading-relaxed">{getPolicyMeta(selectedPolicy.type).description}</p>
                                </div>
                                <div className="border-t border-slate-100 pt-3 grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-[9px] font-black text-slate-400 uppercase">Plan Level</p>
                                        <p className="text-xs font-extrabold text-slate-900">{selectedPolicy.model || 'Standard'}</p>
                                    </div>
                                    <div>
                                        <p className="text-[9px] font-black text-slate-400 uppercase">Cost Summary</p>
                                        <p className="text-xs font-black text-blue-600">{selectedPolicy.decrypted_premium || `₱${Number(selectedPolicy.premium || 0).toLocaleString()}`}</p>
                                    </div>
                                </div>
                                <button onClick={() => setIsDetailModalOpen(false)} className="w-full mt-2 py-3 bg-slate-900 text-white font-black text-[9px] uppercase tracking-widest rounded-xl hover:bg-slate-800 transition-colors">Close Control View</button>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default Policies;