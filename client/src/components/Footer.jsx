import React from 'react';
import { Link } from 'react-router';
import { Mail, Phone, MapPin, ArrowRight, MessageSquare } from 'lucide-react';
import { useLanguage } from '../features/profile/LanguageContext';
import { SocialIcon } from './SocialIcon';

export function Footer({ noMargin = false }) {
  const { t, language } = useLanguage();

  const socialPlatforms = ["facebook", "telegram", "tiktok"];

  return (
    <footer className={`bg-white text-gray-600 ${noMargin ? "" : "mt-16"} pt-16 pb-24 lg:pb-12 font-body border-t border-gray-100`}>
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pb-16">
          
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-6">
            <Link to="/" className="inline-block transition-transform hover:scale-105 active:scale-95">
              <img src="/Logo.svg" alt="BaiTorng" className="h-10 w-auto brightness-0" />
            </Link>
            <p className="text-gray-500 text-base leading-relaxed max-w-sm">
              {t('aboutDesc')}
            </p>
            <div className="flex flex-wrap gap-3">
              {socialPlatforms.map((platform) => (
                <a 
                  key={platform}
                  href="#" 
                  className="w-10 h-10 bg-white border border-gray-100 rounded-xl flex items-center justify-center hover:bg-green-600 hover:border-green-500 hover:text-white hover:shadow-[0_10px_20px_rgba(22,163,74,0.15)] transition-all duration-300 group"
                >
                  <SocialIcon platform={platform} className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h3 className="text-gray-900 font-bold text-lg mb-6">
              {t('quickLinks')}
            </h3>
            <ul className="space-y-4">
              {['aboutUs', 'contact', 'terms', 'privacy'].map((link) => (
                <li key={link}>
                  <Link to="#" className="hover:text-green-600 flex items-center gap-2 group transition-colors text-sm font-medium">
                    <ArrowRight className="w-3 h-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-green-600" />
                    {t(link)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div className="lg:col-span-2">
            <h3 className="text-gray-900 font-bold text-lg mb-6">
              {t('categories')}
            </h3>
            <ul className="space-y-4">
              {['vegetables', 'fruits', 'organicProduce', 'rice'].map((link) => (
                <li key={link}>
                  <Link to="#" className="hover:text-indigo-600 flex items-center gap-2 group transition-colors text-sm font-medium">
                    <ArrowRight className="w-3 h-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-indigo-600" />
                    {t(link)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-4">
            <div className="bg-gray-50 border border-gray-100 rounded-3xl p-6 space-y-6">
              <h3 className="text-gray-900 font-bold text-lg flex items-center gap-2">
                 <MessageSquare className="w-5 h-5 text-green-600" />
                 {t('contactUs')}
              </h3>
              <div className="space-y-4">
                <a href="tel:+85523000000" className="flex items-center gap-4 hover:text-green-600 transition-colors group">
                  <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center border border-gray-100 group-hover:bg-green-600 transition-colors shadow-sm">
                    <Phone className="w-5 h-5 text-green-600 group-hover:text-white" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400">{t('phone') || "Phone"}</p>
                    <p className="text-sm font-bold text-gray-900">+855 23 000 000</p>
                  </div>
                </a>
                <a href="mailto:support@baitorng.com" className="flex items-center gap-4 hover:text-indigo-600 transition-colors group">
                  <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center border border-gray-100 group-hover:bg-indigo-600 transition-colors shadow-sm">
                    <Mail className="w-5 h-5 text-indigo-600 group-hover:text-white" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400">{t('email') || "Email"}</p>
                    <p className="text-sm font-bold text-gray-900">support@baitorng.com</p>
                  </div>
                </a>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center border border-gray-100 shadow-sm">
                    <MapPin className="w-5 h-5 text-gray-400" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400">{t('locationLabel') || "Location"}</p>
                    <p className="text-sm font-bold text-gray-900">{t('phnomPenh')}, Cambodia</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-100 pt-8 mt-4 flex flex-col md:flex-row justify-between items-center gap-4 text-[13px] font-medium tracking-tight">
          <p className="text-gray-400">
            © 2026 BaiTorng. {t('rights')}
          </p>
          <div className="flex gap-8 text-gray-400">
            <Link to="#" className="hover:text-gray-900 transition-colors">{t('terms')}</Link>
            <Link to="#" className="hover:text-gray-900 transition-colors">{t('privacy')}</Link>
            <Link to="#" className="hover:text-gray-900 transition-colors">{t('cookies') || "Cookies"}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
