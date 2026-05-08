import { useState } from "react";
import { COLORS } from "../constants/colors";
import { MATCHES } from "../constants/mockData";
import { StatusBadge } from "../components/common/Badge";
import { ActBtn, TH, TD } from "../components/common/UIElements";
import { StatCard } from "../components/dashboard/StatCard";
import { SectionHeader } from "../components/layout/SectionHeader";
import { Modal } from "../components/layout/Modals";

export const MatchResultsPage = () => {
  const [selectedMatch, setSelectedMatch] = useState(null);

  return (
    <div>
      <div style={{ display: "flex", gap: 10, marginBottom: 14 }}>
        <StatCard label="Smart Matches" value={MATCHES.length} trendLabel="automated system" />
        <StatCard label="Location Matches" value="100%" trendLabel="primary filter" />
        <StatCard label="Price Accuracy" value="94%" trendLabel="secondary filter" />
        <StatCard label="Avg. Match Time" value="1.2s" trendLabel="system speed" />
      </div>

      <SectionHeader title="Recent system-generated matches" search onSearch={() => { }} searchVal="" />

      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12, tableLayout: "fixed" }}>
        <thead style={{ position: "sticky", top: 0, background: COLORS.white, zIndex: 1 }}><tr>
          <TH w="15%">Match ID</TH>
          <TH w="25%">Supply ↔ Demand</TH>
          <TH w="20%">Stakeholders</TH>
          <TH w="15%">Score</TH>
          <TH w="10%">Status</TH>
          <TH w="15%">Action</TH>
        </tr></thead>
        <tbody>
          {MATCHES.map(m => (
            <tr key={m.id} style={{ transition: "background .1s" }} onMouseEnter={e => e.currentTarget.style.background = COLORS.gray50} onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
              <TD style={{ fontWeight: 600, color: COLORS.green800 }}>{m.id}</TD>
              <TD>
                <div style={{ fontWeight: 500 }}>{m.supply.product}</div>
                <div style={{ fontSize: 9, color: COLORS.gray600 }}>{m.supply.id} ↔ {m.demand.id}</div>
              </TD>
              <TD>
                <div style={{ fontSize: 11 }}>S: {m.supply.seller}</div>
                <div style={{ fontSize: 11 }}>D: {m.demand.buyer}</div>
              </TD>
              <TD>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <div style={{ flex: 1, height: 4, background: COLORS.gray100, borderRadius: 2 }}>
                    <div style={{ width: `${m.score}%`, height: "100%", background: m.score > 90 ? COLORS.green600 : COLORS.amber700, borderRadius: 2 }} />
                  </div>
                  <span style={{ fontWeight: 600 }}>{m.score}%</span>
                </div>
              </TD>
              <TD><StatusBadge status={m.status} /></TD>
              <TD><ActBtn label="View Audit" onClick={() => setSelectedMatch(m)} /></TD>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal title="Match Audit & Explanation" isOpen={!!selectedMatch} onClose={() => setSelectedMatch(null)} width={850}>
        {selectedMatch && (
          <div>
            <div style={{ marginBottom: 20, padding: 16, background: COLORS.green50, borderRadius: 10, borderLeft: `4px solid ${COLORS.green600}` }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.green900, marginBottom: 6 }}>Human-Readable Explanation</div>
              <div style={{ fontSize: 12, color: COLORS.green800, lineHeight: 1.6 }}>
                This match was generated because the <strong>Product Type</strong> and <strong>Location ({selectedMatch.province})</strong> are identical.
                The <strong>Price</strong> and <strong>Quantity</strong> fall within the system's acceptable 10% variance.
                Both parties have been notified via push notification.
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 15, marginBottom: 25 }}>
              <div style={{ background: COLORS.gray50, padding: 12, borderRadius: 8, textAlign: "center" }}>
                <div style={{ fontSize: 10, color: COLORS.gray600, textTransform: "uppercase", marginBottom: 2 }}>Match Created</div>
                <div style={{ fontSize: 13, fontWeight: 600 }}>{selectedMatch.matched}</div>
              </div>
              <div style={{ background: COLORS.gray50, padding: 12, borderRadius: 8, textAlign: "center" }}>
                <div style={{ fontSize: 10, color: COLORS.gray600, textTransform: "uppercase", marginBottom: 2 }}>Audit Status</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.green700 }}>System Verified</div>
              </div>
            </div>

            <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 12, textTransform: "uppercase", color: COLORS.gray600 }}>Side-by-Side Comparison</div>
            <table style={{ width: "100%", borderCollapse: "collapse", border: `1px solid ${COLORS.gray300}` }}>
              <thead>
                <tr style={{ background: COLORS.gray100 }}>
                  <th style={{ padding: 10, border: `1px solid ${COLORS.gray300}`, textAlign: "left", fontSize: 11 }}>Factor</th>
                  <th style={{ padding: 10, border: `1px solid ${COLORS.gray300}`, textAlign: "left", fontSize: 11 }}>Supply (Seller)</th>
                  <th style={{ padding: 10, border: `1px solid ${COLORS.gray300}`, textAlign: "left", fontSize: 11 }}>Demand (Buyer)</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { f: "Product Type", s: selectedMatch.supply.product, d: selectedMatch.demand.product, m: true },
                  { f: "Category", s: selectedMatch.supply.category, d: selectedMatch.demand.category, m: true },
                  { f: "Quantity", s: selectedMatch.supply.qty, d: selectedMatch.demand.qty, m: selectedMatch.qtyMatch },
                  { f: "Price/Budget", s: selectedMatch.supply.price, d: selectedMatch.demand.target, m: selectedMatch.priceMatch },
                  { f: "Province", s: selectedMatch.supply.location, d: selectedMatch.demand.location, m: selectedMatch.locationMatch },
                  { f: "Distance", s: "-", d: `${selectedMatch.distance_km} km`, m: null },
                  { f: "Entity", s: selectedMatch.supply.seller, d: selectedMatch.demand.buyer, m: null },
                ].map((row, idx) => (
                  <tr key={idx}>
                    <td style={{ padding: 10, border: `1px solid ${COLORS.gray300}`, fontWeight: 600, fontSize: 11 }}>{row.f}</td>
                    <td style={{ padding: 10, border: `1px solid ${COLORS.gray300}`, fontSize: 12 }}>{row.s}</td>
                    <td style={{ padding: 10, border: `1px solid ${COLORS.gray300}`, fontSize: 12, color: row.m === false ? COLORS.red700 : COLORS.gray900 }}>
                      {row.d} {row.m === true && "✅"} {row.m === false && "❌"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Modal>
    </div>
  );
};
