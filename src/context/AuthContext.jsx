import { createContext, useState, useEffect, useMemo } from 'react';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        try {
            const storedUser = localStorage.getItem('user');

            if (storedUser) {
                const parsedUser = JSON.parse(storedUser);

                // 🔥 FIX: AUTO ASSIGN ROLE IF MISSING
                if (parsedUser) {

                    // ADMIN FIX (kahit walang role sa DB)
                    if (parsedUser.username === 'admin@gmail.com') {
                        parsedUser.role = 'admin';
                    }

                    // DEFAULT ROLE FOR OTHERS
                    if (!parsedUser.role && parsedUser.username !== 'admin@gmail.com') {
                        parsedUser.role = 'client';
                    }

                    setUserData(parsedUser);
                }
            }
        } catch (error) {
            console.log(error);
            localStorage.removeItem('user');
        }

        setLoading(false);
    }, []);

    const login = (data) => {

        // 🔥 SAME FIX ON LOGIN
        if (data.username === 'admin@gmail.com') {
            data.role = 'admin';
        }

        if (!data.role && data.username !== 'admin@gmail.com') {
            data.role = 'client';
        }

        setUserData(data);
        localStorage.setItem('user', JSON.stringify(data));
    };

    const logout = () => {
        setUserData(null);
        localStorage.removeItem('user');
    };

    const value = useMemo(() => ({
        userData,
        login,
        logout,
        loading
    }), [userData, loading]);

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};