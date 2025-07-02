import '../styles/CircleRating.css';

function CircleRating({ value }) {
    const full = Math.floor(value);
    const hasHalf = value - full >= 0.25 && value - full < 0.75;
    const extraFull = value - full >= 0.75;

    const totalFull = full + (extraFull ? 1 : 0);

    return (
        <div className="circle-rating">
            {Array.from({ length: 5 }).map((_, i) => {
                if (i < totalFull) {
                    return <span key={i} className="circle full" />;
                } else if (i === full && hasHalf) {
                    return <span key={i} className="circle half" />;
                } else {
                    return <span key={i} className="circle empty" />;
                }
            })}
        </div>
    );
}

export default CircleRating;