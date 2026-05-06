import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router";
import { ArrowLeft, Camera, ChevronDown } from "lucide-react";
import { useLanguage } from "../features/profile/LanguageContext";
import { getProfileData, saveProfileData } from "../features/profile/profileData";
import { SocialIcon } from "../components/SocialIcon";

const PROVINCES = [
  "phnomPenh",
  "siemReap",
  "battambang",
  "preahSihanouk",
  "banteayMeanchey",
  "kampongCham",
  "kampongChhnang",
  "kampongSpeu",
  "kampongThom",
  "kampot",
  "kandal",
  "kep",
  "kohKong",
  "kratie",
  "mondulkiri",
  "oddarMeanchey",
  "pailin",
  "preahVihear",
  "preyVeng",
  "pursat",
  "ratanakiri",
  "stungTreng",
  "svayRieng",
  "takeo",
  "tboungKhmum",
];

const ROLE_OPTIONS = ["farmer", "middleman", "buyer"];
const SOCIAL_PLATFORM_OPTIONS = [
  "Facebook",
  "Instagram",
  "Telegram",
  "TikTok",
  "WhatsApp",
  "YouTube",
  "Other",
];

const isValidEmail = (emailValue) => {
  if (!emailValue) {
    return false;
  }
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue);
};

const KHMER_NUMBERS = {
  "០": "0",
  "១": "1",
  "២": "2",
  "៣": "3",
  "៤": "4",
  "៥": "5",
  "៦": "6",
  "៧": "7",
  "៨": "8",
  "៩": "9",
};

const convertKhmerToArabic = (str) => {
  return str.replace(/[០-៩]/g, (match) => KHMER_NUMBERS[match]);
};

const formatPhoneNumber = (value) => {
  if (!value) return "";
  let val = convertKhmerToArabic(value.trim());

  // Handle leading 0
  if (val.startsWith("0")) {
    val = "+855 " + val.substring(1);
  } else if (val.length > 0 && !val.startsWith("+")) {
    val = "+855 " + val;
  }

  // Remove duplicate +855 or clean up spaces
  let digits = val.replace(/\D/g, "");
  if (digits.startsWith("855")) {
    digits = digits.substring(3);
  }

  // Final format: +855 XX XXX XXX
  if (digits.length >= 8) {
    const p1 = digits.substring(0, 2);
    const p2 = digits.substring(2, 5);
    const p3 = digits.substring(5);
    return `+855 ${p1} ${p2} ${p3}`;
  }

  return val.startsWith("+855") ? val : "+855 " + digits;
};

const cleanSocialUrl = (platform, value) => {
  let val = value.trim();
  if (!val) return "";

  // If already a full URL, keep it
  if (val.startsWith("http://") || val.startsWith("https://")) return val;

  const p = platform.toLowerCase();
  const cleanVal = val.replace(/^@/, "");

  if (p === "facebook") return `https://www.facebook.com/${cleanVal}`;
  if (p === "instagram") return `https://www.instagram.com/${cleanVal}`;
  if (p === "telegram") return `https://t.me/${cleanVal}`;
  if (p === "youtube") return `https://www.youtube.com/@${cleanVal}`;
  if (p === "tiktok") return `https://www.tiktok.com/@${cleanVal}`;
  if (p === "whatsapp") return `https://wa.me/855${cleanVal.replace(/^0/, "")}`;

  return val;
};

const EXPERIENCE_OPTIONS = ["lessThan1", "1to3", "3to5", "5to10", "over10"];

