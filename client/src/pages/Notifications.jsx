import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import {
  ArrowLeft,
  CheckCheck,
  Bell,
  Circle,
  Trash2,
  Handshake,
  ShoppingBag,
  ShoppingBasket,
  ChevronRight,
  Inbox
} from 'lucide-react';
import { useLanguage } from '../features/profile/LanguageContext';
import { MobileBottomNav } from '../components/MobileBottomNav';
import { NotificationCard } from '../components/NotificationCard';

const MOCK_NOTIFICATIONS = [
  {
    id: 1,
    type: 'supply_match',
    title: 'ទំនិញដែលអ្នកត្រូវការមានហើយ!',
    titleEn: 'The goods you need are available!',
    templateKey: 'matchSupplyTemplate',
    matchData: { role: 'កសិករ', location: 'បាត់ដំបង', category: 'ស្រូវ', variety: 'ផ្ការំដួល' },
    matchDataEn: { role: 'Farmer', location: 'Battambang', category: 'Rice', variety: 'Phka Rumduol' },
    time: '2m ago',
    isRead: false,
    link: '/matching'
  },
  {
    id: 2,
    type: 'demand_match',
    title: 'ទីផ្សារកំពុងត្រូវការទំនិញរបស់អ្នក!',
    titleEn: 'The market needs your goods!',
    templateKey: 'matchDemandTemplate',
    matchData: { role: 'អតិថិជន', location: 'ភ្នំពេញ', category: 'ស្វាយ', variety: 'កែវរមៀត' },
    matchDataEn: { role: 'Buyer', location: 'Phnom Penh', category: 'Mangoes', variety: 'Keo Romeat' },
    time: '45m ago',
    isRead: false,
    link: '/matching'
  },
  {
    id: 3,
    type: 'system',
    title: 'សូមស្វាគមន៍មកកាន់ BaiTorng',
    titleEn: 'Welcome to BaiTorng',
    message: 'សូមអរគុណសម្រាប់ការចុះឈ្មោះ! ចាប់ផ្តើមជួញដូរកសិផលឥឡូវនេះ។',
    messageEn: 'Thank you for joining! Start trading agriculture products now.',
    time: '2h ago',
    isRead: true,
    link: '/'
  },
];

export function Notifications() {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);

  return (
    <div className="flex-1 bg-white sm:bg-gray-50 flex flex-col font-body pb-20 sm:pb-8">
      {/* Mobile Top Bar */}
      <div className="sm:hidden sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 h-14 px-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-gray-900">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-[17px] font-bold text-gray-900">{t('notifications')}</h1>
        </div>

        {notifications.length > 0 && (
          <div className="flex items-center gap-1">
            <button
              onClick={() => setNotifications(notifications.map(n => ({ ...n, isRead: true })))}
              className="p-2 text-gray-400 hover:text-gray-900 transition-colors"
            >
              <CheckCheck className="w-5 h-5" />
            </button>
            <button
              onClick={() => setNotifications([])}
              className="p-2 -mr-2 text-gray-400 hover:text-red-500 transition-colors"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>

      <div className="flex-1 max-w-[1440px] mx-auto w-full sm:px-4 pt-4 sm:pt-8 pb-6 sm:pb-8">
        {/* Desktop Header */}
        <div className="hidden sm:flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="w-11 h-11 rounded-2xl bg-white shadow-sm border border-gray-100 flex items-center justify-center text-gray-500 hover:text-gray-900 transition-all hover:scale-110"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-2xl font-black text-gray-900 tracking-tight">{t('notifications')}</h1>
          </div>

          {notifications.length > 0 && (
            <div className="flex items-center gap-3">
              <button
                onClick={() => setNotifications(notifications.map(n => ({ ...n, isRead: true })))}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900 transition-all font-bold text-sm"
              >
                <CheckCheck className="w-4 h-4" />
                <span>{language === 'kh' ? 'អានទាំងអស់' : 'Mark all read'}</span>
              </button>
              <button
                onClick={() => setNotifications([])}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-50 text-red-500 hover:bg-red-100 hover:text-red-600 transition-all font-bold text-sm"
              >
                <Trash2 className="w-4 h-4" />
                <span>{language === 'kh' ? 'លុបទាំងអស់' : 'Delete all'}</span>
              </button>
            </div>
          )}
        </div>

        {/* Responsive Box/List */}
        <div className="bg-white sm:bg-transparent border-t border-b sm:border-0 border-gray-100 divide-y divide-gray-100 sm:divide-y-0 sm:space-y-4">
          {notifications.length === 0 ? (
            <div className="p-12 text-center text-gray-400 font-bold bg-white sm:rounded-3xl sm:border border-gray-100">
              {language === 'kh' ? 'មិនមានដំណឹងថ្មីទេ' : 'No notifications'}
            </div>
          ) : (
            notifications.map((notif) => (
              <NotificationCard
                key={notif.id}
                notif={notif}
                language={language}
                onDelete={(id) => setNotifications(notifications.filter(n => n.id !== id))}
              />
            ))
          )}
        </div>
      </div>
      <MobileBottomNav />
    </div>
  );
}
