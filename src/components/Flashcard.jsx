import { useState } from "react";

export default function Flashcard({ card }) {
  const [flipped, setFlipped] = useState(false);
  if (!card) return null;

  return (
    <div
      onClick={() => setFlipped((f) => !f)}
      style={{
        cursor: "pointer",
        border: "1px solid #e5e7eb",
        borderRadius: 12,
        padding: 24,
        minHeight: 160,
        display: "grid",
        placeItems: "center",
        boxShadow: "0 6px 18px rgba(0,0,0,.06)",
        userSelect: "none",
      }}
      aria-label="Flashcard"
      role="button"
    >
      <h2 style={{ margin: 0, textAlign: "center" }}>{flipped ? card.back : card.front}</h2>
      <small style={{ opacity: 0.6, marginTop: 12 }}>
        (click to {flipped ? "see question" : "see answer"})
      </small>
    </div>
  );
}
