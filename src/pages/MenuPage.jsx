import menuData from '../components/menu.json';
import '../styles/MenuPage.css';

function MenuPage() {
    return ( 
        <>
            <h1 className="menu-title">Il nostro Menu</h1>
            <p className="menu-description">Scopri i nostri piatti deliziosi e preparati con ingredienti freschi e di alta qualità.</p>
            
            <div className="menu-container">
                {menuData.map(piatto => (
                <div className="menu-card" key={piatto.id}>
                    <h2 className="menu-name">{piatto.nome}</h2>
                    <p className="menu-description">{piatto.descrizione}</p>
                </div>
                ))}
            </div>
        </>
    );
}

export default MenuPage;