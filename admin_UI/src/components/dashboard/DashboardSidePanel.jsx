import { COLORS } from "../../constants/colors";

export const DashboardSidePanel = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
    {/* Platform Filters */}
    <div style={{ background: COLORS.white, borderRadius: 16, padding: 20, border: `1px solid ${COLORS.gray200}` }}>
      <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 16, color: COLORS.gray900 }}>Platform Filters</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {[
          { label: "Province", val: "All Cambodia" },
          { label: "User Role", val: "All Roles" },
          { label: "Category", val: "Marketplace" },
          { label: "Severity", val: "High & Medium" }
        ].map(f => (
          <div key={f.label}>
            <div style={{ fontSize: 10, color: COLORS.gray500, fontWeight: 600, textTransform: "uppercase", marginBottom: 4 }}>{f.label}</div>
            <div style={{ fontSize: 12, fontWeight: 500, color: COLORS.gray800, padding: "8px 12px", background: COLORS.gray50, borderRadius: 8, cursor: "pointer", border: `1px solid ${COLORS.gray100}` }}>{f.val}</div>
          </div>
        ))}
      </div>
    </div>

    {/* Quick Actions */}
    <div style={{ background: COLORS.white, borderRadius: 16, padding: 20, border: `1px solid ${COLORS.gray200}` }}>
      <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 16, color: COLORS.gray900 }}>Quick Actions</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <button style={{ width: "100%", padding: "10px", borderRadius: 10, border: "none", background: COLORS.green700, color: COLORS.white, fontSize: 12, fontWeight: 600, cursor: "pointer" }}>Verify Pending Listings</button>
        <button style={{ width: "100%", padding: "10px", borderRadius: 10, border: `1px solid ${COLORS.gray200}`, background: COLORS.white, color: COLORS.gray700, fontSize: 12, fontWeight: 600, cursor: "pointer" }}>Publish Announcement</button>
      </div>
    </div>

    {/* System Health */}
    <div style={{ background: COLORS.white, borderRadius: 16, padding: 20, border: `1px solid ${COLORS.gray200}` }}>
      <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 16, color: COLORS.gray900 }}>System Integrity</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {[
          { label: "Matching Engine", status: "Active", color: COLORS.green600 },
          { label: "Notification Relay", status: "Stable", color: COLORS.green600 },
          { label: "Spam Detection", status: "Monitoring", color: COLORS.amber600 },
          { label: "Maintenance", status: "Off", color: COLORS.gray400 }
        ].map(s => (
          <div key={s.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 12, color: COLORS.gray600 }}>{s.label}</span>
            <span style={{ fontSize: 10, fontWeight: 700, color: s.color }}>{s.status.toUpperCase()}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);
