import { createContext, useContext, useState, useEffect } from 'react';
import axiosInstance from '../lib/axios';
import { getCookie, setCookie, deleteCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(null);
    const router = useRouter();

    useEffect(() => {
        setLoading(true);
        const userToken = JSON.parse(localStorage.getItem('user'));
      if (userToken && userToken.token) {
          setUser(userToken);
        }
        setTimeout(() => {
          setLoading(false);
        }, 1000);
    }, []);

    const login = async (credentials) => {
        setLoading(true);
        try {
            const response = {
              user_type: credentials.username,
              token: "jdhue73mlkkpoewfjnk"
            }
            //await axiosInstance.post('/auth/login', credentials);
            setCookie('authToken',response.token);
            localStorage.setItem('user',  JSON.stringify(response));
            setUser(response);
            if(response.user_type === 'admin'){
              router.push('/admin'); 
            }else{
              router.push('/user'); 
            }
            setLoading(false);
            return response;
        } catch (error) {
            setLoading(false);
            throw new Error('Login failed');
        }
    };

    const logout = () => {
        deleteCookie('authToken')
        localStorage.removeItem("user")
        setUser(null);
        router.push('/login'); // Redirect to login page
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export {AuthContext, AuthProvider};
