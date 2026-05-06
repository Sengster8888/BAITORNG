import { Search, MapPin, SlidersHorizontal, Users, Banknote, ChevronDown, ChevronUp, Calendar } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '../features/profile/LanguageContext';
import heroBg from '../assets/hero-bg.png';

const RielIcon = ({ className }) => (
  <span className={`inline-flex items-center justify-center font-bold leading-none ${className}`} style={{ fontSize: '1.1em' }}>
    ៛
  </span>
);

export function SearchBar() {
  const { t } = useLanguage();
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="relative py-12 sm:py-20 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroBg} 
          alt="Hero Background" 
          className="w-full h-full object-cover"
        />
        {/* Deep Green Tinted Overlay to match reference */}
        <div className="absolute inset-0 bg-green-950/70 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-green-950/80 via-transparent to-green-950/40"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-white text-3xl sm:text-5xl font-heading text-center mb-8 drop-shadow-lg leading-tight px-4">
          {t('heroTitle')}
        </h2>
        
        <div className="space-y-4">
          {/* Main Search Bar - Now unified on a single line for mobile */}
          <div className="flex items-center gap-1.5 sm:gap-3 bg-white/95 backdrop-blur-md rounded-2xl p-1.5 sm:p-3 shadow-2xl transition-all duration-300 border border-white/20">
            <div className="flex-1 flex items-center gap-2 px-3 py-2.5 sm:border-r border-gray-100">
              <Search className="w-5 h-5 text-green-600 flex-shrink-0" />
              <input
                type="text"
                placeholder={t('searchPlaceholder')}
                className="w-full bg-transparent outline-none py-1 text-sm sm:text-base text-foreground placeholder:text-gray-400"
              />
            </div>
            
            {/* Location hidden inside main bar on mobile to keep it one-line */}
            <div className="hidden lg:flex flex-1 items-center gap-2 px-3 py-2 border-r border-gray-100">
              <MapPin className="w-5 h-5 text-green-600 flex-shrink-0" />
              <select className="w-full bg-transparent outline-none py-1 text-foreground appearance-none cursor-pointer">
                <option value="">{t('allLocations')}</option>
                {[
                  'phnomPenh', 'banteayMeanchey', 'battambang', 'kampongCham', 'kampongChhnang',
                  'kampongSpeu', 'kampongThom', 'kampot', 'kandal', 'kep', 'kohKong', 'kratie',
                  'mondulkiri', 'oddarMeanchey', 'pailin', 'preahSihanouk', 'preahVihear',
                  'preyVeng', 'pursat', 'ratanakiri', 'siemReap', 'stungTreng', 'svayRieng',
                  'takeo', 'tboungKhmum'
                ].map((loc) => (
                  <option key={loc} value={loc}>{t(loc)}</option>
                ))}
              </select>
            </div>
            
            <div className="flex items-center gap-1.5 sm:gap-2 pr-1 sm:pr-0">
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className={`w-10 h-10 sm:w-auto sm:px-4 sm:h-12 rounded-xl border transition-all flex items-center justify-center gap-2 ${showFilters ? 'bg-green-50 border-green-200 text-green-700' : 'bg-gray-50 border-gray-100 text-gray-500 hover:bg-gray-100'}`}
                title={t('filters')}
              >
                <SlidersHorizontal className="w-5 h-5" />
                <span className="hidden lg:inline font-bold text-sm">{t('filters')}</span>
              </button>
              
              <button className="w-10 h-10 sm:w-auto sm:px-8 sm:h-12 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all active:scale-95 shadow-lg flex items-center justify-center shrink-0">
                <Search className="w-5 h-5 lg:hidden" />
                <span className="hidden lg:inline font-bold">{t('search')}</span>
              </button>
            </div>
          </div>

          {/* Advanced Filters Panel */}
          <div className={`overflow-hidden transition-all duration-300 ease-in-out ${showFilters ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
            <div className="bg-white/90 backdrop-blur-md rounded-xl p-6 shadow-xl grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6 border border-white/20">
              {/* Location - Visible in filters on mobile */}
              <div className="sm:hidden space-y-2">
                <label className="text-sm font-semibold text-green-900 flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  {t('allLocations')}
                </label>
                <select className="w-full bg-white/50 border border-border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-green-500 transition-all appearance-none cursor-pointer">
                  <option value="">{t('allLocations')}</option>
                  {[
                    'phnomPenh', 'banteayMeanchey', 'battambang', 'kampongCham', 'kampongChhnang',
                    'kampongSpeu', 'kampongThom', 'kampot', 'kandal', 'kep', 'kohKong', 'kratie',
                    'mondulkiri', 'oddarMeanchey', 'pailin', 'preahSihanouk', 'preahVihear',
                    'preyVeng', 'pursat', 'ratanakiri', 'siemReap', 'stungTreng', 'svayRieng',
                    'takeo', 'tboungKhmum'
                  ].map((loc) => (
                    <option key={loc} value={loc}>{t(loc)}</option>
                  ))}
                </select>
              </div>

              {/* User Roles */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-green-900 flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  {t('userRole')}
                </label>
                <select className="w-full bg-white/50 border border-border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-green-500 transition-all appearance-none cursor-pointer">
                  <option>{t('allRoles')}</option>
                  <option>{t('farmer')}</option>
                  <option>{t('middleman')}</option>
                  <option>{t('buyer')}</option>
                </select>
              </div>

              {/* Price Range / Sorting */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-green-900 flex items-center gap-2">
                  <RielIcon className="w-4 h-4" />
                  {t('priceRange')}
                </label>
                <div className="flex items-center gap-2">
                  <input 
                    type="number" 
                    placeholder={t('minPrice')}
                    className="w-full bg-white/50 border border-border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-green-500 transition-all text-sm"
                  />
                  <span className="text-gray-400">-</span>
                  <input 
                    type="number" 
                    placeholder={t('maxPrice')}
                    className="w-full bg-white/50 border border-border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-green-500 transition-all text-sm"
                  />
                </div>
              </div>

              {/* Sort By Option */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-green-900 flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4" />
                  {t('sortBy')}
                </label>
                <select className="w-full bg-white/50 border border-border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-green-500 transition-all appearance-none cursor-pointer">
                  <option>{t('newest')}</option>
                  <option>{t('priceLowToHigh')}</option>
                  <option>{t('priceHighToLow')}</option>
                  <option>{t('mostQuantity')}</option>
                </select>
              </div>

              {/* Other Filter (Quantity/Date) */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-green-900 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {t('freshArrivals')}
                </label>
                <select className="w-full bg-white/50 border border-border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-green-500 transition-all appearance-none cursor-pointer">
                  <option>{t('viewAll')}</option>
                  <option>{t('last24Hours')}</option>
                  <option>{t('last7Days')}</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
