import { COLORS } from "../../constants/colors";

export const ActBtn = ({ label, variant, onClick, disabled }) => {
  const styles = {
    default: { border: `0.5px solid ${COLORS.gray300}`, color: COLORS.gray600, background: COLORS.white },
    warn: { border: `0.5px solid #FAC775`, color: COLORS.amber700, background: COLORS.white },
    danger: { border: `0.5px solid #F7C1C1`, color: COLORS.red700, background: COLORS.white },
    success: { border: `0.5px solid ${COLORS.green200}`, color: COLORS.green700, background: COLORS.white },
  };
  const s = styles[variant || "default"];
  return (
    <button onClick={onClick} disabled={disabled} style={{
      ...s, padding: "3px 8px", borderRadius: 6,
      fontSize: 10, fontWeight: 500, cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.4 : 1, transition: "background .1s",
    }}>{label}</button>
  );
};

export const TH = ({ children, w }) => (
  <th style={{
    textAlign: "left", padding: "6px 8px",
    fontSize: 10, fontWeight: 500, letterSpacing: ".05em", textTransform: "uppercase",
    color: COLORS.gray600, borderBottom: `0.5px solid ${COLORS.gray300}`,
    width: w,
  }}>{children}</th>
);

export const TD = ({ children, style }) => (
  <td style={{
    padding: "8px", borderBottom: `0.5px solid ${COLORS.gray100}`,
    fontSize: 12, verticalAlign: "middle", ...style,
  }}>{children}</td>
);

export const FilterTabs = ({ tabs, active, onChange }) => (
  <div style={{ display: "flex", gap: 4 }}>
    {tabs.map(t => (
      <button key={t} onClick={() => onChange(t)} style={{
        fontSize: 11, padding: "3px 10px", borderRadius: 6, cursor: "pointer",
        fontWeight: active === t ? 500 : 400,
        background: active === t ? COLORS.green100 : "transparent",
        border: `0.5px solid ${active === t ? COLORS.green200 : "transparent"}`,
        color: active === t ? COLORS.green700 : COLORS.gray600,
      }}>{t}</button>
    ))}
  </div>
);
