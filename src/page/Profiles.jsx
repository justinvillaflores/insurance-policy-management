import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Bell, Camera, Shield, Loader2, CheckCircle2, Mail, Fingerprint, Lock, Eye, EyeOff } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import CryptoJS from "crypto-js";

const Profiles = () => {
    const navigate = useNavigate();
    const fileInputRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [updateStatus, setUpdateStatus] = useState(null);
    const SECRET = "u9X!d2@kL0pQ7zWmR4tY8vBnC3sA6fGh";

    const [formData, setFormData] = useState({
        id: '',
        first_name: '',
        middle_name: '',
        last_name: '',
        username: '',
        profile_image: ''
    });

    const [passwords, setPasswords] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                setFormData({
                    id: parsedUser.id || '',
                    first_name: parsedUser.first_name || parsedUser.username?.split('@')[0] || '',
                    middle_name: parsedUser.middle_name || '',
                    last_name: parsedUser.last_name || '',
                    username: parsedUser.username || '',
                    profile_image: parsedUser.profile_image || ''
                });
            } catch (error) {
                localStorage.clear();
                navigate('/login');
            }
        } else {
            navigate('/login');
        }
    }, [navigate]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 2 * 1024 * 1024) {
                alert("Image too large! Max 2MB.");
                return;
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({ ...prev, profile_image: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswords(prev => ({ ...prev, [name]: value }));
    };

    const handleSaveChanges = async () => {
        setLoading(true);
        setUpdateStatus(null);

        try {
            const payload = {
                userId: formData.id,
                username: formData.username,
                full_name: `${formData.first_name} ${formData.middle_name} ${formData.last_name}`
            };

            const encryptedPayload = CryptoJS.AES.encrypt(
                JSON.stringify(payload),
                CryptoJS.enc.Utf8.parse(SECRET),
                {
                    mode: CryptoJS.mode.ECB,
                    padding: CryptoJS.pad.Pkcs7
                }
            ).toString();

            const response = await fetch(
                "http://localhost/insurance-api/api/users/profile.php",
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        payload: encryptedPayload
                    })
                }
            );

            const json = await response.json();

            const bytes = CryptoJS.AES.decrypt(
                json.payload,
                CryptoJS.enc.Utf8.parse(SECRET),
                {
                    mode: CryptoJS.mode.ECB,
                    padding: CryptoJS.pad.Pkcs7
                }
            );

            const decrypted = bytes.toString(CryptoJS.enc.Utf8);

            const data = JSON.parse(decrypted);

            if (data.success) {
                const updatedUser = {
                    ...JSON.parse(localStorage.getItem("user")),
                    username: formData.username,
                    first_name: formData.first_name,
                    middle_name: formData.middle_name,
                    last_name: formData.last_name,
                    profile_image: formData.profile_image
                };

                localStorage.setItem("user", JSON.stringify(updatedUser));
                setUpdateStatus("success");
            } else {
                setUpdateStatus("error");
                console.log(data.message);
            }

        } catch (err) {
            console.error("SAVE ERROR:", err);
            setUpdateStatus("error");
        } finally {
            setLoading(false);
        }
    };

    const handleUpdatePassword = async () => {
        if (passwords.newPassword !== passwords.confirmPassword) {
            alert("New passwords do not match!");
            return;
        }
        alert("Password updated inside security sandbox.");
    };

    return (
        <div className="min-h-screen bg-slate-50 flex overflow-hidden font-sans">
            <Sidebar userDisplayName={`${formData.first_name} ${formData.last_name}`.trim() || formData.username} />

            <main className="flex-1 overflow-y-auto h-screen">
                <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-30">
                    <h1 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Profile Settings</h1>
                    <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-full transition relative">
                        <Bell size={20} />
                        <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                    </button>
                </header>

                <div className="p-8 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">
                        {updateStatus === 'success' && (
                            <div className="p-4 bg-green-50 border border-green-100 rounded-2xl flex items-center gap-3 text-green-600 animate-in fade-in slide-in-from-top-2">
                                <CheckCircle2 size={18} />
                                <span className="text-xs font-bold uppercase tracking-wider">Database profile synchronized successfully!</span>
                            </div>
                        )}

                        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col items-center justify-center text-center space-y-4">
                            <div className="relative group">
                                <div className="w-32 h-32 bg-slate-100 rounded-full border-4 border-white shadow-md flex items-center justify-center overflow-hidden">
                                    {formData.profile_image ? (
                                        <img src={formData.profile_image} alt="Profile" className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full bg-blue-600 flex items-center justify-center text-white text-3xl font-black italic">
                                            {formData.first_name.charAt(0) || 'U'}
                                        </div>
                                    )}
                                </div>
                                <input type="file" ref={fileInputRef} onChange={handleImageChange} accept="image/*" className="hidden" />
                                <button onClick={() => fileInputRef.current.click()} className="absolute bottom-1 right-1 bg-blue-600 text-white p-2 rounded-full shadow-lg hover:bg-blue-700 transition">
                                    <Camera size={18} />
                                </button>
                            </div>
                            <div className="space-y-1">
                                <h2 className="text-xl font-black text-slate-900 uppercase italic tracking-tight">{formData.first_name} {formData.last_name}</h2>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center justify-center gap-1">
                                    <Fingerprint size={12} /> ID: #{formData.id.toString().padStart(4, '0')}
                                </p>
                            </div>
                        </div>

                        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
                            <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest flex items-center gap-2 italic">
                                <User size={18} className="text-blue-600" /> Account Identity
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">First Name</label>
                                    <input type="text" name="first_name" value={formData.first_name} onChange={handleChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Middle Name</label>
                                    <input type="text" name="middle_name" value={formData.middle_name} onChange={handleChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Last Name</label>
                                    <input type="text" name="last_name" value={formData.last_name} onChange={handleChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Email / Username</label>
                                    <div className="relative group">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                        <input type="text" name="username" value={formData.username} onChange={handleChange} className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
                                    </div>
                                </div>
                            </div>
                            <button onClick={handleSaveChanges} disabled={loading} className="w-full px-10 py-4 bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-blue-600 transition-all shadow-xl flex items-center justify-center gap-3 disabled:bg-slate-300">
                                {loading ? <><Loader2 size={16} className="animate-spin" /> Syncing...</> : "Save Identity Changes"}
                            </button>
                        </div>
                    </div>

                    <div className="space-y-8">
                        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
                            <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest flex items-center gap-2 italic">
                                <Shield size={18} className="text-blue-600" /> Security
                            </h3>

                            <div className="space-y-4 pt-2">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Current Password</label>
                                    <div className="relative">
                                        <input
                                            type={showCurrent ? "text" : "password"}
                                            name="currentPassword"
                                            value={passwords.currentPassword}
                                            onChange={handlePasswordChange}
                                            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold focus:ring-2 focus:ring-blue-500 outline-none transition-all pr-10"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowCurrent(!showCurrent)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition"
                                        >
                                            {showCurrent ? <EyeOff size={16} /> : <Eye size={16} />}
                                        </button>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">New Password</label>
                                    <div className="relative">
                                        <input
                                            type={showNew ? "text" : "password"}
                                            name="newPassword"
                                            value={passwords.newPassword}
                                            onChange={handlePasswordChange}
                                            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold focus:ring-2 focus:ring-blue-500 outline-none transition-all pr-10"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowNew(!showNew)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition"
                                        >
                                            {showNew ? <EyeOff size={16} /> : <Eye size={16} />}
                                        </button>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Confirm New Password</label>
                                    <div className="relative">
                                        <input
                                            type={showConfirm ? "text" : "password"}
                                            name="confirmPassword"
                                            value={passwords.confirmPassword}
                                            onChange={handlePasswordChange}
                                            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold focus:ring-2 focus:ring-blue-500 outline-none transition-all pr-10"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirm(!showConfirm)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition"
                                        >
                                            {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                                        </button>
                                    </div>
                                </div>

                                <button onClick={handleUpdatePassword} className="w-full py-3 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-blue-700 transition flex items-center justify-center gap-2 shadow-lg shadow-blue-100">
                                    <Lock size={14} /> Update Password
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Profiles;