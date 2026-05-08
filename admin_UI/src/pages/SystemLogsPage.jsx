import { useState } from "react";
import { COLORS } from "../constants/colors";
import { LOGS } from "../constants/mockData";
import { ActBtn, TH, FilterTabs } from "../components/common/UIElements";

export const SystemLogsPage = () => {
  const [filter, setFilter] = useState("All");
  const [visibleCount, setVisibleCount] = useState(20);

  const filtered = LOGS.filter(l => filter === "All" || l.severity === filter);
  const visibleLogs = filtered.slice(0, visibleCount);

  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
        <div style={{ padding: 16, background: COLORS.gray100, borderRadius: 10 }}>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 8 }}>Audit Accountability</div>
          <div style={{ fontSize: 11, color: COLORS.gray600, lineHeight: "1.5" }}>
            Every administrative action (bans, deletions, verifications) is recorded here.
            This log is immutable and serves as the <strong>Source of Truth</strong> for platform moderation.
          </div>
        </div>
        <div style={{ padding: 16, background: COLORS.gray100, borderRadius: 10 }}>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 8 }}>Log Retention</div>
          <div style={{ fontSize: 11, color: COLORS.gray600, lineHeight: "1.5" }}>
            Standard logs are kept for 90 days. High-severity logs (Critical/Security) are archived
            permanently in the compliance vault for legal review.
          </div>
        </div>
      </div>

      <div style={{
        padding: "10px 0 8px", position: "sticky", top: 0, background: COLORS.white, zIndex: 2,
        borderBottom: `0.5px solid ${COLORS.gray100}`, marginBottom: 8,
        display: "flex", alignItems: "center", justifyContent: "space-between"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 13, fontWeight: 500 }}>Immutable Activity Log</span>
          <span style={{ fontSize: 10, padding: "2px 8px", borderRadius: 20, background: COLORS.green100, color: COLORS.green700 }}>{filtered.length} entries found</span>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <ActBtn label="Export Audit CSV" />
          <FilterTabs tabs={["All", "High", "Medium", "Low"]} active={filter} onChange={setFilter} />
        </div>
      </div>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12, tableLayout: "fixed" }}>
        <thead><tr>
          <TH w="15%">Timestamp</TH><TH w="12%">Source</TH>
          <TH w="18%">Action</TH><TH w="15%">Subject</TH><TH w="30%">Result / Reason</TH><TH w="10%">Severity</TH>
        </tr></thead>
        <tbody>
          {visibleLogs.map(l => (
            <tr key={l.id}>
              <td style={{ padding: "10px 8px", borderBottom: `1px solid ${COLORS.gray100}`, fontSize: 11, fontFamily: "monospace", color: COLORS.gray600 }}>{l.time}</td>
              <td style={{ padding: "10px 8px", borderBottom: `1px solid ${COLORS.gray100}` }}>
                <span style={{ fontSize: 10, fontWeight: 600, color: l.actor === "System" ? COLORS.blue700 : COLORS.gray900 }}>{l.actor}</span>
              </td>
              <td style={{ padding: "10px 8px", borderBottom: `1px solid ${COLORS.gray100}`, fontWeight: 600 }}>{l.action}</td>
              <td style={{ padding: "10px 8px", borderBottom: `1px solid ${COLORS.gray100}`, color: COLORS.gray600 }}>{l.target}</td>
              <td style={{ padding: "10px 8px", borderBottom: `1px solid ${COLORS.gray100}`, color: COLORS.gray600, fontSize: 11 }}>{l.details}</td>
              <td style={{ padding: "10px 8px", borderBottom: `1px solid ${COLORS.gray100}` }}>
                <span style={{ fontSize: 9, fontWeight: 700, padding: "2px 6px", borderRadius: 4, background: l.severity === "High" ? COLORS.red100 : COLORS.blue100, color: l.severity === "High" ? COLORS.red700 : COLORS.blue700 }}>{l.severity}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {filtered.length > visibleCount && (
        <div style={{ padding: "20px 0", textAlign: "center" }}>
          <button
            onClick={() => setVisibleCount(prev => prev + 20)}
            style={{
              padding: "8px 24px", borderRadius: 8, border: `1px solid ${COLORS.gray300}`,
              background: COLORS.white, color: COLORS.gray600, fontSize: 12, cursor: "pointer",
              fontWeight: 500
            }}
          >
            Load 20 More Entries
          </button>
        </div>
      )}
    </div>
  );
};
