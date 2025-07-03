import { useState } from 'react';
import menuData from '../components/menu.json';
import '../styles/OrderPage.css';

function OrderPage() {
  const [ordine, setOrdine] = useState({}); // { idPiatto: quantità }
  let table;
  const [tableNumber, setTableNumber] = useState(null);
  const [inputValue, setInputValue] = useState("");

  const handleSelectTable = () => {
    if (inputValue >= 1 && inputValue <= 50) {
      setTableNumber(Number(inputValue));
    } else {
      alert("Inserisci un numero di tavolo valido (1-50)");
    }
  };

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

    const confermaOrdine = async () => {
        const piattiOrdinati = menuData
            .filter(p => ordine[p.id])
            .map(p => ({
            tavolo: tableNumber,
            id: p.id,
            quantità: ordine[p.id]
            }));

        const ordineJSON = {
            piattiOrdinati
        };

        try {
            const response = await fetch('http://172.30.88.62:3000/api/ordine', { // cambia URL con il tuo endpoint
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(ordineJSON)
            });

            if (!response.ok) {
            throw new Error('Errore durante l\'invio dell\'ordine');
            }

            const data = await response.json();
            console.log('Risposta del server:', data);
            alert('Ordine confermato!' + data.message);
            setOrdine({});
        } catch (error) {
            console.error('Errore:', error);
            alert('Si è verificato un errore durante l\'invio dell\'ordine.');
        }
    };


  return (
    <>
        {!tableNumber && (
          <div className="table_number-container">
            <label htmlFor="table">Numero Tavolo:</label>
            <input
              type="number"
              id="table"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              min="1"
              max="50"
              placeholder="Num. Tavolo"
            />
            <button onClick={handleSelectTable}>Seleziona Tavolo</button>
          </div>
        )}
      <div className="menu-container">
        {tableNumber && (
        <div className="order-section">
          <h2>Ordini per Tavolo {tableNumber}</h2>
        </div>
        )}
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
          <p>{totalePiatti} piatt{totalePiatti > 1 ? 'i' : 'o'} selezionat{totalePiatti > 1 ? 'i' : 'o'}</p>
          <button onClick={async () => {
            await confermaOrdine();
            setTableNumber(null);
          }}>Manda ordine</button>
        </div>
      )}
    </>
  );
}

export default OrderPage;
