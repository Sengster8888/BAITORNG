import { useState } from "react";
import { COLORS } from "../constants/colors";
import { Avatar } from "../components/common/Avatar";
import { RoleBadge, StatusBadge } from "../components/common/Badge";
import { ActBtn, TH, TD } from "../components/common/UIElements";
import { StatCard } from "../components/dashboard/StatCard";
import { SectionHeader } from "../components/layout/SectionHeader";
import { ConfirmModal, SideDrawer } from "../components/layout/Modals";

const MOCK_REQUESTS = [
  { id: 1, user_id: 101, name: "Sok Rath", role: "farmer", requested_limit: 15, current_limit: 5, status: "pending", created_at: "2026-05-07 10:30:00", initials: "SR", location: "Kandal" },
  { id: 2, user_id: 202, name: "Ly Hour", role: "middleman", requested_limit: 50, current_limit: 20, status: "approved", created_at: "2026-05-06 14:20:00", initials: "LH", location: "Phnom Penh" },
  { id: 3, user_id: 303, name: "Chea Vutha", role: "farmer", requested_limit: 10, current_limit: 5, status: "rejected", created_at: "2026-05-05 09:15:00", initials: "CV", location: "Takeo" },
];

export const SlotRequestsPage = () => {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [requests, setRequests] = useState(MOCK_REQUESTS);
  const [selectedReq, setSelectedReq] = useState(null);
  const [confirmAction, setConfirmAction] = useState(null);

  const filtered = requests.filter(r => {
    const matchF = filter === "All" || r.status.toLowerCase() === filter.toLowerCase();
    const matchS = r.name.toLowerCase().includes(search.toLowerCase()) || r.user_id.toString().includes(search);
    return matchF && matchS;
  });

  const handleAction = (reason, note) => {
    const { req, action } = confirmAction;
    setRequests(prev => prev.map(r => r.id === req.id ? { ...r, status: action === "approve" ? "approved" : "rejected" } : r));
    setConfirmAction(null);
  };

  return (
    <div>
      <div style={{ display: "flex", gap: 10, marginBottom: 14 }}>
        <StatCard label="Total Requests" value={requests.length} trendLabel="all time" />
        <StatCard label="Pending Review" value={requests.filter(r => r.status === "pending").length} trendLabel="awaiting" />
        <StatCard label="Approved" value={requests.filter(r => r.status === "approved").length} trendLabel="granted" />
      </div>

      <SectionHeader 
        title="Listing Slot Requests" 
        search 
        onSearch={setSearch} 
        searchVal={search}
        filter={["All", "Pending", "Approved", "Rejected"]} 
        filterVal={filter} 
        onFilter={setFilter} 
      />

      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12, tableLayout: "fixed" }}>
        <thead style={{ position: "sticky", top: 0, background: COLORS.white, zIndex: 1 }}>
          <tr>
            <TH w="25%">User</TH>
            <TH w="15%">Role</TH>
            <TH w="15%">Request</TH>
            <TH w="15%">Date</TH>
            <TH w="15%">Status</TH>
            <TH w="15%">Actions</TH>
          </tr>
        </thead>
        <tbody>
          {filtered.map(r => (
            <tr key={r.id} style={{ cursor: "pointer" }} onMouseEnter={e => e.currentTarget.style.background = COLORS.gray50} onMouseLeave={e => e.currentTarget.style.background = "transparent"} onClick={() => setSelectedReq(r)}>
              <TD>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <Avatar initials={r.initials} role={r.role} size={28} />
                  <div>
                    <div style={{ fontWeight: 600 }}>{r.name}</div>
                    <div style={{ fontSize: 10, color: COLORS.gray600 }}>ID: #{r.user_id}</div>
                  </div>
                </div>
              </TD>
              <TD><RoleBadge role={r.role} /></TD>
              <TD>
                <div style={{ fontWeight: 600, color: COLORS.green700 }}>{r.current_limit} → {r.requested_limit}</div>
                <div style={{ fontSize: 9, color: COLORS.gray500 }}>Slots requested</div>
              </TD>
              <TD style={{ color: COLORS.gray600 }}>{r.created_at.split(" ")[0]}</TD>
              <TD><StatusBadge status={r.status.charAt(0).toUpperCase() + r.status.slice(1)} /></TD>
              <TD onClick={e => e.stopPropagation()}>
                {r.status === "pending" ? (
                  <div style={{ display: "flex", gap: 4 }}>
                    <ActBtn label="Approve" variant="success" onClick={() => setConfirmAction({ req: r, action: "approve", type: "success" })} />
                    <ActBtn label="Reject" variant="danger" onClick={() => setConfirmAction({ req: r, action: "reject", type: "danger", requireReason: true })} />
                  </div>
                ) : (
                  <div style={{ fontSize: 10, color: COLORS.gray400 }}>Processed</div>
                )}
              </TD>
            </tr>
          ))}
        </tbody>
      </table>

      <SideDrawer title="Request Details" isOpen={!!selectedReq} onClose={() => setSelectedReq(null)} width={450}>
        {selectedReq && (
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <Avatar initials={selectedReq.initials} role={selectedReq.role} size={48} />
              <div>
                <h3 style={{ margin: 0, fontSize: "18px" }}>{selectedReq.name}</h3>
                <p style={{ margin: 0, fontSize: "12px", color: COLORS.gray500 }}>{selectedReq.location} • User ID: {selectedReq.user_id}</p>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", padding: "20px", background: COLORS.gray50, borderRadius: "12px" }}>
              <div>
                <label style={{ fontSize: "10px", fontWeight: "700", color: COLORS.gray500, textTransform: "uppercase" }}>Current Limit</label>
                <div style={{ fontSize: "20px", fontWeight: "700" }}>{selectedReq.current_limit}</div>
              </div>
              <div>
                <label style={{ fontSize: "10px", fontWeight: "700", color: COLORS.gray500, textTransform: "uppercase" }}>Requested Limit</label>
                <div style={{ fontSize: "20px", fontWeight: "700", color: COLORS.green700 }}>{selectedReq.requested_limit}</div>
              </div>
            </div>

            <div>
              <h4 style={{ fontSize: "14px", fontWeight: "700", marginBottom: "8px" }}>Reason for Request</h4>
              <p style={{ fontSize: "13px", lineHeight: "1.6", color: COLORS.gray700, margin: 0, padding: "12px", border: `1px solid ${COLORS.gray100}`, borderRadius: "8px" }}>
                "I am planning to expand my farm and expect to have more harvest varieties this season. The current limit of 5 slots is not enough for me to list all my produce."
              </p>
            </div>

            {selectedReq.status === "pending" && (
              <div style={{ display: "flex", gap: "12px", marginTop: "20px" }}>
                <button 
                  onClick={() => setConfirmAction({ req: selectedReq, action: "reject", type: "danger", requireReason: true })}
                  style={{ flex: 1, padding: "12px", borderRadius: "8px", border: `1px solid ${COLORS.red200}`, background: "white", color: COLORS.red700, fontWeight: "600", cursor: "pointer" }}
                >
                  Reject Request
                </button>
                <button 
                  onClick={() => setConfirmAction({ req: selectedReq, action: "approve", type: "success" })}
                  style={{ flex: 1, padding: "12px", borderRadius: "8px", border: "none", background: COLORS.green700, color: "white", fontWeight: "600", cursor: "pointer" }}
                >
                  Approve Limit
                </button>
              </div>
            )}
          </div>
        )}
      </SideDrawer>

      <ConfirmModal
        isOpen={!!confirmAction}
        title={`${confirmAction?.action.charAt(0).toUpperCase() + confirmAction?.action.slice(1)} Request`}
        message={`Are you sure you want to ${confirmAction?.action} the slot limit request for ${confirmAction?.req?.name}?`}
        type={confirmAction?.type}
        requireReason={confirmAction?.requireReason}
        onConfirm={handleAction}
        onClose={() => setConfirmAction(null)}
      />
    </div>
  );
};
