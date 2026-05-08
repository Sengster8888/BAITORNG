export const USERS = [
  {
    id: 1029348, name: "Sokha Rin", initials: "SR", role: "Farmer", joined: "12 Jan 2026", status: "Active", listings: 8, location: "Siem Reap", email: "sokha.rin@email.com", lastActive: "2 hours ago", verified: true, experience: "5to10",
    phones: [
      { id: 1, phone: "+855 12 345 678", label: "Primary", isPrimary: true, verified: true, addedAt: "12 Jan 2026" },
      { id: 2, phone: "+855 17 234 567", label: "Secondary", isPrimary: false, verified: true, addedAt: "3 Feb 2026" },
      { id: 3, phone: "+855 96 123 456", label: "Backup", isPrimary: false, verified: false, addedAt: "1 Mar 2026" },
    ]
  },
  {
    id: 1029349, name: "Dara Vuth", initials: "DV", role: "Middleman", joined: "3 Feb 2026", status: "Active", listings: 12, location: "Phnom Penh", email: "dara.vuth@email.com", lastActive: "1 day ago", verified: true,
    phones: [
      { id: 4, phone: "+855 17 234 567", label: "Primary", isPrimary: true, verified: true, addedAt: "3 Feb 2026" },
      { id: 5, phone: "+855 96 111 222", label: "Secondary", isPrimary: false, verified: true, addedAt: "10 Mar 2026" },
    ]
  },
  {
    id: 1029350, name: "Maly Chan", initials: "MC", role: "Buyer", joined: "18 Feb 2026", status: "Active", listings: 0, location: "Kampong Cham", email: "maly.chan@email.com", lastActive: "5 mins ago", verified: false,
    phones: [
      { id: 6, phone: "+855 96 123 456", label: "Primary", isPrimary: true, verified: false, addedAt: "18 Feb 2026" },
    ]
  },
  {
    id: 1029351, name: "Piseth Heng", initials: "PH", role: "Farmer", joined: "25 Jan 2026", status: "Banned", listings: 3, location: "Kampot", email: "piseth.heng@email.com", lastActive: "1 month ago", verified: false,
    phones: [
      { id: 7, phone: "+855 11 987 654", label: "Primary", isPrimary: true, verified: false, addedAt: "25 Jan 2026" },
    ]
  },
  {
    id: 1029352, name: "Nimol Lim", initials: "NL", role: "Buyer", joined: "7 Mar 2026", status: "Inactive", listings: 0, location: "Battambang", email: "nimol.lim@email.com", lastActive: "2 weeks ago", verified: false,
    phones: [
      { id: 8, phone: "+855 78 456 123", label: "Primary", isPrimary: true, verified: false, addedAt: "7 Mar 2026" },
    ]
  },
  {
    id: 1029353, name: "Borey Noun", initials: "BN", role: "Middleman", joined: "14 Mar 2026", status: "Active", listings: 6, location: "Takeo", email: "borey.noun@email.com", lastActive: "3 hours ago", verified: true,
    phones: [
      { id: 9, phone: "+855 23 789 012", label: "Primary", isPrimary: true, verified: true, addedAt: "14 Mar 2026" },
    ]
  },
  {
    id: 1029354, name: "Kosal Seng", initials: "KS", role: "Farmer", joined: "20 Mar 2026", status: "Active", listings: 5, location: "Kandal", email: "kosal.seng@email.com", lastActive: "1 hour ago", verified: true,
    phones: [
      { id: 10, phone: "+855 99 654 321", label: "Primary", isPrimary: true, verified: true, addedAt: "20 Mar 2026" },
    ]
  },
];

