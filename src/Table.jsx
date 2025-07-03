import { useState, useEffect } from "react";
import "./Table.css";
import menu from "./data/menu.json";

const OrdiniTable = () => {
  const [ordini, setOrdini] = useState([]);

  const fetchOrdini = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/getordini");
      const ordiniFromServer = await response.json();

      const tuttiIPiattiOrdinati = ordiniFromServer.flatMap(
        (ordine) => ordine.piattiOrdinati
      );

      const piattiConTavolo = tuttiIPiattiOrdinati.map((item) => {
        const piattoMenu = menu.find((p) => p.id === item.id);
        return {
          ...piattoMenu,
          quantità: item.quantità,
          tavolo: item.tavolo,
        };
      });

      setOrdini(piattiConTavolo);
    } catch (error) {
      console.error("Errore nel fetch degli ordini:", error);
    }
  };

  useEffect(() => {
    fetchOrdini(); // Chiamata immediata al montaggio

    const intervalId = setInterval(fetchOrdini, 3000); // Aggiorna ogni 3 secondi

    return () => clearInterval(intervalId); // Pulizia
  }, []);

  return (
    <div className="table-container">
      <table className="simple-table">
        <thead>
          <tr>
            <th>Numero Tavolo</th>
            <th>Nome</th>
            <th>Descrizione</th>
            <th>Prezzo</th>
            <th>Quantità Ordinata</th>
          </tr>
        </thead>
        <tbody>
          {ordini.map((row) => (
            <tr key={`${row.tavolo}-${row.descrizione}`}>
              <td data-label="Numero Tavolo">{row.tavolo}</td>
              <td data-label="Nome">{row.nome}</td>
              <td data-label="Descrizione">{row.descrizione}</td>
              <td data-label="Prezzo">€{row.prezzo.toFixed(2)}</td>
              <td data-label="Quantità">{row.quantità}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdiniTable;
