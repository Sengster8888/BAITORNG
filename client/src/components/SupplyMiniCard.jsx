import React from 'react';
import { Link } from 'react-router';
import { Package, MapPin, ArrowRight, Tag } from 'lucide-react';
import { useLanguage } from '../features/profile/LanguageContext';

export const SupplyMiniCard = ({ match }) => {
  const { t } = useLanguage();
  
  // Format for title: Category — Variety
  const displayTitle = `${t(match.category || 'other')} — ${match.variety || '...'}`;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm transition-all group relative overflow-hidden max-w-[650px] mx-auto w-full">
      <div className="flex gap-6 relative z-10 items-center">
        {/* Visual Section */}
        <Link to={`/listing/${match.id}`} className="w-28 h-32 sm:w-36 sm:h-40 rounded-2xl overflow-hidden shrink-0 shadow-sm flex items-center justify-center bg-gray-50 group-hover:scale-[1.02] transition-transform duration-500 border border-white relative">
          {/* Role Tag */}
          <div className={`absolute top-0 left-0 px-3 py-1.5 z-20 rounded-br-xl text-[10px] font-black uppercase text-white shadow-sm font-body ${
            match.seller?.role === 'middleman' ? 'bg-[#f64900]' : match.seller?.role === 'buyer' ? 'bg-yellow-400' : 'bg-[#00a73d]'
          }`}>
            {t(match.seller?.role || 'farmer')}
          </div>

          {match.image ? (
            <img 
              src={match.image} 
              alt={match.variety} 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
          ) : (
            <div className="relative flex items-center justify-center w-full h-full bg-gradient-to-br from-green-50 via-white to-emerald-50">
              <div className="absolute inset-0 bg-green-200/20 blur-xl rounded-full scale-75"></div>
              <Tag className="relative w-14 h-14 text-green-600 drop-shadow-sm" />
            </div>
          )}
        </Link>
        
        {/* Content Section */}
        <div className="flex-1 min-w-0 flex flex-col pt-1">
          <div className="mb-4">
            <Link to={`/listing/${match.id}`} className="block group/text">
              <h3 className="text-lg font-black font-body text-gray-900 leading-tight truncate mb-1.5 group-hover:text-green-600 transition-colors">
                {displayTitle}
              </h3>
              
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl font-black font-body leading-none text-green-600">
                  {match.price}
                </span>
                <span className="text-gray-400 text-xs font-black font-body tracking-tight uppercase">៛ / {match.unit}</span>
              </div>
            </Link>
          </div>

          <div className="h-px bg-gray-100 w-full mb-4" />

          <div className="flex items-center justify-between gap-4">
            <Link to="#" className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-black shadow-sm transition-transform group-hover:scale-110 bg-green-100 text-green-600 shrink-0 overflow-hidden">
                {match.seller?.avatar ? (
                  <img src={match.seller.avatar} className="w-full h-full object-cover" alt="" />
                ) : (
                  match.seller?.name?.charAt(0) || 'ក'
                )}
              </div>
              <h4 className="text-[13px] font-bold font-body text-gray-900 truncate tracking-tight">
                {match.seller?.name}
              </h4>
            </Link>

            <Link 
              to={`/listing/${match.id}`}
              className="hidden sm:flex h-10 px-4 rounded-xl bg-green-600 text-white items-center justify-center gap-1.5 text-[13px] font-black font-body active:scale-95 transition-all shadow-md shadow-green-600/10 whitespace-nowrap"
            >
              {t('viewDetails')}
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Badges Section */}
        <div className="hidden xl:flex flex-col gap-3 shrink-0">
          <div className="w-28 h-20 bg-gray-50/50 border border-gray-100 rounded-[1.5rem] flex flex-col items-center justify-center p-2 text-center shadow-inner">
            <Package className="w-6 h-6 text-gray-300 mb-1" />
            <span className="text-[13px] font-black font-body text-gray-900 whitespace-nowrap">{match.quantityAvailable} {match.unit}</span>
          </div>
          <div className="w-28 h-20 bg-gray-50/50 border border-gray-100 rounded-[1.5rem] flex flex-col items-center justify-center p-2 text-center shadow-inner">
            <MapPin className="w-6 h-6 text-gray-300 mb-1" />
            <span className="text-[13px] font-black font-body text-gray-900 whitespace-nowrap truncate w-full">{t(match.location)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
