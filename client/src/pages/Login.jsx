import { useState } from "react";
import { Link } from "react-router";
import {
  Lock,
  Mail,
  Facebook,
  Chrome as Google,
  Leaf,
  ArrowLeft,
} from "lucide-react";
import { useLanguage } from "../features/profile/LanguageContext";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { PostListingModal } from "../components/PostListingModal";

export function Login() {
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);

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
      <div className="flex-1 relative flex items-center justify-center sm:p-4 overflow-hidden">
        {/* Brand-Inspired Background */}
        <div className="absolute inset-0 bg-gray-50 hidden sm:block">
          <img
            src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=2000"
            className="w-full h-full object-cover opacity-20"
            alt="Agriculture background"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 via-gray-50/80 to-gray-50"></div>
        </div>

        <div className="w-full sm:max-w-lg relative z-10 sm:py-6">
          <div className="bg-white sm:bg-white/70 sm:backdrop-blur-xl sm:rounded-[2.5rem] p-6 sm:p-8 sm:shadow-2xl sm:shadow-green-900/10 sm:border sm:border-white/50 relative overflow-hidden h-screen sm:h-auto overflow-y-auto">
            {/* Subtle Accent pattern */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 rounded-full -mr-16 -mt-16 blur-2xl"></div>

            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-green-100 shadow-inner">
                <Leaf className="w-10 h-10 text-green-600" />
              </div>
              <h2 className="designer-heading text-gray-900 leading-none mb-1">
                {t("login")}
              </h2>
              <div className="w-8 h-1 bg-green-500 mx-auto rounded-full mt-4 opacity-50"></div>
            </div>

            <form className="space-y-4">
              <div className="space-y-2">
                <label className="designer-label text-gray-400 pl-1">
                  {t("phone_or_email")}
                </label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 group-focus-within:text-green-500 transition-colors" />
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="012... or name@example.com"
                    className="w-full bg-white border border-gray-100 rounded-2xl px-12 py-3 text-gray-900 outline-none focus:ring-4 focus:ring-green-500/10 focus:border-green-500 transition-all placeholder:text-gray-300 shadow-sm"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between pl-1">
                  <label className="designer-label text-gray-400 pl-1">
                    {t("password")}
                  </label>
                  <Link
                    to="/forgot-password"
                    className="designer-footer-text text-green-600 hover:underline"
                  >
                    {t("forgot_password_link")}
                  </Link>
                </div>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 group-focus-within:text-green-500 transition-colors" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-white border border-gray-100 rounded-2xl px-12 py-3 text-gray-900 outline-none focus:ring-4 focus:ring-green-500/10 focus:border-green-500 transition-all placeholder:text-gray-300 shadow-sm"
                  />
                </div>
              </div>

              <button className="w-full bg-green-600 hover:bg-green-700 text-white font-black py-4 rounded-2xl transition-all active:scale-[0.98] text-xl flex items-center justify-center gap-2 group">
                <span className="tracking-tight">{t("login")}</span>
              </button>
            </form>

            <div className="mt-8">
              <div className="relative mb-6">
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
                <button className="flex items-center justify-center gap-3 bg-white border border-gray-100 text-gray-700 py-3 rounded-2xl hover:bg-gray-50 transition-all shadow-sm active:scale-95">
                  <Google className="w-5 h-5 text-red-500" />
                  <span className="text-sm font-bold">Google</span>
                </button>
                <button className="flex items-center justify-center gap-3 bg-white border border-gray-100 text-gray-700 py-3 rounded-2xl hover:bg-gray-50 transition-all shadow-sm active:scale-95">
                  <Facebook className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-bold">Facebook</span>
                </button>
              </div>
            </div>

            <p className="mt-12 text-center text-sm text-gray-500 font-medium">
              <span className="designer-footer-text text-gray-400">
                {t("no_account")}{" "}
              </span>
              <Link
                to="/register"
                className="designer-footer-text text-green-600 hover:underline ml-1"
              >
                {t("register")}
              </Link>
            </p>
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
