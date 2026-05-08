import { COLORS } from "../../constants/colors";

export const Toggle = ({ active, onChange, label, sub }) => (
  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 0", borderBottom: `0.5px solid ${COLORS.gray100}` }}>
    <div style={{ flex: 1 }}>
      <div style={{ fontSize: 13, fontWeight: 500, color: COLORS.gray900 }}>{label}</div>
      {sub && <div style={{ fontSize: 10, color: COLORS.gray600, marginTop: 2 }}>{sub}</div>}
    </div>
    <div
      onClick={() => onChange(!active)}
      style={{
        width: 32, height: 16, borderRadius: 20,
        background: active ? COLORS.green600 : COLORS.gray300,
        position: "relative", cursor: "pointer", transition: "background .2s",
        flexShrink: 0
      }}
    >
      <div style={{
        width: 12, height: 12, borderRadius: "50%", background: COLORS.white,
        position: "absolute", top: 2, left: active ? 18 : 2,
        transition: "left .2s"
      }} />
    </div>
  </div>
);
