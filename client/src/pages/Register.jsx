import { useState } from "react";
import { Link } from "react-router";
import {
  User,
  Mail,
  Lock,
  Phone,
  UserPlus,
  Leaf,
  Handshake,
  ShoppingCart,
  CheckCircle2,
  Facebook,
  Chrome as Google,
  ArrowLeft,
} from "lucide-react";
import { useLanguage } from "../features/profile/LanguageContext";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { PostListingModal } from "../components/PostListingModal";

export function Register() {
  const { t } = useLanguage();
  const [role, setRole] = useState("farmer");
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);

  const roles = [
    {
      id: "farmer",
      icon: Leaf,
      label: t("farmer"),
      color: "text-green-600",
      bg: "bg-green-50",
    },
    {
      id: "middleman",
      icon: Handshake,
      label: t("middleman"),
      color: "text-orange-600",
      bg: "bg-orange-50",
    },
    {
      id: "buyer",
      icon: ShoppingCart,
      label: t("buyer"),
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
  ];

  return (
    <div className="min-h-screen bg-white sm:bg-gray-50 flex flex-col font-body">
      <div className="hidden sm:block">
        <Header onOpenPostModal={() => setIsPostModalOpen(true)} />
      </div>

      {/* MOBILE MINI HEADER */}
      <div className="sm:hidden sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 h-14 px-4 flex items-center gap-4">
        <Link to="/" className="p-2 -ml-2 text-gray-900 active:scale-95 transition-transform">
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-[17px] font-bold text-gray-900">{t("back_to_feed")}</h1>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 relative flex items-center justify-center sm:p-4 lg:p-8 overflow-hidden">
        {/* Consistent Marketplace Background - Hidden on mobile */}
        <div className="absolute inset-0 bg-gray-50 hidden sm:block">
          <img
            src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=2000"
            className="w-full h-full object-cover opacity-10 blur-[2px]"
            alt="Agriculture background"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-gray-50/90 via-gray-50/60 to-transparent"></div>
        </div>

        <div className="w-full lg:max-w-5xl relative z-10 sm:py-6">
          <div className="bg-white sm:backdrop-blur-2xl sm:rounded-[3rem] sm:shadow-2xl sm:shadow-green-900/10 sm:border sm:border-white/50 overflow-hidden flex flex-col lg:flex-row h-screen sm:h-auto overflow-y-auto">
            {/* Left Side: Role Selection (Desktop Only) */}
            <div className="hidden lg:block lg:w-[42%] bg-gray-50/50 p-6 lg:p-8 border-b lg:border-b-0 lg:border-r border-gray-100">
              <div className="mb-4 text-center lg:text-left">
                <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center mb-3 border-2 border-green-100 shadow-inner group-hover:scale-110 transition-transform">
                  <Leaf className="w-8 h-8 text-green-600" />
                </div>
                <h1 className="designer-heading text-green-600 leading-none mb-1">
                  {t("growing_together")}
                </h1>
                <p className="text-gray-500 text-[15px] leading-relaxed font-medium">
                  {t("register_mission") ||
                    "Join Cambodia's leading marketplace for agricultural trade and growth."}
                </p>
              </div>

              <div className="space-y-4">
                <p className="designer-label text-gray-400 pl-1 mb-4">
                  {t("select_your_role")}
                </p>

                <div className="grid grid-cols-1 gap-4">
                  {roles.map((r) => (
                    <button
                      key={r.id}
                      onClick={() => setRole(r.id)}
                      className={`w-full flex items-center gap-3 p-3.5 rounded-2xl border-2 transition-all relative overflow-hidden group ${role === r.id ? "border-green-500 bg-white shadow-xl shadow-green-900/5 scale-[1.02]" : "border-gray-100 bg-white/50 hover:bg-white hover:border-gray-200"}`}
                    >
                      <div
                        className={`w-12 h-12 shrink-0 rounded-2xl flex items-center justify-center transition-all ${role === r.id ? r.bg + " " + r.color : "bg-gray-100 text-gray-400 group-hover:bg-gray-200"}`}
                      >
                        <r.icon className="w-6 h-6" />
                      </div>
                      <div className="text-left">
                        <p
                          className={`designer-role-title transition-colors ${role === r.id ? "text-green-600" : "text-gray-700"}`}
                        >
                          {t(`${r.id}_title`)}
                        </p>
                      </div>
                      {role === r.id && (
                        <div className="ml-auto w-8 h-8 bg-green-500 rounded-full flex items-center justify-center animate-in zoom-in duration-300">
                          <CheckCircle2 className="w-5 h-5 text-white" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Side: Registration Form */}
            <div className="flex-1 p-5 sm:p-8 bg-white sm:bg-white/40">

              <div className="mb-4 text-center sm:text-left">
                <h2 className="designer-heading text-gray-900 mb-1">
                  {t("create_account")}
                </h2>
                <p className="text-gray-500 font-medium">{t("fill_details")}</p>
              </div>

              <form className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
                <div className="space-y-2">
                  <label className="designer-label text-gray-400 pl-1">
                    {t("full_name")}
                  </label>
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 group-focus-within:text-green-500 transition-colors" />
                    <input
                      type="text"
                      placeholder="John Doe"
                      className="w-full bg-white border border-gray-100 rounded-2xl px-11 py-2.5 text-gray-900 outline-none focus:ring-4 focus:ring-green-500/10 focus:border-green-500 text-[15px] shadow-sm"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="designer-label text-gray-400 pl-1">
                    {t("phone")}
                  </label>
                  <div className="relative group">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 group-focus-within:text-green-500 transition-colors" />
                    <input
                      type="tel"
                      inputMode="numeric"
                      placeholder="012 345 678"
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, "");
                        e.target.value = val;
                      }}
                      className="w-full bg-white border border-gray-100 rounded-2xl px-11 py-2.5 text-gray-900 outline-none focus:ring-4 focus:ring-green-500/10 focus:border-green-500 text-[15px] shadow-sm"
                    />
                  </div>
                </div>

                <div className="space-y-2 sm:col-span-2">
                  <label className="designer-label text-gray-400 pl-1">
                    {t("email")}
                  </label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 group-focus-within:text-green-500 transition-colors" />
                    <input
                      type="email"
                      placeholder="john@example.com"
                      className="w-full bg-white border border-gray-100 rounded-2xl px-11 py-2.5 text-gray-900 outline-none focus:ring-4 focus:ring-green-500/10 focus:border-green-500 text-[15px] shadow-sm"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="designer-label text-gray-400 pl-1">
                    {t("password")}
                  </label>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 group-focus-within:text-green-500 transition-colors" />
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="w-full bg-white border border-gray-100 rounded-2xl px-11 py-2.5 text-gray-900 outline-none focus:ring-4 focus:ring-green-500/10 focus:border-green-500 text-[15px] shadow-sm"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="designer-label text-gray-400 pl-1">
                    {t("confirm_password")}
                  </label>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 group-focus-within:text-green-500 transition-colors" />
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="w-full bg-white border border-gray-100 rounded-2xl px-11 py-2.5 text-gray-900 outline-none focus:ring-4 focus:ring-green-500/10 focus:border-green-500 text-[15px] shadow-sm"
                    />
                  </div>
                </div>

                {/* Mobile-Only Role Selection */}
                <div className="lg:hidden sm:col-span-2 pt-4">
                  <p className="designer-label text-gray-400 pl-1 mb-4">
                    {t("select_your_role")}
                  </p>
                  <div className="grid grid-cols-3 gap-3">
                    {roles.map((r) => (
                      <button
                        key={r.id}
                        type="button"
                        onClick={() => setRole(r.id)}
                        className={`flex flex-col items-center gap-2 p-3 rounded-2xl border-2 transition-all active:scale-95 ${role === r.id ? "border-green-600 bg-green-50 shadow-sm" : "border-gray-50 bg-gray-50/50 hover:border-gray-100 hover:bg-gray-50"}`}
                      >
                        <div
                          className={`w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm ${r.color}`}
                        >
                          <r.icon className="w-5 h-5" />
                        </div>
                        <span
                          className={`text-[11px] font-black uppercase tracking-tight text-center ${role === r.id ? "text-green-700" : "text-gray-500"}`}
                        >
                          {t(r.id)}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="sm:col-span-2 pt-3">
                  <button className="w-full bg-green-600 hover:bg-green-700 text-white font-black py-3 rounded-2xl transition-all active:scale-[0.98] text-xl flex items-center justify-center gap-3">
                    <UserPlus className="w-6 h-6" />
                    {t("register")}
                  </button>
                </div>
              </form>

              <div className="mt-4">
                <div className="relative mb-4">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-100"></div>
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white/80 px-4 text-gray-400 font-black tracking-widest">
                      {t("or_continue_with")}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <button className="flex items-center justify-center gap-3 bg-white border border-gray-100 text-gray-700 py-2.5 rounded-2xl hover:bg-gray-50 transition-all shadow-sm active:scale-95">
                    <Google className="w-5 h-5 text-red-500" />
                    <span className="text-sm font-bold">Google</span>
                  </button>
                  <button className="flex items-center justify-center gap-3 bg-white border border-gray-100 text-gray-700 py-2.5 rounded-2xl hover:bg-gray-50 transition-all shadow-sm active:scale-95">
                    <Facebook className="w-5 h-5 text-blue-600" />
                    <span className="text-sm font-bold">Facebook</span>
                  </button>
                </div>
              </div>

              <p className="mt-4 text-center text-[15px] text-gray-500 font-medium">
                <span className="designer-footer-text text-gray-400">
                  {t("already_have_account")}
                </span>{" "}
                <Link
                  to="/login"
                  className="designer-footer-text text-green-600 hover:underline ml-1"
                >
                  {t("login")}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden sm:block">
        <Footer noMargin={true} />
      </div>

      <PostListingModal
        isOpen={isPostModalOpen}
        onClose={() => setIsPostModalOpen(false)}
      />
    </div>
  );
}
