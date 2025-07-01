import express from "express";
import cors from "cors";
const app = express();

app.use(cors());
app.use(express.json());

app.post("/test", (req, res) => {
  console.log("Ricevuto");
  res.json({ messaggio: "Prenotazione ricevuta!" });
});

app.listen(3000, () => console.log("Server su http://localhost:3000"));
