import { Home, Plus, User, Bell, Handshake } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router";
import { useLanguage } from "../features/profile/LanguageContext";
import { useAuth } from "../features/auth/AuthContext";

export function MobileBottomNav({ onOpenPostModal }) {
  const { t } = useLanguage();
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const handleMatchingClick = (e) => {
    if (!isLoggedIn) {
      e.preventDefault();
      alert(t('loginToProceed'));
      navigate("/login");
    }
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
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-border z-50">
      <div className="flex items-center justify-around h-16 px-1 font-body">
        <Link
          to="/"
          className={`flex flex-col items-center gap-1 transition-colors flex-1 ${isActive('/') ? 'text-green-600' : 'text-gray-500'}`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] font-bold">{t("home")}</span>
        </Link>

        <Link
          to="/notifications"
          className={`flex flex-col items-center gap-1 transition-colors flex-1 ${isActive('/notifications') ? 'text-green-600' : 'text-gray-500'}`}
        >
          <Bell className="w-5 h-5" />
          <span className="text-[10px] font-bold">{t("notifications")}</span>
        </Link>

        <button
          onClick={handlePostClick}
          className="flex flex-col items-center gap-1 -mt-8 flex-1"
        >
          <div className="w-12 h-12 bg-green-600 rounded-full border-4 border-white flex items-center justify-center shadow-lg active:scale-90 transition-transform">
            <Plus className="w-6 h-6 text-white" />
          </div>
          <span className="text-[10px] text-green-600 font-bold">
            {t("sellProduce")}
          </span>
        </button>

        <Link
          to="/matching"
          onClick={handleMatchingClick}
          className={`flex flex-col items-center gap-1 transition-colors flex-1 ${isActive('/matching') ? 'text-green-600' : 'text-gray-500'}`}
        >
          <Handshake className="w-5 h-5" />
          <span className="text-[10px] font-bold">{t("matching")}</span>
        </Link>

        <Link
          to="/login"
          className={`flex flex-col items-center gap-1 transition-colors flex-1 ${isActive('/login') || isActive('/profile') ? 'text-green-600' : 'text-gray-500'}`}
        >
          <User className="w-5 h-5" />
          <span className="text-[10px] font-bold">{t("account")}</span>
        </Link>
      </div>
    </nav>
  );
}
