import { useState } from "react";
import { COLORS } from "../../constants/colors";
import { Modal } from "../layout/Modals";
import { HoldButton } from "../common/HoldButton";

export const SafetyConfirmationModal = ({ isOpen, onClose, setting, currentStatus, onConfirm }) => {
  const [reason, setReason] = useState("");
  const [note, setNote] = useState("");

  if (!isOpen) return null;

  const info = {
    maintenance: {
      title: currentStatus ? "Disable Maintenance Mode?" : "Enable Maintenance Mode?",
      desc: "Maintenance mode prevents users from accessing marketplace features while the system is being updated.",
      affected: ["Supply listings", "Demand requests", "Matching", "Notifications"]
    },
    registration: {
      title: currentStatus ? "Stop New User Registration?" : "Resume User Registration?",
      desc: "When stopped, new farmers, middlemen, and buyers will be unable to create accounts.",
      affected: ["New Farmer signups", "Middleman onboarding", "Buyer registration"]
    },
    matching: {
      title: currentStatus ? "Disable Matching Engine?" : "Enable Matching Engine?",
      desc: "Turning off the matching engine will stop the automatic merging of supply and demand listings.",
      affected: ["Auto-merge algorithm", "Match notifications", "Deal suggestions"]
    },
    notifications: {
      title: currentStatus ? "Disable Push Notifications?" : "Enable Push Notifications?",
      desc: "Users will stop receiving real-time alerts for matches, messages, and system updates.",
      affected: ["Match alerts", "System broadcasts", "Safety warnings"]
    },
    autoBan: {
      title: currentStatus ? "Disable Auto-ban System?" : "Enable Auto-ban System?",
      desc: "The auto-ban system automatically restricts suspicious accounts and spam bots based on behavior patterns.",
      affected: ["Spam protection", "Bot detection", "Platform integrity"]
    }
  };

  const meta = info[setting] || { title: "Confirm Change", desc: "Please confirm this critical system change.", affected: ["System-wide services"] };

  const reasons = ["System maintenance", "Security issue", "Spam attack", "Database update", "Emergency platform control", "Other"];

  return (
    <Modal title={meta.title} isOpen={isOpen} onClose={onClose} width={460}>
      <div>
        <div style={{ background: COLORS.amber50, border: `1px solid ${COLORS.amber200}`, padding: 14, borderRadius: 10, marginBottom: 20 }}>
          <div style={{ fontSize: 13, color: COLORS.amber800, fontWeight: 600, marginBottom: 4 }}>System Impact: {currentStatus ? "OFF" : "ON"}</div>
          <div style={{ fontSize: 12, color: COLORS.gray600, lineHeight: 1.5 }}>{meta.desc}</div>
        </div>

        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: COLORS.gray600, textTransform: "uppercase", marginBottom: 8 }}>Affected Services</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {meta.affected.map(a => (
              <span key={a} style={{ fontSize: 10, background: COLORS.gray100, color: COLORS.gray700, padding: "3px 8px", borderRadius: 6 }}>{a}</span>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: COLORS.gray600, marginBottom: 4, textTransform: "uppercase" }}>Reason for change</div>
          <select value={reason} onChange={e => setReason(e.target.value)} style={{ width: "100%", padding: "10px", borderRadius: 8, border: `1px solid ${COLORS.gray300}`, fontSize: 13 }}>
            <option value="">Select a reason...</option>
            {reasons.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>

        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: COLORS.gray600, marginBottom: 4, textTransform: "uppercase" }}>Internal Admin Note</div>
          <textarea
            placeholder="Add context for the audit log..."
            value={note} onChange={e => setNote(e.target.value)}
            style={{ width: "100%", height: 60, padding: "10px", borderRadius: 8, border: `1px solid ${COLORS.gray300}`, fontSize: 13, resize: "none" }}
          />
        </div>

        <HoldButton
          label={`Hold to Confirm ${meta.title.split("?")[0]}`}
          color={currentStatus ? COLORS.red700 : COLORS.green700}
          onConfirm={() => {
            if (!reason) { alert("Please select a reason."); return; }
            onConfirm(reason, note);
            onClose();
          }}
        />

        <div onClick={onClose} style={{ textAlign: "center", marginTop: 12, fontSize: 12, color: COLORS.gray500, cursor: "pointer" }}>Cancel Action</div>
      </div>
    </Modal>
  );
};
