import { useState } from "react";
import { COLORS } from "../constants/colors";
import { SectionHeader } from "../components/layout/SectionHeader";
import { ActBtn, TH, TD } from "../components/common/UIElements";
import { ConfirmModal, SideDrawer } from "../components/layout/Modals";

// Mock data based on SQL seeding
const MOCK_CATEGORIES = [
  { id: 1, name_en: "Crop", name_km: "ដំណាំ", slug: "crop", icon: "🌾", subCount: 5 },
  { id: 2, name_en: "Fruit", name_km: "ផ្លែឈើ", slug: "fruit", icon: "🍎", subCount: 8 },
  { id: 3, name_en: "Vegetable", name_km: "បន្លែ", slug: "vegetable", icon: "🥦", subCount: 12 },
  { id: 4, name_en: "Livestock", name_km: "បសុសត្វ", slug: "livestock", icon: "🐄", subCount: 4 },
];

const MOCK_SUB_CATEGORIES = [
  { id: 1, category_id: 1, name_en: "Rice", name_km: "អង្ករ", slug: "rice", icon: "🍚" },
  { id: 2, category_id: 2, name_en: "Mango", name_km: "ស្វាយ", slug: "mango", icon: "🥭" },
  { id: 3, category_id: 3, name_en: "Tomato", name_km: "ប៉េងប៉ោះ", slug: "tomato", icon: "🍅" },
];

