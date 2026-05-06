import { 
  Wheat, 
  Leaf, 
  Apple, 
  Sprout, 
  Fish, 
  Shovel, 
  Tractor, 
  Award 
} from 'lucide-react';
import { useLanguage } from '../features/profile/LanguageContext';

const categories = [
  { name: 'Rice', key: 'rice', icon: Wheat, color: 'bg-amber-100 text-amber-600' },
  { name: 'Vegetables', key: 'vegetables', icon: Leaf, color: 'bg-green-100 text-green-600' },
  { name: 'Fruits', key: 'fruits', icon: Apple, color: 'bg-red-100 text-red-600' },
  { name: 'Spices', key: 'spices', icon: Sprout, color: 'bg-lime-100 text-lime-600' },
  { name: 'Livestock', key: 'livestock', icon: Fish, color: 'bg-blue-100 text-blue-600' },
  { name: 'Inputs', key: 'inputs', icon: Shovel, color: 'bg-orange-100 text-orange-600' },
  { name: 'Machinery', key: 'machinery', icon: Tractor, color: 'bg-indigo-100 text-indigo-600' },
  { name: 'Organic', key: 'organic', icon: Award, color: 'bg-emerald-100 text-emerald-600' },
];

export function CategoryNav() {
  const { t } = useLanguage();

  return (
    <div className="bg-white border-b border-border font-body">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 overflow-hidden">
        <div className="flex sm:grid sm:grid-cols-4 lg:grid-cols-8 gap-2 sm:gap-4 overflow-x-auto no-scrollbar scroll-smooth">
          {categories.map((category) => (
            <button
              key={category.name}
              className="flex-shrink-0 flex flex-col items-center gap-1 sm:gap-2 p-2 sm:p-4 rounded-lg hover:bg-accent transition-colors group min-w-[85px] sm:min-w-0"
            >
              <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full ${category.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                <category.icon className="w-6 h-6 sm:w-7 sm:h-7" />
              </div>
              <span className="text-xs sm:text-sm text-center">{t(category.key)}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
