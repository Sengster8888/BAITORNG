import { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, Phone, CheckCircle2, ShieldCheck, ChevronRight } from "lucide-react";
import { useLanguage } from "../features/profile/LanguageContext";

export function ChangePhone() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Input Number, 2: OTP
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleNextStep = (e) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else {
      setIsSuccess(true);
      setTimeout(() => {
        navigate("/settings");
      }, 2000);
    }
  };

  const handleOtpChange = (index, value) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value !== "" && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center font-body">
        <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-6 animate-bounce">
          <CheckCircle2 className="w-10 h-10 text-green-600" />
        </div>
        <h2 className="text-2xl font-black text-gray-900 mb-2">
          {t("phoneUpdated")}
        </h2>
        <p className="text-gray-500 font-medium">{t("redirecting")}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white sm:bg-gray-50 flex flex-col font-body">
      {/* Mobile Top Bar */}
      <div className="sm:hidden sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 h-14 px-4 flex items-center gap-4">
        <button
          onClick={() => (step === 1 ? navigate("/settings") : setStep(1))}
          className="p-2 -ml-2 text-gray-900"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-[17px] font-bold text-gray-900">{t("changePhone")}</h1>
      </div>

      <div className="flex-1 max-w-2xl mx-auto w-full sm:px-4 sm:py-12">
        {/* Desktop Header */}
        <div className="hidden sm:flex items-center gap-4 mb-8">
          <button
            onClick={() => (step === 1 ? navigate("/settings") : setStep(1))}
            className="w-11 h-11 rounded-2xl bg-white shadow-sm border border-gray-100 flex items-center justify-center text-gray-500 hover:text-green-600 transition-all hover:scale-110"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">
            {t("changePhone")}
          </h1>
        </div>

        <div className="bg-white sm:rounded-[2.5rem] sm:shadow-2xl sm:shadow-green-900/5 sm:border sm:border-gray-100 p-6 sm:p-10">
          {step === 1 ? (
            <div className="space-y-8">
              <div className="text-center sm:text-left">
                <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center text-green-600 mb-6 mx-auto sm:mx-0">
                  <Phone className="w-7 h-7" />
                </div>
                <h2 className="text-2xl font-black text-gray-900 mb-2">
                  {t("newPhoneNumber")}
                </h2>
                <p className="text-gray-500 font-medium">{t("phoneChangeHint")}</p>
              </div>

              <form onSubmit={handleNextStep} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[14px] font-bold text-gray-700 ml-1">
                    {t("phone")}
                  </label>
                  <div className="flex gap-3">
                    {/* Fixed Cambodia Prefix */}
                    <div className="w-24 h-14 bg-gray-50 border-2 border-gray-50 rounded-2xl flex items-center justify-center font-bold text-gray-900 cursor-default opacity-80">
                      <span>+855</span>
                    </div>
                    <input
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

                <button
                  type="submit"
                  className="w-full h-14 bg-green-600 text-white font-black rounded-2xl hover:bg-green-700 active:scale-[0.98] transition-all flex items-center justify-center"
                >
                  {t("getVerification")}
                </button>
              </form>
            </div>
          ) : (
            <div className="space-y-8">
              <div className="text-center sm:text-left">
                <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 mb-6 mx-auto sm:mx-0">
                  <ShieldCheck className="w-7 h-7" />
                </div>
                <h2 className="text-2xl font-black text-gray-900 mb-2">
                  {t("enterCode")}
                </h2>
                <p className="text-gray-500 font-medium">
                  {t("codeSentTo")}{" "}
                  <span className="text-gray-900 font-bold">
                    +855 {phoneNumber}
                  </span>
                </p>
              </div>

              <form onSubmit={handleNextStep} className="space-y-8">
                <div className="flex justify-between gap-2 max-w-xs mx-auto">
                  {otp.map((digit, idx) => (
                    <input
                      key={idx}
                      id={`otp-${idx}`}
                      type="number"
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

                <div className="text-center">
                  <button
                    type="button"
                    className="text-sm font-bold text-green-600 hover:text-green-700"
                  >
                    {t("resendCode")}
                  </button>
                </div>

                <button
                  type="submit"
                  className="w-full h-14 bg-green-600 text-white font-black rounded-2xl hover:bg-green-700 active:scale-[0.98] transition-all"
                >
                  {t("verifyAndUpdate")}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
