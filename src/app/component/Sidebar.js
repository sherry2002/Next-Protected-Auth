"use client"
import { useContext } from'react';
import Link from 'next/link';
import { AuthContext } from '../component/User'

const Sidebar = () => {
    const { user, loading } = useContext(AuthContext);
  return (
    <>

    {
        window.location.pathname !== "/" &&
        window.location.pathname !== "/login" && (
            <div className="sidebar">
            <div className="sidebar-header">
              <h2> Dashboard</h2>
            </div>
            <div className="sidebar-content">
              <ul>
                <li><Link href="/">Home</Link></li>
                <li><Link href={`/dashboard`}>Dashboard</Link></li>
              </ul>
      
              {user?.user_type === 'admin' && (
                <ul>
                  <li><Link href="/admin/users">Manage Users</Link></li>
                  <li><Link href="/admin/settings">Settings</Link></li>
                </ul>
              )}
      
              {user?.user_type  === 'user' && (
                <ul>
                  <li><Link href="/user/orders">My Orders</Link></li>
                  <li><Link href="/user/settings">Settings</Link></li>
                </ul>
              )}
      
              <button>Logout</button>
            </div>
          </div>
        )
    }
        
    </>
  );
};

export default Sidebar;
