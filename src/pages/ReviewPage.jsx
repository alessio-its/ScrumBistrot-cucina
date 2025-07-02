import { useState } from 'react';
import '../styles/ReviewPage.css';
import SideMenu from '../components/SideMenu.jsx';
import CircleRating from '../components/CircleRating.jsx';

function ReviewPage() {
    const [reviews, setReviews] = useState([
        { id: 1, name: "Mario Rossi", rating: 4, comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean congue tortor ipsum, id finibus sapien fringilla quis. Vestibulum convallis magna eu viverra tristique. Aenean pharetra finibus nulla." },
        { id: 2, name: "Franca Lai", rating: 3, comment: "Praesent sapien ipsum, sagittis ac est quis, bibendum convallis quam. Lorem ipsum dolor sit amet." },
        { id: 3, name: "Giuseppe Bianchi", rating: 5, comment: "Curabitur venenatis feugiat molestie. Sed scelerisque porta aliquam. Nullam tellus nisl, blandit vel lorem id, feugiat consequat erat. Quisque bibendum mi at nulla convallis pellentesque." }
    ]);
    const [showPopup, setShowPopup] = useState(false);

    const [newReview, setNewReview] = useState({ name: '', rating: 5, comment: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewReview({ ...newReview, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newEntry = { ...newReview, id: Date.now(), rating: Number(newReview.rating) };
        setReviews([newEntry, ...reviews]);
        setNewReview({ name: '', rating: 5, comment: '' });
    };

    const average = reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;
    const roundedAvg = Math.round(average * 10) / 10;

    return (
        <div className="review-section">
            <SideMenu/>
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
                        <h3>{r.name}</h3>
                        <div className="stars small">
                            <CircleRating value={r.rating} />
                        </div>
                        <p>{r.comment}</p>
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
                            name="name"
                            value={newReview.name}
                            onChange={handleChange}
                            placeholder="Il tuo nome"
                            required
                        />
                        <select
                            name="rating"
                            value={newReview.rating}
                            onChange={handleChange}
                        >
                            {[5, 4, 3, 2, 1].map(n => (
                                <option key={n} value={n}>{n} {n == 1 ? "Stella" : "Stelle"}</option>
                            ))}
                        </select>
                        <textarea
                            name="comment"
                            value={newReview.comment}
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
