export default function Controls({ onPrev, onNext, disablePrev, disableNext }) {
  const btn = {
    padding: "10px 16px",
    borderRadius: 8,
    border: "1px solid #e5e7eb",
    background: "white",
    color: "#111",
    cursor: "pointer",
    fontSize: "16px",
  };

  return (
    <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
      <button style={btn} onClick={onPrev} disabled={disablePrev}>
        Previous
      </button>
      <button style={btn} onClick={onNext} disabled={disableNext}>
        Next
      </button>
    </div>
  );
}
