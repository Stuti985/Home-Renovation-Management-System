import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Navbar(){
  const { user, logout } = useAuth();
  const nav = useNavigate();
  return (
    <div className="nav">
      <div className="container" style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <Link to="/" style={{fontWeight:700}}>HomeRenovate</Link>
        <div>
          {user ? (
            <>
              <span style={{marginRight:12}}>Hi, {user.name}</span>
              <button className="btn" onClick={()=>{ logout(); nav('/login') }}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" style={{marginRight:12}}>Login</Link>
              <Link to="/signup">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
