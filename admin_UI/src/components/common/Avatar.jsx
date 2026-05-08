import { roleColor } from "../../utils/helpers";

export const Avatar = ({ initials, role, size = 28 }) => {
  const c = roleColor(role);
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%",
      background: c.bg, color: c.color,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: size * 0.36, fontWeight: 500, flexShrink: 0,
    }}>{initials}</div>
  );
};
