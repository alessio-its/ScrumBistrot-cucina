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

    const [newReview, setNewReview] = useState({ name: '', rating: 5, comment: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewReview({ ...newReview, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newEntry = { ...newReview, id: Date.now() };
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

            <form className="review-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Il tuo nome"
                    value={newReview.name}
                    onChange={handleChange}
                    required
                />
                <select
                    name="rating"
                    value={newReview.rating}
                    onChange={handleChange}
                >
                    {[5, 4, 3, 2, 1].map(r => (
                        <option key={r} value={r}>{r}</option>
                    ))}
                </select>
                <textarea
                    name="comment"
                    placeholder="Scrivi la tua recensione"
                    value={newReview.comment}
                    onChange={handleChange}
                    required
                />
                <button type="submit">INVIA</button>
            </form>
        </div>
    );
}

export default ReviewPage;
