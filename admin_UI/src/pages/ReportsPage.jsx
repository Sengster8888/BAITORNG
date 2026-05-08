import { useState } from "react";
import { COLORS } from "../constants/colors";
import { REPORTS } from "../constants/mockData";
import { StatusBadge } from "../components/common/Badge";
import { ActBtn, TH, TD } from "../components/common/UIElements";
import { StatCard } from "../components/dashboard/StatCard";
import { SectionHeader } from "../components/layout/SectionHeader";
import { ConfirmModal, SideDrawer } from "../components/layout/Modals";

export const ReportsPage = () => {
  const [filter, setFilter] = useState("All");
  const [items, setItems] = useState(REPORTS);
  const [selectedReport, setSelectedReport] = useState(null);
  const [confirmAction, setConfirmAction] = useState(null);

  const filtered = items.filter(i => filter === "All" || i.status === filter || i.severity === filter);

  const handleAction = (reason, note) => {
    const { report, action } = confirmAction;
    if (action === "resolve") setItems(prev => prev.map(r => r.id === report.id ? { ...r, status: "Resolved" } : r));
    if (action === "dismiss") setItems(prev => prev.map(r => r.id === report.id ? { ...r, status: "Dismissed" } : r));
    setConfirmAction(null);
  };

  const severityBadge = (s) => {
    const c = s === "High" || s === "Critical" ? COLORS.red700 : (s === "Medium" ? COLORS.amber700 : COLORS.green700);
    const bg = s === "High" || s === "Critical" ? COLORS.red100 : (s === "Medium" ? COLORS.amber100 : COLORS.green100);
    return <span style={{ fontSize: 9, fontWeight: 700, padding: "2px 8px", borderRadius: 4, background: bg, color: c }}>{s}</span>;
  };

  return (
    <div>
      <div style={{ display: "flex", gap: 10, marginBottom: 14 }}>
        <StatCard label="Active Reports" value={items.filter(r => r.status === "Open").length} trendLabel="waiting response" />
        <StatCard label="Medium Severity" value={items.filter(r => r.severity === "Medium").length} trendLabel="queued" />
        <StatCard label="Resolved" value={items.filter(r => r.status === "Resolved").length} trendLabel="past 7 days" />
      </div>

      <SectionHeader title="Moderation Queue" search={false} filter={["All", "Open", "Reviewed", "Resolved", "High", "Medium", "Low"]} filterVal={filter} onFilter={setFilter} />

      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12, tableLayout: "fixed" }}>
        <thead style={{ position: "sticky", top: 0, background: COLORS.white, zIndex: 1 }}><tr>
          <TH w="12%">Report ID</TH><TH w="15%">Reporter</TH><TH w="20%">Target</TH><TH w="15%">Reason</TH><TH w="10%">Severity</TH><TH w="10%">Status</TH><TH w="18%">Actions</TH>
        </tr></thead>
        <tbody>
          {filtered.map(r => (
            <tr key={r.id} style={{ cursor: "pointer" }} onMouseEnter={e => e.currentTarget.style.background = COLORS.gray50} onMouseLeave={e => e.currentTarget.style.background = "transparent"} onClick={() => setSelectedReport(r)}>
              <TD style={{ fontWeight: 600 }}>{r.id}</TD>
              <TD>{r.reporter}</TD>
              <TD>
                <div style={{ fontWeight: 500 }}>{r.targetName}</div>
                <div style={{ fontSize: 9, color: COLORS.gray600 }}>{r.targetType} • #{r.targetId}</div>
              </TD>
              <TD>{r.reason}</TD>
              <TD>{severityBadge(r.severity)}</TD>
              <TD><StatusBadge status={r.status} /></TD>
              <TD onClick={e => e.stopPropagation()}><div style={{ display: "flex", gap: 3 }}>
                <ActBtn label="Resolve" variant="success" onClick={() => setConfirmAction({ report: r, action: "resolve", type: "success", requireReason: true })} />
                <ActBtn label="Dismiss" onClick={() => setConfirmAction({ report: r, action: "dismiss", type: "warn", requireReason: true })} />
              </div></TD>
            </tr>
          ))}
        </tbody>
      </table>

      <SideDrawer title="Moderation Report Details" isOpen={!!selectedReport} onClose={() => setSelectedReport(null)} width={550}>
        {selectedReport && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: 18 }}>Report {selectedReport.id}</div>
                <div style={{ fontSize: 12, color: COLORS.gray600 }}>Submitted on {selectedReport.date}</div>
              </div>
              {severityBadge(selectedReport.severity)}
            </div>

            <div style={{ background: COLORS.red100, padding: 15, borderRadius: 10, marginBottom: 24, border: `1px solid ${COLORS.red700}22` }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: COLORS.red700, textTransform: "uppercase", marginBottom: 6 }}>Reported Reason: {selectedReport.reason}</div>
              <div style={{ fontSize: 13, color: COLORS.gray900, lineHeight: 1.6 }}>{selectedReport.desc}</div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 30 }}>
              <div>
                <div style={{ fontSize: 10, color: COLORS.gray600, textTransform: "uppercase", fontWeight: 600, marginBottom: 4 }}>Reporter</div>
                <div style={{ fontSize: 13, fontWeight: 500 }}>{selectedReport.reporter}</div>
              </div>
              <div>
                <div style={{ fontSize: 10, color: COLORS.gray600, textTransform: "uppercase", fontWeight: 600, marginBottom: 4 }}>Report Status</div>
                <StatusBadge status={selectedReport.status} />
              </div>
            </div>

            <div style={{ padding: 15, border: `1px solid ${COLORS.gray100}`, borderRadius: 10, marginBottom: 30 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: COLORS.gray600, marginBottom: 12, textTransform: "uppercase" }}>Subject of Report ({selectedReport.targetType})</div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>{selectedReport.targetName}</div>
                  <div style={{ fontSize: 11, color: COLORS.gray600 }}>Internal ID: {selectedReport.targetId}</div>
                </div>
                <ActBtn label={`View ${selectedReport.targetType}`} />
              </div>
            </div>

            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => setConfirmAction({ report: selectedReport, action: "resolve", type: "success", requireReason: true })} style={{ flex: 1, padding: "12px", borderRadius: 8, border: "none", background: COLORS.green700, color: COLORS.white, fontWeight: 600, cursor: "pointer" }}>Resolve Report</button>
              <button onClick={() => setConfirmAction({ report: selectedReport, action: "dismiss", type: "warn", requireReason: true })} style={{ flex: 1, padding: "12px", borderRadius: 8, border: `1px solid ${COLORS.gray300}`, background: COLORS.white, color: COLORS.gray600, fontWeight: 600, cursor: "pointer" }}>Dismiss</button>
            </div>
          </div>
        )}
      </SideDrawer>

      <ConfirmModal
        isOpen={!!confirmAction}
        title={`${confirmAction?.action.charAt(0).toUpperCase() + confirmAction?.action.slice(1)} Report`}
        message={`Finalizing moderation decision for report ${confirmAction?.report?.id}.`}
        type={confirmAction?.type}
        requireReason={confirmAction?.requireReason}
        onConfirm={handleAction}
        onClose={() => setConfirmAction(null)}
      />
    </div>
  );
};
