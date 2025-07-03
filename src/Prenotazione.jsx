import { useState, useEffect } from "react";
import "./Table.css";

const PrenotazioniTable = () => {
  const [prenotazioni, setPrenotazioni] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPrenotazioni = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/getprenotazioni");
        if (!res.ok) throw new Error("Errore nel recupero dati");
        const data = await res.json();
        setPrenotazioni(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchPrenotazioni();
  }, []);

  if (error) return <p>Errore: {error}</p>;
  if (prenotazioni.length === 0) return <p>Nessuna prenotazione trovata.</p>;

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return isNaN(date) ? "Data non valida" : date.toLocaleDateString("it-IT");
    } catch {
      return "Data non valida";
    }
  };

  const gestisciPrenotazione = async (id, nuovoStato) => {
    try {
      const res = await fetch("http://localhost:3000/api/updateprenotazione", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, stato: nuovoStato }),
      });
      if (!res.ok) throw new Error("Errore aggiornamento prenotazione");
      const data = await res.json();

      setPrenotazioni((prev) =>
        prev.map((p) => (p.id === id ? { ...p, stato: nuovoStato } : p))
      );
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="table-container">
      <table className="simple-table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Numero</th>
            <th>Data</th>
            <th>Orario</th>
            <th>Stato</th>
            <th>Azione</th>
          </tr>
        </thead>
        <tbody>
          {prenotazioni.map((p, i) => (
            <tr key={i}>
              <td data-label="Nome">{p.nome}</td>
              <td data-label="Numero">{p.numero}</td>
              <td data-label="Data">{formatDate(p.data)}</td>
              <td data-label="Orario">{p.orario}</td>
              <td data-label="Stato">{p.stato || "in attesa"}</td>
              <td data-label="Azione">
                <button
                  onClick={() => gestisciPrenotazione(p.id, "confermata")}
                >
                  Accetta
                </button>
                <button onClick={() => gestisciPrenotazione(p.id, "rifiutata")}>
                  Rifiuta
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PrenotazioniTable;
