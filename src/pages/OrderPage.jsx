import { useState } from 'react';
import menuData from '../components/menu.json';
import '../styles/OrderPage.css';

function OrderPage() {
  const [ordine, setOrdine] = useState({}); // { idPiatto: quantità }

  const aggiungiPiatto = (id) => {
    setOrdine(prev => ({
      ...prev,
      [id]: (prev[id] || 0) + 1
    }));
  };

  const rimuoviPiatto = (id) => {
    setOrdine(prev => {
      const nuovoOrdine = { ...prev };
      if (nuovoOrdine[id] > 1) {
        nuovoOrdine[id]--;
      } else {
        delete nuovoOrdine[id];
      }
      return nuovoOrdine;
    });
  };

  const totalePiatti = Object.values(ordine).reduce((a, b) => a + b, 0);

  const confermaOrdine = () => {
    const piattiOrdinati = menuData.filter(p => ordine[p.id]);
    console.log("Ordine confermato:", piattiOrdinati.map(p => ({
      nome: p.nome,
      quantità: ordine[p.id]
    })));
    alert("Ordine confermato!");
    setOrdine({});
  };

  return (
    <>
      <div className="menu-container">
        {menuData.map(piatto => (
          <div className="menu-card" key={piatto.id}>
            <div className="card-description">
              <h2 className="menu-name">{piatto.nome}</h2>
              <p className="dish-description">{piatto.descrizione}</p>
            </div>
            <div className="order-controls">
              <button onClick={() => rimuoviPiatto(piatto.id)}>-</button>
              <span>{ordine[piatto.id] || 0}</span>
              <button onClick={() => aggiungiPiatto(piatto.id)}>+</button>
            </div>
          </div>
        ))}
      </div>

      {totalePiatti > 0 && (
        <div className="order-footer">
          <p>{totalePiatti} piatto{totalePiatti > 1 ? 'i' : ''} selezionat{totalePiatti > 1 ? 'i' : 'o'}</p>
          <button onClick={confermaOrdine}>Manda ordine</button>
        </div>
      )}
    </>
  );
}

export default OrderPage;
