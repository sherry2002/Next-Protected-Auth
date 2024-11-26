"use client"
import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../page.module.css';
import { AuthContext } from '../component/User';
import AuthWrapper from '../component/Provider';

export default function Login() {
  const { login, user } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    const userToken = JSON.parse(localStorage.getItem('user'));
    if (userToken && userToken.user_type === 'admin') {
      router.push('/admin')
    }else if (userToken && userToken.user_type){
      router.push('/user')
    }
    setTimeout(() => {
      setLoading(false)      
    }, 500);
  },[user])

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple validation
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      // Replace with your authentication logic
      let res = await login({ username: 'admin', password: 'pass' });
      
      if (res?.token) {
        
      } else {
        const data = res;
        setError(data.message || 'Login failed');
      }
    } catch (error) {
      setError('An error occurred');
    }
  };
  if (loading) {
    return <p style={{height:"100vh",width:"100vw", margin:"auto"}}>Loading...</p>;
  }

  return (
    <AuthWrapper>
      <div className={styles.container}>
        <h1>Login</h1>
        {error && <p className={styles.error}>{error}</p>}
        <form className={styles.loginContainer} onSubmit={handleSubmit}>
          <label>
            Email:
            <br/>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <br/>
          <label>
            Password:
            <br/>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <br/>
          <button type="submit">Login</button>
        </form>
      </div>
    </AuthWrapper>
  );
}
