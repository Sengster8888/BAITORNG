import { COLORS } from "../../constants/colors";
import { Icon } from "../common/Icon";

export const TopBar = ({ title, globalSearch, setGlobalSearch }) => (
  <div style={{
    height: 64,
    padding: "0 24px",
    borderBottom: `1px solid ${COLORS.gray300}`,
    display: "flex", alignItems: "center", justifyContent: "space-between",
    flexShrink: 0, background: COLORS.white,
    boxShadow: "0 2px 5px rgba(0,0,0,0.02)"
  }}>
    <div style={{ display: "flex", alignItems: "center", gap: 20, flex: 1 }}>
      <div style={{ fontSize: 16, fontWeight: 700, color: COLORS.gray900 }}>{title}</div>
      <div style={{
        display: "flex", alignItems: "center", gap: 10,
        background: COLORS.gray50, border: `1px solid ${COLORS.gray300}`,
        padding: "6px 14px", borderRadius: 10, width: 350
      }}>
        <Icon name="search" color={COLORS.gray600} size={14} />
        <input
          placeholder="Search users, listings, reports..."
          value={globalSearch}
          onChange={e => setGlobalSearch(e.target.value)}
          style={{ background: "transparent", border: "none", outline: "none", fontSize: 13, width: "100%", color: COLORS.gray900 }}
        />
      </div>
    </div>
    <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
      <div style={{ cursor: "pointer", color: COLORS.gray600, position: "relative" }}>
        <Icon name="bell" size={20} />
        <span style={{ position: "absolute", top: -2, right: -2, width: 8, height: 8, background: COLORS.red700, borderRadius: "50%", border: `2px solid ${COLORS.white}` }} />
      </div>
      <div style={{ width: 1, height: 24, background: COLORS.gray300 }} />
      <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
        <div style={{ width: 30, height: 30, borderRadius: "50%", background: COLORS.gray100 }} />
        <svg width="10" height="10" viewBox="0 0 16 16" fill="none" stroke={COLORS.gray600} strokeWidth="2"><path d="M3 6l5 5 5-5" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </div>
    </div>
  </div>
);
