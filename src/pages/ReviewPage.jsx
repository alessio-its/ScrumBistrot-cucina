import { useState } from 'react';
import '../styles/ReviewPage.css';

function ReviewPage() {
    const [reviews, setReviews] = useState([
        { id: 1, name: "Alice", rating: 5, comment: "Fantastico sito!" },
        { id: 2, name: "Luca", rating: 4, comment: "Molto utile e ben fatto." }
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

    const getAverageRating = () => {
    if (reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, curr) => acc + Number(curr.rating), 0);
    return sum / reviews.length;
    };

    const average = getAverageRating();
    const fullStars = Math.floor(average);
    const hasHalfStar = average - fullStars >= 0.5;

    return (
        <div className="review-page">
            <h2>Recensioni</h2>

            <div className="average-rating">
                <p className="average-text">Media: {average.toFixed(1)} / 5</p>
                <p className="stars">
                    {'⭐'.repeat(fullStars)}
                    {hasHalfStar && '½'}
                </p>
            </div>

            <form onSubmit={handleSubmit} className="review-form">
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
                    {[5, 4, 3, 2, 1].map((r) => (
                        <option key={r} value={r}>{r} ⭐</option>
                    ))}
                </select>
                <textarea
                    name="comment"
                    placeholder="Scrivi la tua recensione"
                    value={newReview.comment}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Invia</button>
            </form>

            <div className="review-list">
                {reviews.map((review) => (
                    <div key={review.id} className="review-card">
                        <p className="review-name">{review.name}</p>
                        <p className="review-rating">{'⭐'.repeat(review.rating)}</p>
                        <p className="review-comment">{review.comment}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ReviewPage;