export function EditProfile() {
  const { language, t } = useLanguage();
  const navigate = useNavigate();
  const initialProfileData = getProfileData();
  const fileInputRef = useRef(null);
  const fullNameRef = useRef(null);
  const primaryPhoneRef = useRef(null);
  const roleRef = useRef(null);
  const provinceRef = useRef(null);
  const experienceRef = useRef(null);
  const [errors, setErrors] = useState({
    fullName: false,
    primaryPhone: false,
    role: false,
    province: false,
    experience: false,
  });

  const initialAdditionalPhones = Array.isArray(
    initialProfileData.additionalPhones,
  )
    ? initialProfileData.additionalPhones
    : initialProfileData.additionalPhone
      ? [initialProfileData.additionalPhone]
      : [];

  const initialSocialLinks = Array.isArray(initialProfileData.socialLinks)
    ? initialProfileData.socialLinks
    : [];

  if (initialSocialLinks.length === 0 && initialProfileData.facebookLink) {
    initialSocialLinks.push({
      platform: "Facebook",
      url: initialProfileData.facebookLink,
    });
  }

  if (initialSocialLinks.length === 0 && initialProfileData.telegramUsername) {
    initialSocialLinks.push({
      platform: "Telegram",
      url: initialProfileData.telegramUsername,
    });
  }

  const [formData, setFormData] = useState({
    ...initialProfileData,
    role: initialProfileData.role?.toLowerCase() || "",
    additionalPhones: initialAdditionalPhones,
    socialLinks:
      initialSocialLinks.length > 0
        ? initialSocialLinks
        : [{ platform: "Facebook", url: "" }],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    let finalValue = value;
    if (name === "primaryPhone") {
      finalValue = value.replace(/\D/g, "");
    }
    setFormData((prev) => ({ ...prev, [name]: finalValue }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: false }));
    }
  };

  const handleImageSelect = (event) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setFormData((prev) => ({ ...prev, profilePicture: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleAdditionalPhoneChange = (index, value) => {
    const numericValue = value.replace(/\D/g, "");
    setFormData((prev) => ({
      ...prev,
      additionalPhones: prev.additionalPhones.map((phoneValue, phoneIndex) =>
        phoneIndex === index ? numericValue : phoneValue,
      ),
    }));
  };

  const addAdditionalPhone = () => {
    setFormData((prev) => {
      if (prev.additionalPhones.length >= 2) return prev; // max 2 additional + 1 primary = 3 total
      return {
        ...prev,
        additionalPhones: [...prev.additionalPhones, ""],
      };
    });
  };

  const removeAdditionalPhone = (index) => {
    setFormData((prev) => ({
      ...prev,
      additionalPhones: prev.additionalPhones.filter(
        (_, phoneIndex) => phoneIndex !== index,
      ),
    }));
  };

  const handleAdditionalPhoneBlur = (index) => {
    setFormData((prev) => ({
      ...prev,
      additionalPhones: prev.additionalPhones.map((phone, i) =>
        i === index ? formatPhoneNumber(phone ?? "") : phone,
      ),
    }));
  };

  const handlePrimaryPhoneBlur = () => {
    setFormData((prev) => ({
      ...prev,
      primaryPhone: formatPhoneNumber(prev.primaryPhone ?? ""),
    }));
  };

  const handleSocialLinkChange = (index, key, value) => {
    setFormData((prev) => ({
      ...prev,
      socialLinks: prev.socialLinks.map((socialLink, socialIndex) =>
        socialIndex === index ? { ...socialLink, [key]: value } : socialLink,
      ),
    }));
  };

  const addSocialLink = () => {
    setFormData((prev) => {
      if (prev.socialLinks.length >= 4) return prev;
      return {
        ...prev,
        socialLinks: [...prev.socialLinks, { platform: "Facebook", url: "" }],
      };
    });
  };

  const removeSocialLink = (index) => {
    setFormData((prev) => ({
      ...prev,
      socialLinks: prev.socialLinks.filter(
        (_, socialIndex) => socialIndex !== index,
      ),
    }));
  };

  const handleSocialLinkBlur = (index) => {
    setFormData((prev) => {
      const socialLink = prev.socialLinks[index];
      if (!socialLink) {
        return prev;
      }

      const formattedUrl = cleanSocialUrl(socialLink.platform, socialLink.url);

      return {
        ...prev,
        socialLinks: prev.socialLinks.map((item, socialIndex) =>
          socialIndex === index ? { ...item, url: formattedUrl } : item,
        ),
      };
    });
  };

  const getSocialUrlPlaceholder = (platform) => {
    if (platform === "Telegram") {
      return "username or @username";
    }
    return "https://";
  };

  const handleSave = () => {
    // 1. Validation for Required Fields
    const isNameEmpty = !formData.fullName || formData.fullName.trim() === "";
    const isRoleEmpty = !formData.role || formData.role.trim() === "";
    const isProvinceEmpty =
      !formData.province || formData.province.trim() === "";
    const isPrimaryPhoneEmpty =
      !formData.primaryPhone || formData.primaryPhone.trim() === "";

    setErrors({
      fullName: isNameEmpty,
      role: isRoleEmpty,
      province: isProvinceEmpty,
      primaryPhone: isPrimaryPhoneEmpty,
    });

    if (isNameEmpty) {
      fullNameRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      fullNameRef.current?.focus();
      return;
    }

    if (isRoleEmpty) {
      roleRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      roleRef.current?.focus();
      return;
    }

    if (isProvinceEmpty) {
      provinceRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      provinceRef.current?.focus();
      return;
    }

    if (isPrimaryPhoneEmpty) {
      primaryPhoneRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      primaryPhoneRef.current?.focus();
      return;
    }

    // 2. Clean up empty additional phones and social links
    const cleanAdditionalPhones = formData.additionalPhones.filter(
      (phone) => phone && phone.trim() !== "",
    );
    const cleanSocialLinks = formData.socialLinks.filter(
      (link) => link.url && link.url.trim() !== "",
    );

    const firstFacebook = cleanSocialLinks.find(
      (socialLink) => socialLink.platform === "Facebook" && socialLink.url,
    );
    const firstTelegram = cleanSocialLinks.find(
      (socialLink) => socialLink.platform === "Telegram" && socialLink.url,
    );

    saveProfileData({
      ...formData,
      additionalPhones: cleanAdditionalPhones,
      socialLinks: cleanSocialLinks,
      additionalPhone: cleanAdditionalPhones[0] || "",
      facebookLink: firstFacebook?.url || "",
      telegramUsername: firstTelegram?.url || "",
    });
    navigate("/settings");
  };

  const title = language === "en" ? "Edit Profile" : "កែប្រែប្រវត្តិរូប";
  const provinceLabel = language === "en" ? "Province" : "ខេត្ត";
  const detailedLocationLabel =
    language === "en"
      ? "Detailed Location (optional)"
      : "ទីតាំងលម្អិត (ជាជម្រើស)";
  const experienceLabel =
    language === "en" ? "Experience (years)" : "បទពិសោធន៍ (ឆ្នាំ)";
  const fullNameLabel = language === "en" ? "Full Name" : "ឈ្មោះពេញ";
  const usernameLabel = language === "en" ? "Username" : "ឈ្មោះអ្នកប្រើប្រាស់";
  const roleLabel = language === "en" ? "Role" : "តួនាទី";
  const emailLabel =
    language === "en" ? "Email (optional)" : "អ៊ីមែល (ជាជម្រើស)";
  const profilePictureLabel =
    language === "en" ? "Profile Picture" : "រូបប្រវត្តិរូប";
  const contactTitle = language === "en" ? "Contact" : "ទំនាក់ទំនង";
  const profileTitle = language === "en" ? "Profile" : "ព័ត៌មានប្រវត្តិរូប";
  const locationTitle = language === "en" ? "Location" : "ទីតាំង";
  const experienceTitle = language === "en" ? "Experience" : "បទពិសោធន៍";
  const primaryPhoneLabel =
    language === "en" ? "Primary Phone" : "លេខទូរស័ព្ទចម្បង";
  const additionalPhoneLabel =
    language === "en" ? "Additional Phone" : "លេខទូរស័ព្ទបន្ថែម (ជាជម្រើស)";
  const addPhoneText =
    language === "en" ? "+ Add phone number" : "+ បន្ថែមលេខទូរស័ព្ទ";
  const socialMediaLabel =
    language === "en" ? "Social Media Links" : "តំណបណ្តាញសង្គម";
  const socialPlatformLabel = language === "en" ? "Platform" : "ប្រភេទបណ្តាញ";
  const socialUrlLabel = language === "en" ? "Link URL" : "តំណ URL";
  const addSocialText =
    language === "en" ? "+ Add social link" : "+ បន្ថែមតំណបណ្តាញ";
  const saveText = language === "en" ? "Save Changes" : "រក្សាទុកការកែប្រែ";
  const cancelText = language === "en" ? "Cancel" : "បោះបង់";
  const notAddedText = language === "en" ? "Not added" : "មិនទាន់បញ្ចូល";
  const emailSuccessText = language === "en" ? "Success" : "បានត្រឹមត្រូវ";
  const emailInvalidText =
    language === "en" ? "Invalid email format" : "ទម្រង់អ៊ីមែលមិនត្រឹមត្រូវ";
  const detailedLocationPlaceholder =
    language === "en"
      ? "e.g. #123, St. 456, Sangkat..."
      : "ឧទាហរណ៍៖ លេខផ្ទះ ១២៣, ផ្លូវ ៤៥៦, សង្កាត់...";
  const experiencePlaceholder = language === "en" ? "e.g. 5" : "ឧទាហរណ៍៖ ៥";

  const emailStatus = formData.email
    ? isValidEmail(formData.email)
      ? "valid"
      : "invalid"
    : "empty";

  return (
    <div className="min-h-screen bg-white sm:bg-gray-50 flex flex-col font-body">
      {/* Mobile Top Bar */}
      <div className="sm:hidden sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 px-4 h-14 flex items-center gap-4">
        <Link to="/settings" className="p-2 -ml-2 text-gray-900">
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-[17px] font-bold text-gray-900">{title}</h1>
      </div>

      <div className="flex-1 max-w-2xl mx-auto w-full sm:px-4 sm:py-8 lg:py-12">
        {/* Desktop Title & Back Button */}
        <div className="hidden sm:flex items-center gap-4 mb-8">
          <Link
            to="/settings"
            className="w-11 h-11 rounded-2xl bg-white shadow-sm border border-gray-100 flex items-center justify-center text-gray-500 hover:text-green-600 transition-all hover:scale-110"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">
            {title}
          </h1>
        </div>

        <div className="space-y-0 sm:space-y-6 divide-y divide-gray-100 sm:divide-y-0">
          {/* Section: Profile Info */}
          <div className="bg-white sm:rounded-[2rem] sm:shadow-xl sm:shadow-green-900/5 sm:border sm:border-gray-100 p-6 sm:p-8 space-y-6">
            <h2 className="text-base font-bold text-gray-900">
              {profileTitle}
            </h2>

            <div className="flex flex-col items-center justify-center space-y-4 py-2">
              <div className="relative group">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-32 h-32 rounded-full bg-gray-50 border-2 border-dashed border-gray-200 flex items-center justify-center text-gray-400 overflow-hidden transition-all group-hover:border-green-500 group-hover:bg-green-50"
                >
                  {formData.profilePicture ? (
                    <img
                      src={formData.profilePicture}
                      alt={formData.fullName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Camera className="w-8 h-8" />
                  )}
                </button>
                <div className="absolute bottom-1 right-1 w-8 h-8 bg-green-600 rounded-full border-2 border-white flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform pointer-events-none">
                  <Camera className="w-4 h-4 text-white" />
                </div>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageSelect}
                className="hidden"
              />
              <p className="text-base font-bold text-gray-700">
                {profilePictureLabel}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6">
              <div className="space-y-2">
                <label className="text-sm text-gray-500">{fullNameLabel}</label>
                <input
                  ref={fullNameRef}
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={`w-full h-14 rounded-2xl border ${errors.fullName ? "border-red-500 bg-red-50/50 ring-4 ring-red-500/5" : "border-gray-100 bg-gray-50/50"} px-5 text-gray-900 outline-none focus:ring-4 focus:ring-green-500/10 focus:border-green-500 transition-all font-medium`}
                />
                {errors.fullName && (
                  <p className="text-xs text-red-500 font-bold ml-1 animate-in fade-in slide-in-from-top-1">
                    {language === "en"
                      ? "Full Name is required"
                      : "សូមបំពេញឈ្មោះពេញរបស់អ្នក"}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm text-gray-500">{usernameLabel}</label>
                <div className="relative">
                  <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 font-bold pointer-events-none">
                    @
                  </span>
                  <input
                    type="text"
                    name="username"
                    value={formData.username?.replace("@", "") || ""}
                    onChange={(e) => {
                      const val = e.target.value
                        .replace("@", "")
                        .replace(/\s/g, "")
                        .toLowerCase();
                      setFormData((prev) => ({
                        ...prev,
                        username: val ? `@${val}` : "",
                      }));
                    }}
                    placeholder="username"
                    className="w-full h-14 rounded-2xl border border-gray-100 bg-gray-50/50 pl-10 pr-5 text-gray-900 outline-none focus:ring-4 focus:ring-green-500/10 focus:border-green-500 transition-all font-medium"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm text-gray-500">{roleLabel}</label>
                <div className="relative group">
                  <select
                    ref={roleRef}
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className={`w-full h-14 rounded-2xl border ${errors.role ? "border-red-500 bg-red-50/50" : "border-gray-100 bg-gray-50/50"} px-5 pr-12 text-gray-900 outline-none focus:ring-4 focus:ring-green-500/10 focus:border-green-500 appearance-none transition-all font-medium`}
                  >
                    <option value="">
                      {language === "en" ? "Select Role" : "ជ្រើសរើសតួនាទី"}
                    </option>
                    {ROLE_OPTIONS.map((roleOption) => (
                      <option key={roleOption} value={roleOption}>
                        {t(roleOption)}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-5 h-5 text-gray-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none transition-colors group-focus-within:text-green-500" />
                </div>
                {errors.role && (
                  <p className="text-xs text-red-500 font-bold ml-1 animate-in fade-in slide-in-from-top-1">
                    {language === "en"
                      ? "Role is required"
                      : "សូមជ្រើសរើសតួនាទីរបស់អ្នក"}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center px-1">
                  <label className="text-sm text-gray-500">{emailLabel}</label>
                  {formData.email && (
                    <span
                      className={`text-[10px] font-bold ${emailStatus === "valid" ? "text-green-600" : "text-red-500"}`}
                    >
                      {emailStatus === "valid"
                        ? "✓ " + emailSuccessText
                        : "! " + emailInvalidText}
                    </span>
                  )}
                </div>
                <div className="relative group">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="example@gmail.com"
                    className={`w-full h-14 rounded-2xl border ${formData.email && emailStatus === "invalid" ? "border-red-200 bg-red-50/30" : "border-gray-100 bg-gray-50/50"} px-5 outline-none focus:ring-4 focus:ring-green-500/10 focus:border-green-500 transition-all font-medium`}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section: Location */}
          <div className="bg-white sm:rounded-[2rem] sm:shadow-xl sm:shadow-green-900/5 sm:border sm:border-gray-100 p-6 sm:p-8 space-y-6">
            <h2 className="text-base font-bold text-gray-900">
              {locationTitle}
            </h2>

            <div className="grid grid-cols-1 gap-6">
              <div className="space-y-2">
                <label className="text-sm text-gray-500">{provinceLabel}</label>
                <div className="relative group">
                  <select
                    ref={provinceRef}
                    name="province"
                    value={formData.province}
                    onChange={handleChange}
                    className={`w-full h-14 rounded-2xl border ${errors.province ? "border-red-500 bg-red-50/50" : "border-gray-100 bg-gray-50/50"} px-5 pr-12 text-gray-900 outline-none focus:ring-4 focus:ring-green-500/10 focus:border-green-500 appearance-none transition-all font-medium`}
                  >
                    <option value="">{t("selectProvince")}</option>
                    {PROVINCES.map((province) => (
                      <option key={province} value={province}>
                        {t(province)}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-5 h-5 text-gray-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none transform group-focus-within:rotate-180 transition-transform" />
                </div>
                {errors.province && (
                  <p className="text-xs text-red-500 font-bold ml-1 animate-in fade-in slide-in-from-top-1">
                    {language === "en"
                      ? "Province is required"
                      : "សូមជ្រើសរើសខេត្តរបស់អ្នក"}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center px-1">
                  <label className="text-sm text-gray-500">
                    {detailedLocationLabel}
                  </label>
                  <span
                    className={`text-[10px] font-bold ${formData.detailedLocation.length >= 30 ? "text-orange-500" : "text-gray-400"}`}
                  >
                    {formData.detailedLocation.length} / 30
                  </span>
                </div>
                <input
                  type="text"
                  name="detailedLocation"
                  maxLength={30}
                  value={formData.detailedLocation}
                  onChange={handleChange}
                  placeholder={detailedLocationPlaceholder}
                  className="w-full h-14 rounded-2xl border border-gray-100 bg-gray-50/50 px-5 text-gray-900 outline-none focus:ring-4 focus:ring-green-500/10 focus:border-green-500 transition-all font-medium"
                />
              </div>
            </div>
          </div>

          {/* Section: Experience */}
          <div className="bg-white sm:rounded-[2rem] sm:shadow-xl sm:shadow-green-900/5 sm:border sm:border-gray-100 p-6 sm:p-8 space-y-6">
            <h2 className="text-base font-bold text-gray-900">
              {experienceTitle}
            </h2>
            <div className="space-y-2">
              <label className="text-sm text-gray-500">{experienceLabel}</label>
              <div className="relative group">
                <select
                  ref={experienceRef}
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  className={`w-full h-14 rounded-2xl border border-gray-100 bg-gray-50/50 px-5 pr-12 text-gray-900 outline-none focus:ring-4 focus:ring-green-500/10 focus:border-green-500 appearance-none transition-all font-medium`}
                >
                  <option value="">{t("selectExperience")}</option>
                  {EXPERIENCE_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {t(opt)}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-5 h-5 text-gray-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none transform group-focus-within:rotate-180 transition-transform" />
              </div>
            </div>
          </div>

          {/* Section: Contact */}
          <div className="bg-white sm:rounded-[2rem] sm:shadow-xl sm:shadow-green-900/5 sm:border sm:border-gray-100 p-6 sm:p-8 space-y-8">
            <h2 className="text-base font-bold text-gray-900">
              {contactTitle}
            </h2>

            <div className="space-y-6">
              {/* Primary Phone */}
              <div className="space-y-2">
                <div className="flex justify-between items-center px-1">
                  <label className="text-sm text-gray-500">
                    {primaryPhoneLabel}
                  </label>
                  <span className="text-[10px] font-bold text-green-600">
                    {language === "en" ? "✓ Verified" : "✓ បានផ្ទៀងផ្ទាត់"}
                  </span>
                </div>
                <input
                  ref={primaryPhoneRef}
                  type="text"
                  name="primaryPhone"
                  value={formatPhoneNumber(formData.primaryPhone)}
                  readOnly
                  className="w-full h-14 rounded-2xl border border-gray-100 bg-gray-50/50 px-5 text-gray-500 cursor-not-allowed font-semibold text-[15px]"
                />
                <p className="text-[10px] text-gray-400 font-bold px-1 italic opacity-60">
                  {language === "en"
                    ? "* Change primary number in Settings"
                    : "* ផ្លាស់ប្តូរលេខចម្បងរបស់អ្នកនៅក្នុងការកំណត់"}
                </p>
              </div>

              {/* Additional Phones */}
              {formData.additionalPhones.map((phoneValue, phoneIndex) => (
                <div
                  key={`additional-phone-${phoneIndex}`}
                  className="space-y-2"
                >
                  <label className="text-sm text-gray-500">
                    {additionalPhoneLabel}
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="tel"
                      inputMode="numeric"
                      value={phoneValue}
                      onChange={(e) =>
                        handleAdditionalPhoneChange(phoneIndex, e.target.value)
                      }
                      onBlur={() => handleAdditionalPhoneBlur(phoneIndex)}
                      placeholder={notAddedText}
                      className="flex-1 h-14 rounded-2xl border border-gray-100 bg-white px-5 text-gray-900 outline-none focus:ring-4 focus:ring-green-500/10 focus:border-green-500 transition-all font-medium"
                    />
                    <button
                      type="button"
                      onClick={() => removeAdditionalPhone(phoneIndex)}
                      className="h-14 px-4 rounded-2xl bg-gray-50 text-gray-400 hover:bg-red-50 hover:text-red-500 transition-all font-bold text-xs uppercase tracking-widest"
                    >
                      {language === "en" ? "Del" : "លុប"}
                    </button>
                  </div>
                </div>
              ))}

              {formData.additionalPhones.length < 2 && (
                <button
                  type="button"
                  onClick={addAdditionalPhone}
                  className="w-full h-14 rounded-2xl border-2 border-dashed border-gray-100 text-gray-400 font-black text-[13px] uppercase tracking-widest hover:border-green-200 hover:text-green-600 hover:bg-green-50/30 transition-all"
                >
                  {addPhoneText}
                </button>
              )}

              {/* Social Media */}
              <div className="pt-8 mt-8 border-t border-gray-50 space-y-5">
                <label className="text-sm text-gray-500 font-bold">
                  {socialMediaLabel}
                </label>
                {formData.socialLinks.map((socialLink, socialIndex) => (
                  <div
                    key={`social-link-${socialIndex}`}
                    className="flex flex-col sm:flex-row gap-3 p-4 rounded-[1.5rem] bg-gray-50/50 border border-gray-100 group"
                  >
                    <div className="relative flex-shrink-0 sm:w-48">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                        <SocialIcon
                          platform={socialLink.platform}
                          className="w-5 h-5 flex items-center justify-center grayscale group-focus-within:grayscale-0"
                        />
                      </div>
                      <select
                        value={socialLink.platform}
                        onChange={(e) =>
                          handleSocialLinkChange(
                            socialIndex,
                            "platform",
                            e.target.value,
                          )
                        }
                        className="w-full h-12 rounded-xl bg-white border border-gray-100 pl-11 pr-10 text-[13px] font-bold text-gray-700 outline-none focus:ring-2 focus:ring-green-500/10 appearance-none cursor-pointer"
                      >
                        {SOCIAL_PLATFORM_OPTIONS.map((p) => (
                          <option key={p} value={p}>
                            {p}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                    <div className="flex-1 flex gap-2">
                      <input
                        type="text"
                        value={socialLink.url}
                        onChange={(e) =>
                          handleSocialLinkChange(
                            socialIndex,
                            "url",
                            e.target.value,
                          )
                        }
                        onBlur={() => handleSocialLinkBlur(socialIndex)}
                        placeholder={getSocialUrlPlaceholder(
                          socialLink.platform,
                        )}
                        className="flex-1 h-12 rounded-xl bg-white border border-gray-100 px-4 text-sm font-medium outline-none focus:ring-2 focus:ring-green-500/10"
                      />
                      {formData.socialLinks.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeSocialLink(socialIndex)}
                          className="w-12 h-12 flex items-center justify-center rounded-xl bg-white border border-gray-100 text-gray-300 hover:text-red-500 hover:border-red-100 transition-colors"
                        >
                          <span className="text-lg">×</span>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
                {formData.socialLinks.length < 4 && (
                  <button
                    type="button"
                    onClick={addSocialLink}
                    className="w-full h-14 rounded-2xl border-2 border-dashed border-gray-100 text-gray-400 font-black text-[13px] uppercase tracking-widest hover:border-green-200 hover:text-green-600 hover:bg-green-50/30 transition-all"
                  >
                    {addSocialText}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Global Action Buttons */}
        <div className="p-6 sm:px-0 sm:py-8">
          <button
            type="button"
            onClick={handleSave}
            className="w-full h-16 rounded-3xl bg-green-600 text-white font-black text-xl active:scale-[0.98] transition-all hover:bg-green-700"
          >
            {saveText}
          </button>
        </div>
      </div>
    </div>
  );
}
