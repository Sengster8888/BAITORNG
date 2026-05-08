import { useState } from "react";
import { COLORS } from "../constants/colors";
import { USERS } from "../constants/mockData";
import { Avatar } from "../components/common/Avatar";
import { RoleBadge, StatusBadge } from "../components/common/Badge";
import { ActBtn, TH, TD } from "../components/common/UIElements";
import { StatCard } from "../components/dashboard/StatCard";
import { SectionHeader } from "../components/layout/SectionHeader";
import { ConfirmModal, SideDrawer } from "../components/layout/Modals";

export const UsersPage = () => {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState(USERS);
  const [selectedUser, setSelectedUser] = useState(null);
  const [confirmAction, setConfirmAction] = useState(null);

  const filtered = users.filter(u => {
    const matchF = filter === "All" || u.status === filter || u.role === filter || (filter === "Verified" && u.verified) || (filter === "Unverified" && !u.verified);
    const matchS = u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.phones.some(p => p.phone.includes(search)) ||
      u.id.toString().includes(search);
    return matchF && matchS;
  });

  const handleModeration = (reason, note) => {
    const { u, action } = confirmAction;
    if (action === "ban") setUsers(prev => prev.map(item => item.id === u.id ? { ...item, status: "Banned" } : item));
    if (action === "unban") setUsers(prev => prev.map(item => item.id === u.id ? { ...item, status: "Active" } : item));
    if (action === "verify") setUsers(prev => prev.map(item => item.id === u.id ? { ...item, verified: true } : item));
    if (action === "deactivate") setUsers(prev => prev.map(item => item.id === u.id ? { ...item, status: "Inactive" } : item));
    setConfirmAction(null);
  };

  return (
    <div>
      <div style={{ display: "flex", gap: 10, marginBottom: 14 }}>
        <StatCard label="Total Users" value={users.length} trendLabel="all roles" />
        <StatCard label="Active" value={users.filter(u => u.status === "Active").length} trendLabel="live" />
        <StatCard label="Unverified" value={users.filter(u => !u.verified).length} trendLabel="needs review" />
        <StatCard label="Banned" value={users.filter(u => u.status === "Banned").length} trendLabel="restricted" />
      </div>

      <SectionHeader title="All users" search onSearch={setSearch} searchVal={search}
        filter={["All", "Active", "Banned", "Verified", "Unverified", "Farmer", "Middleman", "Buyer"]} filterVal={filter} onFilter={setFilter} />

      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12, tableLayout: "fixed" }}>
        <thead style={{ position: "sticky", top: 0, background: COLORS.white, zIndex: 1 }}><tr>
          <TH w="20%">Name & ID</TH><TH w="10%">Role</TH><TH w="15%">Phone/Email</TH>
          <TH w="12%">Province</TH><TH w="8%">Postings</TH><TH w="10%">Verification</TH><TH w="10%">Status</TH><TH w="15%">Actions</TH>
        </tr></thead>
        <tbody>
          {filtered.map(u => (
            <tr key={u.id} style={{ cursor: "pointer", transition: "background .1s" }} onMouseEnter={e => e.currentTarget.style.background = COLORS.gray50} onMouseLeave={e => e.currentTarget.style.background = "transparent"} onClick={() => setSelectedUser(u)}>
              <TD><div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Avatar initials={u.initials} role={u.role} />
                <div>
                  <div style={{ fontWeight: 600 }}>{u.name}</div>
                  <div style={{ fontSize: 10, color: COLORS.gray600 }}>#{u.id}</div>
                </div>
              </div></TD>
              <TD><RoleBadge role={u.role} /></TD>
              <TD>
                <div style={{ fontSize: 11, fontWeight: 500 }}>{u.phones.find(p => p.isPrimary)?.phone || u.phones[0].phone}</div>
                {u.phones.length > 1 && (
                  <div style={{ fontSize: 9, color: COLORS.green600, fontWeight: 600 }}>+{u.phones.length - 1} more</div>
                )}
                <div style={{ fontSize: 9, color: COLORS.gray600 }}>{u.email}</div>
              </TD>
              <TD style={{ color: COLORS.gray600 }}>{u.location}</TD>
              <TD style={{ textAlign: "center" }}>{u.listings}</TD>
              <TD>
                {u.verified ? <span style={{ fontSize: 9, fontWeight: 600, color: COLORS.green700, display: "flex", alignItems: "center", gap: 3 }}>
                  <svg width="10" height="10" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" fill={COLORS.green100} /><path d="M5 8l2 2 4-4" stroke={COLORS.green700} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg> Verified
                </span> : <span style={{ fontSize: 9, color: COLORS.gray300 }}>Unverified</span>}
              </TD>
              <TD><StatusBadge status={u.status} /></TD>
              <TD onClick={e => e.stopPropagation()}><div style={{ display: "flex", gap: 4 }}>
                <ActBtn label="Edit" />
                <ActBtn label={u.status === "Banned" ? "Unban" : "Ban"} variant={u.status === "Banned" ? "success" : "warn"} onClick={() => setConfirmAction({ u, action: u.status === "Banned" ? "unban" : "ban", type: u.status === "Banned" ? "success" : "danger", requireReason: true })} />
              </div></TD>
            </tr>
          ))}
        </tbody>
      </table>

      <SideDrawer title="User Profile Details" isOpen={!!selectedUser} onClose={() => setSelectedUser(null)} width={550}>
        {selectedUser && (
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24, paddingBottom: 20, borderBottom: `1px solid ${COLORS.gray100}` }}>
              <Avatar initials={selectedUser.initials} role={selectedUser.role} size={56} />
              <div>
                <div style={{ fontSize: 18, fontWeight: 700 }}>{selectedUser.name} {selectedUser.verified && "✅"}</div>
                <div style={{ fontSize: 12, color: COLORS.gray600 }}>User ID: {selectedUser.id} • Joined {selectedUser.joined}</div>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 30 }}>
              {[
                { label: "Account Role", value: selectedUser.role },
                { label: "Account Status", value: selectedUser.status },
                { label: "Experience", value: selectedUser.experience ? selectedUser.experience.replace('to', '-').replace('lessThan1', '< 1 year').replace('over10', '10+ years') : "Not specified" },
                { label: "Email Address", value: selectedUser.email },
                { label: "Province/City", value: selectedUser.location },
                { label: "Last Active", value: selectedUser.lastActive },
              ].map(item => (
                <div key={item.label}>
                  <div style={{ fontSize: 10, color: COLORS.gray600, textTransform: "uppercase", fontWeight: 600, marginBottom: 4 }}>{item.label}</div>
                  <div style={{ fontSize: 13, fontWeight: 500 }}>{item.value}</div>
                </div>
              ))}
            </div>

            <div style={{ marginBottom: 30 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: COLORS.gray900, marginBottom: 12, display: "flex", alignItems: "center", gap: 6 }}>
                Phone Numbers
                <span style={{ fontSize: 10, fontWeight: 500, color: COLORS.gray500, background: COLORS.gray100, padding: "1px 6px", borderRadius: 10 }}>{selectedUser.phones.length}</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {selectedUser.phones.map((p, idx) => (
                  <div key={p.id} style={{
                    padding: 12, borderRadius: 10, border: `1px solid ${COLORS.gray100}`,
                    background: p.isPrimary ? COLORS.green50 : "transparent",
                    display: "flex", justifyContent: "space-between", alignItems: "center"
                  }}>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                        <span style={{ fontSize: 10, fontWeight: 700, color: p.isPrimary ? COLORS.green700 : COLORS.gray500, textTransform: "uppercase" }}>{p.label}</span>
                        {p.isPrimary && <span style={{ fontSize: 8, background: COLORS.green600, color: COLORS.white, padding: "1px 4px", borderRadius: 4, fontWeight: 700 }}>PRIMARY</span>}
                      </div>
                      <div style={{ fontSize: 14, fontWeight: 600, color: COLORS.gray900, fontFamily: "monospace" }}>{p.phone}</div>
                      <div style={{ fontSize: 10, color: COLORS.gray500, marginTop: 4 }}>
                        Added {p.addedAt} • {p.verified ?
                          <span style={{ color: COLORS.green700, fontWeight: 600 }}>Verified</span> :
                          <span style={{ color: COLORS.gray400 }}>Unverified</span>
                        }
                      </div>
                    </div>
                    {p.verified && (
                      <div style={{ width: 16, height: 16, borderRadius: "50%", background: COLORS.green100, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <svg width="10" height="10" viewBox="0 0 16 16" fill="none"><path d="M5 8l2 2 4-4" stroke={COLORS.green700} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div style={{ background: COLORS.gray100, borderRadius: 10, padding: 20, marginBottom: 30 }}>
              <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 15 }}>Performance Metrics</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
                <div style={{ background: COLORS.white, padding: 12, borderRadius: 8, textAlign: "center" }}>
                  <div style={{ fontSize: 18, fontWeight: 700, color: COLORS.green700 }}>{selectedUser.listings}</div>
                  <div style={{ fontSize: 9, color: COLORS.gray600, textTransform: "uppercase" }}>Listings</div>
                </div>
                <div style={{ background: COLORS.white, padding: 12, borderRadius: 8, textAlign: "center" }}>
                  <div style={{ fontSize: 18, fontWeight: 700, color: COLORS.teal700 }}>12</div>
                  <div style={{ fontSize: 9, color: COLORS.gray600, textTransform: "uppercase" }}>Demands</div>
                </div>
                <div style={{ background: COLORS.white, padding: 12, borderRadius: 8, textAlign: "center" }}>
                  <div style={{ fontSize: 18, fontWeight: 700, color: COLORS.red700 }}>0</div>
                  <div style={{ fontSize: 9, color: COLORS.gray600, textTransform: "uppercase" }}>Reports</div>
                </div>
              </div>
            </div>

            <div>
              <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 15 }}>Recent Admin Actions</div>
              <div style={{ fontSize: 11, display: "flex", flexDirection: "column", gap: 10 }}>
                <div style={{ padding: "8px 12px", background: COLORS.green50, borderLeft: `3px solid ${COLORS.green600}`, borderRadius: 4 }}>
                  <div style={{ fontWeight: 600 }}>Account Verified</div>
                  <div style={{ color: COLORS.gray600 }}>Verified by Admin on 5 Feb 2026.</div>
                </div>
                <div style={{ color: COLORS.gray600, fontStyle: "italic", textAlign: "center", padding: 10 }}>No other moderation history.</div>
              </div>
            </div>

            <div style={{ marginTop: 40, paddingTop: 20, borderTop: `1px solid ${COLORS.gray100}`, display: "flex", gap: 10 }}>
              {!selectedUser.verified && <button onClick={() => setConfirmAction({ u: selectedUser, action: "verify", type: "success", requireReason: true })} style={{ flex: 1, padding: "10px", borderRadius: 8, border: "none", background: COLORS.green700, color: COLORS.white, fontWeight: 600, cursor: "pointer" }}>Verify User</button>}
              <button onClick={() => setConfirmAction({ u: selectedUser, action: "deactivate", type: "warn", requireReason: true })} style={{ flex: 1, padding: "10px", borderRadius: 8, border: `1px solid ${COLORS.gray300}`, background: COLORS.white, color: COLORS.gray600, fontWeight: 600, cursor: "pointer" }}>Deactivate</button>
              <button onClick={() => setConfirmAction({ u: selectedUser, action: "ban", type: "danger", requireReason: true })} style={{ flex: 1, padding: "10px", borderRadius: 8, border: "none", background: COLORS.red700, color: COLORS.white, fontWeight: 600, cursor: "pointer" }}>Ban User</button>
            </div>
          </div>
        )}
      </SideDrawer>

      <ConfirmModal
        isOpen={!!confirmAction}
        title={`${confirmAction?.action.charAt(0).toUpperCase() + confirmAction?.action.slice(1)} User`}
        message={`Confirming ${confirmAction?.action} action for ${confirmAction?.u?.name}.`}
        type={confirmAction?.type}
        requireReason={confirmAction?.requireReason}
        onConfirm={handleModeration}
        onClose={() => setConfirmAction(null)}
      />
    </div>
  );
};
