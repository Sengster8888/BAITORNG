export const Icon = ({ name, size = 15 }) => {
  const s = { width: size, height: size, flexShrink: 0 };
  if (name === "grid") return <svg style={s} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2"><rect x="2" y="2" width="5" height="5" rx="1.5" /><rect x="9" y="2" width="5" height="5" rx="1.5" /><rect x="2" y="9" width="5" height="5" rx="1.5" /><rect x="9" y="9" width="5" height="5" rx="1.5" /></svg>;
  if (name === "users") return <svg style={s} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2"><circle cx="6" cy="5.5" r="2.3" /><path d="M1.5 13c0-2.5 2-4 4.5-4s4.5 1.5 4.5 4" strokeLinecap="round" /><path d="M11 7.5l1 1 2-2" strokeLinecap="round" strokeLinejoin="round" /></svg>;
  if (name === "list") return <svg style={s} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2"><rect x="2" y="3" width="12" height="10" rx="2" /><path d="M5 7h6M5 9.5h4" strokeLinecap="round" /></svg>;
  if (name === "inbox") return <svg style={s} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M3 4h10M3 7.5h7M3 11h5" strokeLinecap="round" /></svg>;
  if (name === "merge") return <svg style={s} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2"><circle cx="5" cy="8" r="2.3" /><circle cx="11" cy="8" r="2.3" /><path d="M7.3 8h1.4" strokeLinecap="round" /></svg>;
  if (name === "report") return <svg style={s} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2"><rect x="2" y="2" width="12" height="12" rx="2" /><path d="M8 5v4M8 11h.01" strokeLinecap="round" /></svg>;
  if (name === "megaphone") return <svg style={s} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M2 6h3l4-3v10l-4-3H2V6zM11 8h2M12 6l1-1M12 10l1 1" strokeLinecap="round" strokeLinejoin="round" /></svg>;
  if (name === "log") return <svg style={s} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2"><rect x="2" y="2" width="12" height="12" rx="2" /><path d="M5 5.5h6M5 8h6M5 10.5h4" strokeLinecap="round" /></svg>;
  if (name === "settings") return <svg style={s} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2"><circle cx="8" cy="8" r="2" /><path d="M8 2v1M8 13v1M2 8h1M13 8h1M4 4l1 1M11 11l1 1M4 12l1-1M11 5l1-1" strokeLinecap="round" /></svg>;
  if (name === "bell") return <svg style={s} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M8 2a3 3 0 00-3 3v2.5L3.5 10h9L11 7.5V5a3 3 0 00-3-3zM5 13a3 3 0 006 0" strokeLinecap="round" /></svg>;
  if (name === "search") return <svg style={s} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2"><circle cx="7" cy="7" r="4.5" /><path d="M10.5 10.5l3 3" strokeLinecap="round" /></svg>;
  if (name === "tag") return <svg style={s} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M14 6L8 0 0 8l6 6 8-8z" strokeLinecap="round" strokeLinejoin="round" /><circle cx="10" cy="4" r="1" fill="currentColor" /></svg>;
  if (name === "star") return <svg style={s} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M8 1l2.5 5 5.5.8-4 4 1 5.5-5-2.8-5 2.8 1-5.5-4-4 5.5-.8L8 1z" strokeLinecap="round" strokeLinejoin="round" /></svg>;
  if (name === "map") return <svg style={s} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M1 14V4l5-2 5 2 4-2v10l-4 2-5-2-5 2z" strokeLinecap="round" strokeLinejoin="round" /><path d="M6 2v10M11 4v10" strokeLinecap="round" /></svg>;
  return null;
};
