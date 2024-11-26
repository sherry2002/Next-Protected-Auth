"use client"
import styles from '../page.module.css';
import useAuth from '../hooks/useAuth';
import { AuthContext } from '../component/User';
import { useContext } from 'react';

const User =()=> {
  const { logout } = useContext(AuthContext);
  
  return (
    <div className={styles.container}>
      user
      <br/>
      <button onClick={logout}>logout</button>
    </div>

  );
}

export default useAuth(User,"user");
