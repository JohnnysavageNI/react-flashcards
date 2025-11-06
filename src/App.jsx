import { useEffect, useState } from "react";
import Flashcard from "./components/Flashcard";
import Controls from "./components/Controls";
import { CARDS } from "./data/cards";

export default function App() {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [progress, setProgress] = useState(() => {
    // load saved progress or default to empty
    const saved = localStorage.getItem("flashcard-progress");
    return saved ? JSON.parse(saved) : {};
  });

  const card = CARDS[index];

  // save progress whenever it changes
  useEffect(() => {
    localStorage.setItem("flashcard-progress", JSON.stringify(progress));
  }, [progress]);

  const goPrev = () => {
    setIndex((i) => Math.max(0, i - 1));
    setFlipped(false);
  };

  const goNext = () => {
    setIndex((i) => Math.min(CARDS.length - 1, i + 1));
    setFlipped(false);
  };

  const markKnow = (known) => {
    setProgress((prev) => ({
      ...prev,
      [card.id]: known,
    }));
    goNext(); // move to next automatically
  };

  // keyboard shortcuts
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

  // calculate mastery
  const totalKnown = Object.values(progress).filter(Boolean).length;
  const masteryPercent = Math.round((totalKnown / CARDS.length) * 100);

  return (
    <main
      style={{ fontFamily: "system-ui, sans-serif", padding: 24, maxWidth: 720, margin: "0 auto" }}
    >
      <h1 style={{ marginBottom: 4 }}>Flashcards</h1>
      <p style={{ marginTop: 0, opacity: 0.7 }}>
        Card {index + 1} of {CARDS.length}
      </p>

      <Flashcard
        card={card}
        flipped={flipped}
        setFlipped={setFlipped}
        className={
          progress[card.id] === true ? "known" : progress[card.id] === false ? "unknown" : ""
        }
      />

      <div style={{ height: 16 }} />
      <Controls
        onPrev={goPrev}
        onNext={goNext}
        disablePrev={index === 0}
        disableNext={index === CARDS.length - 1}
      />

      <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 20 }}>
        <button
          onClick={() => markKnow(true)}
          style={{ background: "#d1fae5", borderColor: "#10b981" }}
        >
          ✅ I Know This
        </button>
        <button
          onClick={() => markKnow(false)}
          style={{ background: "#fee2e2", borderColor: "#ef4444" }}
        >
          ❌ Don’t Know Yet
        </button>
      </div>

      <p style={{ textAlign: "center", marginTop: 20, fontWeight: 500 }}>
        Mastery: {totalKnown} / {CARDS.length} ({masteryPercent}%)
      </p>

      <p style={{ opacity: 0.6, fontSize: 14, textAlign: "center", marginTop: 12 }}>
        Tips: Click card or <kbd>Shift+Space</kbd> to flip •<kbd>Space</kbd>/<kbd>→</kbd> next •{" "}
        <kbd>←</kbd> previous
      </p>
    </main>
  );
}
