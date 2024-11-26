"use client"
import styles from '../page.module.css';
import useAuth from '../hooks/useAuth';
import { AuthContext } from '../component/User';
import { useContext } from 'react';

const Admin = ()=> {
  const { logout } = useContext(AuthContext);
 
  return (
    <div className={styles.container}>
      admin
      <br/>
      <button onClick={logout}>logout</button>
    </div>

  );
}
export default useAuth(Admin,"admin");
