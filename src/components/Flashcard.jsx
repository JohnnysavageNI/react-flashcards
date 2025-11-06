export default function Flashcard({ card, flipped, setFlipped, className = "" }) {
  if (!card) return null;

  return (
    <div
      className="card"
      role="button"
      aria-label="Flashcard"
      onClick={() => setFlipped((f) => !f)}
    >
      <div className={`card-inner ${flipped ? "is-flipped" : ""}`}>
        <div className="card-face card-front">
          <h2>{card.front}</h2>
          <small>(click to see answer)</small>
        </div>
        <div className="card-face card-back">
          <h2>{card.back}</h2>
          <small>(click to see question)</small>
        </div>
      </div>
    </div>
  );
}
