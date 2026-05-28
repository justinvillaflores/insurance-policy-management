import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Bell, Search, Headphones, ShieldCheck,
    CreditCard as CardIcon, UserCircle, Clock,
    X, MessageSquare, Phone, Mail, ChevronRight
} from 'lucide-react';
import Sidebar from '../components/Sidebar';

const HelpCenter = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    // Modal States
    const [selectedFaq, setSelectedFaq] = useState(null);
    const [isContactModalOpen, setIsContactModalOpen] = useState(false);

    // AUTH GUARD
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                setUserData(JSON.parse(storedUser));
            } catch (error) {
                localStorage.clear();
                navigate('/login');
            }
        } else {
            navigate('/login');
        }
    }, [navigate]);

    const getFullDisplayName = () => userData?.full_name || userData?.username || 'User';

    const categories = [
        { icon: <ShieldCheck className="text-blue-600" />, label: 'Policies', path: '/policies' },
        { icon: <Clock className="text-blue-600" />, label: 'Claims', path: '/claims' },
        { icon: <CardIcon className="text-blue-600" />, label: 'Payments', path: '/payments' },
        { icon: <UserCircle className="text-blue-600" />, label: 'Account', path: '/profile' },
    ];

    const faqs = [
        {
            q: 'How to renew my auto insurance policy?',
            desc: 'You can renew your policy directly from the policies tab 30 days before expiry.',
            full: 'To renew, go to the Policies section, find your expiring policy, and click the "Renew" button. You can pay via credit card, bank transfer, or e-wallet. Once paid, your new policy document will be generated instantly.'
        },
        {
            q: 'What documents are needed for a claim?',
            desc: 'Standard requirements include a police report, photos of damage, and your ID.',
            full: 'For a smooth process, prepare: 1. A valid government ID, 2. Incident report or Police report, 3. Clear photos of the vehicle damage, and 4. A copy of your insurance policy. Upload these in the Claims tab.'
        },
        {
            q: 'Can I change my payment method?',
            desc: 'Yes, go to the Payments tab and select "Add Payment Method" to update your card.',
            full: 'We support major credit cards and digital wallets. Simply navigate to the Payments section, click on "Add Payment Method" at the top right, and enter your new card details. You can set it as your primary billing method.'
        },
    ];

    // Real-time Search Filter
    const filteredFaqs = faqs.filter(faq =>
        faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.desc.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-slate-50 flex overflow-hidden font-sans text-slate-900">
            <Sidebar userDisplayName={getFullDisplayName()} />

            <main className="flex-1 overflow-y-auto h-screen">
                <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-30">
                    <h1 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em]">Help Center</h1>
                    <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-full transition relative">
                        <Bell size={20} />
                        <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                    </button>
                </header>

                <div className="p-8 max-w-5xl mx-auto space-y-12">
                    {/* Hero Search Section */}
                    <div className="text-center space-y-6 pt-4">
                        <div className="space-y-2">
                            <h2 className="text-4xl font-black text-slate-900 uppercase tracking-tight">How can we help?</h2>
                            <p className="text-sm text-slate-500 font-bold uppercase tracking-widest">Support Portal & Knowledge Base</p>
                        </div>
                        <div className="relative max-w-2xl mx-auto">
                            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                            <input
                                type="text"
                                placeholder="Search for help, articles, and more..."
                                className="w-full pl-14 pr-6 py-5 bg-white border border-slate-200 rounded-[2rem] shadow-xl shadow-slate-200/50 text-sm font-bold text-slate-700 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Categories Grid */}
                    <div className="space-y-6">
                        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.25em] text-center">Support Categories</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {categories.map((cat, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => navigate(cat.path)}
                                    className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm hover:shadow-2xl hover:border-blue-200 hover:-translate-y-1 transition-all flex flex-col items-center gap-4 group"
                                >
                                    <div className="w-16 h-16 bg-blue-50 rounded-3xl flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                                        {cat.icon}
                                    </div>
                                    <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest">{cat.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* FAQ Section */}
                    <div className="space-y-6">
                        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.25em]">Frequently Asked Questions</h3>
                        <div className="space-y-4">
                            {filteredFaqs.length > 0 ? (
                                filteredFaqs.map((item, idx) => (
                                    <div key={idx} className="bg-white p-6 rounded-3xl border border-slate-200 flex items-center justify-between group hover:shadow-md transition-all">
                                        <div className="space-y-1">
                                            <h4 className="font-bold text-slate-900 text-sm">{item.q}</h4>
                                            <p className="text-xs text-slate-500 max-w-2xl font-medium leading-relaxed">{item.desc}</p>
                                        </div>
                                        <button
                                            onClick={() => setSelectedFaq(item)}
                                            className="px-5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-600 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all"
                                        >
                                            View Details
                                        </button>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-10 bg-white rounded-3xl border border-dashed border-slate-300">
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">No results found for "{searchQuery}"</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Contact Support Banner */}
                    <div className="bg-blue-600 p-10 rounded-[3rem] shadow-2xl shadow-blue-200 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full -translate-y-1/2 translate-x-1/2 opacity-20"></div>
                        <div className="relative z-10 text-white space-y-2 text-center md:text-left">
                            <h4 className="font-black text-2xl uppercase tracking-tight">Still need help?</h4>
                            <p className="text-sm text-blue-100 font-medium">Our support agents are available 24/7 to assist you with any concerns.</p>
                        </div>
                        <button
                            onClick={() => setIsContactModalOpen(true)}
                            className="relative z-10 px-8 py-4 bg-white text-blue-600 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] flex items-center gap-3 hover:bg-blue-50 hover:scale-105 active:scale-95 transition-all shadow-lg"
                        >
                            <Headphones size={18} /> Contact Support
                        </button>
                    </div>
                </div>

                {/* MODAL: FAQ DETAILS */}
                {selectedFaq && (
                    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
                        <div className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl p-8 space-y-6">
                            <div className="flex justify-between items-center">
                                <h3 className="font-black text-slate-900 uppercase tracking-widest text-sm">Article Details</h3>
                                <button onClick={() => setSelectedFaq(null)} className="p-2 hover:bg-slate-100 rounded-full transition"><X size={20}/></button>
                            </div>
                            <div className="space-y-4">
                                <h4 className="text-xl font-black text-blue-600 leading-tight">{selectedFaq.q}</h4>
                                <p className="text-sm text-slate-600 leading-relaxed font-medium bg-slate-50 p-6 rounded-2xl border border-slate-100">
                                    {selectedFaq.full}
                                </p>
                            </div>
                            <button onClick={() => setSelectedFaq(null)} className="w-full py-4 bg-slate-900 text-white font-black rounded-2xl uppercase tracking-widest text-[10px]">Close Article</button>
                        </div>
                    </div>
                )}

                {/* MODAL: CONTACT SUPPORT */}
                {isContactModalOpen && (
                    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
                        <div className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl p-8 space-y-6">
                            <div className="flex justify-between items-center">
                                <h3 className="font-black text-slate-900 uppercase tracking-widest text-sm">Contact Support</h3>
                                <button onClick={() => setIsContactModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-full transition"><X size={20}/></button>
                            </div>
                            <div className="grid grid-cols-1 gap-3">
                                <ContactOption icon={<MessageSquare className="text-blue-600"/>} title="Live Chat" sub="Average wait: 2 mins" />
                                <ContactOption icon={<Phone className="text-green-600"/>} title="Call Us" sub="+63 912 345 6789" />
                                <ContactOption icon={<Mail className="text-orange-600"/>} title="Email Support" sub="insurance@gmail.com" />
                            </div>
                            <p className="text-[9px] text-center font-bold text-slate-400 uppercase tracking-widest pt-2">Available 24 hours a day, 7 days a week</p>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

const ContactOption = ({ icon, title, sub }) => (
    <button className="flex items-center justify-between p-5 bg-slate-50 rounded-2xl border border-slate-100 hover:border-blue-200 hover:bg-blue-50 transition-all group text-left">
        <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">{icon}</div>
            <div>
                <p className="text-sm font-black text-slate-900">{title}</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">{sub}</p>
            </div>
        </div>
        <ChevronRight size={16} className="text-slate-300 group-hover:text-blue-600 transition-colors" />
    </button>
);

export default HelpCenter;