import { useEffect, useState } from "react";
import Flashcard from "./components/Flashcard";
import Controls from "./components/Controls";
import { CARDS } from "./data/cards";

export default function App() {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false); // 👈 moved to parent
  const card = CARDS[index];

  const goPrev = () => {
    setIndex((i) => Math.max(0, i - 1));
    setFlipped(false);
  };

  const goNext = () => {
    setIndex((i) => Math.min(CARDS.length - 1, i + 1));
    setFlipped(false);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      const { key, shiftKey } = event;

      switch (key) {
        case "ArrowLeft":
          event.preventDefault();
          goPrev();
          break;

        case "ArrowRight":
          event.preventDefault();
          goNext();
          break;

        case " ":
          event.preventDefault();
          if (shiftKey) {
            setFlipped((f) => !f);
          } else {
            goNext();
          }
          break;

        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goPrev, goNext]);

  return (
    <main
      style={{ fontFamily: "system-ui, sans-serif", padding: 24, maxWidth: 720, margin: "0 auto" }}
    >
      <h1 style={{ marginBottom: 4 }}>Flashcards</h1>
      <p style={{ marginTop: 0, opacity: 0.7 }}>
        Card {index + 1} of {CARDS.length}
      </p>

      <Flashcard card={card} flipped={flipped} setFlipped={setFlipped} />

      <div style={{ height: 16 }} />
      <Controls
        onPrev={goPrev}
        onNext={goNext}
        disablePrev={index === 0}
        disableNext={index === CARDS.length - 1}
      />
      <p style={{ opacity: 0.6, fontSize: 14, textAlign: "center", marginTop: 12 }}>
        Tips: Click card or press <kbd>Space</kbd> to flip • <kbd>←</kbd>/<kbd>→</kbd> to navigate
      </p>
    </main>
  );
}
