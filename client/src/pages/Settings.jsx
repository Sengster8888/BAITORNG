import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { ChevronRight, ArrowLeft, Shield, Globe, HelpCircle, PhoneCall, Info, LogOut, Trash2, Key, User, Check, X } from "lucide-react";
import { useLanguage } from "../features/profile/LanguageContext";
import { useAuth } from "../features/auth/AuthContext";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { getProfileData } from "../features/profile/profileData";

function SettingsRow({ to, label, value, danger = false, onClick, icon: Icon }) {
  const baseClass = `group w-full flex items-center justify-between px-5 py-4 text-left transition-all active:bg-gray-50 ${
    danger ? "text-red-600" : "text-gray-900"
  }`;

  const iconClass = `w-5 h-5 mr-3 ${danger ? "text-red-500" : "text-gray-400 group-hover:text-green-600"} transition-colors`;

  const content = (
    <div className="flex items-center flex-1 min-w-0">
      {Icon && <Icon className={iconClass} />}
      <span className="font-medium text-gray-900">{label}</span>
    </div>
  );

  const rightElement = (
    <div className="flex items-center gap-2">
      {value && <span className="text-sm font-bold text-gray-400">{value}</span>}
      <ChevronRight
        className={`w-4 h-4 shrink-0 ${danger ? "text-red-400" : "text-gray-300 group-hover:text-green-500"} transition-colors`}
      />
    </div>
  );

  if (to) {
    return (
      <Link to={to} className={baseClass}>
        {content}
        {rightElement}
      </Link>
    );
  }

  return (
    <button type="button" className={baseClass} onClick={onClick}>
      {content}
      {rightElement}
    </button>
  );
}

function SettingsSection({ title, children }) {
  return (
    <div className="space-y-2 py-4 sm:py-0">
      <h2 className="text-sm font-semibold text-gray-500 px-5 sm:px-0 mb-2">
        {title}
      </h2>
      <div className="bg-white sm:rounded-3xl sm:shadow-xl sm:shadow-green-900/5 sm:border sm:border-gray-100 divide-y divide-gray-50 overflow-hidden text-sm">
        {children}
      </div>
    </div>
  );
}

