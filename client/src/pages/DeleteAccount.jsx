import { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, Trash2, CheckCircle2, ShieldAlert, ChevronRight } from "lucide-react";
import { useLanguage } from "../features/profile/LanguageContext";

const DELETE_REASONS = [
  "reason_another_account",
  "reason_privacy",
  "reason_notifications",
  "reason_technical",
  "reason_other"
];

export function DeleteAccount() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [isSuccess, setIsSuccess] = useState(false);
  const [selectedReason, setSelectedReason] = useState("");
  const [otherReason, setOtherReason] = useState("");
  const [password, setPassword] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleDelete = (e) => {
    e.preventDefault();
    if (!confirmDelete) return;
    
    setIsSuccess(true);
    setTimeout(() => {
      navigate("/");
    }, 2500);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center font-body animate-in fade-in zoom-in duration-300">
        <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 className="w-10 h-10 text-red-600" />
        </div>
        <h2 className="text-2xl font-black text-gray-900 mb-2">
          {t("deleteSuccess")}
        </h2>
        <p className="text-gray-500 font-medium">
          {t("redirecting")}
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
        <h1 className="text-[17px] font-bold text-gray-900">{t("deleteAccount")}</h1>
      </div>

      <div className="flex-1 max-w-2xl mx-auto w-full sm:px-4 sm:py-12">
        {/* Desktop Header */}
        <div className="hidden sm:flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate("/settings")}
            className="w-11 h-11 rounded-2xl bg-white shadow-sm border border-gray-100 flex items-center justify-center text-gray-500 hover:text-red-600 transition-all hover:scale-110"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">{t("deleteAccount")}</h1>
        </div>

        <div className="bg-white sm:rounded-[2.5rem] sm:shadow-2xl sm:shadow-red-900/5 sm:border sm:border-gray-100 p-6 sm:p-10 space-y-10">
          {/* Warning Banner */}
          <div className="bg-red-50 rounded-3xl p-6 flex items-start gap-4">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-red-600 shadow-sm shrink-0">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-black text-red-900 mb-1">{t("seriousWarning")}</h3>
              <p className="text-red-700/70 text-sm font-medium leading-relaxed">
                {t("delete_warning_desc")}
              </p>
            </div>
          </div>

          <form onSubmit={handleDelete} className="space-y-8">
            {/* Why Delete - Tick Options */}
            <div className="space-y-4">
              <label className="text-[14px] font-bold text-gray-700 ml-1">
                {t("whyDelete")}
              </label>
              <div className="grid grid-cols-1 gap-3">
                {DELETE_REASONS.map((reasonKey) => (
                  <button
                    key={reasonKey}
                    type="button"
                    onClick={() => setSelectedReason(reasonKey)}
                    className={`flex items-center gap-4 p-4 rounded-2xl border-2 transition-all ${
                      selectedReason === reasonKey 
                        ? "border-red-500 bg-red-50/30 ring-4 ring-red-500/5" 
                        : "border-gray-50 bg-gray-50/50 hover:border-gray-200"
                    }`}
                  >
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                      selectedReason === reasonKey ? "border-red-500 bg-red-500" : "border-gray-300 bg-white"
                    }`}>
                      {selectedReason === reasonKey && <div className="w-2 h-2 bg-white rounded-full" />}
                    </div>
                    <span className={`font-bold text-sm ${selectedReason === reasonKey ? "text-red-700" : "text-gray-600"}`}>
                      {t(reasonKey)}
                    </span>
                  </button>
                ))}
              </div>

              {/* Conditional "Other" Box */}
              {selectedReason === "reason_other" && (
                <div className="pt-2 animate-in slide-in-from-top-4 duration-300">
                  <textarea
                    value={otherReason}
                    onChange={(e) => setOtherReason(e.target.value)}
                    className="w-full min-h-[120px] bg-gray-50 border-2 border-gray-50 rounded-2xl p-5 text-gray-900 font-medium focus:bg-white focus:border-red-500 transition-all outline-none resize-none"
                    placeholder={t("delete_placeholder")}
                  />
                </div>
              )}
            </div>

            {/* Mandatory Checkbox */}
            <label className="flex items-center gap-3 p-4 rounded-2xl bg-gray-50/50 border-2 border-transparent hover:border-red-100 transition-all cursor-pointer group">
              <input
                type="checkbox"
                checked={confirmDelete}
                onChange={(e) => setConfirmDelete(e.target.checked)}
                className="w-5 h-5 rounded-lg border-2 border-gray-300 text-red-600 focus:ring-red-500 cursor-pointer"
              />
              <span className="text-sm font-bold text-gray-600 group-hover:text-red-700 transition-colors">
                {t("confirmDeleteCheckbox")}
              </span>
            </label>

            <div className="space-y-6 pt-4 border-t border-gray-100">
              {/* Password Final Shield */}
              <div className="space-y-2">
                <label className="text-[14px] font-bold text-gray-700 ml-1">
                  {t("confirmWithPassword")}
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-14 bg-gray-50 border-2 border-gray-50 rounded-2xl px-5 text-gray-900 font-bold focus:bg-white focus:border-red-500 transition-all outline-none"
                  placeholder="••••••••"
                  required
                />
                <div className="flex justify-end px-1">
                  <button
                    type="button"
                    onClick={() => navigate("/forgot-password")}
                    className="text-[13px] font-bold text-gray-400 hover:text-green-600 transition-colors"
                  >
                    {t("forgot_password_link")}
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <button
                  type="submit"
                  disabled={!confirmDelete}
                  className={`w-full h-14 font-black rounded-2xl transition-all flex items-center justify-center gap-2 ${
                    confirmDelete 
                      ? "bg-red-600 text-white hover:bg-red-700 active:scale-[0.98]" 
                      : "bg-gray-100 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  <Trash2 className="w-5 h-5" />
                  {t("permanentlyDelete")}
                </button>
                <button
                  type="button"
                  onClick={() => navigate("/settings")}
                  className="w-full h-14 bg-white text-gray-500 font-black rounded-2xl border border-gray-100 hover:bg-gray-50 transition-all"
                >
                  {t("keepAccount")}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
