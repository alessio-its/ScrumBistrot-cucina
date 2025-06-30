import '../styles/SideMenu.css';
import { IoClose } from "react-icons/io5";

const SideMenu = ({ isOpen, onClose }) => {
    return (
    <>
        <div className={`obscurer ${isOpen ? 'active' : ''}`} onClick={onClose}></div>
        <div className={`side-menu ${isOpen ? 'open' : ''}`}>
            <button className="close-btn" onClick={onClose}><IoClose className='close-icon'/></button>
            <ul>
                <li><a href="#home">HO<br />ME</a></li>
                <li><a href="#menu">ME <br /> NU</a></li>
                <li><a href="#recensioni">RE <br /> CE<br />NS<br />IO<br />NI</a></li>
            </ul>
        </div>
    </>
    );
}

export default SideMenu;