export const SUPPLY = [
  { id: "S-9021", product: "Jasmine Rice", variety: "Phka Rumduol", seller: "Sokha Rin", sellerId: 1029348, role: "Farmer", category: "Grain", qty: "200kg", price: "$0.45/kg", location: "Siem Reap", posted: "2 Apr 2026", status: "Active", desc: "Premium quality jasmine rice, harvested this season.", views: 420, is_featured: true },
  { id: "S-9022", product: "Sweet Corn", seller: "Dara Vuth", sellerId: 1029349, role: "Middleman", category: "Vegetable", qty: "500kg", price: "$0.30/kg", location: "Phnom Penh", posted: "5 Apr 2026", status: "Active", desc: "Fresh sweet corn from local farmers.", views: 215 },
  { id: "S-9023", product: "Mango (Keo)", seller: "Piseth Heng", sellerId: 1029351, role: "Farmer", category: "Fruit", qty: "150kg", price: "$0.80/kg", location: "Kampot", posted: "6 Apr 2026", status: "Flagged", desc: "Keo Romeat mangoes, organic.", views: 88 },
  { id: "S-9024", product: "Red Chilli", seller: "Borey Noun", sellerId: 1029353, role: "Middleman", category: "Spice", qty: "80kg", price: "$1.20/kg", location: "Battambang", posted: "8 Apr 2026", status: "Active", desc: "Dried red chilli, very spicy.", views: 156 },
  { id: "S-9025", product: "Cassava Root", seller: "Kosal Seng", sellerId: 1029354, role: "Farmer", category: "Root crop", qty: "1000kg", price: "$0.15/kg", location: "Kampong Cham", posted: "9 Apr 2026", status: "Removed", desc: "High starch cassava roots.", views: 45 },
  { id: "S-9026", product: "Long Bean", seller: "Sokha Rin", sellerId: 1029348, role: "Farmer", category: "Vegetable", qty: "60kg", price: "$0.60/kg", location: "Siem Reap", posted: "10 Apr 2026", status: "Active", desc: "Green long beans, pesticide-free.", views: 92 },
];

export const DEMAND = [
  { id: "D-8021", product: "Fresh Rice 100kg", buyer: "Maly Chan", buyerId: 1029350, role: "Buyer", category: "Grain", qty: "100kg", target: "$40", location: "Phnom Penh", posted: "3 Apr 2026", status: "Active", desc: "Looking for long-grain rice for restaurant.", deadline: "20 Apr 2026" },
  { id: "D-8022", product: "Mixed Vegetables", buyer: "Nimol Lim", buyerId: 1029352, role: "Buyer", category: "Vegetable", qty: "50kg", target: "$25", location: "Siem Reap", posted: "5 Apr 2026", status: "Active", desc: "Daily supply of mixed veggies needed.", deadline: "15 Apr 2026" },
  { id: "D-8023", product: "Bulk Mango Order", buyer: "Dara Vuth", buyerId: 1029349, role: "Middleman", category: "Fruit", qty: "300kg", target: "$200", location: "Kampot", posted: "7 Apr 2026", status: "Flagged", desc: "Urgent need for mangoes for export.", deadline: "10 Apr 2026" },
  { id: "D-8024", product: "Chilli Supply", buyer: "Maly Chan", buyerId: 1029350, role: "Buyer", category: "Spice", qty: "20kg", target: "$30", location: "Battambang", posted: "9 Apr 2026", status: "Active", desc: "Small batch of red chilli needed.", deadline: "18 Apr 2026" },
  { id: "D-8025", product: "Cassava 500kg", buyer: "Nimol Lim", buyerId: 1029352, role: "Buyer", category: "Root crop", qty: "500kg", target: "$60", location: "Kampong Cham", posted: "10 Apr 2026", status: "Removed", desc: "Need cassava for processing plant.", deadline: "12 Apr 2026" },
];

export const MATCHES = [
  { id: "M-1001", supply: SUPPLY[0], demand: DEMAND[0], matched: "4 Apr 2026", status: "Accepted", province: "Phnom Penh", score: 98, locationMatch: true, priceMatch: true, qtyMatch: true },
  { id: "M-1002", supply: SUPPLY[1], demand: DEMAND[1], matched: "6 Apr 2026", status: "Pending", province: "Siem Reap", score: 85, locationMatch: true, priceMatch: false, qtyMatch: true },
  { id: "M-1003", supply: SUPPLY[2], demand: DEMAND[2], matched: "8 Apr 2026", status: "Accepted", province: "Kampot", score: 92, locationMatch: true, priceMatch: true, qtyMatch: false },
  { id: "M-1004", supply: SUPPLY[3], demand: DEMAND[3], matched: "9 Apr 2026", status: "Declined", province: "Battambang", score: 70, locationMatch: false, priceMatch: true, qtyMatch: true },
  { id: "M-1005", supply: SUPPLY[5], demand: DEMAND[1], matched: "10 Apr 2026", status: "Pending", province: "Siem Reap", score: 88, locationMatch: true, priceMatch: true, qtyMatch: true },
];

