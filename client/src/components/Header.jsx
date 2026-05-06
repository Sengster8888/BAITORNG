import { User, UserPlus, Plus, Globe, Handshake, Bookmark } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { useLanguage } from "../features/profile/LanguageContext";
import { useAuth } from "../features/auth/AuthContext";

export function Header({ onOpenPostModal, isSticky = true }) {
  const { t, language, setLanguage } = useLanguage();
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const handleMatchingClick = () => {
    if (!isLoggedIn) {
      alert(t('loginToProceed'));
      navigate("/login");
      return;
    }
    navigate("/matching");
  };

  const handlePostClick = () => {
    if (!isLoggedIn) {
      alert(t('loginToProceed'));
      navigate("/login");
      return;
    }
    onOpenPostModal();
  };

  return (
    <header className={`bg-white border-b border-border z-50 font-body ${isSticky ? "sticky top-0" : ""}`}>
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <div className="flex items-center">
              <Link to="/">
                <img src="/Logo.svg" alt="BaiTorng" className="h-8 w-auto" />
              </Link>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <Link
              to="/saved"
              className="flex items-center gap-2 px-4 py-2 text-foreground hover:text-green-600 transition-colors tracking-tight"
            >
              <Bookmark className="w-5 h-5" />
              <span className="font-bold">{t("saved")}</span>
            </Link>

            <button
              onClick={handleMatchingClick}
              className="flex items-center gap-2 px-4 py-2 text-foreground hover:text-green-600 transition-colors tracking-tight"
            >
              <Handshake className="w-5 h-5" />
              <span className="font-bold">{t("matching")}</span>
            </button>
            <Link
              to="/register"
              className="flex items-center gap-2 px-4 py-2 text-foreground hover:text-green-600 transition-colors tracking-tight"
            >
              <UserPlus className="w-5 h-5" />
              <span className="font-bold">{t("register")}</span>
            </Link>
            <Link
              to="/login"
              className="flex items-center gap-2 px-4 py-2 text-foreground hover:text-green-600 transition-colors tracking-tight"
            >
              <User className="w-5 h-5" />
              <span className="font-bold">{t("login")}</span>
            </Link>
            <button
              onClick={handlePostClick}
              className="flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors shadow-md active:scale-95"
            >
              <Plus className="w-5 h-5" />
              <span className="font-bold">{t("sellProduce")}</span>
            </button>
          </div>

          <div className="lg:hidden flex items-center gap-3">
            <Link
              to="/saved"
              className="p-2 text-foreground hover:text-green-600 transition-all active:scale-95"
              title={t("saved")}
            >
              <Bookmark className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
