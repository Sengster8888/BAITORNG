import { useState } from "react";
import { COLORS } from "../constants/colors";
import { Sidebar } from "../components/layout/Sidebar";
import { TopBar } from "../components/layout/TopBar";

// Pages
import { Dashboard } from "./Dashboard";
import { UsersPage } from "./UsersPage";
import { SupplyPage } from "./SupplyPage";
import { DemandPage } from "./DemandPage";
import { MatchResultsPage } from "./MatchResultsPage";
import { ReportsPage } from "./ReportsPage";
import { AnnouncementsPage } from "./AnnouncementsPage";
import { SystemLogsPage } from "./SystemLogsPage";
import { SettingsPage } from "./SettingsPage";
import { CategoriesPage } from "./CategoriesPage";
import { SlotRequestsPage } from "./SlotRequestsPage";
import { LocationsPage } from "./LocationsPage";

const NAV = [
  { key: "dashboard", label: "Dashboard", icon: "grid" },
  { key: "users", label: "Users", icon: "users" },
  { key: "categories", label: "Categories", icon: "tag" },
  { key: "locations", label: "Locations", icon: "map" },
  { key: "supply", label: "Supply", icon: "list" },
  { key: "demand", label: "Demand", icon: "inbox" },
  { key: "matches", label: "Match Audit", icon: "merge" },
  { key: "slots", label: "Slot Requests", icon: "star", badge: 3 },
  { key: "reports", label: "Moderation", icon: "report", badge: 2 },
  { key: "announcements", label: "Announcements", icon: "megaphone" },
  { key: "logs", label: "System logs", icon: "log" },
  { key: "settings", label: "Settings", icon: "settings" },
];

export default function BaitongAdmin() {
  const [active, setActive] = useState("dashboard");
  const [globalSearch, setGlobalSearch] = useState("");

  const pages = {
    dashboard: { title: "Dashboard Overview", component: <Dashboard /> },
    users: { title: "User Management", component: <UsersPage /> },
    categories: { title: "Categories & Sub-categories", component: <CategoriesPage /> },
    locations: { title: "Geographic Data Management", component: <LocationsPage /> },
    supply: { title: "Supply Marketplace", component: <SupplyPage /> },
    demand: { title: "Demand Requests", component: <DemandPage /> },
    matches: { title: "Smart Match Audit", component: <MatchResultsPage /> },
    slots: { title: "Listing Slot Requests", component: <SlotRequestsPage /> },
    reports: { title: "Moderation Queue", component: <ReportsPage /> },
    announcements: { title: "Broadcast Announcements", component: <AnnouncementsPage /> },
    logs: { title: "Audit Activity Logs", component: <SystemLogsPage /> },
    settings: { title: "System Settings", component: <SettingsPage /> },
  };

  const current = pages[active];

  return (
    <div style={{
      display: "flex", height: "100vh", overflow: "hidden",
      fontFamily: "'Inter', 'DM Sans', system-ui, sans-serif",
      background: COLORS.gray50,
    }}>

      <style>{`
        @keyframes slideInRight {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideIn {
          from { transform: translateY(-20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        table thead th { position: sticky; top: 0; z-index: 10; background: ${COLORS.white}; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: ${COLORS.gray300}; borderRadius: 10px; }
      `}</style>

      {/* ── SIDEBAR ── */}
      <Sidebar active={active} setActive={setActive} NAV={NAV} />

      {/* ── MAIN ── */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {/* topbar */}
        <TopBar 
          title={current.title} 
          globalSearch={globalSearch} 
          setGlobalSearch={setGlobalSearch} 
        />

        {/* content */}
        <div style={{ flex: 1, overflowY: "auto", padding: "16px 20px" }}>
          {current.component}
        </div>
      </div>
    </div>
  );
}