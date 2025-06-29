import { useState } from 'react'
import './App.css'
import { HiMenuAlt4 } from "react-icons/hi";

function App() {
  const [count, setCount] = useState(0)
  return (
    <div className="landing-container">

      {/* Menu Icon */}
      <div className="menu-icon">
        <HiMenuAlt4 className='icon' />
      </div>

      {/* Header */}
      <div className="header">
        <div className="image-container">
          <img
            src="src\assets\PiattoPasta.png"
            alt="Pasta"
            className="pasta-image"
          />
        </div>
        <div className="title">
          <div>SCR</div>
          <div>UM</div>
          <div>BIST</div>
          <div>ROT</div>
        </div>
      </div>

      {/* Form */}
      <div className="form-container">
        <form className="reservation-form">
          <div className="form-group">
            <label>Nome</label>
            <input type="text" placeholder="Il tuo nome" />
          </div>

          <div className="form-group">
            <label>Numero di persone</label>
            <select>
              <option>1 Persona</option>
              <option>2 Persone</option>
              <option>3 Persone</option>
              <option>4+ Persone</option>
            </select>
          </div>

          <div className="form-group">
            <label>Data</label>
            <input type="date" placeholder="gg/mm/aaaa" />
          </div>

          <div className="form-group">
            <label>Orario</label>
            <select>
              <option>12:30</option>
              <option>13:00</option>
              <option>19:30</option>
              <option>20:00</option>
            </select>
          </div>

          <button type="submit">PRENOTA</button>
        </form>
      </div>
    </div>
  );
}

export default App
