import { useState, useRef } from "react";
import { COLORS } from "../../constants/colors";

export const HoldButton = ({ label, onConfirm, duration = 2000, color = COLORS.red700 }) => {
  const [holding, setHolding] = useState(false);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef(null);

  const startHold = () => {
    setHolding(true);
    const start = Date.now();
    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - start;
      const p = Math.min((elapsed / duration) * 100, 100);
      setProgress(p);
      if (p >= 100) {
        clearInterval(intervalRef.current);
        onConfirm();
        reset();
      }
    }, 50);
  };

  const stopHold = () => {
    if (progress < 100) reset();
  };

  const reset = () => {
    setHolding(false);
    setProgress(0);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  return (
    <div style={{ position: "relative", width: "100%", height: 44, borderRadius: 10, overflow: "hidden", marginTop: 20 }}>
      <button
        onMouseDown={startHold}
        onMouseUp={stopHold}
        onMouseLeave={stopHold}
        onTouchStart={startHold}
        onTouchEnd={stopHold}
        style={{
          width: "100%", height: "100%", background: COLORS.white,
          border: `2px solid ${color}`, color: color,
          borderRadius: 10, fontWeight: 700, fontSize: 13, cursor: "pointer",
          position: "relative", zIndex: 2, userSelect: "none"
        }}
      >
        {holding ? `Release to Cancel (${Math.round(progress)}%)` : label}
      </button>
      <div style={{
        position: "absolute", top: 0, left: 0, height: "100%",
        width: `${progress}%`, background: color, opacity: 0.1,
        transition: "width 0.05s linear", zIndex: 1
      }} />
    </div>
  );
};
