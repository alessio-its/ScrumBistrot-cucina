import { useState, useEffect } from 'react';
import '../styles/ReviewPage.css';
import SideMenu from '../components/SideMenu.jsx';
import CircleRating from '../components/CircleRating.jsx';

function ReviewPage() {
    const [reviews, setReviews] = useState([]); // <-- parte vuoto
    const [showPopup, setShowPopup] = useState(false);
    const [newReview, setNewReview] = useState({ nome: '', voto: 5, messaggio: '' });

    useEffect(() => {
        fetch('http://172.30.88.62:3000/api/getreview')
            .then(response => {
                console.log(response);
                if (!response.ok) throw new Error('Errore nel recupero delle recensioni');
                return response.json();
            })
            .then(data => {
                setReviews(data.sort((a, b) => b.id - a.id));
            })
            .catch(error => {
                console.error('Errore durante il fetch:', error);
            });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewReview({ ...newReview, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newEntry = {
            id: Date.now(),
            nome: newReview.nome,
            voto: Number(newReview.voto),
            messaggio: newReview.messaggio
        };

        setReviews([newEntry, ...reviews]); // aggiorna subito il frontend
        setNewReview({id: 1, nome: '', voto: 5, messaggio: '' });
        setShowPopup(false);

        fetch('http://172.30.88.62:3000/api/review', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newEntry) // invia come array
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Errore nell\'invio della recensione');
            }
            console.log('Recensione inviata con successo');
        })
        .catch(error => {
            console.error('Errore durante la fetch:', error);
        });
    };

    const average = reviews.length > 0
        ? reviews.reduce((acc, r) => acc + r.voto, 0) / reviews.length
        : 0;

    const roundedAvg = Math.round(average * 10) / 10;

    return (
        <div className="review-section">
            <SideMenu />
            <h1 className="review-title">RECEN<br />SIONI</h1>

            <div className="average-box">
                <span className="average-number">{roundedAvg}<span className="out-of">/5</span></span>
                <div className="average-box_right">
                    <div className="stars">
                        <CircleRating value={roundedAvg} />
                    </div>
                    <p className="review-count">BASATO SU {reviews.length} RECENSIONI</p>
                </div>
            </div>

            <div className="review-list">
                {reviews.map(r => (
                    <div key={r.id} className="review-card">
                        <hr />
                        <h3>{r.nome}</h3>
                        <div className="stars small">
                            <CircleRating value={r.voto} />
                        </div>
                        <p>{r.messaggio}</p>
                    </div>
                ))}
            </div>

            {showPopup && (
                <div className="popup-overlay" onClick={() => setShowPopup(false)}>
                    <div className="popup" onClick={e => e.stopPropagation()}>
                        <h2>Lascia una recensione</h2>
                        <form onSubmit={handleSubmit} className="popup-form">
                            <input
                                type="text"
                                name="nome"
                                value={newReview.nome}
                                onChange={handleChange}
                                placeholder="Il tuo nome"
                                required
                            />
                            <select
                                name="voto"
                                value={newReview.voto}
                                onChange={handleChange}
                            >
                                {[5, 4, 3, 2, 1].map(n => (
                                    <option key={n} value={n}>{n} {n === 1 ? "Stella" : "Stelle"}</option>
                                ))}
                            </select>
                            <textarea
                                name="messaggio"
                                value={newReview.messaggio}
                                onChange={handleChange}
                                placeholder="Scrivi la tua recensione"
                                required
                            />
                            <button type="submit">Invia</button>
                        </form>
                    </div>
                </div>
            )}

            <div className="review-form" onClick={() => setShowPopup(true)}>
                Lascia una recensione
            </div>
        </div>
    );
}

export default ReviewPage;