export const REPORTS = [
  { id: "R-7001", reporter: "Maly Chan", targetType: "User", targetName: "Piseth Heng", targetId: 1029351, reason: "Scam Behavior", severity: "High", status: "Open", date: "2026-04-10 10:15", desc: "User asked for advance payment then stopped responding." },
  { id: "R-7002", reporter: "Sokha Rin", targetType: "Product", targetName: "Mango (Keo)", targetId: "S-9023", reason: "Wrong Price", severity: "Low", status: "Reviewed", date: "2026-04-09 15:30", desc: "Price listed is far below market, seems like bait." },
  { id: "R-7003", reporter: "System", targetType: "User", targetName: "Dara Vuth", targetId: 1029349, reason: "Suspicious Activity", severity: "Medium", status: "Open", date: "2026-04-10 08:45", desc: "High number of logins from different IPs in short time." },
  { id: "R-7004", reporter: "Nimol Lim", targetType: "Demand", targetName: "Bulk Mango Order", targetId: "D-8023", reason: "Inappropriate Content", severity: "Low", status: "Resolved", date: "2026-04-08 11:20", desc: "Description contains misleading information about export permits." },
];

export const LOGS = [
  { id: 1, time: "2026-04-10 14:32", action: "User banned", actor: "Admin", target: "Piseth Heng", type: "warning", details: "Reason: Scam Behavior. Repeatedly posting flagged content.", severity: "High" },
  { id: 2, time: "2026-04-10 13:15", action: "Listing removed", actor: "Admin", target: "Cassava Root", type: "danger", details: "Removed by admin due to policy violation.", severity: "Medium" },
  { id: 3, time: "2026-04-10 11:02", action: "User registered", actor: "System", target: "Kosal Seng", type: "info", details: "New user registered via phone verification.", severity: "Low" },
  { id: 4, time: "2026-04-09 16:44", action: "Listing flagged", actor: "System", target: "Mango (Keo)", type: "warning", details: "Flagged for potential price manipulation.", severity: "Medium" },
  { id: 5, time: "2026-04-09 10:20", action: "Match accepted", actor: "System", target: "Sokha Rin × Maly Chan", type: "success", details: "Both parties accepted the match proposal.", severity: "Low" },
  { id: 6, time: "2026-04-08 09:11", action: "Listing verified", actor: "Admin", target: "Sweet Corn", type: "success", details: "Admin manually verified listing after manual inspection.", severity: "Low" },
  { id: 7, time: "2026-04-07 15:55", action: "User reactivated", actor: "Admin", target: "Nimol Lim", type: "success", details: "User appealed and ban was lifted.", severity: "Medium" },
];

export const ANNOUNCEMENTS = [
  { id: 1, title: "System Maintenance Tonight", message: "We will be undergoing maintenance tonight at 12 AM for approximately 2 hours.", audience: "All Users", type: "system", priority: "Important", sentBy: "Admin", time: "2026-04-10 09:00", reach: 128 },
  { id: 2, title: "New Match Found!", message: "A new match has been found for your Jasmine Rice listing.", audience: "Specific User", type: "new_match", priority: "Normal", sentBy: "System", time: "2026-04-08 14:20", reach: 1, recipientName: "Sokha Rin", match_id: "M-1001" },
  { id: 3, title: "Demand Near You", message: "There is a high demand for Rice in your province.", audience: "Farmers", type: "demand_near_you", priority: "Normal", sentBy: "System", time: "2026-04-05 11:30", reach: 54 },
];
