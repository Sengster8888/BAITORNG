import React from 'react';
import { Globe } from "lucide-react";
import facebookIcon from '../assets/icons/social/facebook.png';
import telegramIcon from '../assets/icons/social/telegram.png';
import instagramIcon from '../assets/icons/social/instagram.png';
import tiktokIcon from '../assets/icons/social/tiktok.png';
import whatsappIcon from '../assets/icons/social/whatsapp.png';
import youtubeIcon from '../assets/icons/social/youtube.png';

export const getSocialBrandColor = (platform) => {
  switch (platform?.toLowerCase()) {
    case "facebook":
    case "messenger":
      return "#1877F2";
    case "telegram":
      return "#24A1DE";
    case "whatsapp":
      return "#25D366";
    case "tiktok":
      return "#000000";
    case "instagram":
      return "#E4405F";
    case "youtube":
      return "#FF0000";
    default:
      return "#64748b"; // gray-500
  }
};

export const SocialIcon = ({ platform, className = "w-5 h-5" }) => {
  const getIconImage = () => {
    switch (platform?.toLowerCase()) {
      case "facebook":
      case "messenger":
        return facebookIcon;
      case "telegram":
        return telegramIcon;
      case "instagram":
        return instagramIcon;
      case "youtube":
        return youtubeIcon;
      case "tiktok":
        return tiktokIcon;
      case "whatsapp":
        return whatsappIcon;
      default:
        return null;
    }
  };

  const iconSrc = getIconImage();

  return (
    <div className={`${className} flex items-center justify-center overflow-hidden`}>
      {iconSrc ? (
        <img 
          src={iconSrc} 
          alt={platform} 
          className="w-full h-full object-contain"
        />
      ) : (
        <Globe className="w-full h-full text-gray-400" />
      )}
    </div>
  );
};
