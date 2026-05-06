import React, { createContext, useContext, useEffect, useState } from "react";
import { translations } from "../../utils/translations";

const LanguageContext = createContext(undefined);

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState("kh");
  const htmlLang = language === "en" ? "en" : "km";

  useEffect(() => {
    document.documentElement.lang = htmlLang;
  }, [htmlLang]);

  const t = (key) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
