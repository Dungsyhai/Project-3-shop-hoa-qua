import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { auth } from '../Config/Config'
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useHistory } from 'react-router-dom'
import { CartContext } from '../Global/CartContext'

export const Navbar = ({ user }) => {

    const history = useHistory();
    const { totalQty } = useContext(CartContext);

    // handle logout
    const handleLogout = () => {
        auth.signOut().then(() => {
            history.push(!user);
        })
    }

    return (
      <main>
        <nav className="nav">
            <div className="nav-text">
                <div className='leftside'>
                <img src="/images/logo5.png" alt="logo"/>
            </div>
              <ul className="nav-menu menu-main">
                <li><Link to="/">HOME</Link></li>
              </ul>
            {!user && <div className='rightside'>
                <span><Link to="/signup" className='navlink'>SIGNUP</Link></span>
                <span> <Link to="/login" className='navlink'>LOGIN</Link></span>
            </div>}
            {user && <div className='rightside'>
            <span><Link to="/addproducts" className='navlink'>ADDPRODUCT</Link></span>
              <Link to="/cart">
                <div className="basket">
                  <AiOutlineShoppingCart className="cart-icon" />
                  <span>{totalQty}</span>
                </div>
              </Link>
              <span><button className='logout-btn' onClick={handleLogout}>Logout</button></span>
             </div>}
            </div>
        </nav>
      </main>
    )
}
