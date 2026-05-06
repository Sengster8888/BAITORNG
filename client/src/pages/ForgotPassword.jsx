import { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, Phone, ShieldCheck, Key, CheckCircle2, ChevronRight, Eye, EyeOff } from "lucide-react";
import { useLanguage } from "../features/profile/LanguageContext";

export function ForgotPassword() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Phone, 2: OTP, 3: New Pass
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleNext = (e) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      setIsSuccess(true);
      setTimeout(() => {
        navigate("/login");
      }, 2500);
    }
  };

  const handleOtpChange = (index, value) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value !== "" && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const goBack = () => {
    if (step === 1) navigate(-1);
    else setStep(step - 1);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center font-body animate-in fade-in zoom-in duration-300">
        <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 className="w-10 h-10 text-green-600" />
        </div>
        <h2 className="text-2xl font-black text-gray-900 mb-2">{t("passwordChanged")}</h2>
        <p className="text-gray-500 font-medium">{t("redirecting_login")}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white sm:bg-gray-50 flex flex-col font-body">
      {/* Mobile Top Bar */}
      <div className="sm:hidden sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 h-14 px-4 flex items-center gap-4">
        <button onClick={goBack} className="p-2 -ml-2 text-gray-900">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-[17px] font-bold text-gray-900">{t("account_recovery")}</h1>
      </div>

      <div className="flex-1 max-w-2xl mx-auto w-full sm:px-4 sm:py-12">
        {/* Desktop Header */}
        <div className="hidden sm:flex items-center gap-4 mb-8">
          <button
            onClick={goBack}
            className="w-11 h-11 rounded-2xl bg-white shadow-sm border border-gray-100 flex items-center justify-center text-gray-500 hover:text-green-600 transition-all hover:scale-110"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">
            {t("account_recovery")}
          </h1>
        </div>

        <div className="bg-white sm:rounded-[2.5rem] sm:shadow-2xl sm:shadow-green-900/5 sm:border sm:border-gray-100 p-6 sm:p-10">
          
          <form onSubmit={handleNext} className="space-y-8">
            {step === 1 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
                <div className="text-center sm:text-left">
                  <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center text-green-600 mb-6 mx-auto sm:mx-0">
                    <Phone className="w-7 h-7" />
                  </div>
                  <h2 className="text-2xl font-black text-gray-900 mb-2">{t("identify_account")}</h2>
                  <p className="text-gray-500 font-medium">{t("recovery_phone_hint")}</p>
                </div>
                <div className="space-y-2">
                  <label className="text-[14px] font-bold text-gray-700 ml-1">{t("phone")}</label>
                  <div className="flex gap-3">
                    <div className="w-24 h-14 bg-gray-50 border-2 border-gray-50 rounded-2xl flex items-center justify-center font-bold text-gray-900">
                      +855
                    </div>
                    <input
                      autoFocus
                      type="tel"
                      inputMode="numeric"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ""))}
                      className="flex-1 h-14 bg-gray-50 border-2 border-gray-50 rounded-2xl px-5 text-gray-900 font-bold focus:bg-white focus:border-green-500 transition-all outline-none"
                      placeholder="012 345 678"
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
                <div className="text-center sm:text-left">
                  <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 mb-6 mx-auto sm:mx-0">
                    <ShieldCheck className="w-7 h-7" />
                  </div>
                  <h2 className="text-2xl font-black text-gray-900 mb-2">{t("enterCode")}</h2>
                  <p className="text-gray-500 font-medium">
                    {t("codeSentTo")} <span className="text-gray-900 font-bold">+855 {phoneNumber}</span>
                  </p>
                </div>
                <div className="flex justify-between gap-2 max-w-xs mx-auto">
                  {otp.map((digit, idx) => (
                    <input
                      key={idx}
                      id={`otp-${idx}`}
                      type="number"
                      autoFocus={idx === 0}
                      value={digit}
                      onChange={(e) => handleOtpChange(idx, e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Backspace" && digit === "" && idx > 0) {
                          const prevInput = document.getElementById(`otp-${idx - 1}`);
                          if (prevInput) prevInput.focus();
                        }
                      }}
                      className="w-12 h-14 bg-gray-50 border-2 border-gray-100 rounded-xl text-center text-xl font-black text-gray-900 focus:bg-white focus:border-green-500 transition-all outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      required
                    />
                  ))}
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
                <div className="text-center sm:text-left">
                  <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-600 mb-6 mx-auto sm:mx-0">
                    <Key className="w-7 h-7" />
                  </div>
                  <h2 className="text-2xl font-black text-gray-900 mb-2">{t("reset_password")}</h2>
                  <p className="text-gray-500 font-medium">{t("new_password_hint")}</p>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[14px] font-bold text-gray-700 ml-1">{t("newPassword")}</label>
                    <div className="relative">
                      <input
                        autoFocus
                        type={showPass ? "text" : "password"}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full h-14 bg-gray-50 border-2 border-gray-50 rounded-2xl px-5 pr-14 text-gray-900 font-bold focus:bg-white focus:border-green-500 transition-all outline-none"
                        placeholder="••••••••"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPass(!showPass)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPass ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[14px] font-bold text-gray-700 ml-1">{t("confirmNewPassword")}</label>
                    <input
                      type={showPass ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full h-14 bg-gray-50 border-2 border-gray-50 rounded-2xl px-5 text-gray-900 font-bold focus:bg-white focus:border-green-500 transition-all outline-none"
                      placeholder="••••••••"
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            <button
              type="submit"
              className="w-full h-14 bg-green-600 text-white font-black rounded-2xl hover:bg-green-700 active:scale-[0.98] transition-all flex items-center justify-center"
            >
              {step === 1 && t("get_code_btn")}
              {step === 2 && t("verify_code_btn")}
              {step === 3 && t("reset_pass_btn")}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
