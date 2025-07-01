import React, { useState } from 'react';
import '../styles/SideMenu.css';
import { IoClose, IoMenu } from "react-icons/io5";
import { Link } from 'react-router-dom';
import MenuIcon from '../assets/hamburger-icon.svg'; // Assuming you have a menu icon image

const SideMenu = () => {
    const [isOpen, setIsOpen] = useState(false);

    const openMenu = () => setIsOpen(true);
    const closeMenu = () => setIsOpen(false);

    return (
        <>
            {/* Hamburger visibile sempre */}
            <div className="menu-icon" onClick={openMenu}>
                <img src={MenuIcon} alt="" className='icon'  />
            </div>

            {/* Overlay oscurante */}
            <div className={`obscurer ${isOpen ? 'active' : ''}`} onClick={closeMenu}></div>

            {/* Menù laterale */}
            <div className={`side-menu ${isOpen ? 'open' : ''}`}>
                <button className="close-btn" onClick={closeMenu}>
                    <IoClose className='close-icon'/>
                </button>
                <ul>
                    <li><Link to="/" onClick={closeMenu}>HO<br />ME</Link></li>
                    <li><Link to="/menu" onClick={closeMenu}>ME<br />NU</Link></li>
                    <li><Link to="/recensioni" onClick={closeMenu}>RE<br />CE<br />NS<br />IO<br />NI</Link></li>
                </ul>
            </div>
        </>
    );
};

export default SideMenu;
