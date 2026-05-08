import { useState } from "react";
import { COLORS } from "../constants/colors";
import { USERS, ANNOUNCEMENTS } from "../constants/mockData";
import { Icon } from "../components/common/Icon";
import { FilterTabs } from "../components/common/UIElements";
import { StatCard } from "../components/dashboard/StatCard";
import { ConfirmModal } from "../components/layout/Modals";
import { Toggle } from "../components/common/Toggle";

export const AnnouncementsPage = () => {
  const [formData, setFormData] = useState({
    title: "",
    message: "",
    audience: "all",
    targetUserId: "",
    type: "system",
    priority: "Normal",
    match_id: ""
  });

  const [history, setHistory] = useState(ANNOUNCEMENTS);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(null); // { count, time }
  const [config, setConfig] = useState({
    maintenance: false,
    registration: true,
    matching: true,
    notifications: true
  });

  const [filter, setFilter] = useState("All");

  const validate = () => formData.title.length >= 5 && formData.message.length >= 10;

  const handlePublish = () => {
    const isSpecific = formData.audience === "specific";
    const targetUser = isSpecific ? USERS.find(u => u.id.toString() === formData.targetUserId) : null;

    if (isSpecific && !targetUser) {
      alert("Invalid User ID. Please check the ID and try again.");
      return;
    }

    const newAnnouncement = {
      id: history.length + 1,
      ...formData,
      sentBy: "Admin",
      time: new Date().toLocaleString(),
      reach: isSpecific ? 1 : (formData.audience === "all" ? 128 : (formData.audience === "farmer" ? 54 : 43)),
      recipientName: targetUser?.name
    };
    setHistory([newAnnouncement, ...history]);
    
    // Explicit mapping to SQL Notifications table
    const alertMethod = config.notifications ? "Push + DB" : "DB Only";
    setShowSuccess({ 
      count: newAnnouncement.reach, 
      time: new Date().toLocaleTimeString(),
      method: alertMethod
    });
    
    setFormData({ title: "", message: "", audience: "all", targetUserId: "", type: "system", priority: "Normal", match_id: "" });
    setTimeout(() => setShowSuccess(null), 5000);
  };

  const priorityColor = (p) => {
    if (p === "Urgent") return { bg: COLORS.red100, color: COLORS.red700 };
    if (p === "Important") return { bg: COLORS.amber100, color: COLORS.amber700 };
    return { bg: COLORS.blue100, color: COLORS.blue700 };
  };

  return (
    <div>
      {showSuccess && (
        <div style={{
          position: "fixed", top: 20, right: 20, zIndex: 2000,
          background: COLORS.green600, color: COLORS.white, padding: "12px 20px",
          borderRadius: 10, boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          display: "flex", alignItems: "center", gap: 10, animation: "slideIn 0.3s ease-out"
        }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 8l3 3 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600 }}>System Notifications Dispatched</div>
            <div style={{ fontSize: 11, opacity: 0.9 }}>
              {showSuccess.count} records created in `notifications` table ({showSuccess.method})
            </div>
          </div>
        </div>
      )}

      <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
        <StatCard label="Total Sent" value={history.length} trendLabel="since launch" />
        <StatCard label="Total Reach" value="2,480" trendLabel="unique users" />
        <StatCard label="Avg. Engagement" value="68%" trendLabel="click-through" />
        <StatCard label="System Status" value="Online" trendLabel="broadcast server" />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: 20 }}>
        {/* Left Column: Form & Preview */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ background: COLORS.white, border: `0.5px solid ${COLORS.gray300}`, borderRadius: 12, padding: 20 }}>
            <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 16 }}>Push Notification & Broadcast</div>

            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div>
                <div style={{ fontSize: 11, fontWeight: 500, color: COLORS.gray600, marginBottom: 4 }}>ANNOUNCEMENT TITLE</div>
                <input
                  value={formData.title}
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Urgent: System Maintenance"
                  style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: `1px solid ${COLORS.gray300}`, fontSize: 13, outline: "none" }}
                />
              </div>

              <div>
                <div style={{ fontSize: 11, fontWeight: 500, color: COLORS.gray600, marginBottom: 4 }}>MESSAGE CONTENT</div>
                <textarea
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Describe the details of the announcement..."
                  style={{ width: "100%", height: 80, padding: "10px 12px", borderRadius: 8, border: `1px solid ${COLORS.gray300}`, fontSize: 13, outline: "none", resize: "none" }}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 500, color: COLORS.gray600, marginBottom: 4 }}>AUDIENCE</div>
                  <select
                    value={formData.audience}
                    onChange={e => setFormData({ ...formData, audience: e.target.value })}
                    style={{ width: "100%", padding: "8px", borderRadius: 8, border: `1px solid ${COLORS.gray300}`, fontSize: 12, background: COLORS.white }}
                  >
                    <option value="all">All Users</option>
                    <option value="farmer">Farmers</option>
                    <option value="middleman">Middlemen</option>
                    <option value="buyer">Buyers</option>
                    <option value="specific">Specific User</option>
                  </select>
                </div>
                {formData.audience === "specific" && (
                  <div style={{ animation: "slideIn 0.2s ease-out" }}>
                    <div style={{ fontSize: 11, fontWeight: 500, color: COLORS.green700, marginBottom: 4 }}>TARGET USER ID</div>
                    <div style={{ position: "relative" }}>
                      <input
                        value={formData.targetUserId}
                        onChange={e => setFormData({ ...formData, targetUserId: e.target.value })}
                        placeholder="e.g. 1029348"
                        style={{ width: "100%", padding: "8px 12px", borderRadius: 8, border: `1px solid ${COLORS.green600}`, fontSize: 12, outline: "none", background: COLORS.green50 }}
                      />
                      {formData.targetUserId && (
                        <div style={{ marginTop: 4, fontSize: 10, fontWeight: 600, color: USERS.find(u => u.id.toString() === formData.targetUserId) ? COLORS.green700 : COLORS.red700 }}>
                          {USERS.find(u => u.id.toString() === formData.targetUserId)
                            ? `✅ Recipient: ${USERS.find(u => u.id.toString() === formData.targetUserId).name}`
                            : "❌ User not found"}
                        </div>
                      )}
                    </div>
                  </div>
                )}
                <div>
                  <div style={{ fontSize: 11, fontWeight: 500, color: COLORS.gray600, marginBottom: 4 }}>TYPE</div>
                  <select
                    value={formData.type}
                    onChange={e => setFormData({ ...formData, type: e.target.value })}
                    style={{ width: "100%", padding: "8px", borderRadius: 8, border: `1px solid ${COLORS.gray300}`, fontSize: 12, background: COLORS.white }}
                  >
                    <option value="system">System Notification</option>
                    <option value="new_match">New Match Alert</option>
                    <option value="demand_near_you">Demand Near User</option>
                    <option value="product_near_you">Product Near User</option>
                  </select>
                </div>
                {formData.type === "new_match" && (
                  <div style={{ animation: "slideIn 0.2s ease-out" }}>
                    <div style={{ fontSize: 11, fontWeight: 500, color: COLORS.indigo700, marginBottom: 4 }}>LINKED MATCH ID</div>
                    <input
                      value={formData.match_id}
                      onChange={e => setFormData({ ...formData, match_id: e.target.value })}
                      placeholder="e.g. M-1001"
                      style={{ width: "100%", padding: "8px 12px", borderRadius: 8, border: `1px solid ${COLORS.indigo600}`, fontSize: 12, outline: "none", background: COLORS.indigo50 }}
                    />
                  </div>
                )}
                <div>
                  <div style={{ fontSize: 11, fontWeight: 500, color: COLORS.gray600, marginBottom: 4 }}>PRIORITY</div>
                  <select
                    value={formData.priority}
                    onChange={e => setFormData({ ...formData, priority: e.target.value })}
                    style={{ width: "100%", padding: "8px", borderRadius: 8, border: `1px solid ${COLORS.gray300}`, fontSize: 12, background: COLORS.white }}
                  >
                    <option>Normal</option>
                    <option>Important</option>
                    <option>Urgent</option>
                  </select>
                </div>
              </div>

              <button
                onClick={() => setIsConfirmOpen(true)}
                disabled={!validate()}
                style={{
                  marginTop: 10, padding: "12px", borderRadius: 8, border: "none",
                  background: COLORS.green700, color: COLORS.white, fontWeight: 600,
                  cursor: validate() ? "pointer" : "not-allowed", opacity: validate() ? 1 : 0.5,
                  transition: "background .2s"
                }}
              >
                Publish Announcement
              </button>
            </div>
          </div>

          <div style={{ background: COLORS.white, border: `0.5px solid ${COLORS.gray300}`, borderRadius: 12, padding: 20 }}>
            <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 12, display: "flex", alignItems: "center", gap: 6 }}>
              <span>User Preview</span>
              <span style={{ fontSize: 10, fontWeight: 400, color: COLORS.gray600 }}>(How users see it)</span>
            </div>

            <div style={{
              border: `1px solid ${COLORS.gray100}`, borderRadius: 12, padding: 16,
              background: COLORS.gray50, display: "flex", gap: 14, alignItems: "flex-start",
              boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
            }}>
              <div style={{
                width: 40, height: 40, borderRadius: 10, background: COLORS.green100,
                display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0
              }}>
                <Icon name="megaphone" size={20} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 2 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.gray900 }}>{formData.title || "Announcement Title"}</div>
                    {formData.audience === "specific" && formData.targetUserId && USERS.find(u => u.id.toString() === formData.targetUserId) && (
                      <div style={{ fontSize: 9, color: COLORS.green700, fontWeight: 700, marginTop: 2 }}>
                        DIRECT MESSAGE TO: {USERS.find(u => u.id.toString() === formData.targetUserId).name.toUpperCase()}
                      </div>
                    )}
                  </div>
                  <div style={{ fontSize: 10, color: COLORS.gray600 }}>Just now</div>
                </div>
                <div style={{ display: "inline-block", fontSize: 9, fontWeight: 600, padding: "2px 6px", borderRadius: 4, background: COLORS.green50, color: COLORS.green700, marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.02em" }}>
                  {formData.type}
                </div>
                <div style={{ fontSize: 12, color: COLORS.gray600, lineHeight: 1.5 }}>
                  {formData.message || "Your message will appear here. Khmer-friendly spacing ensured for better readability."}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Config & Logs */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ background: COLORS.white, border: `0.5px solid ${COLORS.gray300}`, borderRadius: 12, padding: 20 }}>
            <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 12 }}>Platform Configuration</div>
            <div style={{ marginBottom: 12, fontSize: 12, color: COLORS.gray600 }}>Quick controls for system-wide features.</div>

            <Toggle
              active={config.maintenance}
              onChange={val => setConfig({ ...config, maintenance: val })}
              label="Maintenance Mode"
              sub="Prevents users from accessing the app"
            />
            <Toggle
              active={config.registration}
              onChange={val => setConfig({ ...config, registration: val })}
              label="Open Registration"
              sub="Allow new users to join the platform"
            />
            <Toggle
              active={config.matching}
              onChange={val => setConfig({ ...config, matching: val })}
              label="Automated Matching"
              sub="Run smart merge algorithm in background"
            />
            <Toggle
              active={config.notifications}
              onChange={val => setConfig({ ...config, notifications: val })}
              label="Push Notifications"
              sub="Enable real-time alerts to mobile devices"
            />
          </div>

          <div style={{ background: COLORS.white, border: `0.5px solid ${COLORS.gray300}`, borderRadius: 12, padding: 20, flex: 1, display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <div style={{ fontSize: 15, fontWeight: 600 }}>Activity History</div>
              <div style={{ display: "flex", gap: 4 }}>
                <FilterTabs tabs={["All", "Important", "Normal"]} active={filter} onChange={setFilter} />
              </div>
            </div>

            <div style={{ flex: 1, overflowY: "auto", maxHeight: 400 }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11 }}>
                <thead style={{ position: "sticky", top: 0, background: COLORS.white, zIndex: 1 }}>
                  <tr>
                    <th style={{ textAlign: "left", padding: "8px 0", color: COLORS.gray600, borderBottom: `1px solid ${COLORS.gray100}` }}>Announcement</th>
                    <th style={{ textAlign: "left", padding: "8px 0", color: COLORS.gray600, borderBottom: `1px solid ${COLORS.gray100}` }}>Audience</th>
                    <th style={{ textAlign: "right", padding: "8px 0", color: COLORS.gray600, borderBottom: `1px solid ${COLORS.gray100}` }}>Reach</th>
                  </tr>
                </thead>
                <tbody>
                  {history.filter(h => filter === "All" || h.priority === filter).map(h => {
                    const p = priorityColor(h.priority);
                    return (
                      <tr key={h.id}>
                        <td style={{ padding: "10px 0", borderBottom: `0.5px solid ${COLORS.gray100}` }}>
                          <div style={{ fontWeight: 600, color: COLORS.gray900 }}>{h.title}</div>
                          <div style={{ fontSize: 9, color: COLORS.gray600 }}>{h.time}</div>
                          <div style={{ marginTop: 4, display: "flex", gap: 4 }}>
                            <span style={{ fontSize: 9, padding: "1px 6px", borderRadius: 4, background: p.bg, color: p.color, fontWeight: 600 }}>{h.priority}</span>
                            <span style={{ fontSize: 9, padding: "1px 6px", borderRadius: 4, background: COLORS.gray100, color: COLORS.gray600, fontWeight: 600, textTransform: "uppercase" }}>{h.type.replace('_', ' ')}</span>
                          </div>
                        </td>
                        <td style={{ padding: "10px 0", borderBottom: `0.5px solid ${COLORS.gray100}`, verticalAlign: "top" }}>
                          <div style={{ fontSize: 10, color: COLORS.gray600 }}>{h.audience}</div>
                          {h.recipientName && <div style={{ fontSize: 9, color: COLORS.green700, fontWeight: 700 }}>TO: {h.recipientName}</div>}
                        </td>
                        <td style={{ padding: "10px 0", borderBottom: `0.5px solid ${COLORS.gray100}`, textAlign: "right", verticalAlign: "top" }}>
                          <div style={{ fontWeight: 600 }}>{h.reach}</div>
                          <div style={{ fontSize: 9, color: COLORS.gray600 }}>users</div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <ConfirmModal
        isOpen={isConfirmOpen}
        title="Confirm Publication"
        message={formData.audience === "all"
          ? "WARNING: You are about to send this announcement to ALL users. This action cannot be undone. Are you sure?"
          : `Are you sure you want to publish this announcement to ${formData.audience}?`}
        type={formData.audience === "all" ? "danger" : "warn"}
        onConfirm={handlePublish}
        onClose={() => setIsConfirmOpen(false)}
      />
    </div>
  );
};
