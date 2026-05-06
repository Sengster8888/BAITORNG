const PROFILE_STORAGE_KEY = "baitorng_profile_data";

export const DEFAULT_PROFILE_DATA = {
  profilePicture:
    "https://i.pinimg.com/736x/e4/3e/59/e43e595c195096e46a3a34538461bb50.jpg",
  fullName: "IshowSpeed",
  username: "@ishow_speed",
  role: "Farmer",
  email: "ishowspeed@gmail.com",
  province: "",
  detailedLocation: "",
  experience: "",
  primaryPhone: "+855 12 345 678",
  additionalPhone: "",
  additionalPhones: [],
  telegramUsername: "",
  facebookLink: "",
  socialLinks: [],
  followers: 1280,
};

export function getProfileData() {
  if (typeof window === "undefined") {
    return DEFAULT_PROFILE_DATA;
  }

  try {
    const storedData = window.localStorage.getItem(PROFILE_STORAGE_KEY);
    if (!storedData) {
      return DEFAULT_PROFILE_DATA;
    }

    const parsedData = JSON.parse(storedData);
    const mergedData = { ...DEFAULT_PROFILE_DATA, ...parsedData };

    if (!Array.isArray(mergedData.additionalPhones)) {
      mergedData.additionalPhones = mergedData.additionalPhone
        ? [mergedData.additionalPhone]
        : [];
    }

    if (
      !Array.isArray(mergedData.socialLinks) ||
      mergedData.socialLinks.length === 0
    ) {
      const fallbackSocialLinks = [];

      if (mergedData.facebookLink) {
        fallbackSocialLinks.push({
          platform: "Facebook",
          url: mergedData.facebookLink,
        });
      }

      if (mergedData.telegramUsername) {
        fallbackSocialLinks.push({
          platform: "Telegram",
          url: mergedData.telegramUsername,
        });
      }

      mergedData.socialLinks =
        fallbackSocialLinks.length > 0 ? fallbackSocialLinks : [];
    }

    return mergedData;
  } catch {
    return DEFAULT_PROFILE_DATA;
  }
}

export function saveProfileData(profileData) {
  if (typeof window === "undefined") {
    return;
  }

  const mergedData = { ...DEFAULT_PROFILE_DATA, ...profileData };

  if (!Array.isArray(mergedData.additionalPhones)) {
    mergedData.additionalPhones = mergedData.additionalPhone
      ? [mergedData.additionalPhone]
      : [];
  }

  if (
    !Array.isArray(mergedData.socialLinks) ||
    mergedData.socialLinks.length === 0
  ) {
    mergedData.socialLinks = [];
  }

  window.localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(mergedData));
}
