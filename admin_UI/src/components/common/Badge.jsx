import { COLORS } from "../../constants/colors";
import { roleColor, statusDot } from "../../utils/helpers";

export const RoleBadge = ({ role }) => {
  const c = roleColor(role);
  return (
    <span style={{
      fontSize: 10, fontWeight: 500, padding: "2px 8px",
      borderRadius: 20, background: c.bg, color: c.color,
    }}>{role}</span>
  );
};

export const StatusBadge = ({ status }) => (
  <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 11 }}>
    <span style={{ width: 6, height: 6, borderRadius: "50%", background: statusDot(status), flexShrink: 0 }} />
    {status}
  </span>
);

export const CatBadge = ({ cat }) => (
  <span style={{ fontSize: 10, padding: "2px 7px", borderRadius: 20, background: COLORS.gray100, color: COLORS.gray600 }}>{cat}</span>
);
