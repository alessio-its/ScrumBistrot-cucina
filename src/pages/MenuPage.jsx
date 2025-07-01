import menuData from '../components/menu.json';
import '../styles/MenuPage.css';
import SideMenu from '../components/SideMenu.jsx';
import SlowFoodLogo from '../assets/Slowfood_Favicon.svg';

function MenuPage() {
    return ( 
        <>
            <SideMenu />
            <p className="menu-title">
                <h2 className="ilnostro-text">IL NOSTRO</h2>
                <h1 className="menu-text">ME <br /> NU</h1>
                
            </p>
            <img src={SlowFoodLogo} alt="" className='slowfood_logo' />
            <p className="menu-description">Scopri i nostri piatti deliziosi e preparati con ingredienti freschi e di alta qualità.</p>
            <div className="menu-container">
                {menuData.map(piatto => (
                <div className="menu-card" key={piatto.id}>
                    <div className="card-description">
                        <h2 className="menu-name">{piatto.nome}</h2>
                        <p className="dish-description">{piatto.descrizione}</p>
                    </div>
                   <div className="card-price">
                        <p className="price">€{piatto.prezzo}</p>
                   </div>
                </div>
                ))}
            </div>
        </>
    );
}

export default MenuPage;