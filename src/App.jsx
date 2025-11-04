import { useState } from "react";
import Flashcard from "./components/Flashcard";
import Controls from "./components/Controls";
import { CARDS } from "./data/cards";

export default function App() {
  const [index, setIndex] = useState(0);
  const card = CARDS[index];

  const goPrev = () => setIndex((i) => Math.max(0, i - 1));
  const goNext = () => setIndex((i) => Math.min(CARDS.length - 1, i + 1));

  return (
    <main
      style={{ fontFamily: "system-ui, sans-serif", padding: 24, maxWidth: 720, margin: "0 auto" }}
    >
      <h1 style={{ marginBottom: 4 }}>Flashcards</h1>
      <p style={{ marginTop: 0, opacity: 0.7 }}>
        Card {index + 1} of {CARDS.length}
      </p>

      <Flashcard card={card} />

      <div style={{ height: 16 }} />
      <Controls
        onPrev={goPrev}
        onNext={goNext}
        disablePrev={index === 0}
        disableNext={index === CARDS.length - 1}
      />
    </main>
  );
}
