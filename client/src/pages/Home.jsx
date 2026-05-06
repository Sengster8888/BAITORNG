import { useState, useRef, useEffect } from 'react';
import { ChevronDown, LayoutGrid, ShoppingBag, ShoppingBasket } from 'lucide-react';
import { Header } from '../components/Header';
import { SearchBar } from '../components/SearchBar';
import { CategoryNav } from '../components/CategoryNav';
import { SupplyCard } from '../components/SupplyCard';
import { DemandCard } from '../components/DemandCard';
import { Footer } from '../components/Footer';
import { MobileBottomNav } from '../components/MobileBottomNav';
import { PostListingModal } from '../components/PostListingModal';
import { useLanguage } from '../features/profile/LanguageContext';

const ViewAllDropdown = ({ label }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { t } = useLanguage();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 text-gray-500 hover:text-green-600 font-bold text-sm transition-colors group"
      >
        {label}
        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      <div className={`absolute right-0 mt-3 w-52 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50 transition-all duration-300 origin-top-right ${isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'}`}>
        <div className="p-2 flex flex-col gap-1">
          <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-green-50 text-gray-700 hover:text-green-600 transition-all group/item">
            <div className="w-8 h-8 rounded-lg bg-gray-50 group-hover/item:bg-green-100 flex items-center justify-center transition-colors">
              <LayoutGrid className="w-4 h-4" />
            </div>
            <span className="text-sm font-bold">{t('viewAll')}</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-green-50 text-gray-700 hover:text-green-600 transition-all group/item">
            <div className="w-8 h-8 rounded-lg bg-gray-50 group-hover/item:bg-green-100 flex items-center justify-center transition-colors">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <span className="text-sm font-bold">{t('viewProducts')}</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-green-50 text-gray-700 hover:text-green-600 transition-all group/item">
            <div className="w-8 h-8 rounded-lg bg-gray-50 group-hover/item:bg-green-100 flex items-center justify-center transition-colors">
              <ShoppingBasket className="w-4 h-4" />
            </div>
            <span className="text-sm font-bold">{t('viewDemands')}</span>
          </a>
        </div>
      </div>
    </div>
  );
};

