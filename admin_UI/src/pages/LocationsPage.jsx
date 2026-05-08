import { useState } from "react";
import { COLORS } from "../constants/colors";
import { SectionHeader } from "../components/layout/SectionHeader";
import { TH, TD, ActBtn } from "../components/common/UIElements";
import { StatCard } from "../components/dashboard/StatCard";
import { SideDrawer } from "../components/layout/Modals";

const MOCK_PROVINCES = [
  { id: 1, name_en: "Phnom Penh", name_km: "ភ្នំពេញ", region: "Central", neighbors: 10 },
  { id: 2, name_en: "Kandal", name_km: "កណ្តាល", region: "Central", neighbors: 10 },
  { id: 3, name_en: "Takeo", name_km: "តាកែវ", region: "Southern", neighbors: 10 },
  { id: 4, name_en: "Kampong Speu", name_km: "កំពង់ស្ពឺ", region: "Central", neighbors: 10 },
];

const MOCK_ADJACENCY = [
  { province_id: 1, adjacent_id: 2, name_en: "Kandal", distance_km: 11 },
  { province_id: 1, adjacent_id: 4, name_en: "Kampong Speu", distance_km: 48 },
  { province_id: 1, adjacent_id: 3, name_en: "Takeo", distance_km: 78 },
];

export const LocationsPage = () => {
  const [search, setSearch] = useState("");
  const [selectedProvince, setSelectedProvince] = useState(null);

  const filtered = MOCK_PROVINCES.filter(p => 
    p.name_en.toLowerCase().includes(search.toLowerCase()) || 
    p.name_km.includes(search)
  );

  return (
    <div>
      <div style={{ display: "flex", gap: 10, marginBottom: 14 }}>
        <StatCard label="Total Provinces" value={25} trendLabel="Cambodia" />
        <StatCard label="Adjacency Rules" value={250} trendLabel="matrix size" />
        <StatCard label="Avg. Distance" value="145 km" trendLabel="between hubs" />
      </div>

      <SectionHeader title="Geographic Data Management" search onSearch={setSearch} searchVal={search} />

      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12, tableLayout: "fixed" }}>
        <thead style={{ position: "sticky", top: 0, background: COLORS.white, zIndex: 1 }}>
          <tr>
            <TH w="10%">ID</TH>
            <TH w="25%">English Name</TH>
            <TH w="25%">Khmer Name</TH>
            <TH w="15%">Region</TH>
            <TH w="15%">Neighbor Rules</TH>
            <TH w="10%">Actions</TH>
          </tr>
        </thead>
        <tbody>
          {filtered.map(p => (
            <tr key={p.id} style={{ cursor: "pointer" }} onMouseEnter={e => e.currentTarget.style.background = COLORS.gray50} onMouseLeave={e => e.currentTarget.style.background = "transparent"} onClick={() => setSelectedProvince(p)}>
              <TD>{p.id}</TD>
              <TD style={{ fontWeight: 600 }}>{p.name_en}</TD>
              <TD>{p.name_km}</TD>
              <TD>{p.region}</TD>
              <TD>{p.neighbors}</TD>
              <TD onClick={e => e.stopPropagation()}><ActBtn label="Edit Rules" /></TD>
            </tr>
          ))}
        </tbody>
      </table>

      <SideDrawer title="Province Neighbor Matrix" isOpen={!!selectedProvince} onClose={() => setSelectedProvince(null)} width={500}>
        {selectedProvince && (
          <div>
            <div style={{ marginBottom: 25 }}>
              <h3 style={{ margin: 0 }}>{selectedProvince.name_en} ({selectedProvince.name_km})</h3>
              <p style={{ color: COLORS.gray500, margin: "5px 0" }}>Region: {selectedProvince.region}</p>
            </div>

            <div style={{ background: COLORS.amber50, padding: "12px", borderRadius: "8px", border: `1px solid ${COLORS.amber200}`, marginBottom: "20px" }}>
              <p style={{ margin: 0, fontSize: "12px", color: COLORS.amber900 }}>
                <strong>Note:</strong> Distance values are used by the Smart Match algorithm to calculate proximity scores.
              </p>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
              <h4 style={{ margin: 0, fontSize: "14px" }}>Adjacent Provinces</h4>
              <button style={{ background: "none", border: "none", color: COLORS.green600, fontWeight: "600", cursor: "pointer", fontSize: "12px" }}>+ Add Neighbor</button>
            </div>

            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "12px" }}>
              <thead style={{ background: COLORS.gray50 }}>
                <tr>
                  <TH w="60%">Adjacent Province</TH>
                  <TH w="30%">Distance (km)</TH>
                  <TH w="10%"></TH>
                </tr>
              </thead>
              <tbody>
                {MOCK_ADJACENCY.map(adj => (
                  <tr key={adj.adjacent_id}>
                    <TD>{adj.name_en}</TD>
                    <TD>
                      <input 
                        type="number" 
                        defaultValue={adj.distance_km} 
                        style={{ width: "60px", padding: "4px", borderRadius: "4px", border: `1px solid ${COLORS.gray200}` }}
                      />
                    </TD>
                    <TD><button style={{ background: "none", border: "none", color: COLORS.red600, cursor: "pointer" }}>×</button></TD>
                  </tr>
                ))}
              </tbody>
            </table>

            <div style={{ marginTop: "30px", display: "flex", gap: "10px" }}>
              <button style={{ flex: 1, padding: "12px", borderRadius: "8px", border: `1px solid ${COLORS.gray300}`, background: "white", color: COLORS.gray600, fontWeight: "600", cursor: "pointer" }}>Cancel</button>
              <button style={{ flex: 1, padding: "12px", borderRadius: "8px", border: "none", background: COLORS.green700, color: "white", fontWeight: "600", cursor: "pointer" }}>Update Matrix</button>
            </div>
          </div>
        )}
      </SideDrawer>
    </div>
  );
};
