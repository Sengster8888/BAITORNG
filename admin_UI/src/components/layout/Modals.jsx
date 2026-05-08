import { useState } from "react";
import { COLORS } from "../../constants/colors";

export const Modal = ({ title, isOpen, onClose, children, width = 800 }) => {
  if (!isOpen) return null;
  return (
    <div style={{
      position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
      background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center",
      zIndex: 1000, backdropFilter: "blur(2px)",
    }} onClick={onClose}>
      <div style={{
        background: COLORS.white, borderRadius: 12, width: "95%", maxWidth: width,
        maxHeight: "90vh", display: "flex", flexDirection: "column",
        boxShadow: "0 10px 40px rgba(0,0,0,0.3)",
      }} onClick={e => e.stopPropagation()}>
        <div style={{
          padding: "16px 20px", borderBottom: `1px solid ${COLORS.gray100}`,
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <span style={{ fontWeight: 600, fontSize: 16 }}>{title}</span>
          <button onClick={onClose} style={{
            background: "none", border: "none", cursor: "pointer", color: COLORS.gray600,
            fontSize: 20, display: "flex", alignItems: "center",
          }}>&times;</button>
        </div>
        <div style={{ padding: 24, overflowY: "auto" }}>
          {children}
        </div>
      </div>
    </div>
  );
};

export const ConfirmModal = ({ isOpen, title, message, onConfirm, onClose, type = "danger", requireReason = false }) => {
  const [reason, setReason] = useState("");
  const [note, setNote] = useState("");

  if (!isOpen) return null;

  const reasons = {
    user: ["Fake account", "Spam listings", "Scam/fraud behavior", "Harassment", "Repeated policy violations", "Suspicious activity", "Other"],
    listing: ["Fake listing", "Wrong price", "Inappropriate content", "Duplicate listing", "Suspicious seller", "Other"],
    report: ["Valid report", "Not enough evidence", "Duplicate report", "Policy violation confirmed", "User warning issued", "Target archived", "User banned"]
  };

  const currentReasons = title.toLowerCase().includes("user") ? reasons.user : (title.toLowerCase().includes("listing") || title.toLowerCase().includes("request") ? reasons.listing : reasons.report);

  return (
    <Modal title={title} isOpen={isOpen} onClose={onClose} width={450}>
      <div style={{ textAlign: "center" }}>
        <div style={{
          width: 48, height: 48, borderRadius: "50%",
          background: type === "danger" ? COLORS.red100 : COLORS.amber100,
          color: type === "danger" ? COLORS.red700 : COLORS.amber700,
          display: "flex", alignItems: "center", justifyContent: "center",
          margin: "0 auto 16px", fontSize: 24
        }}>
          {type === "danger" ? "!" : "?"}
        </div>
        <div style={{ fontSize: 14, color: COLORS.gray900, fontWeight: 600, marginBottom: 8 }}>{message}</div>

        {requireReason && (
          <div style={{ textAlign: "left", marginTop: 20 }}>
            <div style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: COLORS.gray600, marginBottom: 4, textTransform: "uppercase" }}>Reason for action</div>
              <select
                value={reason}
                onChange={e => setReason(e.target.value)}
                style={{ width: "100%", padding: "10px", borderRadius: 8, border: `1px solid ${COLORS.gray300}`, fontSize: 13, background: COLORS.white }}
              >
                <option value="">Select a reason...</option>
                {currentReasons.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: COLORS.gray600, marginBottom: 4, textTransform: "uppercase" }}>Internal Admin Note (Optional)</div>
              <textarea
                value={note}
                onChange={e => setNote(e.target.value)}
                placeholder="Add more context for other admins..."
                style={{ width: "100%", height: 60, padding: "10px", borderRadius: 8, border: `1px solid ${COLORS.gray300}`, fontSize: 13, outline: "none", resize: "none" }}
              />
            </div>
          </div>
        )}

        {!requireReason && <div style={{ fontSize: 13, color: COLORS.gray600, marginBottom: 24 }}>This action will be logged in the system activity.</div>}

        <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
          <button onClick={onClose} style={{
            padding: "8px 16px", borderRadius: 8, border: `1px solid ${COLORS.gray300}`,
            background: COLORS.white, color: COLORS.gray600, cursor: "pointer", fontWeight: 500
          }}>Cancel</button>
          <button
            disabled={requireReason && !reason}
            onClick={() => { onConfirm(reason, note); onClose(); setReason(""); setNote(""); }}
            style={{
              padding: "8px 16px", borderRadius: 8, border: "none",
              background: type === "danger" ? COLORS.red700 : COLORS.amber700,
              color: COLORS.white, cursor: "pointer", fontWeight: 500,
              opacity: (requireReason && !reason) ? 0.5 : 1
            }}
          >Confirm</button>
        </div>
      </div>
    </Modal>
  );
};

export const SideDrawer = ({ title, isOpen, onClose, children, width = 500 }) => {
  if (!isOpen) return null;
  return (
    <div style={{
      position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
      background: "rgba(0,0,0,0.3)", zIndex: 1100, backdropFilter: "blur(2px)",
      display: "flex", justifyContent: "flex-end"
    }} onClick={onClose}>
      <div style={{
        width: "90%", maxWidth: width, height: "100%",
        background: COLORS.white, boxShadow: "-5px 0 30px rgba(0,0,0,0.1)",
        display: "flex", flexDirection: "column",
        animation: "slideInRight 0.3s ease-out"
      }} onClick={e => e.stopPropagation()}>
        <div style={{
          padding: "20px 24px", borderBottom: `1px solid ${COLORS.gray100}`,
          display: "flex", alignItems: "center", justifyContent: "space-between"
        }}>
          <span style={{ fontWeight: 600, fontSize: 16 }}>{title}</span>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 24, color: COLORS.gray600 }}>&times;</button>
        </div>
        <div style={{ flex: 1, overflowY: "auto", padding: 24 }}>
          {children}
        </div>
      </div>
    </div>
  );
};
