import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Search,
    Bell,
    Plus,
    Send,
    MoreHorizontal
} from 'lucide-react';
import Sidebar from '../components/Sidebar'; // Siguraduhing tama ang path

const Messages = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);

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

    const contacts = [
        { id: 1, name: 'Support Agent - Mark', lastMsg: 'Your claim CL-102 has been...', time: '10:24 AM', active: true },
        { id: 2, name: 'Policy Advisor', lastMsg: 'Let me check the renewal options...', time: 'Yesterday', active: false },
        { id: 3, name: 'Billing Dept', lastMsg: 'Your payment was successful.', time: 'Oct 15', active: false },
    ];

    return (
        <div className="min-h-screen bg-slate-50 flex overflow-hidden">
            <Sidebar userDisplayName={getFullDisplayName()} />

            <main className="flex-1 flex flex-col h-screen overflow-hidden">
                <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shrink-0 z-30">
                    <h1 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em]">Messages</h1>
                    <div className="flex items-center gap-4">
                        <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-full transition relative">
                            <Bell size={20} />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                        </button>
                        <button className="bg-blue-600 text-white px-5 py-2 rounded-xl text-xs font-black hover:bg-blue-700 transition uppercase tracking-widest shadow-lg shadow-blue-100 flex items-center gap-2">
                            <Plus size={16}/> New Message
                        </button>
                    </div>
                </header>

                <div className="flex-1 flex overflow-hidden">
                    {/* Conversations List */}
                    <div className="w-80 bg-white border-r border-slate-200 flex flex-col shrink-0">
                        <div className="p-4">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                <input type="text" placeholder="Search conversations..." className="w-full pl-10 pr-4 py-2.5 bg-slate-100 border-none rounded-xl text-[10px] font-bold uppercase tracking-wider outline-none focus:ring-2 focus:ring-blue-500/20 transition-all" />
                            </div>
                        </div>
                        <div className="flex-1 overflow-y-auto">
                            {contacts.map(c => (
                                <div key={c.id} className={`p-4 cursor-pointer hover:bg-slate-50 transition-colors border-l-4 ${c.active ? 'bg-blue-50/50 border-blue-600' : 'border-transparent'}`}>
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-slate-200 rounded-full shrink-0 flex items-center justify-center font-bold text-slate-500 text-xs">
                                            {c.name.charAt(0)}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex justify-between items-center mb-0.5">
                                                <p className="text-sm font-bold text-slate-900 truncate">{c.name}</p>
                                                <span className="text-[9px] text-slate-400 font-black uppercase tracking-tighter">{c.time}</span>
                                            </div>
                                            <p className="text-xs text-slate-500 truncate font-medium">{c.lastMsg}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Chat Area */}
                    <div className="flex-1 flex flex-col bg-slate-50/30 overflow-hidden">
                        <div className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between shrink-0 shadow-sm">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-xs">M</div>
                                <p className="font-black text-slate-900 text-xs uppercase tracking-widest">Support Agent - Mark</p>
                            </div>
                            <button className="text-slate-400 hover:text-slate-600 transition p-2"><MoreHorizontal size={20}/></button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-8 space-y-6">
                            <div className="flex gap-4 max-w-lg">
                                <div className="w-8 h-8 bg-slate-200 rounded-full shrink-0 flex items-center justify-center text-[10px] font-bold text-slate-500">M</div>
                                <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                                    <p className="text-sm text-slate-700 leading-relaxed font-medium">Hi {userData?.username || 'Justin'}! I've received your inquiry about Policy #POL-8821. How can I help you today?</p>
                                    <p className="text-[10px] text-slate-400 font-black mt-2 uppercase tracking-widest">10:20 AM</p>
                                </div>
                            </div>

                            <div className="flex gap-4 max-w-lg ml-auto flex-row-reverse">
                                <div className="w-8 h-8 bg-blue-600 rounded-full shrink-0 flex items-center justify-center text-white text-[10px] font-black">
                                    {getFullDisplayName().charAt(0)}
                                </div>
                                <div className="bg-blue-600 p-4 rounded-2xl shadow-lg shadow-blue-100 text-white">
                                    <p className="text-sm leading-relaxed font-medium">Hello Mark, I just wanted to verify if the latest payment for this policy has been reflected in your system.</p>
                                    <p className="text-[10px] text-blue-100 font-black mt-2 uppercase tracking-widest">10:22 AM</p>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 bg-white border-t border-slate-200 shrink-0">
                            <div className="max-w-4xl mx-auto flex items-center gap-4 bg-slate-100 rounded-2xl p-2 px-4 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all">
                                <input type="text" placeholder="Type your message here..." className="flex-1 bg-transparent border-none outline-none py-2 text-sm text-slate-700 font-medium" />
                                <button className="w-10 h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center hover:bg-blue-700 transition shadow-lg shadow-blue-100">
                                    <Send size={18} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Messages;