"use client"
import { useEffect, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { AuthContext } from '../component/User';
import Sidebar from '../component/Sidebar';
import AuthWrapper from '../component/Provider';

const useAuth = (WrappedComponent, requiredRole) => {
 return (props) => { 
  const router = useRouter();
  const { user, loading } = useContext(AuthContext);

  useEffect(() => {
    const userToken = JSON.parse(localStorage.getItem('user'));
    if (!userToken?.token) {
      router.push('/login');
    } else if (user && (user.user_type !== requiredRole)) {
      router.push('/403');
    }
  }, [user, requiredRole]);
  
  if (!user || loading) {
    return <p style={{height:"100vh",width:"100vw", margin:"auto"}} >Loading...</p>;
  }

  return (
    <AuthWrapper>
      <div className="app-container">
        <Sidebar/>
        <main className="main-content">
        <WrappedComponent {...props} />
        </main>
      </div>
    </AuthWrapper>
  );
 }
};

export default useAuth;
