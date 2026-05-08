import { COLORS } from "../../constants/colors";
import { Icon } from "../common/Icon";

export const Sidebar = ({ active, setActive, NAV }) => (
  <div style={{
    width: 210, flexShrink: 0,
    background: COLORS.green900,
    display: "flex", flexDirection: "column",
    borderRight: `1px solid ${COLORS.green800}`,
  }}>
    {/* logo */}
    <div style={{ padding: "24px 20px 20px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{
          width: 32, height: 32, borderRadius: 8,
          background: COLORS.green600,
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 4px 10px rgba(0,0,0,0.2)"
        }}>
          <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
            <path d="M8 2C5 2 3 4 3 7c0 2 1 3.5 2.5 4.5L8 14l2.5-2.5C12 10.5 13 9 13 7c0-3-2-5-5-5z" fill={COLORS.white} />
          </svg>
        </div>
        <div>
          <div style={{ fontSize: 16, fontWeight: 700, color: COLORS.white, letterSpacing: ".01em" }}>Baitong</div>
          <div style={{ fontSize: 10, color: COLORS.green400, fontWeight: 500, textTransform: "uppercase", letterSpacing: ".05em" }}>Operations</div>
        </div>
      </div>
    </div>

    {/* nav */}
    <div style={{ padding: "10px 10px", flex: 1, overflowY: "auto" }}>
      <div style={{
        fontSize: 10, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase",
        color: COLORS.green700, padding: "0 12px", marginBottom: 8, marginTop: 10
      }}>Marketplace</div>
      {NAV.filter(n => ["dashboard", "users", "categories", "locations", "supply", "demand", "matches", "slots"].includes(n.key)).map(n => (
        <div key={n.key} onClick={() => setActive(n.key)} style={{
          display: "flex", alignItems: "center", gap: 10,
          padding: "10px 12px", borderRadius: 10, cursor: "pointer",
          marginBottom: 4,
          background: active === n.key ? COLORS.green800 : "transparent",
          color: active === n.key ? COLORS.white : COLORS.green200,
          transition: "all .2s ease",
        }}>
          <Icon name={n.icon} size={16} />
          <span style={{ fontSize: 13, fontWeight: active === n.key ? 600 : 400 }}>{n.label}</span>
          {n.badge && (
            <span style={{
              fontSize: 9, background: COLORS.red700, color: COLORS.white,
              padding: "1px 6px", borderRadius: 10, marginLeft: "auto", fontWeight: 700
            }}>{n.badge}</span>
          )}
        </div>
      ))}

      <div style={{
        fontSize: 10, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase",
        color: COLORS.green700, padding: "20px 12px 8px"
      }}>Administration</div>
      {NAV.filter(n => ["reports", "announcements", "logs", "settings"].includes(n.key)).map(n => (
        <div key={n.key} onClick={() => setActive(n.key)} style={{
          display: "flex", alignItems: "center", gap: 10,
          padding: "10px 12px", borderRadius: 10, cursor: "pointer",
          marginBottom: 4,
          background: active === n.key ? COLORS.green800 : "transparent",
          color: active === n.key ? COLORS.white : COLORS.green200,
          transition: "all .2s ease",
        }}>
          <Icon name={n.icon} size={16} />
          <span style={{ fontSize: 13, fontWeight: active === n.key ? 600 : 400 }}>{n.label}</span>
          {n.badge && (
            <span style={{
              fontSize: 9, background: COLORS.red700, color: COLORS.white,
              padding: "1px 6px", borderRadius: 10, marginLeft: "auto", fontWeight: 700
            }}>{n.badge}</span>
          )}
        </div>
      ))}
    </div>

    {/* admin footer */}
    <div style={{ padding: 16, borderTop: `1px solid ${COLORS.green800}`, background: "rgba(0,0,0,0.1)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{
          width: 34, height: 34, borderRadius: 10,
          background: COLORS.green700, color: COLORS.white,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 12, fontWeight: 700, border: `1px solid ${COLORS.green600}`
        }}>AD</div>
        <div style={{ overflow: "hidden" }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: COLORS.white, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Root Admin</div>
          <div style={{ fontSize: 10, color: COLORS.green400 }}>Master Account</div>
        </div>
      </div>
    </div>
  </div>
);
