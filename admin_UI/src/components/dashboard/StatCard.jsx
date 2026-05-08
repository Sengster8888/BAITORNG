import { COLORS } from "../../constants/colors";

export const StatCard = ({ label, value, trend, trendLabel, gradient }) => (
  <div style={{
    flex: 1, padding: "16px",
    background: gradient || COLORS.white,
    borderRadius: 14,
    border: gradient ? "none" : `1px solid ${COLORS.gray200}`,
    boxShadow: "0 2px 10px rgba(0,0,0,0.03)",
    display: "flex", flexDirection: "column", justifyContent: "space-between",
    minHeight: 110,
    color: gradient ? COLORS.white : COLORS.gray900
  }}>
    <div>
      <div style={{ fontSize: 11, fontWeight: 600, opacity: gradient ? 0.8 : 0.6, textTransform: "uppercase", letterSpacing: "0.03em", marginBottom: 6 }}>{label}</div>
      <div style={{ fontSize: 26, fontWeight: 700 }}>{value}</div>
    </div>
    <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 10 }}>
      {trend && (
        <span style={{
          fontSize: 10, fontWeight: 700,
          padding: "2px 6px", borderRadius: 6,
          background: gradient ? "rgba(255,255,255,0.2)" : (trend.startsWith("+") ? COLORS.green100 : COLORS.red100),
          color: gradient ? COLORS.white : (trend.startsWith("+") ? COLORS.green700 : COLORS.red700)
        }}>{trend}</span>
      )}
      <span style={{ fontSize: 10, opacity: 0.7, fontWeight: 500 }}>{trendLabel}</span>
    </div>
  </div>
);