export function Settings() {
  const { language, setLanguage, t } = useLanguage();
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const profileData = getProfileData();
  const [showLanguageModal, setShowLanguageModal] = useState(false);

  const handleSettingsClick = (path) => {
    if (!isLoggedIn && (path === "/edit-profile" || path?.includes("/settings/"))) {
      alert("You need to log in to continue");
      navigate("/login");
      return;
    }
    if (path) {
      navigate(path);
    }
  };

  const labels = {
    settings: language === "en" ? "Settings" : "ការកំណត់",
    account: language === "en" ? "Account" : "គណនី",
    security: language === "en" ? "Security" : "សុវត្ថិភាព",
    preferences: language === "en" ? "Preferences" : "ចំណូលចិត្ត",
    support: language === "en" ? "Support" : "ជំនួយ",
    about: language === "en" ? "About" : "អំពីកម្មវិធី",
    signOut: language === "en" ? "Sign Out" : "ចាកចេញ",
    editProfile: language === "en" ? "Edit Profile" : "កែប្រែប្រវត្តិរូប",
    changePassword: language === "en" ? "Change Password" : "ប្តូរពាក្យសម្ងាត់",
    changePhone: language === "en" ? "Change Phone Number" : "ប្តូរលេខទូរស័ព្ទ",
    deleteAccount: language === "en" ? "Delete Account" : "លុបគណនី",
    language: language === "en" ? "Language" : "ភាសា",
    helpFaq: language === "en" ? "Help / FAQ" : "ជំនួយ / សំណួរញឹកញាប់",
    contactSupport: language === "en" ? "Contact Support" : "ទាក់ទងជំនួយ",
    aboutApp: language === "en" ? "About App" : "អំពីកម្មវិធី",
    subtitle: language === "en" ? "Manage your identity" : "គ្រប់គ្រងអត្តសញ្ញាណរបស់អ្នក",
    currentLang: language === "en" ? "English" : "ភាសាខ្មែរ",
    selectLanguage: language === "en" ? "Select Language" : "ជ្រើសរើសភាសា",
  };

  return (
    <div className="min-h-screen bg-white sm:bg-gray-50 flex flex-col font-body">
      {/* Mobile Top Bar */}
      <div className="sm:hidden sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 h-14 px-4 flex items-center gap-4">
        <Link to="/profile" className="p-2 -ml-2 text-gray-900">
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-[17px] font-bold text-gray-900">{labels.settings}</h1>
      </div>

      <div className="flex-1 max-w-2xl mx-auto w-full sm:px-4 sm:py-12 relative">
        {/* Desktop Header */}
        <div className="hidden sm:flex items-center gap-4 mb-8">
          <Link
            to="/profile"
            className="w-11 h-11 rounded-2xl bg-white shadow-sm border border-gray-100 flex items-center justify-center text-gray-500 hover:text-green-600 transition-all hover:scale-110"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">{labels.settings}</h1>
        </div>

        <div className="space-y-2 sm:space-y-8">
          {/* Profile Card */}
          <Link
            to={isLoggedIn ? "/profile" : "/login"}
            onClick={(e) => {
              if (!isLoggedIn) {
                e.preventDefault();
                alert("You need to log in to continue");
                navigate("/login");
              }
            }}
            className="group relative bg-white sm:rounded-[2.5rem] sm:shadow-2xl sm:shadow-green-900/10 sm:border sm:border-white p-5 sm:p-8 flex items-center justify-between transition-all active:bg-gray-50"
          >
            <div className="flex items-center gap-4 min-w-0">
              <div className="relative">
                <img
                  src={profileData.profilePicture}
                  alt={profileData.fullName}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-4 border-green-50 shrink-0 object-cover shadow-sm group-hover:border-green-100 transition-colors"
                />
              </div>
              <div className="min-w-0">
                <p className="text-base font-bold text-gray-900 truncate">
                  {profileData.fullName}
                </p>
                <p className="text-sm text-gray-500 truncate">
                  {labels.subtitle}
                </p>
              </div>
            </div>
            <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-300 group-hover:bg-green-50 group-hover:text-green-600 transition-all">
              <ChevronRight className="w-5 h-5" />
            </div>
          </Link>

          <div className="divide-y divide-gray-100 sm:divide-y-0 sm:space-y-8 pb-32">
            <SettingsSection title={labels.account}>
              <SettingsRow
                to={isLoggedIn ? "/edit-profile" : undefined}
                label={labels.editProfile}
                icon={User}
                onClick={() => handleSettingsClick("/edit-profile")}
              />
            </SettingsSection>

            <SettingsSection title={labels.security}>
              <SettingsRow
                label={labels.changePassword}
                icon={Key}
                onClick={() => handleSettingsClick("/settings/password")}
              />
              <SettingsRow
                label={labels.changePhone}
                icon={Shield}
                onClick={() => handleSettingsClick("/settings/phone")}
              />
              <SettingsRow
                label={labels.deleteAccount}
                icon={Trash2}
                danger
                onClick={() => handleSettingsClick("/settings/delete")}
              />
            </SettingsSection>

            <SettingsSection title={labels.preferences}>
              <SettingsRow
                label={labels.language}
                value={labels.currentLang}
                icon={Globe}
                onClick={() => setShowLanguageModal(true)}
              />
            </SettingsSection>

            <SettingsSection title={labels.support}>
              <SettingsRow
                label={labels.helpFaq}
                icon={HelpCircle}
                onClick={() => handleSettingsClick()}
              />
              <SettingsRow
                label={labels.contactSupport}
                icon={PhoneCall}
                onClick={() => handleSettingsClick()}
              />
            </SettingsSection>

            <SettingsSection title={labels.about}>
              <SettingsRow
                label={labels.aboutApp}
                icon={Info}
                onClick={() => handleSettingsClick()}
              />
            </SettingsSection>

            <div className="bg-white sm:rounded-3xl sm:shadow-sm sm:overflow-hidden py-4 sm:py-0">
              <SettingsRow
                label={labels.signOut}
                icon={LogOut}
                danger
                onClick={() => handleSettingsClick()}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Language Modal */}
      {showLanguageModal && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
          <div 
            className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm"
            onClick={() => setShowLanguageModal(false)}
          ></div>
          
          <div className="relative w-full sm:max-w-md bg-white rounded-t-[2.5rem] sm:rounded-[2.5rem] shadow-2xl p-6 sm:p-8 animate-in slide-in-from-bottom duration-300">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-black text-gray-900">{labels.selectLanguage}</h3>
              <button 
                onClick={() => setShowLanguageModal(false)}
                className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:text-gray-900 transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              {[
                { id: "kh", label: "ភាសាខ្មែរ", sub: "Khmer" },
                { id: "en", label: "English", sub: "English" }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setLanguage(item.id);
                    setShowLanguageModal(false);
                  }}
                  className={`w-full flex items-center justify-between p-5 rounded-2xl border-2 transition-all active:scale-[0.98] ${
                    language === item.id 
                      ? "border-green-600 bg-green-50/50" 
                      : "border-gray-50 bg-gray-50/30 hover:border-gray-100 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex flex-col text-left">
                    <span 
                      className={`text-[19px] leading-tight ${item.id === "kh" ? "font-kantumruy font-black" : "font-black"} ${
                        language === item.id ? "text-green-700" : "text-gray-900"
                      }`}
                    >
                      {item.label}
                    </span>
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-0.5">
                      {item.sub}
                    </span>
                  </div>
                  <div className={`w-10 h-10 rounded-full border-2 overflow-hidden transition-all duration-300 ${
                    language === item.id ? "border-green-600 scale-110 shadow-lg" : "border-gray-100 grayscale-[0.5]"
                  }`}>
                    <img 
                      src={`https://flagcdn.com/w80/${item.id === "kh" ? "kh" : "gb"}.png`} 
                      alt={item.sub}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
