import express from "express";
import cors from "cors";
const app = express();

app.use(cors());
app.use(express.json());

app.post("/api/ordine", (req, res) => {
  console.log(req.body);
  res.json({ message: "Prenotazione ricevuta!" });
});

app.listen(3000, () => console.log("Server su http://localhost:3000"));
