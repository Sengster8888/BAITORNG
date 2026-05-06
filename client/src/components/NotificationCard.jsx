import { Link } from 'react-router';
import { Inbox, Trash2 } from 'lucide-react';
import { useLanguage } from '../features/profile/LanguageContext';

export function NotificationCard({ notif, language, onDelete }) {
  const { t } = useLanguage();

  const getMessage = () => {
    if (notif.templateKey) {
      const template = t(notif.templateKey);
      const data = language === 'kh' ? notif.matchData : notif.matchDataEn;
      if (!data) return template;
      return template.replace(/{(\w+)}/g, (_, key) => data[key] || '');
    }
    return language === 'kh' ? notif.message : notif.messageEn;
  };

  return (
    <div 
      className={`relative flex items-center p-4 sm:p-5 transition-all group sm:rounded-3xl ${!notif.isRead ? 'bg-white sm:shadow-xl sm:shadow-gray-200/70 z-10' : 'bg-white sm:shadow-sm sm:opacity-60 hover:bg-gray-50 sm:hover:bg-white sm:hover:opacity-100 sm:hover:shadow-lg sm:hover:shadow-gray-200/50'}`}
    >
      <Link to={notif.link} className="flex-1 min-w-0 flex items-start gap-4 pr-10 outline-none">
        <div className="mt-0.5 shrink-0">
          <Inbox className={`w-5 h-5 ${!notif.isRead ? (notif.type === 'supply_match' ? 'text-green-600' : notif.type === 'demand_match' ? 'text-indigo-600' : 'text-gray-600') : 'text-gray-300'}`} />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-[15px] font-bold text-gray-900 mb-1 leading-tight">
            {language === 'kh' ? notif.title : notif.titleEn}
          </h3>
          <p className="text-[14px] text-gray-600 leading-relaxed">
            {getMessage()}
          </p>
          <span className="text-[11px] font-bold text-gray-400 mt-2 block uppercase tracking-wider">
            {notif.time}
          </span>
        </div>
      </Link>
      
      {/* Delete Individual */}
      <button 
        onClick={() => onDelete(notif.id)}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 transition-all rounded-xl opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
        aria-label="Delete notification"
      >
        <Trash2 className="w-5 h-5" />
      </button>
    </div>
  );
}
