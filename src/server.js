import express from "express";
import cors from "cors";
import fs from "fs/promises"; //Promise-based di fs

const app = express();

app.use(cors());
app.use(express.json());

const PRENOTAZIONE_PATH = "./data/prenotazione.json";
const FILE_PATH = "./data/ordine.json";
const REVIEW_PATH = "./data/review.json";

//leggere da file json
async function leggiDaFileJson(path) {
  try {
    const data = await fs.readFile(path, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    if (err.code === "ENOENT") return [];
    throw err;
  }
}

//scrivi su file json
async function scriviSuFileJson(path, data) {
  try {
    await fs.writeFile(path, JSON.stringify(data, null, 2), "utf-8");
  } catch (error) {
    console.error("Errore durante la scrittura del file JSON:", error);
    throw error;
  }
}

//-- UPDATE PRENOTAZIONE -- //
app.post("/api/updateprenotazione", async (req, res) => {
  const { id, stato } = req.body;

  if (!id || !stato) {
    return res.status(400).json({ error: "ID e stato richiesti" });
  }

  try {
    const prenotazioni = await leggiDaFileJson(PRENOTAZIONE_PATH);

    const index = prenotazioni.findIndex((p) => p.id === id);
    if (index === -1) {
      return res.status(404).json({ error: "Prenotazione non trovata" });
    }

    prenotazioni[index].stato = stato;

    await scriviSuFileJson(PRENOTAZIONE_PATH, prenotazioni);

    res.json({
      message: "Stato aggiornato",
      prenotazione: prenotazioni[index],
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Errore interno del server" });
  }
});

//-- STATO PRENOTAZIONE -- //
app.post("/api/statoprenotazione", async (req, res) => {
  const { ids } = req.body;

  if (!Array.isArray(ids) || ids.length === 0) {
    return res.status(400).json({ message: "Array di ID obbligatorio" });
  }

  try {
    const prenotazioni = await leggiDaFileJson(PRENOTAZIONE_PATH);

    const trovate = prenotazioni.filter((p) => ids.includes(p.id));

    if (trovate.length === 0) {
      return res.status(404).json({ message: "Nessuna prenotazione trovata" });
    }

    res.json({
      message: "Prenotazioni trovate",
      prenotazioni: trovate.map((p) => ({
        id: p.id,
        stato: p.stato,
      })),
    });
  } catch (error) {
    console.error("Errore:", error);
    res
      .status(500)
      .json({ message: "Errore durante la lettura delle prenotazioni" });
  }
});

// -- PRENOTAZIONE -- //
app.post("/api/prenotazione", async (req, res) => {
  try {
    const { id, nome, numero, data, orario } = req.body;

    // Validazione dei campi obbligatori
    if (!id || !nome || !numero || !data || !orario) {
      return res.status(400).json({ error: "Tutti i campi sono obbligatori!" });
    }

    // Leggi le prenotazioni esistenti
    const ordini = await leggiDaFileJson(PRENOTAZIONE_PATH);

    // Aggiungi lo stato "pending" direttamente al nuovo ordine
    const nuovoOrdine = { id, nome, numero, data, orario, stato: "pending" };

    // Aggiungi l'ordine all'array
    ordini.push(nuovoOrdine);

    // Scrivi nel file JSON
    await scriviSuFileJson(PRENOTAZIONE_PATH, ordini);

    // Risposta di successo
    res.status(201).json({
      success: true,
      message: "Prenotazione aggiunta con successo!",
      ordine: nuovoOrdine,
    });
  } catch (error) {
    console.error("Errore nel server:", error);
    res.status(500).json({
      success: false,
      error: "Errore durante il salvataggio della prenotazione",
    });
  }
});

// Endpoint GET per ottenere TUTTI gli ordini
// -- GET PRENOTAZIONE -- //
app.get("/api/getprenotazioni", async (req, res) => {
  try {
    const ordini = await leggiDaFileJson(PRENOTAZIONE_PATH);

    // Se vuoi filtrare per query params (opzionale)
    const { nome, numero } = req.query;
    let ordiniFiltrati = ordini;

    if (nome) {
      ordiniFiltrati = ordiniFiltrati.filter((ordine) =>
        ordine.nome.toLowerCase().includes(nome.toLowerCase())
      );
    }

    if (numero) {
      ordiniFiltrati = ordiniFiltrati.filter(
        (ordine) => ordine.numero === parseInt(numero)
      );
    }

    res.json(ordiniFiltrati);
  } catch (error) {
    console.error("Errore nel recupero degli ordini:", error);
    res.status(500).json({
      success: false,
      error: "Errore del server",
    });
  }
});

// Endpoint POST per aggiungere un ordine
// -- ORDINE -- //
app.post("/api/ordine", async (req, res) => {
  try {
    const ordini = await leggiDaFileJson(FILE_PATH);

    const { tavolo, piattiOrdinati } = req.body;

    // Aggiunge nuovo ordine (tavolo + piatti)
    ordini.push({ tavolo, piattiOrdinati });

    // Scrive su file
    await scriviSuFileJson(FILE_PATH, ordini);
    res.json({ message: "Ordine salvato!" });
  } catch (error) {
    console.error("Errore nella gestione del file:", error);
    res.status(500).json({ error: "Errore del server" });
  }
});

// -- GET ORDINI -- //
app.get("/api/getordini", async (req, res) => {
  try {
    // Legge tutti gli ordini dal file JSON
    const ordini = await leggiDaFileJson(FILE_PATH);

    // Restituisce l'intero array di ordini
    res.json(ordini);
  } catch (error) {
    console.error("Errore nella lettura del file:", error);
    res.status(500).json({ error: "Errore del server" });
  }
});

// -- REVIEW -- //
app.post("/api/review", async (req, res) => {
  try {
    // Legge le recensioni esistenti
    let reviews = [];
    try {
      const file = await fs.readFile(REVIEW_PATH, "utf-8");
      reviews = JSON.parse(file);
    } catch (err) {
      if (err.code !== "ENOENT") throw err;
    }

    const nuovaReview = req.body;

    // Validazione
    if (
      typeof nuovaReview !== "object" ||
      Array.isArray(nuovaReview) ||
      nuovaReview === null
    ) {
      return res
        .status(400)
        .json({ error: "Formato review non valido: deve essere un oggetto" });
    }

    // Aggiunge la nuova review
    reviews.push(nuovaReview);
    // Salva il file
    await fs.writeFile(REVIEW_PATH, JSON.stringify(reviews, null, 2), "utf-8");

    // Restituisce SOLO l'ultima review aggiunta (l'ultimo elemento dell'array)
    res.json(nuovaReview); // Oppure: res.json(reviews[reviews.length - 1]);
  } catch (error) {
    console.error("Errore nella gestione della review:", error);
    res.status(500).json({ error: "Errore del server" });
  }
});

// -- GET REVIEW -- //
app.get("/api/getreview", async (req, res) => {
  try {
    // Legge tutte le recensioni dal file
    let reviews = [];
    try {
      const file = await fs.readFile(REVIEW_PATH, "utf-8");
      reviews = JSON.parse(file);
    } catch (err) {
      if (err.code !== "ENOENT") throw err; // Ignora solo se il file non esiste
    }

    // Risponde con l'intero array di recensioni
    res.json(reviews);
  } catch (error) {
    console.error("Errore nel recupero delle reviews:", error);
    res.status(500).json({ error: "Errore del server" });
  }
});

app.listen(3000, () => console.log("Server su http://localhost:3000"));
