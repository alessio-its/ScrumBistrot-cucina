import { useState, useEffect } from "react";
import "./Table.css";
import tableData from "/src/data/menu.json";

const SimpleTable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const sortedData = [...tableData].sort((a, b) => a.id - b.id);
    setData(sortedData);
  }, []);

  return (
    <div className="table-container">
      <table className="simple-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Descrizione</th>
            <th>Prezzo</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id}>
              <td data-label="ID">{row.id}</td>
              <td data-label="Nome">{row.nome}</td>
              <td data-label="Descrizione">{row.descrizione}</td>
              <td data-label="Prezzo">€{row.prezzo.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SimpleTable;
