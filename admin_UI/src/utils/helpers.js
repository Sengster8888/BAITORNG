import { COLORS } from "../constants/colors";

export const roleColor = (role) => {
  if (role === "Farmer") return { bg: COLORS.green100, color: COLORS.green700 };
  if (role === "Middleman") return { bg: COLORS.teal100, color: COLORS.teal700 };
  return { bg: COLORS.blue100, color: COLORS.blue700 };
};

export const statusDot = (status) => {
  if (status === "Active") return COLORS.green600;
  if (status === "Accepted") return COLORS.green600;
  if (status === "Banned") return COLORS.red700;
  if (status === "Removed") return COLORS.red700;
  if (status === "Declined") return COLORS.red700;
  if (status === "Flagged") return COLORS.amber700;
  if (status === "Pending") return COLORS.amber700;
  return COLORS.gray300;
};

export const logTypeColor = (type) => {
  if (type === "danger") return { bg: COLORS.red100, color: COLORS.red700 };
  if (type === "warning") return { bg: COLORS.amber100, color: COLORS.amber700 };
  if (type === "success") return { bg: COLORS.green100, color: COLORS.green700 };
  return { bg: COLORS.blue100, color: COLORS.blue700 };
};
