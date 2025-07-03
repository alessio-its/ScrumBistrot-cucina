import Table from "./Table.jsx";
import Prenotazione from "./Prenotazione.jsx";

function App() {
  return (
    <>
      <h1 style={{ textAlign: "center" }}>Piatti ordinati</h1>
      <Table />
      <h1 style={{ textAlign: "center" }}>Prenotazioni</h1>
      <Prenotazione />
    </>
  );
}

export default App;
