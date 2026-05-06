import { useNavigate } from "react-router";
import {
  MapPin,
  Package,
  ArrowLeft,
  Phone,
  Share2,
  Facebook,
  Globe,
  Send,
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  MessageCircle,
  Instagram,
  Youtube,
  Linkedin,
} from "lucide-react";
import { useLanguage } from "../features/profile/LanguageContext";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { SocialIcon } from "../components/SocialIcon";
import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router";
import { getProfileData } from "../features/profile/profileData";

const maskPhone = (value) => {
  if (!value) return "";
  const digits = value.replace(/\D/g, "");
  const base = digits.startsWith("855") ? digits.substring(3) :
    digits.startsWith("0") ? digits.substring(1) : digits;
  return `+855 ${base.substring(0, 2)} ${base.substring(2, 4)}X XXX`;
};

const MOCK_ITEM = {
  id: "1",
  images: [
    "https://i.pinimg.com/1200x/77/94/0c/77940c96726789080b33951173bba7b2.jpg",
    "https://i.pinimg.com/1200x/e9/3d/8e/e93d8e6f63421ea16509df1dfe739ecf.jpg",
    "https://i.gyazo.com/b4f523a1d39484eafa508a9465980d09.jpg",
    "https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=800",
    "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800",
    "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800",
    "https://images.unsplash.com/photo-1471194402529-8e0f5a675de6?w=800",
    "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=800",
    "https://images.unsplash.com/photo-1586771107445-d3ca888129ff?w=800",
    "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=800",
  ],
  category: "rice",
  variety: "ស្រូវផ្ការំដួលបាត់ដំបង",
  price: "3,200",
  unit: "kg",
  quantityAvailable: "5,000",
  location: "battambang",
  postedTime: "twoHoursAgo",
  descriptionLabel: "ពណ៌នាបន្ថែម",
  demandDescriptionLabel: "តម្រូវការបន្ថែម",
  description: "ស្រូវផ្ការំដួលលេខ១ គុណភាពល្អឥតខ្ចោះ មកពីខេត្តបាត់ដំបង។ ស្រូវថ្មី ក្រអូប ឆ្ងាញ់ មិនមានប្រើប្រាស់ជាតិគីមី។ សាកសមសម្រាប់តម្រូវការនាំចេញ ឬយកទៅកិនសម្រាប់ហូបក្នុងគ្រួសារ។",
  type: "supply",
};

const MOCK_COMMENTS = [
  { id: 1, user: "ចាន់ ធិតា", text: "តើអាចបញ្ចុះតម្លៃបានទេ?", time: "30 នាទីមុន" },
];

