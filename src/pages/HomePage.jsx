import { useState } from 'react'
import { HiMenuAlt4 } from "react-icons/hi";
import PiattoPasta from '../assets/PiattoPasta.png'; // Assuming you have a pasta image
import SideMenu from '../components/SideMenu.jsx';
import MenuIcon from '../assets/hamburger-icon.svg'; // Assuming you have a menu icon image
import '../styles/HomePage.css'; // Assuming you have a CSS file for styling

function HomePage() {
    const [menuOpen, setMenuOpen] = useState(false);
    return (
        <>
        <div className="landing-container">

        {/* Menu Icon */}
        <div className="menu-icon" onClick={() => setMenuOpen(true)}>
            <img src={MenuIcon} alt="" className='icon'  />
        </div>

        {/* Header */}
        <div className="header">
            <div className="image-container">
            <img
                src={PiattoPasta}
                alt="Pasta"
                className="pasta-image"
            />
            </div>
            <div className="title">
            <div>SCR</div>
            <div>UM</div>
            <div>BIST</div>
            <div>ROT</div>
            </div>
        </div>

        {/* Form */}
        <div className="form-container">
            <form className="reservation-form">
            <div className="form-group">
                <label>Nome</label>
                <input type="text" placeholder="Il tuo nome" />
            </div>

            <div className="form-group">
                <label>Numero di persone</label>
                <select>
                <option>1 Persona</option>
                <option>2 Persone</option>
                <option>3 Persone</option>
                <option>4 Persone</option>
                </select>
            </div>

            <div className="form-group">
                <label>Data</label>
                <input type="date" placeholder="gg/mm/aaaa" />
            </div>

            <div className="form-group">
                <label>Orario</label>
                <select>
                <option>12:30</option>
                <option>13:00</option>
                <option>19:30</option>
                <option>20:00</option>
                </select>
            </div>

            <button type="submit">PRENOTA</button>
            </form>
        </div>
        <SideMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
        </div>
        
        <div className="dove-siamo">
        <p>VIENICI A TROVARE</p>
        <div className="map-container">
            <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2850.093741132638!2d8.96357180000001!3d44.410722100000015!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12d34314cda44299%3A0x86eb7f9f6abc052d!2sAccademia%20Digitale%20Liguria%20ITS%20ICT!5e0!3m2!1sit!2sit!4v1751284873140!5m2!1sit!2sit"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Mappa Accademia Digitale"
            ></iframe>
        </div>
        </div>
        </>
    );
}

export default HomePage;