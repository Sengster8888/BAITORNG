import { useState } from "react";
import { COLORS } from "../../constants/colors";

export const ActivityChart = () => {
  const [activeMetrics, setActiveMetrics] = useState(["users", "listings"]);
  const [range, setRange] = useState("Weekly");

  const metrics = [
    { id: "users", label: "Active Users", color: COLORS.green600 },
    { id: "listings", label: "New Listings", color: COLORS.teal600 },
    { id: "reports", label: "Reports", color: COLORS.red600 },
    { id: "matches", label: "Matches", color: COLORS.indigo600 }
  ];

  const data = [
    { name: "Mon", users: 400, listings: 240, reports: 12, matches: 45 },
    { name: "Tue", users: 520, listings: 280, reports: 15, matches: 52 },
    { name: "Wed", users: 480, listings: 320, reports: 8, matches: 60 },
    { name: "Thu", users: 610, listings: 300, reports: 20, matches: 55 },
    { name: "Fri", users: 590, listings: 350, reports: 18, matches: 70 },
    { name: "Sat", users: 700, listings: 400, reports: 5, matches: 85 },
    { name: "Sun", users: 750, listings: 420, reports: 4, matches: 90 },
  ];

  const toggleMetric = (id) => {
    setActiveMetrics(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const getPath = (id, max) => {
    return data.map((d, i) => `${i * 60},${100 - (d[id] / max) * 100}`).join(" L ");
  };

  return (
    <div style={{ background: COLORS.white, borderRadius: 16, border: `1px solid ${COLORS.gray200}`, padding: 24, boxShadow: "0 4px 20px rgba(0,0,0,0.02)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 30 }}>
        <div>
          <div style={{ fontSize: 18, fontWeight: 700, color: COLORS.gray900 }}>Platform Activity Overview</div>
          <div style={{ fontSize: 12, color: COLORS.gray500 }}>System-wide performance and user engagement trends.</div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {["Daily", "Weekly", "Monthly"].map(r => (
            <button key={r} onClick={() => setRange(r)} style={{
              fontSize: 11, padding: "6px 16px", borderRadius: 8, cursor: "pointer",
              background: range === r ? COLORS.green700 : COLORS.gray50,
              border: "none", color: range === r ? COLORS.white : COLORS.gray600,
              fontWeight: 600, transition: "all 0.2s"
            }}>{r}</button>
          ))}
        </div>
      </div>

      <div style={{ display: "flex", gap: 12, marginBottom: 24 }}>
        {metrics.map(m => (
          <button key={m.id} onClick={() => toggleMetric(m.id)} style={{
            display: "flex", alignItems: "center", gap: 8, padding: "8px 16px",
            borderRadius: 10, border: `1px solid ${activeMetrics.includes(m.id) ? m.color : COLORS.gray200}`,
            background: activeMetrics.includes(m.id) ? `${m.color}08` : COLORS.white,
            color: activeMetrics.includes(m.id) ? m.color : COLORS.gray500,
            fontSize: 12, fontWeight: 600, cursor: "pointer", transition: "all 0.2s"
          }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: m.color }} />
            {m.label}
          </button>
        ))}
      </div>

      <div style={{ height: 260, width: "100%", position: "relative" }}>
        <svg viewBox="0 0 360 100" style={{ width: "100%", height: "100%", overflow: "visible" }}>
          {/* Grid lines */}
          {[0, 25, 50, 75, 100].map(v => <line key={v} x1="0" y1={v} x2="360" y2={v} stroke={COLORS.gray100} strokeWidth="0.5" />)}

          {activeMetrics.includes("users") && (
            <path d={`M ${getPath("users", 1000)}`} fill="none" stroke={COLORS.green600} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          )}
          {activeMetrics.includes("listings") && (
            <path d={`M ${getPath("listings", 500)}`} fill="none" stroke={COLORS.teal600} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          )}
          {activeMetrics.includes("reports") && (
            <path d={`M ${getPath("reports", 30)}`} fill="none" stroke={COLORS.red600} strokeWidth="2" strokeDasharray="4 2" />
          )}
          {activeMetrics.includes("matches") && (
            <path d={`M ${getPath("matches", 120)}`} fill="none" stroke={COLORS.indigo600} strokeWidth="2.5" />
          )}
        </svg>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 16, color: COLORS.gray400, fontSize: 11, fontWeight: 500 }}>
          {data.map(d => <span key={d.name}>{d.name}</span>)}
        </div>
      </div>
    </div>
  );
};
