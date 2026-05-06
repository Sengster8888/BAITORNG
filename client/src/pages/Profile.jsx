import { useState } from "react";
import { Link } from "react-router";
import {
  ArrowLeft,
  Settings,
  Facebook,
  Instagram,
  Youtube,
  Linkedin,
  Send,
  MessageCircle,
  Globe,
  Users,
  UserPlus,
  Bookmark,
} from "lucide-react";
import { useLanguage } from "../features/profile/LanguageContext";
import { SupplyCard } from "../components/SupplyCard";
import { DemandCard } from "../components/DemandCard";
import { getProfileData } from "../features/profile/profileData";
import { SocialIcon, getSocialBrandColor } from "../components/SocialIcon";

const formatPhoneNumber = (value) => {
  if (!value) return "";
  const digits = value.replace(/\D/g, "");
  const base = digits.startsWith("855")
    ? digits.substring(3)
    : digits.startsWith("0")
      ? digits.substring(1)
      : digits;
  return `+855 ${base.substring(0, 2)} ${base.substring(2, 4)}X XXX`;
};

const SocialLink = ({ link }) => {
  const { t } = useLanguage();
  const clickableUrl =
    link.url.startsWith("http") || link.url.startsWith("https")
      ? link.url
      : `https://${link.url}`;

  const brandColor = getSocialBrandColor(link.platform);

  return (
    <a
      href={clickableUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="px-4 py-2 bg-white border border-gray-100 rounded-xl shadow-sm transition-all hover:border-transparent group flex items-center gap-3"
      style={{ "--hover-bg": brandColor }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = brandColor;
        e.currentTarget.style.boxShadow = `0 10px 15px -3px ${brandColor}33`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = "white";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <div className="w-9 h-9 rounded-lg bg-gray-50 flex items-center justify-center group-hover:bg-white transition-colors">
        <SocialIcon
          platform={link.platform}
          className="w-5 h-5 flex items-center justify-center"
        />
      </div>
      <div>
        <p className="text-sm font-bold text-gray-900 group-hover:text-white transition-colors leading-none mb-1">
          {link.platform}
        </p>
        <p className="text-[10px] text-gray-400 font-medium group-hover:text-white/80 transition-colors leading-none">
          {t("visitProfile")}
        </p>
      </div>
    </a>
  );
};

export function Profile() {
  const { language, t } = useLanguage();
  const [activeTab, setActiveTab] = useState("supply");
  const profileData = getProfileData();

  // Unified labels from translations.js

  const userListings = [
    {
      id: "my-rice-01",
      type: "supply",
      image:
        "https://scontent.fpnh20-1.fna.fbcdn.net/v/t1.6435-9/88129721_2817759894980029_5843446428050915328_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=7b2446&_nc_ohc=0qEtetWwCG0Q7kNvwErszhs&_nc_oc=Adr2tp6PEVv6qQ1KHRAy6dOMY1H0KVTaSLxkc6JxgWlYkpHa3Mf1vQS4c-D7JSTaJ8c&_nc_zt=23&_nc_ht=scontent.fpnh20-1.fna&_nc_gid=nFiIlhroyFy5GgMEETVu4Q&_nc_ss=7b2a8&oh=00_Af2T_Q9PQg-9imF5G-Oed67vhwRTVpDBddb-E8zDbCOu7w&oe=6A17B390",
      isSaved: false,
      category: "ស្រូវអង្ករ",
      variety: "ស្រូវផ្ការំដួល (លេខ ១)",
      price: "1,450",
      unit: "kg",
      quantityAvailable: "12,000",
      location: "battambang",
      postedTime: "2 hours ago",
      createdAt: "2024-04-29T07:30:00Z",
      seller: {
        id: "u-ishowspeed",
        username: "ishowspeed_kh",
        name: "IshowSpeed",
        role: "farmer",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Speed",
      },
    },
    {
      id: "my-mango-01",
      type: "supply",
      image:
        "https://moi-static.sgp1.cdn.digitaloceanspaces.com/uploads/post/feature_image/34857/feature.jpg",
      isSaved: false,
      category: "ស្វាយ",
      variety: "ស្វាយកែវរមៀត (Ready for Export)",
      price: "1,100",
      unit: "kg",
      quantityAvailable: "3,500",
      location: "kampongSpeu",
      postedTime: "5 hours ago",
      createdAt: "2024-04-29T04:30:00Z",
      seller: {
        id: "u-ishowspeed",
        username: "ishowspeed_kh",
        name: "IshowSpeed",
        role: "farmer",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Speed",
      },
    },
    {
      id: "my-corn-01",
      type: "supply",
      image:
        "https://images.unsplash.com/photo-1551754655-cd27e38d2076?q=80&w=600&auto=format&fit=crop",
      isSaved: false,
      category: "ពោត",
      variety: "ពោតលឿង (Yellow Corn)",
      price: "850",
      unit: "kg",
      quantityAvailable: "20,000",
      location: "pailin",
      postedTime: "Yesterday",
      createdAt: "2024-04-28T10:30:00Z",
      seller: {
        id: "u-ishowspeed",
        username: "ishowspeed_kh",
        name: "IshowSpeed",
        role: "farmer",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Speed",
      },
    },
    {
      id: "my-cabbage-01",
      type: "demand",
      image: "",
      isSaved: false,
      category: "ស្ពៃក្តោប",
      variety: "ស្ពៃក្តោបសរីរាង្គ (Organic)",
      price: "3,500",
      unit: "kg",
      quantityAvailable: "500",
      location: "phnomPenh",
      postedTime: "1 hour ago",
      createdAt: "2024-04-29T08:30:00Z",
      seller: {
        id: "u-ishowspeed",
        username: "ishowspeed_kh",
        name: "IshowSpeed",
        role: "farmer",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Speed",
      },
    },
    {
      id: "my-pepper-01",
      type: "demand",
      image: "",
      isSaved: false,
      category: "ម្រេច",
      variety: "ម្រេចកំពត (Black Pepper)",
      price: "40,000",
      unit: "kg",
      quantityAvailable: "100",
      location: "phnomPenh",
      postedTime: "Yesterday",
      createdAt: "2024-04-28T09:30:00Z",
      seller: {
        id: "u-ishowspeed",
        username: "ishowspeed_kh",
        name: "IshowSpeed",
        role: "farmer",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Speed",
      },
    },
  ];

  const filteredListings = userListings.filter((listing) => {
    const listingType = listing.type === "demand" ? "demand" : "supply";
    return listingType === activeTab;
  });

  return (
    <div className="min-h-screen bg-white sm:bg-gray-50 flex flex-col font-body pb-20 sm:pb-10">
      {/* Mobile Top Bar */}
      <div className="sm:hidden sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 h-14 px-4 flex items-center gap-4">
        <Link to="/" className="p-2 -ml-2 text-gray-900">
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-[17px] font-bold text-gray-900">{t("profile")}</h1>
        <div className="flex-1" />
        <Link to="/settings" className="p-2 -mr-2 text-gray-900">
          <Settings className="w-6 h-6" />
        </Link>
      </div>

      <div className="flex-1 max-w-[1440px] mx-auto w-full sm:px-4 sm:py-8 lg:py-12">
        {/* Desktop Header */}
        <div className="hidden sm:flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="w-11 h-11 rounded-2xl bg-white shadow-sm border border-gray-100 flex items-center justify-center text-gray-500 hover:text-green-600 transition-all hover:scale-110"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-2xl font-black text-gray-900 tracking-tight">
              {t("profile")}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/settings"
              className="w-11 h-11 rounded-2xl bg-white shadow-sm border border-gray-100 flex items-center justify-center text-gray-500 hover:text-green-600 transition-all hover:rotate-90"
            >
              <Settings className="w-5 h-5" />
            </Link>
          </div>
        </div>

        <div className="space-y-0 sm:space-y-6 divide-y divide-gray-50 sm:divide-y-0">
          {/* Profile Basic Info */}
          <div className="bg-white sm:rounded-[2.5rem] sm:shadow-xl sm:shadow-green-900/5 sm:border sm:border-gray-100 p-6 sm:p-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
              <div className="flex items-center gap-6 md:gap-8">
                <div className="relative group">
                  <img
                    src={profileData.profilePicture}
                    alt={profileData.fullName}
                    className="relative w-24 h-24 sm:w-36 sm:h-36 rounded-full border-4 border-white shrink-0 object-cover shadow-2xl shadow-green-900/10"
                  />
                </div>

                <div className="space-y-4">
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
                      {profileData.fullName}
                    </h2>
                    {profileData.username && (
                      <p className="text-base text-gray-400 font-medium tracking-wide">
                        {profileData.username}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <span
                      style={{
                        backgroundColor:
                          profileData.role?.toLowerCase() === "buyer"
                            ? "#eab308"
                            : profileData.role?.toLowerCase() === "middleman"
                              ? "#f64900"
                              : "#00a73d",
                        boxShadow: `0 10px 15px -3px ${
                          profileData.role?.toLowerCase() === "buyer"
                            ? "rgba(234, 179, 8, 0.2)"
                            : profileData.role?.toLowerCase() === "middleman"
                              ? "rgba(246, 73, 0, 0.2)"
                              : "rgba(0, 167, 61, 0.2)"
                        }`,
                      }}
                      className="px-5 py-2 rounded-2xl text-white text-[13px] font-black flex items-center justify-center transition-colors"
                    >
                      {t(profileData.role?.toLowerCase() || "user")}
                    </span>
                    <span className="px-4 py-2 rounded-2xl bg-white text-gray-400 text-[12px] font-bold border border-gray-100 shadow-sm">
                      ID: {profileData.id || "889241"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:min-w-[220px] shrink-0">
                {/* Simplified Dual-Stats Card */}
                <div className="bg-white rounded-3xl p-5 border border-gray-100">
                  <div className="grid grid-cols-2 divide-x divide-gray-100">
                    <div className="text-center pr-2">
                      <p className="text-[14px] font-bold text-gray-500 mb-1">
                        {t("followers")}
                      </p>
                      <p className="text-2xl font-black text-gray-900 tabular-nums">
                        1,280
                      </p>
                    </div>
                    <div className="text-center pl-2">
                      <p className="text-[14px] font-bold text-gray-500 mb-1">
                        {t("following")}
                      </p>
                      <p className="text-2xl font-black text-gray-900 tabular-nums">
                        420
                      </p>
                    </div>
                  </div>
                </div>

                {/* Classic Primary Button */}
                <button className="w-full h-12 rounded-2xl bg-green-600 text-white font-bold text-[15px]">
                  {t("follow")}
                </button>
              </div>
            </div>
          </div>

          {/* Details Section */}
          <div className="bg-white sm:rounded-2xl sm:shadow-sm sm:border sm:border-gray-100 p-6 sm:p-8 space-y-6">
            <h2 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-3">
              {t("profileDetails")}
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
              {/* Column 1: Location & Experience */}
              <div className="space-y-6">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                    {language === "en"
                      ? "General & Location"
                      : "ព័ត៌មានទូទៅ និងទីតាំង"}
                  </p>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-1">
                      <span className="text-gray-500">{t("province")}</span>
                      <span className="font-semibold text-gray-900">
                        {profileData.province
                          ? t(profileData.province)
                          : t("notAdded")}
                      </span>
                    </div>
                    <div className="flex justify-between items-start py-1">
                      <span className="text-gray-500 whitespace-nowrap mr-4">
                        {t("detailedLocation")}
                      </span>
                      <span className="font-semibold text-gray-900 text-right">
                        {profileData.detailedLocation || t("notAdded")}
                      </span>
                    </div>
                    {profileData.experience && (
                      <div className="flex justify-between items-center py-1">
                        <span className="text-gray-500">
                          {t("experienceYears")}
                        </span>
                        <span className="font-semibold text-gray-900">
                          {(() => {
                            const exp = profileData.experience;

                            // Direct check for keys seen in screenshots/data
                            const knownKeys = [
                              "lessThan1",
                              "1to3",
                              "3to5",
                              "5to10",
                              "over10",
                            ];
                            if (knownKeys.includes(exp)) return t(exp);

                            // Handle case where t() might return the key itself
                            const translated = t(exp);
                            if (translated !== exp) return translated;

                            // Fallback for raw numbers
                            return `${exp} ${t("yearsLabel") || "Years"}`;
                          })()}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Social Media (Desktop Only) */}
                {profileData.socialLinks &&
                  profileData.socialLinks.length > 0 && (
                    <div className="hidden lg:block">
                      <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2 mt-6">
                        {t("socialMedia")}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {profileData.socialLinks.map((link, idx) => (
                          <SocialLink
                            key={idx}
                            link={link}
                            language={language}
                          />
                        ))}
                      </div>
                    </div>
                  )}
              </div>

              {/* Column 2: Contact & Social Media */}
              <div className="space-y-6 pt-6 border-t border-gray-100 lg:border-0 lg:pt-0">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                    {t("contactInfo")}
                  </p>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-1">
                      <span className="text-gray-500">{t("primaryPhone")}</span>
                      {profileData.primaryPhone ? (
                        <a
                          href={`tel:${profileData.primaryPhone}`}
                          className="font-semibold text-gray-900 hover:text-green-600 transition-colors"
                        >
                          {formatPhoneNumber(profileData.primaryPhone)}
                        </a>
                      ) : (
                        <span className="font-semibold text-gray-900">
                          {t("notAdded")}
                        </span>
                      )}
                    </div>

                    {profileData.additionalPhones?.map((phone, idx) => (
                      <div
                        key={idx}
                        className="flex justify-between items-center py-1"
                      >
                        <span className="text-gray-500">
                          {t("additionalPhone")}
                        </span>
                        {phone ? (
                          <a
                            href={`tel:${phone}`}
                            className="font-semibold text-gray-900 hover:text-green-600 transition-colors"
                          >
                            {formatPhoneNumber(phone)}
                          </a>
                        ) : (
                          <span className="font-semibold text-gray-900">
                            {t("notAdded")}
                          </span>
                        )}
                      </div>
                    ))}

                    <div className="flex justify-between items-center py-1">
                      <span className="text-gray-500">{t("email")}</span>
                      {profileData.email ? (
                        <a
                          href={`mailto:${profileData.email}`}
                          className="font-semibold text-gray-900 hover:text-green-600 transition-colors"
                        >
                          {profileData.email}
                        </a>
                      ) : (
                        <span className="font-semibold text-gray-900">
                          {t("notAdded")}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Social Media (Mobile Only) */}
                {profileData.socialLinks &&
                  profileData.socialLinks.length > 0 && (
                    <div className="lg:hidden pt-4 border-t border-gray-50">
                      <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4">
                        {t("socialMedia")}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {profileData.socialLinks.map((link, idx) => (
                          <SocialLink
                            key={idx}
                            link={link}
                            language={language}
                          />
                        ))}
                      </div>
                    </div>
                  )}
              </div>
            </div>
          </div>

          {/* Listings Section */}
          <div className="bg-white min-h-[400px] sm:rounded-2xl sm:shadow-sm sm:border sm:border-gray-100 p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">
                {t("myListings")}
              </h2>
              <div className="flex items-center p-1 bg-gray-50 rounded-2xl border border-gray-100">
                <button
                  onClick={() => setActiveTab("supply")}
                  className={`px-6 py-2.5 rounded-xl text-[14px] font-black transition-all duration-300 ${activeTab === "supply" ? "bg-green-600 text-white shadow-lg shadow-green-600/20" : "text-gray-400 hover:text-gray-600"}`}
                >
                  {t("supply") || "Supply"}
                </button>
                <button
                  onClick={() => setActiveTab("demand")}
                  className={`px-6 py-2.5 rounded-xl text-[14px] font-black transition-all duration-300 ${activeTab === "demand" ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20" : "text-gray-400 hover:text-gray-600"}`}
                >
                  {t("demand") || "Demand"}
                </button>
              </div>
            </div>

            {filteredListings.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-sm p-5 text-center text-gray-500">
                {t("noListings")}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredListings.map((listing) =>
                  listing.type === "demand" ? (
                    <DemandCard key={listing.id} {...listing} />
                  ) : (
                    <SupplyCard key={listing.id} {...listing} />
                  ),
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
