import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Download, CreditCard, Loader2, CheckCircle2,
    Search, X, ShieldCheck, SearchX, Plus, Printer, Mail
} from 'lucide-react';
import Sidebar from '../components/Sidebar';

const Payments = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    const [isAddMethodModalOpen, setIsAddMethodModalOpen] = useState(false);
    const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false);
    const [selectedPayment, setSelectedPayment] = useState(null);

    const API_BASE_URL = 'http://localhost/insurance-api/api/payments';

    const fetchPayments = async (userId, userToken = null) => {
        const tokenToUse = userToken || userData?.token;

        if (!tokenToUse) {
            console.warn("Security Token node is missing. Restricting fetch transaction.");
            setLoading(false);
            return;
        }

        setLoading(true);
        try {
            const response = await fetch(`${API_BASE_URL}/index.php?user_id=${userId}&token=${encodeURIComponent(tokenToUse)}&_t=${new Date().getTime()}`);

            const responseText = await response.text();
            try {
                const data = JSON.parse(responseText);
                if (data.success) {
                    setTransactions(data.payments);
                } else {
                    setTransactions([]);
                }
            } catch (jsonError) {
                console.error("Backend returned non-JSON payload structure:", responseText);
                setTransactions([]);
            }
        } catch (error) {
            console.error("Fetch error:", error);
            setTransactions([]);
        } finally {
            setLoading(false);
        }
    };

    const getActiveUserId = (user) => {
        if (!user) return 2;
        return user.id || user.uid || user.user_id || 2;
    };

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                const user = JSON.parse(storedUser);
                setUserData(user);
                fetchPayments(getActiveUserId(user), user.token);
            } catch (e) {
                console.error("Error identity structure parsing");
                navigate('/login');
            }
        } else {
            navigate('/login');
        }
    }, [navigate]);

    const handlePayNow = async (paymentId) => {
        if (!window.confirm("Proceed with payment?")) return;

        try {
            const response = await fetch(`${API_BASE_URL}/pay.php`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    paymentId: paymentId,
                    phone: 'N/A',
                    address: 'N/A'
                })
            });

            const result = await response.json();
            if (result.success) {
                alert("Payment successful!");
                fetchPayments(getActiveUserId(userData));
            } else {
                alert(result.message);
            }
        } catch (error) {
            console.error("Fetch Error:", error);
        }
    };

    const handleAddMethod = (e) => {
        e.preventDefault();
        alert("New Payment Method Linked Successfully!");
        setIsAddMethodModalOpen(false);
    };

    const openReceipt = (payment) => {
        setSelectedPayment(payment);
        setIsReceiptModalOpen(true);
    };

    const handleExport = () => {
        if (transactions.length === 0) return alert("No transactions to export.");
        const headers = "ID,Title,Amount,Status,Date\n";
        const rows = transactions.map(t => `${t.id},${t.title},${t.amount},${t.status},${t.transaction_date}`).join("\n");
        const blob = new Blob([headers + rows], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Transactions_${userData?.id || 'Export'}.csv`;
        a.click();
    };

    const filteredTransactions = transactions.filter(t =>
        t.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.status?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const totalDue = transactions
        .filter(t => t.status !== 'Paid')
        .reduce((sum, t) => sum + parseFloat(t.amount || 0), 0);

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col lg:flex-row overflow-hidden font-sans">
            <Sidebar userDisplayName={userData?.full_name || userData?.username || 'User'} />

            <main className="flex-1 overflow-y-auto h-screen bg-slate-50 w-full">
                <header className="h-auto lg:h-16 bg-white border-b border-slate-200 flex flex-col lg:flex-row items-center justify-between px-6 py-4 lg:py-0 sticky top-0 z-30 gap-4">
                    <h1 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Payments & Billing</h1>
                    <button
                        onClick={() => setIsAddMethodModalOpen(true)}
                        className="w-full lg:w-auto bg-blue-600 text-white px-5 py-2.5 rounded-xl text-[10px] font-black hover:bg-blue-700 transition uppercase tracking-widest shadow-lg shadow-blue-100 flex items-center justify-center gap-2"
                    >
                        <Plus size={14} /> Add Payment Method
                    </button>
                </header>

                <div className="p-4 md:p-8 max-w-6xl mx-auto space-y-6 lg:space-y-10">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                        <PaymentSummaryCard title="Total Due Now" amount={`₱${totalDue.toLocaleString('en-US', { minimumFractionDigits: 2 })}`} sub={totalDue > 0 ? "Outstanding Balance" : "No Pending Payments"} />
                        <PaymentSummaryCard title="Primary Method" amount="MASTERCARD **** 1212" sub="Default Linked Card" />
                        <div className="sm:col-span-2 lg:col-span-1">
                            <PaymentSummaryCard title="Auto-Pay Status" amount="ENABLED" sub="Next Cycle: Jun 01, 2026" isStatus />
                        </div>
                    </div>

                    <section className="space-y-6">
                        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                            <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest italic">Transaction History</h3>
                            <div className="flex flex-col sm:flex-row gap-3">
                                <div className="relative w-full sm:w-64 group">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={16} />
                                    <input
                                        type="text"
                                        placeholder="Search records..."
                                        className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </div>
                                <button onClick={handleExport} className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-[10px] font-black text-slate-500 uppercase tracking-widest hover:bg-slate-50 transition-colors">
                                    <Download size={14}/> Export CSV
                                </button>
                            </div>
                        </div>

                        {loading ? (
                            <div className="flex flex-col items-center py-20"><Loader2 className="animate-spin text-blue-600 mb-2" size={32} /></div>
                        ) : (
                            <div className="space-y-3 pb-8">
                                {filteredTransactions.length > 0 ? (
                                    filteredTransactions.map((t) => (
                                        <div key={t.id} className="bg-white p-4 md:p-5 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group hover:shadow-md transition-all">
                                            <div className="flex items-center gap-4 md:gap-5 w-full sm:w-auto">
                                                <div className={`shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center ${t.status === 'Paid' ? 'bg-green-50 text-green-600' : 'bg-slate-100 text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600'}`}>
                                                    {t.status === 'Paid' ? <CheckCircle2 size={18}/> : <CreditCard size={18} />}
                                                </div>
                                                <div className="overflow-hidden">
                                                    <h4 className="font-bold text-slate-900 text-sm truncate">{t.title}</h4>
                                                    <p className="text-[10px] font-bold text-slate-400 uppercase mt-0.5 tracking-tight">
                                                        {t.transaction_date ? new Date(t.transaction_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'N/A'}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-between sm:justify-end gap-4 md:gap-8 w-full sm:w-auto border-t sm:border-none pt-3 sm:pt-0">
                                                <span className="font-black text-slate-900 text-sm">₱{parseFloat(t.amount || 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                                                <div className="flex items-center gap-2 md:gap-3 w-full sm:w-auto">
                                                    <span className={`px-3 py-1 rounded-full text-[8px] md:text-[9px] font-black tracking-widest uppercase ${t.status === 'Paid' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'}`}>
                                                        {t.status}
                                                    </span>
                                                    <button onClick={() => t.status === 'Paid' ? openReceipt(t) : handlePayNow(t.id)} className={`flex-1 sm:flex-none px-4 md:px-5 py-2 rounded-lg text-[9px] md:text-[10px] font-black transition tracking-widest uppercase border ${t.status === 'Paid' ? 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50' : 'bg-blue-600 border-blue-600 text-white hover:bg-blue-700'}`}>
                                                        {t.status === 'Paid' ? 'View Receipt' : 'Pay Now'}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="bg-white py-16 md:py-20 rounded-[2rem] border border-dashed border-slate-200 flex flex-col items-center justify-center text-center px-6">
                                        <div className="bg-slate-50 p-5 rounded-full mb-4">
                                            <SearchX size={32} className="text-slate-300" />
                                        </div>
                                        <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest mb-1">No transactions found</h4>
                                        <p className="text-[10px] font-bold text-slate-400 mb-4">No insurance payment records associated with this session.</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </section>
                </div>

                {/* MODAL: ADD PAYMENT METHOD */}
                {isAddMethodModalOpen && (
                    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4">
                        <div className="bg-white w-full max-w-md rounded-t-[2rem] sm:rounded-3xl shadow-2xl p-6 md:p-8 space-y-6">
                            <div className="flex justify-between items-center">
                                <h3 className="font-black text-slate-900 uppercase tracking-widest text-xs">Link New Card</h3>
                                <button onClick={() => setIsAddMethodModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-full transition"><X size={20}/></button>
                            </div>
                            <form onSubmit={handleAddMethod} className="space-y-4">
                                <div className="space-y-1">
                                    <label className="text-[9px] font-black text-slate-500 uppercase tracking-wider">Card Holder Name</label>
                                    <input required type="text" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold outline-none" placeholder="Cardholder Name" />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[9px] font-black text-slate-500 uppercase tracking-wider">Card Number</label>
                                    <input required type="text" maxLength="19" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-mono outline-none" placeholder="0000 0000 0000 0000" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-[9px] font-black text-slate-500 uppercase tracking-wider">Expiry Date</label>
                                        <input required type="text" maxLength="5" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold outline-none" placeholder="MM/YY" />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[9px] font-black text-slate-500 uppercase tracking-wider">Security Code (CVV)</label>
                                        <input required type="password" maxLength="3" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold outline-none" placeholder="***" />
                                    </div>
                                </div>
                                <button type="submit" className="w-full py-4 bg-slate-900 text-white font-black rounded-2xl uppercase tracking-widest text-[10px] hover:bg-blue-600 transition-all mt-2">
                                    Securely Link Card
                                </button>
                            </form>
                        </div>
                    </div>
                )}

                {/* MODAL: OFFICIAL E-RECEIPT */}
                {isReceiptModalOpen && selectedPayment && (
                    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4 overflow-y-auto">
                        <div className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden my-8">
                            <div className="bg-slate-900 p-8 text-white flex justify-between items-start">
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <div className="w-6 h-6 bg-blue-600 rounded-lg flex items-center justify-center">
                                            <ShieldCheck size={14} />
                                        </div>
                                        <span className="font-black text-lg tracking-tighter uppercase italic">InsureGuard</span>
                                    </div>
                                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.2em]">Official Payment Receipt</p>
                                </div>
                                <button onClick={() => setIsReceiptModalOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition text-slate-400"><X size={20}/></button>
                            </div>

                            <div className="p-8 space-y-8">
                                <div className="grid grid-cols-2 gap-8 border-b border-slate-100 pb-8">
                                    <div className="space-y-3">
                                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Billed To</p>
                                        <div className="space-y-1">
                                            <p className="text-sm font-black text-slate-900">{userData?.full_name || 'Verified Client'}</p>
                                            <p className="text-[10px] font-bold text-slate-500 break-all">{userData?.username}</p>
                                            <p className="text-[10px] font-bold text-slate-400 uppercase">Olongapo City, PH</p>
                                        </div>
                                    </div>
                                    <div className="space-y-3 text-right">
                                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Invoice Details</p>
                                        <div className="space-y-1">
                                            <p className="text-[10px] font-bold text-slate-900">NO: <span className="font-black">#TRX-{selectedPayment.id?.toString().padStart(6, '0')}</span></p>
                                            <p className="text-[10px] font-bold text-slate-900">DATE: <span className="font-black">{selectedPayment.transaction_date ? new Date(selectedPayment.transaction_date).toLocaleDateString() : 'N/A'}</span></p>
                                            <p className="text-[10px] font-bold text-slate-900">METHOD: <span className="font-black uppercase">MASTERCARD</span></p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Description</p>
                                    <div className="flex justify-between items-center bg-slate-50 p-4 rounded-2xl">
                                        <div>
                                            <p className="text-sm font-black text-slate-900 uppercase italic tracking-tight">{selectedPayment.title}</p>
                                            <p className="text-[10px] font-bold text-slate-400">Insurance Premium Contribution</p>
                                        </div>
                                        <p className="text-sm font-black text-slate-900">₱{parseFloat(selectedPayment.amount || 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
                                    </div>
                                </div>

                                <div className="space-y-3 pt-4">
                                    <div className="flex justify-between text-[10px] font-bold text-slate-500 px-2">
                                        <span>Subtotal</span>
                                        <span>₱{parseFloat(selectedPayment.amount || 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                                    </div>
                                    <div className="flex justify-between bg-blue-50 p-4 rounded-2xl text-blue-600">
                                        <span className="font-black uppercase tracking-widest text-[10px]">Total Remitted</span>
                                        <span className="font-black text-lg tracking-tighter">₱{parseFloat(selectedPayment.amount || 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                                    </div>
                                </div>

                                <div className="text-center space-y-4 pt-4">
                                    <p className="text-[9px] font-bold text-slate-400 italic leading-relaxed uppercase tracking-tighter">
                                        This is a computer-generated transaction record. No wet signature required.
                                    </p>
                                    <div className="flex gap-2">
                                        <button onClick={() => window.print()} className="flex-1 py-3 bg-slate-900 text-white font-black rounded-xl uppercase tracking-widest text-[9px] flex items-center justify-center gap-2 hover:bg-slate-800 transition-all">
                                            <Printer size={14} /> Download PDF
                                        </button>
                                        <button type="button" onClick={() => alert('Receipt queued for email delivery.')} className="flex-1 py-3 border border-slate-200 text-slate-600 font-black rounded-xl uppercase tracking-widest text-[9px] flex items-center justify-center gap-2 hover:bg-slate-50 transition-all">
                                            <Mail size={14} /> Email Copy
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

const PaymentSummaryCard = ({ title, amount, sub, isStatus = false }) => (
    <div className="bg-white p-6 md:p-8 rounded-[2rem] border border-slate-200 shadow-sm space-y-3 md:space-y-4 hover:shadow-md transition-shadow">
        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{title}</p>
        <p className={`text-2xl md:text-3xl font-black truncate ${isStatus ? 'text-blue-600' : 'text-slate-900 italic'}`}>{amount}</p>
        <p className="text-[10px] md:text-xs font-bold text-slate-500">{sub}</p>
    </div>
);

export default Payments;