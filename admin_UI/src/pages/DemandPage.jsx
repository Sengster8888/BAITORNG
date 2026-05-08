import { useState } from "react";
import { COLORS } from "../constants/colors";
import { DEMAND } from "../constants/mockData";
import { Avatar } from "../components/common/Avatar";
import { RoleBadge, StatusBadge, CatBadge } from "../components/common/Badge";
import { ActBtn, TH, TD } from "../components/common/UIElements";
import { StatCard } from "../components/dashboard/StatCard";
import { SectionHeader } from "../components/layout/SectionHeader";
import { ConfirmModal, SideDrawer } from "../components/layout/Modals";

export const DemandPage = () => {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [items, setItems] = useState(DEMAND);
  const [selectedItem, setSelectedItem] = useState(null);
  const [confirmAction, setConfirmAction] = useState(null);

  const filtered = items.filter(i => {
    const matchF = filter === "All" || i.status === filter;
    const matchS = i.product.toLowerCase().includes(search.toLowerCase()) || i.buyer.toLowerCase().includes(search.toLowerCase()) || i.id.includes(search);
    return matchF && matchS;
  });

  const handleAction = (reason, note) => {
    const { item, action } = confirmAction;
    if (action === "archive") setItems(prev => prev.map(i => i.id === item.id ? { ...i, status: "Removed" } : i));
    if (action === "flag") setItems(prev => prev.map(i => i.id === item.id ? { ...i, status: "Flagged" } : i));
    setConfirmAction(null);
  };

  return (
    <div>
      <div style={{ display: "flex", gap: 10, marginBottom: 14 }}>
        <StatCard label="Total Demand" value={items.length} trendLabel="all requests" />
        <StatCard label="Open" value={items.filter(i => i.status === "Active").length} trendLabel="live" />
        <StatCard label="Flagged" value={items.filter(i => i.status === "Flagged").length} trendLabel="review" />
        <StatCard label="Archived" value={items.filter(i => i.status === "Removed").length} trendLabel="deleted" />
      </div>

      <SectionHeader title="Demand requests" search onSearch={setSearch} searchVal={search}
        filter={["All", "Active", "Flagged", "Removed"]} filterVal={filter} onFilter={setFilter} />

      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12, tableLayout: "fixed" }}>
        <thead style={{ position: "sticky", top: 0, background: COLORS.white, zIndex: 1 }}><tr>
          <TH w="18%">Request & ID</TH><TH w="18%">Buyer</TH><TH w="10%">Category</TH>
          <TH w="12%">Qty / Budget</TH><TH w="11%">Location</TH><TH w="10%">Deadline</TH><TH w="8%">Status</TH><TH w="13%">Actions</TH>
        </tr></thead>
        <tbody>
          {filtered.map(i => (
            <tr key={i.id} style={{ cursor: "pointer" }} onMouseEnter={e => e.currentTarget.style.background = COLORS.gray50} onMouseLeave={e => e.currentTarget.style.background = "transparent"} onClick={() => setSelectedItem(i)}>
              <TD>
                <div style={{ fontWeight: 600 }}>{i.product}</div>
                <div style={{ fontSize: 9, color: COLORS.gray600 }}>#{i.id}</div>
              </TD>
              <TD>
                <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                  <Avatar initials={i.buyer.split(" ").map(w => w[0]).join("")} role={i.role} size={24} />
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 500 }}>{i.buyer}</div>
                    <RoleBadge role={i.role} />
                  </div>
                </div>
              </TD>
              <TD><CatBadge cat={i.category} /></TD>
              <TD style={{ color: COLORS.gray600, fontSize: 11 }}>{i.qty} · {i.target}</TD>
              <TD style={{ color: COLORS.gray600, fontSize: 11 }}>{i.location}</TD>
              <TD style={{ color: COLORS.gray600, fontSize: 11 }}>{i.deadline}</TD>
              <TD><StatusBadge status={i.status} /></TD>
              <TD onClick={e => e.stopPropagation()}><div style={{ display: "flex", gap: 3 }}>
                <ActBtn label="Flag" variant="warn" onClick={() => setConfirmAction({ item: i, action: "flag", type: "warn", requireReason: true })} />
                <ActBtn label="Archive" variant="danger" onClick={() => setConfirmAction({ item: i, action: "archive", type: "danger", requireReason: true })} />
              </div></TD>
            </tr>
          ))}
        </tbody>
      </table>

      <SideDrawer title="Demand Request Details" isOpen={!!selectedItem} onClose={() => setSelectedItem(null)} width={550}>
        {selectedItem && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: 18 }}>{selectedItem.product}</div>
                <div style={{ fontSize: 12, color: COLORS.gray600 }}>Request ID: {selectedItem.id}</div>
              </div>
              <StatusBadge status={selectedItem.status} />
            </div>

            <div style={{ background: COLORS.blue100, padding: 12, borderRadius: 8, marginBottom: 20 }}>
              <div style={{ fontSize: 10, color: COLORS.blue700, fontWeight: 700, textTransform: "uppercase", marginBottom: 4 }}>Requirement Description</div>
              <div style={{ fontSize: 13, color: COLORS.gray900, lineHeight: 1.5 }}>{selectedItem.desc || "Buyer is looking for quality products matching the specified category and quantity."}</div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 24 }}>
              {[
                { label: "Category", value: selectedItem.category },
                { label: "Quantity Needed", value: selectedItem.qty },
                { label: "Budget/Target Price", value: selectedItem.target },
                { label: "Location", value: selectedItem.location },
                { label: "Posted Date", value: selectedItem.posted },
                { label: "Target Deadline", value: selectedItem.deadline },
              ].map(item => (
                <div key={item.label}>
                  <div style={{ fontSize: 10, color: COLORS.gray600, textTransform: "uppercase", fontWeight: 600, marginBottom: 4 }}>{item.label}</div>
                  <div style={{ fontSize: 13, fontWeight: 500 }}>{item.value}</div>
                </div>
              ))}
            </div>

            <div style={{ padding: 15, border: `1px solid ${COLORS.gray100}`, borderRadius: 10, marginBottom: 30 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: COLORS.gray600, marginBottom: 12, textTransform: "uppercase" }}>Buyer Information</div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <Avatar initials={selectedItem.buyer.split(" ").map(w => w[0]).join("")} role={selectedItem.role} size={36} />
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>{selectedItem.buyer}</div>
                  <div style={{ fontSize: 11, color: COLORS.gray600 }}>Verified Buyer • ID: {selectedItem.buyerId}</div>
                </div>
              </div>
            </div>

            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => setConfirmAction({ item: selectedItem, action: "flag", type: "warn", requireReason: true })} style={{ flex: 1, padding: "12px", borderRadius: 8, border: `1px solid ${COLORS.gray300}`, background: COLORS.white, color: COLORS.gray600, fontWeight: 600, cursor: "pointer" }}>Flag Request</button>
              <button onClick={() => setConfirmAction({ item: selectedItem, action: "archive", type: "danger", requireReason: true })} style={{ flex: 1, padding: "12px", borderRadius: 8, border: "none", background: COLORS.red700, color: COLORS.white, fontWeight: 600, cursor: "pointer" }}>Archive Request</button>
            </div>
          </div>
        )}
      </SideDrawer>

      <ConfirmModal
        isOpen={!!confirmAction}
        title={`${confirmAction?.action.charAt(0).toUpperCase() + confirmAction?.action.slice(1)} Demand Request`}
        message={`Confirm moderation action for "${confirmAction?.item?.product}".`}
        type={confirmAction?.type}
        requireReason={confirmAction?.requireReason}
        onConfirm={handleAction}
        onClose={() => setConfirmAction(null)}
      />
    </div>
  );
};
