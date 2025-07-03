import { useState, useEffect, useCallback } from 'react';
import PiattoPasta from '../assets/PiattoPasta.png';
import SideMenu from '../components/SideMenu.jsx';
import '../styles/HomePage.css';

/* ──────── HELPER FUNCTIONS  ──────── */
const LS_KEY = 'prenotazioniUtente';

function loadLS() {
  try {
    return JSON.parse(localStorage.getItem(LS_KEY)) || [];
  } catch {
    return [];
  }
}

function saveLS(prenotazioni) {
  localStorage.setItem(LS_KEY, JSON.stringify(prenotazioni));
}

// Nuova funzione per aggiornare gli stati nel localStorage
function updateLS(updates) {
    console.log("Aggiornamento prenotazioni con:", updates);
    // 1. Carica tutte le prenotazioni esistenti
    const prenotazioniEsistenti = loadLS();

    // 2. Crea una mappa degli aggiornamenti per lookup veloce
    const updatesMap = Array.isArray(updates)
        ? updates.reduce((acc, { id, stato }) => ({ ...acc, [id]: stato }), {})
        : updates;
    console.log("Mappa degli aggiornamenti:", updatesMap);

  // 3. Aggiorna SOLO gli stati delle prenotazioni corrispondenti
  const prenotazioniAggiornate = prenotazioniEsistenti.map(p => ({
    ...p,
    stato: updatesMap[p.id] || p.stato // Mantieni lo stato originale se non ci sono aggiornamenti
  }));
  console.log("Prenotazioni aggiornate:", prenotazioniAggiornate);

    localStorage.clear(); // Cancella TUTTO il localStorage
    // Oppure per eliminare solo le prenotazioni:
    localStorage.removeItem('prenotazioniUtente'); 

  // 4. Sovrascrivi COMPLETAMENTE il localStorage
  saveLS(prenotazioniAggiornate);

  return prenotazioniAggiornate;
}


/* ──────── COMPONENTE  ──────── */
function HomePage() {
  const [prenotazioni, setPrenotazioni] = useState(() => loadLS());

  const [nome, setNome]     = useState('');
  const [numero, setNumero] = useState('1');
  const [data, setData]     = useState('');
  const [orario, setOrario] = useState('12:30');

  /* ── 1. INVIO FORM ───────────────────── */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const nuovaPren = {
      id: Date.now(),              // ← timestamp numerico
      nome,
      numero: Number(numero),
      data,
      orario,
      stato: 'pending',
    };

    try {
      const res = await fetch('http://172.30.88.62:3000/api/prenotazione', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuovaPren),
      });
      if (!res.ok) throw new Error('Errore nella prenotazione');

      // salva in state + localStorage
      setPrenotazioni((prev) => {
        const updated = [...prev, nuovaPren];
        saveLS(updated);
        return updated;
      });

      alert('Prenotazione inviata con successo!');
      setNome('');
      setNumero('1');
      setData('');
      setOrario('12:30');
    } catch (err) {
      console.error(err);
      alert('Errore nell’invio della prenotazione.');
    }
  };
    /* ── 2. SYNC CON BACKEND ──────────────── */
    const syncPrenotazioni = useCallback(async () => {
    const pendingPrenotazioni = prenotazioni.filter(p => p.stato === 'pending');
    if (pendingPrenotazioni.length === 0) return;

    try {
        const res = await fetch('http://172.30.88.62:3000/api/statoprenotazione', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids: pendingPrenotazioni.map(p => p.id) }),
        });

        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

        const response = await res.json();
        console.log("Risposta backend:", response);

        // Carica le prenotazioni ESISTENTI da localStorage
        const prenotazioniAttuali = loadLS();

        // Aggiorna SOLO gli stati delle prenotazioni con ID corrispondenti
        const prenotazioniAggiornate = prenotazioniAttuali.map(p => {
        const statoAggiornato = Array.isArray(response) 
            ? response.find(item => item.id === p.id)?.stato
            : response[p.id];
        
        return statoAggiornato ? { ...p, stato: statoAggiornato } : p;
        });

        // Sovrascrivi localStorage con i dati aggiornati
        updateLS(response);
        
        // Aggiorna lo state di React per triggerare il re-render
        setPrenotazioni(prenotazioniAggiornate);

    } catch (err) {
        console.error("Errore durante il sync:", err);
    }
    }, [prenotazioni]);

    // Gestione del polling (ottimizzata)
    useEffect(() => {
        const hasPending = prenotazioni.some(p => p.stato === 'pending');
        if (!hasPending) return;

        console.log("Starting polling..."); // DEBUG
        const intervalId = setInterval(syncPrenotazioni, 3000);
        return () => {
            console.log("Cleaning up polling..."); // DEBUG
            clearInterval(intervalId);
        };
    }, [prenotazioni, syncPrenotazioni]);

  /* ── 3. FILTRA PENDING PER UI ─────────── */
  const pending = prenotazioni.filter((p) => p.stato === 'pending');

  /* ── 4. UI ────────────────────────────── */
  return (
    <>
      <div className="landing-container">
        {/* Header */}
        <div className="header">
          <div className="image-container">
            <img src={PiattoPasta} alt="Pasta" className="pasta-image" />
          </div>
          <div className="title">
            <div>SCR</div><div>UM</div><div>BIST</div><div>ROT</div>
          </div>
        </div>

        {/* Form */}
        <div className="form-container">
          <form className="reservation-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Nome</label>
              <input
                type="text"
                placeholder="Il tuo nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Numero di persone</label>
              <select value={numero} onChange={(e) => setNumero(e.target.value)}>
                <option value="1">1 Persona</option>
                <option value="2">2 Persone</option>
                <option value="3">3 Persone</option>
                <option value="4">4 Persone</option>
              </select>
            </div>

            <div className="form-group">
              <label>Data</label>
              <input
                type="date"
                value={data}
                onChange={(e) => setData(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Orario</label>
              <select value={orario} onChange={(e) => setOrario(e.target.value)}>
                <option value="12:30">12:30</option>
                <option value="13:00">13:00</option>
                <option value="19:30">19:30</option>
                <option value="20:00">20:00</option>
              </select>
            </div>

            <button type="submit">PRENOTA</button>
          </form>
        </div>

        <SideMenu />
      </div>

      {/* Mappa */}
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

      {/* Prenotazioni pending */}
      {pending.length > 0 && (
        <div className="prenotazioni-pending">
          <h3>PRENOTAZIONI IN ATTESA</h3>
          <ul>
            {prenotazioni.map((p) => (
                <li key={p.id}>
                    {p.data} alle {p.orario} • {p.numero} persona{p.numero > 1 ? 'e' : ''} <br />{' '}
                    {p.stato === 'pending' && <span style={{ color: 'orange' }}>🕒 In attesa</span>}
                    {p.stato === 'confermata' && <span style={{ color: 'green' }}>✅ Confermata</span>}
                    {p.stato === 'rifiutata' && <span style={{ color: 'red' }}>❌ Rifiutata</span>}
                </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

export default HomePage;