const featuredListings = [
      {
        id: "m-v-01",
        type: "supply",
        image: "https://images.unsplash.com/photo-1594282486552-05b4d80fbb9f?q=80&w=400&auto=format&fit=crop",
        isSaved: false,
        category: "ស្ពៃក្តោប",
        variety: "ស្ពៃក្តោបស្រស់ៗពីកោះដាច់",
        price: "3,200",
        unit: "kg",
        quantityAvailable: "200",
        location: "kandal",
        postedTime: "Just now",
        createdAt: "2024-04-29T09:50:00Z",
        seller: {
          id: "u-kohdach",
          username: "kohdach_farm",
          name: "កសិដ្ឋាន កោះដាច់",
          role: "middleman",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Koh"
        }
      },
      {
        id: "m-p-02",
        type: "supply",
        image: "https://kasemall2.kasegro.com/uploads/images/products/origin/74_e91cb03e810cb20b876f8bcd52819fbe.jpeg",
        isSaved: true,
        category: "ម្រេច",
        variety: "Pure Black Pepper",
        price: "42,000",
        unit: "kg",
        quantityAvailable: "200",
        location: "kohKong",
        postedTime: "Just now",
        createdAt: "2024-04-29T09:30:00Z",
        seller: {
          id: "u-kohkong",
          username: "koh_kong_organic",
          name: "Koh Kong Organic Farm",
          role: "buyer",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Kong"
        }
      },
      {
        id: "m-r-01",
        type: "demand",
        image: "",
        isSaved: false,
        category: "ស្រូវអង្ករ",
        variety: "ស្រូវផ្ការំដួល (Export Premium)",
        price: "1,550",
        unit: "kg",
        quantityAvailable: "20,000",
        location: "phnomPenh",
        postedTime: "Just now",
        createdAt: "2024-04-29T09:55:00Z",
        seller: {
          id: "u-greengrowth",
          username: "green_growth_milling",
          name: "Green Growth Milling Co.",
          role: "buyer",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Green"
        }
      },
      {
        id: "m-r-02",
        type: "demand",
        image: "",
        isSaved: true,
        category: "ស្រូវអង្ករ",
        variety: "ត្រូវការស្រូវផ្ការំដួល ៥តោន",
        price: "1,500",
        unit: "kg",
        quantityAvailable: "5,000",
        location: "battambang",
        postedTime: "10m ago",
        createdAt: "2024-04-29T09:45:00Z",
        seller: {
          id: "u-sophakmill",
          username: "sophak_mill",
          name: "រោងម៉ាស៊ីនស្រូវ សុភ័ក្ត្រ",
          role: "middleman",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sophak"
        }
      },
      {
        id: "m-p-01",
        type: "supply",
        image: "https://scontent.fpnh20-1.fna.fbcdn.net/v/t1.6435-9/102628711_133414968359683_4163451214407260240_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=7b2446&_nc_ohc=J-7S0_5t4bsQ7kNvwEbo8yk&_nc_oc=AdobcciFjAHjTKGiTmi4iKBUEcBo37sNLbLmC-HKUo6Q8gEf2c7KBEeQQ3HpPl1cyOI&_nc_zt=23&_nc_ht=scontent.fpnh20-1.fna&_nc_gid=yRdz0Wn6fItFH4xNC9MJcg&_nc_ss=7b2a8&oh=00_Af0133sbwEfsIYgz1RJrUcc17FL4DFQV0r2Tb8-SYCe1Rg&oe=6A17D62F",
        isSaved: false,
        category: "ម្រេច",
        variety: "ម្រេចកំពត លេខ ១",
        price: "38,000",
        unit: "kg",
        quantityAvailable: "50",
        location: "kampot",
        postedTime: "Just now",
        createdAt: "2024-04-29T09:40:00Z",
        seller: {
          id: "u-toukmeas",
          username: "touk_meas_pepper",
          name: "ចំការម្រេច ទូកមាស",
          role: "farmer",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Touk"
        }
      },
      {
        id: "m-v-02",
        type: "supply",
        image: "https://i.ytimg.com/vi/jDN_85QlUbc/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAiVtAPQJoB16Z8i8eYL87gX36v9w",
        isSaved: true,
        category: "ស្ពៃក្តោប",
        variety: "Organic Cabbage Pro",
        price: "3,800",
        unit: "kg",
        quantityAvailable: "500",
        location: "kampot",
        postedTime: "Just now",
        createdAt: "2024-04-29T09:45:00Z",
        seller: {
          id: "u-ecofarm",
          username: "eco_farm_kp",
          name: "Eco Farm Kampot",
          role: "farmer",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Eco"
        }
      },
      {
        id: "m-v-03",
        type: "supply",
        image: "https://kasemall.com/uploads/products/thumb/96_3248421c6286cddc081970d93daf0693.jpg",
        isSaved: true,
        category: "ស្ពៃក្តោប",
        variety: "ស្ពៃក្តោបពីមណ្ឌលគីរី",
        price: "3,000",
        unit: "kg",
        quantityAvailable: "1,000",
        location: "mondulkiri",
        postedTime: "Just now",
        createdAt: "2024-04-29T09:40:00Z",
        seller: {
          id: "u-greenmond",
          username: "green_mondulkiri",
          name: "Green Mondulkiri Farm",
          role: "farmer",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mond"
        }
      },
      {
        id: "m-r-03",
        type: "demand",
        image: "",
        isSaved: false,
        category: "ស្រូវអង្ករ",
        variety: "ស្រូវផ្ការំដួលគុណភាពលេខ១",
        price: "1,480",
        unit: "kg",
        quantityAvailable: "15,000",
        location: "pursat",
        postedTime: "15m ago",
        createdAt: "2024-04-29T09:40:00Z",
        seller: {
          id: "u-henglai",
          username: "heng_lai_biz",
          name: "អាជីវកម្ម ហេង ឡៃ",
          role: "buyer",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Henglai"
        }
      },
      {
        id: "m-v-04",
        type: "supply",
        image: "https://kohsantepheapdaily.com.kh/wp-content/images/2020/08/c4ca4238a0b923820dcc509a6f75849b-9.jpg",
        isSaved: false,
        category: "ស្ពៃក្តោប",
        variety: "ស្ពៃក្តោបបោះដុំ",
        price: "2,800",
        unit: "kg",
        quantityAvailable: "20,000",
        location: "phnomPenh",
        postedTime: "Just now",
        createdAt: "2024-04-29T09:30:00Z",
        seller: {
          id: "u-veg-biz",
          username: "fresh_veg_biz",
          name: "អាជីវកម្ម បន្លែស្រស់",
          role: "middleman",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Veg"
        }
      },
      {
        id: "m-v-05",
        type: "supply",
        image: "https://s3.kh1.co/d51c428c34abb9a6862b783bd8733d15714677a9.jpg",
        isSaved: false,
        category: "ស្ពៃក្តោប",
        variety: "បន្លែសរីរាង្គ ភ្នំពេញ",
        price: "4,000",
        unit: "kg",
        quantityAvailable: "100",
        location: "phnomPenh",
        postedTime: "Just now",
        createdAt: "2024-04-29T09:20:00Z",
        seller: {
          id: "u-pp-organic",
          username: "phnompenh_organic",
          name: "Phnom Penh Organic",
          role: "middleman",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=PP"
        }
      },
      {
        id: "m-r-04",
        type: "demand",
        image: "",
        isSaved: true,
        category: "ស្រូវអង្ករ",
        variety: "Rice Export Quality",
        price: "1,600",
        unit: "kg",
        quantityAvailable: "50,000",
        location: "kandal",
        postedTime: "20m ago",
        createdAt: "2024-04-29T09:30:00Z",
        seller: {
          id: "u-btbtrader",
          username: "btb_rice_trader",
          name: "Battambang Rice Trader",
          role: "buyer",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Trader"
        }
      },
      {
        id: "m-r-05",
        type: "demand",
        image: "",
        isSaved: false,
        category: "ស្រូវអង្ករ",
        variety: "ស្រូវសរីរាង្គ (Organic Rice)",
        price: "1,750",
        unit: "kg",
        quantityAvailable: "2,000",
        location: "phnomPenh",
        postedTime: "30m ago",
        createdAt: "2024-04-29T09:20:00Z",
        seller: {
          id: "u-baitorngwh",
          username: "baitorng_wholesaler",
          name: "Baitorng Wholesaler",
          role: "buyer",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Baitorng"
        }
      },
      {
        id: "m-m-01",
        type: "demand",
        image: "",
        isSaved: false,
        category: "ស្វាយ",
        variety: "ស្វាយកែវរមៀត ត្រូវការជាបន្ទាន់",
        price: "1,250",
        unit: "kg",
        quantityAvailable: "10,000",
        location: "phnomPenh",
        postedTime: "Just now",
        createdAt: "2024-04-29T09:40:00Z",
        seller: {
          id: "u-huymeng",
          username: "huy_meng_fruits",
          name: "ឃ្លាំងផ្លែឈើ ហ៊ុយ ម៉េង",
          role: "buyer",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Huy"
        }
      },
      {
        id: "m-m-02",
        type: "demand",
        image: "",
        isSaved: false,
        category: "ស្វាយ",
        variety: "ស្វាយកែវរមៀត លេខ ១",
        price: "1,300",
        unit: "kg",
        quantityAvailable: "2,000",
        location: "kampongSpeu",
        postedTime: "Just now",
        createdAt: "2024-04-29T09:35:00Z",
        seller: {
          id: "u-sabay-farm",
          username: "sabay_farm",
          name: "កសិដ្ឋាន សប្បាយ",
          role: "buyer",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sabay"
        }
      },
      {
        id: "m-m-03",
        type: "demand",
        image: "",
        isSaved: false,
        category: "ស្វាយ",
        variety: "Fruit Exporter Co., Ltd",
        price: "1,200",
        unit: "kg",
        quantityAvailable: "15,000",
        location: "kandal",
        postedTime: "Just now",
        createdAt: "2024-04-29T09:30:00Z",
        seller: {
          id: "u-asia-fruit",
          username: "asia_fruit_trade",
          name: "Asia Fruit Trade",
          role: "buyer",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Asia"
        }
      },
      {
        id: "m-m-04",
        type: "demand",
        image: "",
        isSaved: false,
        category: "ស្វាយ",
        variety: "ត្រូវការស្វាយបោះដុំ",
        price: "1,050",
        unit: "kg",
        quantityAvailable: "5,000",
        location: "kampongSpeu",
        postedTime: "Just now",
        createdAt: "2024-04-29T09:25:00Z",
        seller: {
          id: "u-phsar-market",
          username: "phsar_kasiphal",
          name: "ផ្សារបោះដុំ កសិផល",
          role: "buyer",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Phsar"
        }
      },
      {
        id: "m-m-05",
        type: "demand",
        image: "",
        isSaved: false,
        category: "ស្វាយ",
        variety: "ស្វាយកែវរមៀត គុណភាពខ្ពស់",
        price: "1,400",
        unit: "kg",
        quantityAvailable: "1,000",
        location: "phnomPenh",
        postedTime: "Just now",
        createdAt: "2024-04-29T09:20:00Z",
        seller: {
          id: "u-organic-snv",
          username: "organic_snv",
          name: "Organic Market Sihanoukville",
          role: "buyer",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Organic"
        }
      },
      {
        id: "m-c-01",
        type: "demand",
        image: "",
        isSaved: false,
        category: "ពោត",
        variety: "ត្រូវការពោតចំណីសត្វ",
        price: "920",
        unit: "kg",
        quantityAvailable: "100,000",
        location: "takeo",
        postedTime: "Just now",
        createdAt: "2024-04-29T09:30:00Z",
        seller: {
          id: "u-cp-cambodia",
          username: "cp_cambodia",
          name: "CP Cambodia",
          role: "buyer",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=CP"
        }
      },
      {
        id: "m-c-02",
        type: "demand",
        image: "",
        isSaved: true,
        category: "ពោត",
        variety: "ពោតលឿងស្ងួតល្អ",
        price: "900",
        unit: "kg",
        quantityAvailable: "10,000",
        location: "pailin",
        postedTime: "Just now",
        createdAt: "2024-04-29T09:20:00Z",
        seller: {
          id: "u-sreymom",
          username: "sreymom_depot",
          name: "ដេប៉ូកសិផល ស្រីមុំ",
          role: "farmer",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mom"
        }
      },
    ];

export function Home() {
  const { t } = useLanguage();
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 pb-20 lg:pb-0">
      <Header onOpenPostModal={() => setIsPostModalOpen(true)} />
      <SearchBar />
      <CategoryNav />
      <MobileBottomNav onOpenPostModal={() => setIsPostModalOpen(true)} />

      <main className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 font-body">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl sm:text-3xl font-heading text-gray-900 tracking-tight">{t('featuredProducts')}</h2>
          <ViewAllDropdown label={t('viewAll')} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {featuredListings.map((listing) => (
            listing.type === 'demand'
              ? <DemandCard key={listing.id} {...listing} />
              : <SupplyCard key={listing.id} {...listing} />
          ))}
        </div>
      </main>

      <Footer />

      <PostListingModal
        isOpen={isPostModalOpen}
        onClose={() => setIsPostModalOpen(false)}
      />
    </div>
  );
}
