import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plus, ChevronRight, FileSearch, Loader2, X, Eye, ReceiptText, SearchX, Trash2, Edit2, CheckCircle2, AlertCircle } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import CryptoJS from 'crypto-js';

const Claims = () => {
    const navigate = useNavigate();
    const [filter, setFilter] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [userData, setUserData] = useState(null);
    const [claims, setClaims] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [editingClaimId, setEditingClaimId] = useState(null);
    const [selectedClaim, setSelectedClaim] = useState(null);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [newClaim, setNewClaim] = useState({ title: '', type: 'status', notes: '' });

    const SECRET_KEY = 'a9f4c32b71e8d96a5b0c4d3e2f1a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a';

    const encryptData = (data) => {
        const iv = CryptoJS.lib.WordArray.random(16);
        const encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), CryptoJS.enc.Hex.parse(SECRET_KEY.slice(0, 64)), {
            iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7
        });
        return CryptoJS.enc.Base64.stringify(iv.concat(encrypted.ciphertext));
    };

    const decryptData = (ciphertext) => {
        try {
            const rawData = CryptoJS.enc.Base64.parse(ciphertext);
            const iv = CryptoJS.lib.WordArray.create(rawData.words.slice(0, 4));
            const encrypted = CryptoJS.lib.WordArray.create(rawData.words.slice(4));
            const decrypted = CryptoJS.AES.decrypt({ ciphertext: encrypted }, CryptoJS.enc.Hex.parse(SECRET_KEY.slice(0, 64)), {
                iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7
            });
            return JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
        } catch (e) { return null; }
    };

    const fetchClaims = useCallback(async (userId, userRole = 'client') => {
        setLoading(true);

        try {
            const response = await fetch(
                `http://localhost/insurance-api/api/claims/index.php?user_id=${userId}&role=${userRole}`
            );

            const text = await response.text();

            if (!text) {
                throw new Error("Server responded with empty body");
            }

            const result = JSON.parse(text);

            if (result.data) {
                const decrypted = decryptData(result.data);
                setClaims(decrypted?.data || []);
            }
        } catch (e) {
            console.error("Fetch Error:", e);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');

        if (storedUser) {
            const user = JSON.parse(storedUser);

            setUserData(user);

            fetchClaims(
                user.id || user.user_id,
                user.role
            );
        } else {
            navigate('/login');
        }
    }, [navigate, fetchClaims]);

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const activeUserId =
            userData?.id ||
            userData?.user_id;

        const payload = encryptData({
            user_id: activeUserId,
            title: newClaim.title,
            type: newClaim.type,
            notes: newClaim.notes,
            status: 'Open'
        });

        try {
            const response = await fetch(
                'http://localhost/insurance-api/api/claims/index.php',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${userData?.token}`
                    },
                    body: JSON.stringify({ payload })
                }
            );

            const text = await response.text();

            console.log("Raw Server Response:", text);

            const result = JSON.parse(text);

            if (result.data) {
                const decrypted = decryptData(result.data);

                if (decrypted?.success) {
                    setIsModalOpen(false);

                    fetchClaims(
                        activeUserId,
                        userData?.role
                    );
                }
            }
        } catch (error) {
            console.error(
                "Submission failed:",
                error
            );
        }
    };

    const openEditModal = (claim) => {
        setIsEditMode(true);
        setEditingClaimId(claim.id);
        setNewClaim({
            title: claim.title || '',
            type: claim.type || 'status',
            notes: claim.decrypted_notes || ''
        });
        setIsModalOpen(true);
    };

    const handleUpdateStatus = async (claimId, currentStatus) => {
        const activeUserId = userData?.id || userData?.user_id || 2;
        const activeRole = userData?.role || 'client';
        const nextStatus = currentStatus === 'Open' ? 'Closed' : 'Open';

        try {
            const response = await fetch('http://localhost/insurance-api/api/claims/index.php', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    token: userData?.token,
                    id: claimId,
                    status: nextStatus
                })
            });
            const data = await response.json();
            if (data.success) {
                if (isDetailModalOpen && selectedClaim?.id === claimId) {
                    setSelectedClaim({ ...selectedClaim, status: nextStatus });
                }
                fetchClaims(activeUserId, activeRole, userData?.token);
            } else {
                alert(data.message || "Failed to alter statement status mapping.");
            }
        } catch (error) {
            alert("Network dependency synchronization dropped.");
        }
    };

    const handleDeleteClaim = async (claimId) => {
        if (!window.confirm("Delete this record?")) return;
        try {
            const response = await fetch(`http://localhost/insurance-api/api/claims/index.php?id=${claimId}`, { method: 'DELETE' });
            const data = await response.json();
            if (data.success) fetchClaims(userData?.id || userData?.user_id, userData?.role);
        } catch (e) { alert("Delete failed"); }
    };

    const filteredClaims = claims.filter(claim => {
        if (!claim) return false;

        const matchesFilter = filter === 'All' ||
            claim.status?.toLowerCase() === filter.toLowerCase();

        const matchesSearch = (
            claim.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            claim.status?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            claim.id?.toString().includes(searchQuery)
        );
        return matchesFilter && matchesSearch;
    });

    const openDetails = (claim) => {
        setSelectedClaim(claim);
        setIsDetailModalOpen(true);
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col lg:flex-row overflow-hidden font-sans">
            <Sidebar userDisplayName={userData?.full_name || userData?.username || 'User'} />

            <main className="flex-1 overflow-y-auto h-screen w-full">
                <header className="h-auto lg:h-16 bg-white border-b border-slate-200 flex flex-col lg:flex-row items-center justify-between px-6 py-4 lg:py-0 sticky top-0 z-30 gap-4">
                    <h1 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Claims Management Dashboard</h1>
                    <button
                        onClick={() => {
                            setIsEditMode(false);
                            setNewClaim({ title: '', type: 'status', notes: '' });
                            setIsModalOpen(true);
                        }}
                        className="w-full lg:w-auto flex items-center justify-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl text-[10px] font-black hover:bg-blue-700 transition shadow-lg shadow-blue-100 uppercase tracking-widest"
                    >
                        <Plus size={16} /> File New Claim
                    </button>
                </header>

                <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-6 md:space-y-8">
                    <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4">
                        <div className="bg-white p-1.5 rounded-2xl border border-slate-200 flex gap-1 shadow-sm overflow-x-auto no-scrollbar">
                            {['All', 'Open', 'Closed'].map((s) => (
                                <button
                                    key={s}
                                    onClick={() => setFilter(s)}
                                    className={`flex-1 md:flex-none px-5 md:px-8 py-2.5 rounded-xl text-[10px] font-black transition-all uppercase tracking-wider whitespace-nowrap ${filter === s ? 'bg-slate-900 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}
                                >
                                    {s}
                                </button>
                            ))}
                        </div>

                        <div className="relative w-full md:w-80">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <input
                                type="text"
                                placeholder="Search records..."
                                className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-xs font-bold focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-sm"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>

                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-24 text-slate-400">
                            <Loader2 className="animate-spin mb-4" size={40} />
                            <p className="font-bold text-[10px] uppercase tracking-[0.3em]">Syncing Records</p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {filteredClaims.length > 0 ? (
                                filteredClaims.map((claim) => (
                                    <div key={claim.id} className="bg-white p-4 md:p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 group border-l-4 border-l-transparent hover:border-l-blue-500">
                                        <div className="flex items-center gap-4 md:gap-5">
                                            <div className="shrink-0 w-12 h-12 md:w-14 md:h-14 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-500 transition-colors">
                                                <FileSearch size={22} />
                                            </div>
                                            <div className="min-w-0">
                                                <h4 className="font-bold text-slate-900 text-sm mb-1 truncate">{claim.title}</h4>
                                                <div className="flex flex-wrap items-center gap-2 md:gap-3">
                                                    <p className="text-[9px] md:text-[10px] font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap">
                                                        {claim.date_filed ? new Date(claim.date_filed).toLocaleDateString() : 'Just now'}
                                                    </p>
                                                    <span className="hidden xs:block w-1.5 h-1.5 bg-slate-200 rounded-full"></span>
                                                    <p className="text-[9px] md:text-[10px] font-bold text-blue-500 uppercase">ID: #{claim.id?.toString().padStart(4, '0')}</p>
                                                    <span className="hidden xs:block w-1.5 h-1.5 bg-slate-200 rounded-full"></span>
                                                    <p className="text-[9px] md:text-[10px] font-semibold text-slate-400">User Context UID: {claim.user_id}</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between sm:justify-end gap-3 border-t sm:border-none pt-3 sm:pt-0">
                                            <span className={`px-3 py-1.5 rounded-full text-[8px] md:text-[9px] font-black tracking-widest uppercase ${claim.status === 'Open' ? 'bg-orange-100 text-orange-600' : 'bg-green-100 text-green-600'}`}>
                                                {claim.status || 'Open'}
                                            </span>

                                            <div className="flex items-center gap-1.5">
                                                <button
                                                    onClick={() => openDetails(claim)}
                                                    className="flex items-center gap-1.5 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-[9px] font-black text-slate-600 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all tracking-widest uppercase"
                                                >
                                                    {claim.type === 'receipt' ? <ReceiptText size={13}/> : <Eye size={13}/>}
                                                    <span>View</span>
                                                </button>

                                                <button
                                                    onClick={() => openEditModal(claim)}
                                                    title="Edit Claim Details"
                                                    className="p-2 bg-slate-50 border border-slate-200 hover:bg-blue-50 text-slate-500 hover:text-blue-600 hover:border-blue-200 rounded-lg transition-all"
                                                >
                                                    <Edit2 size={13} />
                                                </button>

                                                <button
                                                    onClick={() => handleDeleteClaim(claim.id)}
                                                    title="Permanently Delete Claim"
                                                    className="p-2 bg-slate-50 border border-slate-200 hover:bg-red-50 text-slate-400 hover:text-red-600 hover:border-red-200 rounded-lg transition-all"
                                                >
                                                    <Trash2 size={13} />
                                                </button>

                                                <button onClick={() => openDetails(claim)} className="hidden sm:flex w-6 h-6 items-center justify-center text-slate-300 hover:text-blue-600 transition-colors">
                                                    <ChevronRight size={18} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-20 bg-white rounded-[2rem] border border-dashed border-slate-200 px-6">
                                    <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-50 rounded-full mb-4">
                                        <SearchX className="text-slate-300" size={30} />
                                    </div>
                                    <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-1">No claims match</h4>
                                    <p className="text-slate-400 font-bold uppercase tracking-tighter text-[10px]">Try adjusting your search or filters.</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {isModalOpen && (
                    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4">
                        <div className="bg-white w-full max-w-md rounded-t-[2rem] sm:rounded-3xl shadow-2xl p-6 md:p-8 space-y-6 animate-in slide-in-from-bottom sm:zoom-in-95 duration-300">
                            <div className="flex justify-between items-center">
                                <h3 className="font-black text-slate-900 uppercase tracking-widest text-xs">
                                    {isEditMode ? 'Modify / Edit Claim Record' : 'New Insurance Claim'}
                                </h3>
                                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-full transition"><X size={20}/></button>
                            </div>
                            <form onSubmit={handleFormSubmit} className="space-y-5">
                                <div className="space-y-1.5">
                                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-wider ml-1">Subject / Title</label>
                                    <input required type="text" className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 font-bold text-sm transition-all" placeholder="e.g. Vehicle Damage Report" value={newClaim.title} onChange={(e) => setNewClaim({...newClaim, title: e.target.value})} />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-wider ml-1">Category</label>
                                    <select className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-2xl outline-none font-bold text-sm cursor-pointer focus:ring-2 focus:ring-blue-500 transition-all appearance-none" value={newClaim.type} onChange={(e) => setNewClaim({...newClaim, type: e.target.value})}>
                                        <option value="status">General Status Update</option>
                                        <option value="action">Medical Action</option>
                                        <option value="receipt">Reimbursement (Receipt)</option>
                                    </select>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-wider ml-1">Incident Notes / Descriptions</label>
                                    <textarea className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 font-bold text-xs h-20 resize-none transition-all" placeholder="Provide incident background context..." value={newClaim.notes} onChange={(e) => setNewClaim({...newClaim, notes: e.target.value})} />
                                </div>
                                <button type="submit" className="w-full py-4.5 bg-blue-600 text-white font-black rounded-2xl uppercase tracking-widest text-[10px] shadow-lg shadow-blue-200 hover:bg-blue-700 active:scale-[0.98] transition-all">
                                    {isEditMode ? 'Update Record Changes' : 'Submit Application'}
                                </button>
                            </form>
                        </div>
                    </div>
                )}

                {/* MODAL: DETAILS VIEW */}
                {isDetailModalOpen && selectedClaim && (
                    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4">
                        <div className="bg-white w-full max-w-lg rounded-t-[2rem] sm:rounded-3xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom sm:zoom-in-95 duration-300">
                            <div className="p-6 md:p-8 space-y-6">
                                <div className="flex justify-between items-start">
                                    <div className="min-w-0 pr-4">
                                        <span className="px-2.5 py-1 bg-blue-50 text-blue-600 rounded-lg text-[8px] font-black uppercase tracking-widest mb-2 inline-block">
                                            Secure System Record
                                        </span>
                                        <h3 className="font-black text-slate-900 text-lg md:text-xl leading-tight">{selectedClaim.title}</h3>
                                    </div>
                                    <button onClick={() => setIsDetailModalOpen(false)} className="shrink-0 p-2 hover:bg-slate-100 rounded-full transition"><X size={20}/></button>
                                </div>

                                <div className="grid grid-cols-2 gap-4 md:gap-6 py-6 border-y border-slate-100">
                                    <DetailItem label="Status" value={selectedClaim.status || 'Open'} isBadge color={selectedClaim.status === 'Open' ? 'orange' : 'green'} />
                                    <DetailItem label="Date Filed" value={selectedClaim.date_filed ? new Date(selectedClaim.date_filed).toLocaleDateString() : 'N/A'} />
                                    <DetailItem label="Claim ID" value={`#${selectedClaim.id?.toString().padStart(4, '0')}`} />
                                    <DetailItem label="Type" value={selectedClaim.type ? selectedClaim.type.toUpperCase() : 'GENERAL'} />
                                </div>

                                <div className="space-y-2 bg-slate-50 p-5 rounded-2xl border border-slate-200">
                                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">
                                        Decrypted AES-256 Case Notes
                                    </label>
                                    <p className="text-xs md:text-sm text-slate-700 font-medium leading-relaxed italic">
                                        "{selectedClaim.decrypted_notes || "No statements attached."}"
                                    </p>
                                </div>

                                <div className="grid grid-cols-2 gap-3 pt-2">
                                    <button
                                        onClick={() => handleUpdateStatus(selectedClaim.id, selectedClaim.status)}
                                        className={`py-3.5 px-4 rounded-xl font-black text-[10px] tracking-widest uppercase border flex items-center justify-center gap-2 transition-all active:scale-[0.98] ${
                                            selectedClaim.status === 'Open'
                                                ? 'bg-emerald-600 border-emerald-600 text-white hover:bg-emerald-700'
                                                : 'bg-amber-600 border-amber-600 text-white hover:bg-amber-700'
                                        }`}
                                    >
                                        {selectedClaim.status === 'Open' ? <CheckCircle2 size={14}/> : <AlertCircle size={14}/>}
                                        {selectedClaim.status === 'Open' ? 'Mark as Closed' : 'Reopen Claim'}
                                    </button>
                                    <button
                                        onClick={() => handleDeleteClaim(selectedClaim.id)}
                                        className="py-3.5 px-4 bg-red-50 hover:bg-red-600 border border-red-200 hover:border-red-600 text-red-600 hover:text-white font-black rounded-xl uppercase tracking-widest text-[10px] flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
                                    >
                                        <Trash2 size={14}/>
                                        Delete Record
                                    </button>
                                </div>

                                <button
                                    onClick={() => setIsDetailModalOpen(false)}
                                    className="w-full py-4 bg-slate-900 text-white font-black rounded-2xl uppercase tracking-widest text-[10px] hover:bg-slate-800 transition-all active:scale-[0.98]"
                                >
                                    Close Dialog View
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

const DetailItem = ({ label, value, isBadge, color }) => (
    <div className="space-y-1">
        <p className="text-[9px] font-black text-slate-400 uppercase tracking-wider">{label}</p>
        {isBadge ? (
            <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-black uppercase ${color === 'orange' ? 'bg-orange-100 text-orange-600' : 'bg-green-100 text-green-600'}`}>
                {value}
            </span>
        ) : (
            <p className="text-xs md:text-sm font-bold text-slate-700">{value}</p>
        )}
    </div>
);

export default Claims;