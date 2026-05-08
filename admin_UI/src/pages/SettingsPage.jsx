import { useState } from "react";
import { COLORS } from "../constants/colors";
import { USERS, LOGS } from "../constants/mockData";
import { Toggle } from "../components/common/Toggle";
import { SafetyConfirmationModal } from "../components/announcements/SafetyConfirmationModal";

export const SettingsPage = () => {
  const [config, setConfig] = useState({
    maintenance: false,
    registration: true,
    matching: true,
    notifications: true,
    autoBan: false,
    listingLimit: 10
  });

  const [limitMode, setLimitMode] = useState("Global Default"); // or "Specific User"
  const [targetUserId, setTargetUserId] = useState("");
  const [targetLimit, setTargetLimit] = useState(10);
  
  const [confirmModal, setConfirmModal] = useState({ isOpen: false, setting: "", currentStatus: false });
  const [toast, setToast] = useState(null);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 4000);
  };

  const handleCriticalChange = (reason, note) => {
    const { setting, currentStatus } = confirmModal;
    const newValue = !currentStatus;

    // Update local state
    setConfig(prev => ({ ...prev, [setting]: newValue }));

    // Add to LOGS (In a real app, this would be an API call)
    const logEntry = {
      id: Date.now(),
      time: new Date().toISOString().replace("T", " ").slice(0, 19),
      action: `${setting.charAt(0).toUpperCase() + setting.slice(1)} ${newValue ? "Enabled" : "Disabled"}`,
      actor: "Root Admin",
      target: "System Config",
      type: newValue ? "warning" : "success",
      details: `Reason: ${reason}. Note: ${note || "N/A"}. Old value: ${currentStatus}, New value: ${newValue}`,
      severity: "High"
    };
    LOGS.unshift(logEntry);

    showToast(`${setting.charAt(0).toUpperCase() + setting.slice(1)} status updated successfully.`);
  };

  return (
    <div style={{ maxWidth: 800 }}>
      {toast && (
        <div style={{
          position: "fixed", bottom: 24, left: "50%", transform: "translateX(-50%)",
          background: COLORS.gray900, color: COLORS.white, padding: "12px 24px",
          borderRadius: 30, fontSize: 13, fontWeight: 500, zIndex: 5000,
          boxShadow: "0 10px 30px rgba(0,0,0,0.2)", animation: "slideIn 0.3s ease-out"
        }}>
          {toast}
        </div>
      )}

      <div style={{ background: COLORS.white, border: `0.5px solid ${COLORS.gray300}`, borderRadius: 12, padding: 24, marginBottom: 20 }}>
        <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 20 }}>Platform Controls</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <Toggle active={config.maintenance} onChange={() => setConfirmModal({ isOpen: true, setting: "maintenance", currentStatus: config.maintenance })} label="Maintenance Mode" sub="Stop all user access for system upgrades" />
          <Toggle active={config.registration} onChange={() => setConfirmModal({ isOpen: true, setting: "registration", currentStatus: config.registration })} label="Open Registration" sub="Allow new users to sign up via phone/email" />
          <Toggle active={config.matching} onChange={() => setConfirmModal({ isOpen: true, setting: "matching", currentStatus: config.matching })} label="Automated Smart Matching" sub="Enable background algorithm for demand/supply merging" />
          <Toggle active={config.notifications} onChange={() => setConfirmModal({ isOpen: true, setting: "notifications", currentStatus: config.notifications })} label="Push Notifications" sub="Send real-time alerts to mobile devices" />
          <Toggle active={config.autoBan} onChange={() => setConfirmModal({ isOpen: true, setting: "autoBan", currentStatus: config.autoBan })} label="Auto-ban Spam Bots" sub="Automatically restrict accounts with high-frequency duplicate postings" />
        </div>
      </div>

      <div style={{ background: COLORS.white, border: `0.5px solid ${COLORS.gray300}`, borderRadius: 12, padding: 24 }}>
        <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 20 }}>System Limits & Capacity</div>
        
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 30 }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 600, color: COLORS.gray600, marginBottom: 4, textTransform: "uppercase" }}>Target Scope</div>
              <select 
                value={limitMode}
                onChange={e => setLimitMode(e.target.value)}
                style={{ width: "100%", padding: "10px", borderRadius: 8, border: `1px solid ${COLORS.gray300}`, fontSize: 13, background: COLORS.white }}
              >
                <option>Global Default</option>
                <option>Specific User</option>
              </select>
              <div style={{ fontSize: 10, color: COLORS.gray600, marginTop: 4 }}>
                {limitMode === "Global Default" 
                  ? "Applies to all users unless overridden." 
                  : "Update capacity for a single specific account."}
              </div>
            </div>

            {limitMode === "Global Default" ? (
              <div>
                <div style={{ fontSize: 11, fontWeight: 600, color: COLORS.gray600, marginBottom: 4, textTransform: "uppercase" }}>Default Listing Limit</div>
                <input 
                  type="number" 
                  value={config.listingLimit} 
                  onChange={e => setConfig({ ...config, listingLimit: e.target.value })} 
                  style={{ width: "100%", padding: "10px", borderRadius: 8, border: `1px solid ${COLORS.gray300}`, fontSize: 13 }} 
                />
              </div>
            ) : (
              <div style={{ animation: "slideIn 0.2s ease-out" }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: COLORS.green700, marginBottom: 4, textTransform: "uppercase" }}>Target User ID</div>
                <div style={{ position: "relative" }}>
                  <input 
                    value={targetUserId}
                    onChange={e => setTargetUserId(e.target.value)}
                    placeholder="Enter User ID..."
                    style={{ width: "100%", padding: "10px", borderRadius: 8, border: `1px solid ${COLORS.green600}`, fontSize: 13, background: COLORS.green50, outline: "none" }}
                  />
                  {targetUserId && (
                    <div style={{ marginTop: 4, fontSize: 10, fontWeight: 600, color: USERS.find(u => u.id.toString() === targetUserId) ? COLORS.green700 : COLORS.red700 }}>
                      {USERS.find(u => u.id.toString() === targetUserId) 
                        ? `✅ Target Found: ${USERS.find(u => u.id.toString() === targetUserId).name}`
                        : "❌ User ID not found"}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {limitMode === "Specific User" && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 30, animation: "slideIn 0.3s ease-out" }}>
              <div>
                <div style={{ fontSize: 11, fontWeight: 600, color: COLORS.gray600, marginBottom: 4, textTransform: "uppercase" }}>New Listing Limit for User</div>
                <input 
                  type="number" 
                  value={targetLimit}
                  onChange={e => setTargetLimit(e.target.value)}
                  style={{ width: "100%", padding: "10px", borderRadius: 8, border: `1px solid ${COLORS.gray300}`, fontSize: 13 }}
                />
                <div style={{ fontSize: 10, color: COLORS.gray600, marginTop: 4 }}>This overrides the global default for this specific ID.</div>
              </div>
              <div style={{ display: "flex", alignItems: "flex-end" }}>
                 <div style={{ padding: "10px", borderRadius: 8, background: COLORS.gray50, border: `1px solid ${COLORS.gray100}`, flex: 1 }}>
                    <div style={{ fontSize: 9, color: COLORS.gray500, textTransform: "uppercase" }}>Verification Status</div>
                    <div style={{ fontSize: 11, fontWeight: 600, color: targetUserId && USERS.find(u => u.id.toString() === targetUserId) ? COLORS.green700 : COLORS.gray400 }}>
                      {targetUserId && USERS.find(u => u.id.toString() === targetUserId) ? "Ready to apply override" : "Awaiting valid ID..."}
                    </div>
                 </div>
              </div>
            </div>
          )}
        </div>

        <button 
          onClick={() => {
            if (limitMode === "Specific User") {
              const user = USERS.find(u => u.id.toString() === targetUserId);
              if (!user) { alert("Invalid User ID"); return; }
              showToast(`Listing limit updated to ${targetLimit} for ${user.name}.`);
              setTargetUserId("");
            } else {
              showToast(`Global listing limit updated to ${config.listingLimit}.`);
            }
          }}
          style={{ marginTop: 30, padding: "10px 24px", borderRadius: 8, border: "none", background: COLORS.green700, color: COLORS.white, fontWeight: 600, cursor: "pointer" }}
        >
          {limitMode === "Global Default" ? "Save Global Settings" : "Apply Individual Override"}
        </button>
      </div>

      <SafetyConfirmationModal
        isOpen={confirmModal.isOpen}
        setting={confirmModal.setting}
        currentStatus={confirmModal.currentStatus}
        onClose={() => setConfirmModal({ ...confirmModal, isOpen: false })}
        onConfirm={handleCriticalChange}
      />
    </div>
  );
};
