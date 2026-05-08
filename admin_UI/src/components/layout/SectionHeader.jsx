import { COLORS } from "../../constants/colors";
import { FilterTabs } from "../common/UIElements";

export const SectionHeader = ({ title, search, searchVal, onSearch, filter, filterVal, onFilter, actions }) => (
  <div style={{
    display: "flex", alignItems: "center", justifyContent: "space-between",
    padding: "12px 0 10px",
    position: "sticky", top: 0, background: COLORS.white, zIndex: 2,
    borderBottom: `0.5px solid ${COLORS.gray100}`, marginBottom: 8,
  }}>
    <span style={{ fontSize: 13, fontWeight: 500 }}>{title}</span>
    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
      {filter && <FilterTabs tabs={filter} active={filterVal} onChange={onFilter} />}
      {actions}
      {search && (
        <div style={{
          display: "flex", alignItems: "center", gap: 6,
          padding: "5px 10px", borderRadius: 8,
          border: `0.5px solid ${COLORS.gray300}`,
          background: COLORS.gray100, fontSize: 12, color: COLORS.gray600,
        }}>
          <svg width="11" height="11" viewBox="0 0 16 16" fill="none">
            <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.3" />
            <path d="M10.5 10.5l3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
          </svg>
          <input value={searchVal} onChange={e => onSearch(e.target.value)}
            placeholder="Search..."
            style={{ border: "none", background: "transparent", outline: "none", fontSize: 12, width: 120, color: COLORS.gray900 }}
          />
        </div>
      )}
    </div>
  </div>
);