export function DetailSupply() {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [showCallModal, setShowCallModal] = useState(false);
  const [showSocialModal, setShowSocialModal] = useState(false);

  const profileData = getProfileData();

  const item = {
    ...MOCK_ITEM,
    seller: {
      id: profileData.id || "user_123",
      name: profileData.fullName,
      role: profileData.role?.toLowerCase() || "farmer",
      avatar: profileData.profilePicture,
      phones: [profileData.primaryPhone, ...(profileData.additionalPhones || [])].filter(Boolean),
      socialLinks: profileData.socialLinks || [],
    }
  };

  const openLightbox = (idx) => {
    setLightboxIndex(idx);
    setLightboxOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
    document.body.style.overflow = "";
  }, []);

  const prevImage = useCallback(() => {
    setLightboxIndex((i) => (i - 1 + item.images.length) % item.images.length);
  }, [item.images.length]);

  const nextImage = useCallback(() => {
    setLightboxIndex((i) => (i + 1) % item.images.length);
  }, [item.images.length]);

  useEffect(() => {
    if (!lightboxOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "ArrowRight") nextImage();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxOpen, closeLightbox, prevImage, nextImage]);

  const getRoleColor = (role) => {
    const r = role?.toLowerCase();
    if (r === 'buyer') return '#eab308';
    if (r === 'middleman') return '#f64900';
    return '#00a73d';
  };

  return (
    <div className="min-h-screen bg-white flex flex-col font-body pb-24 sm:pb-0">
      <div className="hidden sm:block">
        <Header />
      </div>

      {/* MOBILE MINI HEADER */}
      <div className="sm:hidden sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 h-14 px-4 flex items-center gap-4">
        <Link to="/" className="p-2 -ml-2 text-gray-900 active:scale-95 transition-transform">
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-[17px] font-bold text-gray-900">{t("back_to_feed")}</h1>
      </div>

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-6 sm:py-10">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <div
                className="aspect-[4/3] rounded-3xl overflow-hidden bg-gray-50 border border-gray-100 relative group cursor-zoom-in"
                onClick={() => openLightbox(activeIndex)}
              >
                <img src={item.images[activeIndex]} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]" alt="" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 rounded-full p-3">
                    <ZoomIn className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
              <div className="flex gap-3 overflow-x-auto no-scrollbar">
                {item.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveIndex(idx)}
                    className={`w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all shrink-0 ${activeIndex === idx ? "border-green-600" : "border-transparent opacity-50 hover:opacity-100"}`}
                  >
                    <img src={img} className="w-full h-full object-cover" alt="" />
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2 text-gray-500 text-sm font-bold">
                <span>{t(item.category)}</span>
                <span>•</span>
                <span>{t(item.postedTime)}</span>
              </div>
              <h1 className="text-3xl font-black text-gray-900 leading-tight">{item.variety}</h1>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-black text-green-600">{item.price}៛</span>
                <span className="text-lg text-gray-400 font-bold">/ {item.unit}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-8 py-5 border-y border-gray-100">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400">
                  <Package className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-500">{t("quantityAvailable")}</p>
                  <p className="text-sm font-black text-gray-900">{item.quantityAvailable} {item.unit}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-500">{t("location")}</p>
                  <p className="text-sm font-black text-gray-900">{t(item.location)}</p>
                </div>
              </div>
            </div>

            {/* MOBILE SELLER SECTION - UNWRAPPED */}
            <div className="sm:hidden -mt-4 mb-6">
              <Link to="/profile" className="flex items-center gap-4 active:opacity-70 transition-opacity cursor-pointer py-2">
                <img src={item.seller.avatar} className="w-16 h-16 rounded-2xl object-cover shadow-sm shrink-0" alt="" />
                <div className="flex-1 min-w-0">
                  <p className="font-black text-xl text-gray-900 truncate tracking-tight mb-1">{item.seller.name}</p>
                  <div 
                    className="text-[13px] font-black uppercase tracking-tight"
                    style={{ color: getRoleColor(item.seller.role) }}
                  >
                    {t(item.seller.role)}
                  </div>
                </div>
                <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-300">
                  <ChevronRight className="w-6 h-6" />
                </div>
              </Link>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-black text-gray-900">{item.type === "supply" ? t("descriptionLabel") : t("demandDescriptionLabel")}</h3>
              <p className="text-gray-600 leading-loose text-lg font-medium">{item.description}</p>
            </div>

            <div className="pt-10 border-t border-gray-100 space-y-8">
              <h3 className="text-xl font-black text-gray-900">{t("comments")} ({MOCK_COMMENTS.length})</h3>
              <div className="space-y-6">
                {MOCK_COMMENTS.map((c) => (
                  <div key={c.id} className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 font-black">{c.user.charAt(0)}</div>
                    <div className="flex-1 bg-gray-50 p-4 rounded-3xl rounded-tl-none">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-sm text-gray-900">{c.user}</span>
                        <span className="text-[10px] text-gray-300 font-bold">{c.time}</span>
                      </div>
                      <p className="text-sm text-gray-600 font-medium">{c.text}</p>
                    </div>
                  </div>
                ))}
                <div className="flex gap-3">
                  <input type="text" placeholder={t("commentPlaceholder")} className="flex-1 bg-gray-50 px-6 h-14 rounded-2xl border-none focus:ring-1 focus:ring-green-500 text-sm outline-none" />
                  <button className="w-14 h-14 bg-green-600 text-white rounded-2xl flex items-center justify-center active:scale-95 transition-all shadow-lg shadow-green-900/10">
                    <Send className="w-5 h-5 fill-current" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 hidden lg:block">
            <div className="sticky top-28 space-y-6">
              <div className="bg-gray-50/50 rounded-[2.5rem] p-8 border border-gray-100">
                <Link to="/profile" className="flex flex-col items-center mb-8 group">
                  <div className="relative mb-8">
                    <img src={item.seller.avatar} className="w-24 h-24 rounded-[2rem] object-cover shadow-sm border-2 border-white transition-transform group-hover:scale-105" alt="" />
                    <div
                      className="absolute -bottom-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-2xl text-white text-[13px] font-black flex items-center justify-center transition-all whitespace-nowrap border-2 border-white"
                      style={{ backgroundColor: getRoleColor(item.seller.role) }}
                    >
                      {t(item.seller.role)}
                    </div>
                  </div>
                  <h3 className="text-xl font-black text-gray-900">{item.seller.name}</h3>
                </Link>

                <div className="space-y-6">
                  <div className="space-y-3">
                    <p className="text-sm font-bold text-gray-500 text-center">{t("contactViaPhone")}</p>
                    {item.seller.phones.map((phone, i) => (
                      <a
                        key={i}
                        href={`tel:${phone}`}
                        className="flex items-center justify-center gap-3 h-14 bg-white border border-gray-100 rounded-2xl text-gray-900 font-black hover:border-green-300 hover:text-green-600 transition-all shadow-sm group"
                      >
                        <Phone className="w-5 h-5 text-green-500 group-hover:scale-110 transition-transform" />
                        {maskPhone(phone)}
                      </a>
                    ))}
                  </div>

                  {item.seller.socialLinks && item.seller.socialLinks.length > 0 && (
                    <div className="space-y-3 pt-2">
                      <p className="text-sm font-bold text-gray-500 text-center">{t("socialMedia")}</p>
                      <div className="flex flex-wrap justify-center gap-3">
                        {item.seller.socialLinks.map((s, i) => {
                          const url = s.url.startsWith("http") ? s.url : `https://${s.url}`;
                          return (
                            <a
                              key={i}
                              href={url}
                              target="_blank"
                              rel="noreferrer"
                              className="w-11 h-11 rounded-lg bg-gray-50 flex items-center justify-center transform active:scale-95 transition-all shadow-sm border border-gray-100/50"
                            >
                              {<SocialIcon platform={s.platform} className="w-6 h-6" />}
                            </a>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <div className="hidden sm:block">
        <Footer />
      </div>

      {/* MOBILE BOTTOM ACTION BAR - SLIM PRO */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 animate-in slide-in-from-bottom duration-500">
        <div className="bg-white/95 backdrop-blur-2xl border-t border-gray-100 p-3 px-4 pb-5 rounded-t-2xl shadow-[0_-8px_30px_rgb(0,0,0,0.05)] flex items-center gap-3">
          <button
            onClick={() => setShowCallModal(true)}
            className="flex-1 h-12 bg-green-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 active:scale-95 transition-all shadow-md shadow-green-100"
          >
            <Phone className="w-4 h-4" />
            <span className="text-sm hidden xs:inline">{t("call_seller")}</span>
          </button>
          <button
            onClick={() => setShowSocialModal(true)}
            className="flex-1 h-12 bg-white border border-gray-200 text-green-600 rounded-xl font-bold flex items-center justify-center gap-2 active:scale-95 transition-all shadow-sm"
          >
            <Share2 className="w-4 h-4" />
            <span className="text-sm hidden xs:inline">{t("socialMedia")}</span>
          </button>
        </div>
      </div>

      {/* MOBILE CALL MODAL */}
      {showCallModal && (
        <div className="fixed inset-0 z-[100] flex items-end animate-in fade-in duration-200">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowCallModal(false)}></div>
          <div className="relative w-full bg-white rounded-t-[2.5rem] p-8 pb-16 space-y-6 animate-in slide-in-from-bottom duration-300 max-h-[85vh] overflow-y-auto no-scrollbar">
            <div className="w-12 h-1.5 bg-gray-100 rounded-full mx-auto mb-2 sticky top-0"></div>
            <h3 className="text-xl font-black text-gray-900 text-center">{t("contactViaPhone")}</h3>
            <div className="space-y-3">
              {item.seller.phones.map((phone, i) => (
                <a key={i} href={`tel:${phone}`} className="flex items-center justify-center gap-3 h-16 bg-gray-50 rounded-2xl text-lg font-black text-gray-900 active:bg-green-50 active:text-green-600">
                  <Phone className="w-5 h-5 text-green-500" />
                  {maskPhone(phone)}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* MOBILE SOCIAL MODAL */}
      {showSocialModal && (
        <div className="fixed inset-0 z-[100] flex items-end animate-in fade-in duration-200">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowSocialModal(false)}></div>
          <div className="relative w-full bg-white rounded-t-[2.5rem] p-8 pb-16 space-y-6 animate-in slide-in-from-bottom duration-300 max-h-[85vh] overflow-y-auto no-scrollbar">
            <div className="w-12 h-1.5 bg-gray-100 rounded-full mx-auto mb-2 sticky top-0"></div>
            <h3 className="text-xl font-black text-gray-900 text-center">{t("socialMedia")}</h3>
            <div className="grid grid-cols-2 gap-3">
              {item.seller.socialLinks.map((s, i) => {
                const url = s.url.startsWith("http") ? s.url : `https://${s.url}`;
                return (
                  <a key={i} href={url} target="_blank" rel="noreferrer" className="flex flex-col items-center justify-center gap-2 h-24 bg-white border border-gray-100 rounded-2xl active:bg-gray-50 transition-colors">
                    <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-md">
                      <SocialIcon platform={s.platform} className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">{s.platform}</span>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* LIGHTBOX MODAL */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-[200] bg-black/95 flex flex-col" onClick={closeLightbox}>
          <div className="flex items-center justify-between px-6 py-4 shrink-0" onClick={(e) => e.stopPropagation()}>
            <span className="text-white/60 text-sm font-bold">{lightboxIndex + 1} / {item.images.length}</span>
            <button onClick={closeLightbox} className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"><X className="w-5 h-5 text-white" /></button>
          </div>
          <div className="flex-1 flex items-center justify-center relative min-h-0 px-16" onClick={(e) => e.stopPropagation()}>
            <button onClick={prevImage} className="absolute left-4 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center transition-colors"><ChevronLeft className="w-7 h-7 text-white" /></button>
            <img key={lightboxIndex} src={item.images[lightboxIndex]} className="max-h-full max-w-full object-contain rounded-2xl select-none" alt="" draggable={false} />
            <button onClick={nextImage} className="absolute right-4 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center transition-colors"><ChevronRight className="w-7 h-7 text-white" /></button>
          </div>
          <div className="shrink-0 py-4 px-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex gap-2 overflow-x-auto justify-center no-scrollbar">
              {item.images.map((img, idx) => (
                <button key={idx} onClick={() => setLightboxIndex(idx)} className={`w-16 h-16 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${lightboxIndex === idx ? "border-white opacity-100 scale-105" : "border-transparent opacity-40 hover:opacity-70"}`}>
                  <img src={img} className="w-full h-full object-cover" alt="" draggable={false} />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
