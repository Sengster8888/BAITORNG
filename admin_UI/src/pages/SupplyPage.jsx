import { useState } from "react";
import { COLORS } from "../constants/colors";
import { SUPPLY } from "../constants/mockData";
import { Avatar } from "../components/common/Avatar";
import { RoleBadge, StatusBadge, CatBadge } from "../components/common/Badge";
import { ActBtn, TH, TD } from "../components/common/UIElements";
import { StatCard } from "../components/dashboard/StatCard";
import { SectionHeader } from "../components/layout/SectionHeader";
import { ConfirmModal, SideDrawer } from "../components/layout/Modals";

export const SupplyPage = () => {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [items, setItems] = useState(SUPPLY);
  const [selectedItem, setSelectedItem] = useState(null);
  const [confirmAction, setConfirmAction] = useState(null);

  const filtered = items.filter(i => {
    const matchF = filter === "All" || i.status === filter;
    const matchS = i.product.toLowerCase().includes(search.toLowerCase()) || i.seller.toLowerCase().includes(search.toLowerCase()) || i.id.includes(search);
    return matchF && matchS;
  });

  const handleAction = (reason, note) => {
    const { item, action } = confirmAction;
    if (action === "remove") setItems(prev => prev.map(i => i.id === item.id ? { ...i, status: "Removed" } : i));
    if (action === "verify") setItems(prev => prev.map(i => i.id === item.id ? { ...i, status: "Active" } : i));
    if (action === "flag") setItems(prev => prev.map(i => i.id === item.id ? { ...i, status: "Flagged" } : i));
    setConfirmAction(null);
  };

  return (
    <div>
      <div style={{ display: "flex", gap: 10, marginBottom: 14 }}>
        <StatCard label="Total Supply" value={items.length} trendLabel="all listings" />
        <StatCard label="Active" value={items.filter(i => i.status === "Active").length} trendLabel="live" />
        <StatCard label="Needs Review" value={items.filter(i => i.status === "Flagged").length} trendLabel="flagged" />
        <StatCard label="Removed" value={items.filter(i => i.status === "Removed").length} trendLabel="archived" />
      </div>

      <SectionHeader title="Supply listings" search onSearch={setSearch} searchVal={search}
        filter={["All", "Active", "Flagged", "Removed"]} filterVal={filter} onFilter={setFilter} />

      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12, tableLayout: "fixed" }}>
        <thead style={{ position: "sticky", top: 0, background: COLORS.white, zIndex: 1 }}><tr>
          <TH w="18%">Product & ID</TH><TH w="18%">Seller</TH><TH w="10%">Category</TH>
          <TH w="12%">Qty / Price</TH><TH w="11%">Location</TH><TH w="10%">Posted</TH><TH w="8%">Status</TH><TH w="13%">Actions</TH>
        </tr></thead>
        <tbody>
          {filtered.map(i => (
            <tr key={i.id} style={{ cursor: "pointer" }} onMouseEnter={e => e.currentTarget.style.background = COLORS.gray50} onMouseLeave={e => e.currentTarget.style.background = "transparent"} onClick={() => setSelectedItem(i)}>
              <TD>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 32, height: 32, borderRadius: 4, background: COLORS.gray100, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>📦</div>
                  <div>
                    <div style={{ fontWeight: 600, display: "flex", alignItems: "center", gap: 5 }}>
                      {i.product}
                      {i.is_featured && <span title="Featured" style={{ fontSize: 10 }}>⭐</span>}
                    </div>
                    <div style={{ fontSize: 9, color: COLORS.gray600 }}>{i.variety ? i.variety : "Standard"} • #{i.id}</div>
                  </div>
                </div>
              </TD>
              <TD>
                <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                  <Avatar initials={i.seller.split(" ").map(w => w[0]).join("")} role={i.role} size={24} />
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 500 }}>{i.seller}</div>
                    <RoleBadge role={i.role} />
                  </div>
                </div>
              </TD>
              <TD><CatBadge cat={i.category} /></TD>
              <TD style={{ color: COLORS.gray600, fontSize: 11 }}>{i.qty} · {i.price}</TD>
              <TD style={{ color: COLORS.gray600, fontSize: 11 }}>{i.location}</TD>
              <TD style={{ color: COLORS.gray600, fontSize: 11 }}>{i.posted}</TD>
              <TD><StatusBadge status={i.status} /></TD>
              <TD onClick={e => e.stopPropagation()}><div style={{ display: "flex", gap: 3 }}>
                <ActBtn label="Verify" variant="success" onClick={() => setConfirmAction({ item: i, action: "verify", type: "success", requireReason: true })} />
                <ActBtn label="Flag" variant="warn" onClick={() => setConfirmAction({ item: i, action: "flag", type: "warn", requireReason: true })} />
                <ActBtn label="Remove" variant="danger" onClick={() => setConfirmAction({ item: i, action: "remove", type: "danger", requireReason: true })} />
              </div></TD>
            </tr>
          ))}
        </tbody>
      </table>

      <SideDrawer title="Listing Details" isOpen={!!selectedItem} onClose={() => setSelectedItem(null)} width={550}>
        {selectedItem && (
          <div>
            <div style={{ background: COLORS.gray100, height: 180, borderRadius: 12, marginBottom: 20, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, color: COLORS.gray600 }}>
              [Product Image Placeholder]
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: 18 }}>{selectedItem.product}</div>
                <div style={{ fontSize: 12, color: COLORS.gray600 }}>Listing ID: {selectedItem.id}</div>
              </div>
              <StatusBadge status={selectedItem.status} />
            </div>

            <div style={{ background: COLORS.green50, padding: 12, borderRadius: 8, marginBottom: 20 }}>
              <div style={{ fontSize: 10, color: COLORS.green700, fontWeight: 700, textTransform: "uppercase", marginBottom: 4 }}>Product Description</div>
              <div style={{ fontSize: 13, color: COLORS.gray900, lineHeight: 1.5 }}>{selectedItem.desc}</div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 24 }}>
              {[
                { label: "Category", value: selectedItem.category },
                { label: "Variety", value: selectedItem.variety || "Standard" },
                { label: "Quantity Available", value: selectedItem.qty },
                { label: "Price per Unit", value: selectedItem.price },
                { label: "Location", value: selectedItem.location },
                { label: "Posted Date", value: selectedItem.posted },
                { label: "Total Views", value: selectedItem.views },
                { label: "Featured Listing", value: selectedItem.is_featured ? "Yes" : "No" },
              ].map(item => (
                <div key={item.label}>
                  <div style={{ fontSize: 10, color: COLORS.gray600, textTransform: "uppercase", fontWeight: 600, marginBottom: 4 }}>{item.label}</div>
                  <div style={{ fontSize: 13, fontWeight: 500 }}>{item.value}</div>
                </div>
              ))}
            </div>

            <div style={{ padding: 15, border: `1px solid ${COLORS.gray100}`, borderRadius: 10, marginBottom: 30 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: COLORS.gray600, marginBottom: 12, textTransform: "uppercase" }}>Seller Information</div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <Avatar initials={selectedItem.seller.split(" ").map(w => w[0]).join("")} role={selectedItem.role} size={36} />
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>{selectedItem.seller}</div>
                  <div style={{ fontSize: 11, color: COLORS.gray600 }}>Member since 2025 • ID: {selectedItem.sellerId}</div>
                </div>
              </div>
            </div>

            <div style={{ display: "flex", gap: 10 }}>
              {selectedItem.status === "Flagged" && <button onClick={() => setConfirmAction({ item: selectedItem, action: "verify", type: "success", requireReason: true })} style={{ flex: 1, padding: "12px", borderRadius: 8, border: "none", background: COLORS.green700, color: COLORS.white, fontWeight: 600, cursor: "pointer" }}>Verify Listing</button>}
              <button onClick={() => setConfirmAction({ item: selectedItem, action: "flag", type: "warn", requireReason: true })} style={{ flex: 1, padding: "12px", borderRadius: 8, border: `1px solid ${COLORS.gray300}`, background: COLORS.white, color: COLORS.gray600, fontWeight: 600, cursor: "pointer" }}>Flag Issue</button>
              <button onClick={() => setConfirmAction({ item: selectedItem, action: "remove", type: "danger", requireReason: true })} style={{ flex: 1, padding: "12px", borderRadius: 8, border: "none", background: COLORS.red700, color: COLORS.white, fontWeight: 600, cursor: "pointer" }}>Archive Listing</button>
            </div>
          </div>
        )}
      </SideDrawer>

      <ConfirmModal
        isOpen={!!confirmAction}
        title={`${confirmAction?.action.charAt(0).toUpperCase() + confirmAction?.action.slice(1)} Listing`}
        message={`Are you sure you want to ${confirmAction?.action} "${confirmAction?.item?.product}"?`}
        type={confirmAction?.type}
        requireReason={confirmAction?.requireReason}
        onConfirm={handleAction}
        onClose={() => setConfirmAction(null)}
      />
    </div>
  );
};