export const CategoriesPage = () => {
  const [categories, setCategories] = useState(MOCK_CATEGORIES);
  const [search, setSearch] = useState("");
  const [selectedCat, setSelectedCat] = useState(null);
  const [isAdding, setIsAdding] = useState(false);

  const filtered = categories.filter(c => 
    c.name_en.toLowerCase().includes(search.toLowerCase()) || 
    c.name_km.includes(search)
  );

  return (
    <div>
      <SectionHeader 
        title="Category Management" 
        search 
        onSearch={setSearch} 
        searchVal={search}
        rightContent={
          <button 
            onClick={() => setIsAdding(true)}
            style={{
              padding: "8px 16px",
              background: COLORS.green600,
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontWeight: "600",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px"
            }}
          >
            <span style={{ fontSize: "18px" }}>+</span> Add Category
          </button>
        }
      />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "20px", marginTop: "20px" }}>
        {filtered.map(cat => (
          <div 
            key={cat.id}
            onClick={() => setSelectedCat(cat)}
            style={{
              background: "white",
              borderRadius: "16px",
              padding: "20px",
              boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)",
              cursor: "pointer",
              transition: "transform 0.2s, box-shadow 0.2s",
              border: `1px solid ${COLORS.gray100}`
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.boxShadow = "0 10px 15px -3px rgba(0,0,0,0.1)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 6px -1px rgba(0,0,0,0.1)";
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "15px", marginBottom: "15px" }}>
              <div style={{ 
                width: "48px", 
                height: "48px", 
                borderRadius: "12px", 
                background: COLORS.green50, 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center",
                fontSize: "24px"
              }}>
                {cat.icon}
              </div>
              <div>
                <h3 style={{ margin: 0, fontSize: "18px", fontWeight: "700", color: COLORS.gray900 }}>{cat.name_en}</h3>
                <p style={{ margin: 0, fontSize: "14px", color: COLORS.gray500 }}>{cat.name_km}</p>
              </div>
            </div>
            
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ 
                fontSize: "12px", 
                fontWeight: "600", 
                color: COLORS.green700, 
                background: COLORS.green50, 
                padding: "4px 10px", 
                borderRadius: "20px" 
              }}>
                {cat.subCount} Sub-categories
              </span>
              <span style={{ fontSize: "12px", color: COLORS.gray400 }}>ID: #{cat.id}</span>
            </div>
          </div>
        ))}
      </div>

      <SideDrawer 
        title={selectedCat ? "Edit Category" : "Add New Category"} 
        isOpen={!!selectedCat || isAdding} 
        onClose={() => { setSelectedCat(null); setIsAdding(false); }}
        width={500}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div>
            <label style={{ display: "block", fontSize: "12px", fontWeight: "600", color: COLORS.gray600, marginBottom: "8px" }}>English Name</label>
            <input 
              type="text" 
              defaultValue={selectedCat?.name_en}
              placeholder="e.g. Vegetables"
              style={{ width: "100%", padding: "12px", borderRadius: "8px", border: `1px solid ${COLORS.gray200}`, fontSize: "14px" }}
            />
          </div>
          <div>
            <label style={{ display: "block", fontSize: "12px", fontWeight: "600", color: COLORS.gray600, marginBottom: "8px" }}>Khmer Name</label>
            <input 
              type="text" 
              defaultValue={selectedCat?.name_km}
              placeholder="e.g. បន្លែ"
              style={{ width: "100%", padding: "12px", borderRadius: "8px", border: `1px solid ${COLORS.gray200}`, fontSize: "14px" }}
            />
          </div>
          <div>
            <label style={{ display: "block", fontSize: "12px", fontWeight: "600", color: COLORS.gray600, marginBottom: "8px" }}>Slug</label>
            <input 
              type="text" 
              defaultValue={selectedCat?.slug}
              placeholder="e.g. vegetables"
              style={{ width: "100%", padding: "12px", borderRadius: "8px", border: `1px solid ${COLORS.gray200}`, fontSize: "14px" }}
            />
          </div>
          <div>
            <label style={{ display: "block", fontSize: "12px", fontWeight: "600", color: COLORS.gray600, marginBottom: "8px" }}>Icon (Emoji or CSS Class)</label>
            <input 
              type="text" 
              defaultValue={selectedCat?.icon}
              placeholder="e.g. 🥦"
              style={{ width: "100%", padding: "12px", borderRadius: "8px", border: `1px solid ${COLORS.gray200}`, fontSize: "14px" }}
            />
          </div>

          <div style={{ marginTop: "20px", borderTop: `1px solid ${COLORS.gray100}`, paddingTop: "20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
              <h4 style={{ margin: 0, fontSize: "14px", fontWeight: "700" }}>Sub-categories</h4>
              <button style={{ background: "none", border: "none", color: COLORS.green600, fontWeight: "600", cursor: "pointer", fontSize: "12px" }}>+ Add Sub</button>
            </div>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {MOCK_SUB_CATEGORIES.filter(s => s.category_id === selectedCat?.id).map(sub => (
                <div key={sub.id} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px", background: COLORS.gray50, borderRadius: "8px" }}>
                  <span style={{ fontSize: "18px" }}>{sub.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: "13px", fontWeight: "600" }}>{sub.name_en}</div>
                    <div style={{ fontSize: "11px", color: COLORS.gray500 }}>{sub.name_km}</div>
                  </div>
                  <ActBtn label="Edit" />
                </div>
              ))}
              {selectedCat && MOCK_SUB_CATEGORIES.filter(s => s.category_id === selectedCat.id).length === 0 && (
                <div style={{ textAlign: "center", padding: "20px", color: COLORS.gray400, fontSize: "13px" }}>No sub-categories yet</div>
              )}
            </div>
          </div>

          <div style={{ display: "flex", gap: "10px", marginTop: "30px" }}>
            <button style={{ flex: 1, padding: "12px", borderRadius: "8px", border: `1px solid ${COLORS.gray300}`, background: "white", color: COLORS.gray600, fontWeight: "600", cursor: "pointer" }}>Cancel</button>
            <button style={{ flex: 1, padding: "12px", borderRadius: "8px", border: "none", background: COLORS.green700, color: "white", fontWeight: "600", cursor: "pointer" }}>Save Changes</button>
          </div>
        </div>
      </SideDrawer>
    </div>
  );
};
