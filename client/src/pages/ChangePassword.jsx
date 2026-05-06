import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { ArrowLeft, Key, Eye, EyeOff, CheckCircle2 } from "lucide-react";
import { useLanguage } from "../features/profile/LanguageContext";

export function ChangePassword() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate success
    setIsSuccess(true);
    setTimeout(() => {
      navigate("/settings");
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center">
        <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-6 animate-bounce">
          <CheckCircle2 className="w-10 h-10 text-green-600" />
        </div>
        <h2 className="text-2xl font-black text-gray-900 mb-2">
          {t("passwordChanged") || "Password Changed Successfully!"}
        </h2>
        <p className="text-gray-500 font-medium">
          {t("redirecting") || "Redirecting you back to settings..."}
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white sm:bg-gray-50 flex flex-col font-body">
      {/* Mobile Top Bar */}
      <div className="sm:hidden sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 h-14 px-4 flex items-center gap-4">
        <button onClick={() => navigate("/settings")} className="p-2 -ml-2 text-gray-900">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-[17px] font-bold text-gray-900">{t("changePassword")}</h1>
      </div>

      <div className="flex-1 max-w-2xl mx-auto w-full sm:px-4 sm:py-12">
        {/* Desktop Header */}
        <div className="hidden sm:flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate("/settings")}
            className="w-11 h-11 rounded-2xl bg-white shadow-sm border border-gray-100 flex items-center justify-center text-gray-500 hover:text-green-600 transition-all hover:scale-110"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">{t("changePassword")}</h1>
        </div>
        
        <div className="bg-white sm:rounded-[2.5rem] sm:shadow-2xl sm:shadow-green-900/5 sm:border sm:border-gray-100 p-6 sm:p-10">
          <div className="mb-8 flex items-center gap-4">
            <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center text-green-600 shrink-0">
              <Key className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-black text-gray-900 leading-tight">{t("updatePassword")}</h2>
              <p className="text-[13px] text-gray-500 font-medium">
                {t("passwordHint")}
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Current Password - Step 1 */}
            <div className="p-4 bg-gray-50/50 rounded-2xl border border-gray-100">
              <label className="text-[14px] font-bold text-gray-700 block mb-2 px-1">
                {t("currentPassword")}
              </label>
              <div className="relative">
                <input
                  type={showCurrent ? "text" : "password"}
                  className="w-full h-11 bg-white border border-gray-200 rounded-xl px-4 pr-10 text-gray-900 font-bold focus:border-green-500 transition-all outline-none text-[15px]"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowCurrent(!showCurrent)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showCurrent ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* New Password Group - Step 2 */}
            <div className="p-4 bg-green-50/30 rounded-2xl border border-green-50 space-y-4">
              <div className="space-y-2">
                <label className="text-[14px] font-bold text-gray-700 block px-1">
                  {t("newPassword")}
                </label>
                <div className="relative">
                  <input
                    type={showNew ? "text" : "password"}
                    className="w-full h-11 bg-white border border-gray-200 rounded-xl px-4 pr-10 text-gray-900 font-bold focus:border-green-500 transition-all outline-none text-[15px]"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowNew(!showNew)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[14px] font-bold text-gray-700 block px-1">
                  {t("confirmNewPassword")}
                </label>
                <div className="relative">
                  <input
                    type={showConfirm ? "text" : "password"}
                    className="w-full h-11 bg-white border border-gray-200 rounded-xl px-4 pr-10 text-gray-900 font-bold focus:border-green-500 transition-all outline-none text-[15px]"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full h-12 bg-green-600 text-white font-black rounded-xl hover:bg-green-700 active:scale-[0.98] transition-all text-[15px]"
              >
                {t("updatePassword")}
              </button>
              <button
                type="button"
                onClick={() => navigate("/forgot-password")}
                className="w-full py-3 text-[13px] font-bold text-gray-400 hover:text-gray-600 transition-colors"
              >
                {t("forgot_password_link")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
