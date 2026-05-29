import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { Eye, EyeOff, Lock, User, AlertCircle, ShieldCheck } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import CryptoJS from "crypto-js";

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { login } = useContext(AuthContext);

    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (location.state?.message) {
            setSuccessMsg(location.state.message);
            window.history.replaceState({}, document.title);
        }
    }, [location]);

    const SECRET = CryptoJS.SHA256("u9X!d2@kL0pQ7zWmR4tY8vBnC3sA6fGh");
    const IV = "1234567890123456";

    const encryptPayload = (data) => {
        return CryptoJS.AES.encrypt(
            JSON.stringify(data),
            SECRET,
            {
                iv: CryptoJS.enc.Utf8.parse(IV),
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7
            }
        ).toString();
    };

    const decryptResponse = (payload) => {
        const decrypted = CryptoJS.AES.decrypt(
            payload,
            SECRET,
            {
                iv: CryptoJS.enc.Utf8.parse(IV),
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7
            }
        );

        return JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await fetch('http://localhost/insurance-api/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    payload: encryptPayload({
                        username,
                        password
                    })
                })
            });

            const encrypted = await response.json();

            if (!encrypted.payload) {
                throw new Error("No payload returned");
            }

            const data = decryptResponse(encrypted.payload);

            if (data.success) {

                login({
                    id: data.id,
                    full_name: data.full_name,
                    role: data.role.toLowerCase()
                });

                navigate(
                    data.role.toLowerCase() === 'admin'
                        ? '/dashboard'
                        : '/client-dashboard'
                );

            } else {
                setError(data.message || 'Invalid credentials');
            }

        } catch (err) {
            console.log(err);
            setError('Cannot connect to server.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans">
            <div className="max-w-md w-full bg-white rounded-[2rem] shadow-2xl border border-slate-200">

                <div className="p-10">

                    <h2 className="text-2xl font-black text-center uppercase">Access Portal</h2>

                    {successMsg && (
                        <div className="mt-4 p-3 bg-green-50 text-green-700 rounded-xl flex items-center gap-2">
                            <ShieldCheck size={16} />
                            {successMsg}
                        </div>
                    )}

                    {error && (
                        <div className="mt-4 p-3 bg-red-50 text-red-600 rounded-xl flex items-center gap-2">
                            <AlertCircle size={16} />
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="mt-6 space-y-5">

                        <div>
                            <label className="text-xs font-bold uppercase">Email</label>
                            <div className="relative mt-1">
                                <User className="absolute left-3 top-3 text-gray-400" size={18} />
                                <input
                                    type="email"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full pl-10 p-3 border rounded-xl"
                                    placeholder="admin@insureguard.com"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="text-xs font-bold uppercase">Password</label>
                            <div className="relative mt-1">
                                <Lock className="absolute left-3 top-3 text-gray-400" size={18} />

                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-10 pr-10 p-3 border rounded-xl"
                                    placeholder="••••••••"
                                    required
                                />

                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-3 text-gray-500"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-black text-white py-3 rounded-xl font-bold uppercase"
                        >
                            {loading ? 'Logging in...' : 'Login'}
                        </button>

                    </form>

                    <p className="text-center mt-6 text-xs">
                        No account? <Link to="/register" className="text-blue-600">Register</Link>
                    </p>

                </div>

            </div>
        </div>
    );
};

export default Login;