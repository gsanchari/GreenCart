import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import {useAppContext} from '../context/AppContext'
import '../stylesheet/Navbar.css';


const Navbar = () => {
  const [open, setOpen] = React.useState(false);
  const {navigate, user, setUser, setShowUserLogin, searchQuery, setSearchQuery} = useAppContext();

  const logout = async () => {
    setUser(null);
    navigate('/');
  };

  useEffect(()=>{
    if(searchQuery.length > 0){
      navigate("/products")
    }
  }, [searchQuery])


  return (
    <nav className="navbar">
      <NavLink to='/' onClick={()=> setOpen(false)} className="logo-link">
        <img className="logo" src="../public/logo.svg" alt="Logo" />
      </NavLink>

      <div className="desktop-menu">
        <NavLink to='/'>Home</NavLink>
        <NavLink to='/products'>All Product</NavLink>
        <NavLink to='/'>Contact</NavLink>
        

        <div className="search-bar">
          <input onChange={(e)=>setSearchQuery(e.target.value)} className="search-input" type="text" placeholder="Search products" />
            <i className="ri-search-line"></i>
        </div>

        <div onClick={()=> navigate("/cart")} className="cart">
          <i className="ri-shopping-cart-2-line"></i>
          <button className="cart-button">3</button>
        </div>

        {!user ? (
            <button onClick={()=>setShowUserLogin(true)} className="login-button">Login</button>
        ):(
            <div className='profile-login'>
                <img src="../public/profile_icon.png" alt="profile-pic" />
                <ul className='profile-dropdown'>
                    <li  onClick={()=> navigate("/my-orders")}>My Orders</li>
                    <li  onClick={()=> navigate("/my-profile")}>Profile</li>
                    <li  onClick={logout}>Logout</li>
                </ul>
            </div>
        )}
      </div>

    {/* For Mobil Menu */}
      <button onClick={() => setOpen(!open)} className="menu-button" aria-label="Menu">
        <i className="ri-align-right"></i>
      </button>

    { open && (
        <div className={`mobile-menu ${open ? 'open' : ''}`}>
        <NavLink to='/' onClick={()=> setOpen(false)}>Home</NavLink>
        <NavLink to='/products' onClick={()=> setOpen(false)}>All Product</NavLink>
        {user &&
        <NavLink to='/products' onClick={()=> setOpen(false)}>My Orders</NavLink>
        }
        <NavLink to='/' onClick={()=> setOpen(false)}>Contact</NavLink>
        

        {!user ? (
            <button onClick={()=>{ 
                setOpen(false);
                setShowUserLogin(true);
            }} className="login-button">Login</button>
        ) : (
            <button onClick={logout} className="login-button">Logout</button>
        )}
        
      </div>
    )}
    </nav>
  )
}

export default Navbar;
