import { COLORS } from "../constants/colors";
import { REPORTS, LOGS } from "../constants/mockData";
import { logTypeColor } from "../utils/helpers";
import { StatusBadge } from "../components/common/Badge";
import { TH, TD } from "../components/common/UIElements";
import { StatCard } from "../components/dashboard/StatCard";
import { ActivityChart } from "../components/dashboard/ActivityChart";
import { DashboardSidePanel } from "../components/dashboard/DashboardSidePanel";

export const Dashboard = () => (
  <div style={{ display: "grid", gridTemplateColumns: "3fr 1fr", gap: 24 }}>
    {/* Main Content Area */}
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {/* KPI Cards Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
        <StatCard label="Total Users" value="12.4K" trend="+12%" trendLabel="this month" gradient={`linear-gradient(135deg, ${COLORS.green700} 0%, ${COLORS.green900} 100%)`} />
        <StatCard label="Active Users" value="984" trend="+5%" trendLabel="today" gradient={`linear-gradient(135deg, ${COLORS.teal600} 0%, ${COLORS.teal800} 100%)`} />
        <StatCard label="Supply Listings" value="202" trend="+8%" trendLabel="live now" gradient={`linear-gradient(135deg, ${COLORS.indigo600} 0%, ${COLORS.indigo800} 100%)`} />
        <StatCard label="Demand Requests" value="76" trend="+14%" trendLabel="active" gradient={`linear-gradient(135deg, ${COLORS.blue600} 0%, ${COLORS.blue800} 100%)`} />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
        <StatCard label="Smart Matches" value="142" trend="+12" trendLabel="today" />
        <StatCard label="Pending Reports" value="24" trend="Action Required" trendLabel="requires review" />
        <StatCard label="Banned Users" value="12" trend="3 new" trendLabel="last 7 days" />
        <StatCard label="Match Success" value="94.2%" trend="+0.5%" trendLabel="system efficiency" />
      </div>

      {/* Main Graph Card */}
      <ActivityChart />

      {/* Lower Dashboard Tables */}
      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: 24 }}>
        {/* Recent Reports Table */}
        <div style={{ background: COLORS.white, borderRadius: 16, border: `1px solid ${COLORS.gray200}`, overflow: "hidden" }}>
          <div style={{ padding: "18px 24px", borderBottom: `1px solid ${COLORS.gray100}`, fontSize: 14, fontWeight: 700, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            Moderation Queue
            <span style={{ fontSize: 11, color: COLORS.green700, cursor: "pointer", fontWeight: 600 }}>Manage All</span>
          </div>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead style={{ background: COLORS.gray50 }}>
              <tr>
                <TH w="20%">Target</TH><TH w="30%">Reason</TH><TH w="15%">Severity</TH><TH w="15%">Status</TH><TH w="20%">Date</TH>
              </tr>
            </thead>
            <tbody>
              {REPORTS.slice(0, 5).map(r => (
                <tr key={r.id}>
                  <TD><div style={{ fontWeight: 600, fontSize: 11 }}>{r.targetName}</div></TD>
                  <TD><div style={{ fontSize: 11, color: COLORS.gray600 }}>{r.reason}</div></TD>
                  <TD><span style={{ fontSize: 9, fontWeight: 700, color: r.severity === "High" ? COLORS.red700 : COLORS.amber700 }}>{r.severity}</span></TD>
                  <TD><StatusBadge status={r.status} /></TD>
                  <TD><div style={{ fontSize: 10, color: COLORS.gray500 }}>{r.date.split(" ")[0]}</div></TD>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Moderation Activity Feed */}
        <div style={{ background: COLORS.white, borderRadius: 16, border: `1px solid ${COLORS.gray200}`, overflow: "hidden" }}>
          <div style={{ padding: "18px 24px", borderBottom: `1px solid ${COLORS.gray100}`, fontSize: 14, fontWeight: 700 }}>Admin Activity Log</div>
          <div style={{ padding: "10px 0" }}>
            {LOGS.slice(0, 6).map(l => (
              <div key={l.id} style={{ display: "flex", gap: 12, padding: "12px 24px", borderBottom: `1px solid ${COLORS.gray50}` }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: logTypeColor(l.type).color, marginTop: 4, flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: COLORS.gray900 }}>{l.action}</div>
                  <div style={{ fontSize: 10, color: COLORS.gray600, marginTop: 2 }}>{l.actor} · {l.time.split(" ")[1]}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>

    {/* Right Sidebar Area */}
    <DashboardSidePanel />
  </div>
);
