import '../styles/SideMenu.css';
import { IoClose } from "react-icons/io5";
import { Link } from 'react-router-dom';

const SideMenu = ({ isOpen, onClose }) => {
    return (
    <>
        
        <div className={`obscurer ${isOpen ? 'active' : ''}`} onClick={onClose}></div>
        <div className={`side-menu ${isOpen ? 'open' : ''}`}>
            <button className="close-btn" onClick={onClose}><IoClose className='close-icon'/></button>
            <ul>
                <li><Link to="/">HO<br />ME</Link></li>
                <li><Link to="/menu">ME<br />NU</Link></li>
                <li><Link to="/recensioni">RE<br />CE<br />NS<br />IO<br />NI</Link></li>
            </ul>
        </div>
    </>
    );
}

export default SideMenu;