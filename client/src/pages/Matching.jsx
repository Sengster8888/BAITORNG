import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import {
  ArrowLeft, Handshake, Info, Phone, Share2, MapPin,
  Package, ChevronDown, ChevronUp, ArrowRight,
  ChevronLeft, ChevronRight, ShoppingBasket
} from "lucide-react";
import { useLanguage } from "../features/profile/LanguageContext";
import { SupplyCard } from "../components/SupplyCard";
import { DemandCard } from "../components/DemandCard";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { MobileBottomNav } from "../components/MobileBottomNav";
import { PostListingModal } from "../components/PostListingModal";
import { SupplyMiniCard } from "../components/SupplyMiniCard";
import { DemandMiniCard } from "../components/DemandMiniCard";

// MOCK DATA (Expanded for Carousel demonstration)
const MOCK_USER_SUPPLIES = [
  {
    id: "my-rice-01",
    type: "supply",
    image: "https://scontent.fpnh20-1.fna.fbcdn.net/v/t1.6435-9/88129721_2817759894980029_5843446428050915328_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=7b2446&_nc_ohc=0qEtetWwCG0Q7kNvwErszhs&_nc_oc=Adr2tp6PEVv6qQ1KHRAy6dOMY1H0KVTaSLxkc6JxgWlYkpHa3Mf1vQS4c-D7JSTaJ8c&_nc_zt=23&_nc_ht=scontent.fpnh20-1.fna&_nc_gid=nFiIlhroyFy5GgMEETVu4Q&_nc_ss=7b2a8&oh=00_Af2T_Q9PQg-9imF5G-Oed67vhwRTVpDBddb-E8zDbCOu7w&oe=6A17B390",
    isSaved: false,
    category: "ស្រូវអង្ករ",
    variety: "ស្រូវផ្ការំដួល (លេខ ១)",
    price: "1,450",
    unit: "kg",
    quantityAvailable: "12,000",
    location: "battambang",
    postedTime: "2 hours ago",
    createdAt: "2024-04-29T07:30:00Z",
    seller: {
      id: "u-ishowspeed",
      username: "ishowspeed_kh",
      name: "IshowSpeed",
      role: "farmer",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Speed"
    },
    matches: [
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
        isSaved: false,
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
        id: "m-r-04",
        type: "demand",
        image: "",
        isSaved: false,
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
      }
    ]
  },
  {
    id: "my-mango-01",
    type: "supply",
    image: "https://moi-static.sgp1.cdn.digitaloceanspaces.com/uploads/post/feature_image/34857/feature.jpg",
    isSaved: false,
    category: "ស្វាយ",
    variety: "ស្វាយកែវរមៀត (Ready for Export)",
    price: "1,100",
    unit: "kg",
    quantityAvailable: "3,500",
    location: "kampongSpeu",
    postedTime: "5 hours ago",
    createdAt: "2024-04-29T04:30:00Z",
    seller: {
      id: "u-ishowspeed",
      username: "ishowspeed_kh",
      name: "IshowSpeed",
      role: "farmer",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Speed"
    },
    matches: [
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
      }
    ]
  },
  {
    id: "my-corn-01",
    type: "supply",
    image: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?q=80&w=600&auto=format&fit=crop",
    isSaved: false,
    category: "ពោត",
    variety: "ពោតលឿង (Yellow Corn)",
    price: "850",
    unit: "kg",
    quantityAvailable: "20,000",
    location: "pailin",
    postedTime: "Yesterday",
    createdAt: "2024-04-28T10:30:00Z",
    seller: {
      id: "u-ishowspeed",
      username: "ishowspeed_kh",
      name: "IshowSpeed",
      role: "farmer",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Speed"
    },
    matches: [
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
        isSaved: false,
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
      }
    ]
  }
];

const MOCK_USER_DEMANDS = [
  {
    id: "my-cabbage-01",
    type: "demand",
    image: "",
    isSaved: false,
    category: "ស្ពៃក្តោប",
    variety: "ស្ពៃក្តោបសរីរាង្គ (Organic)",
    price: "3,500",
    unit: "kg",
    quantityAvailable: "500",
    location: "phnomPenh",
    postedTime: "1 hour ago",
    createdAt: "2024-04-29T08:30:00Z",
    seller: {
      id: "u-ishowspeed",
      username: "ishowspeed_kh",
      name: "IshowSpeed",
      role: "farmer",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Speed"
    },
    matches: [
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
        id: "m-v-02",
        type: "supply",
        image: "https://i.ytimg.com/vi/jDN_85QlUbc/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAiVtAPQJoB16Z8i8eYL87gX36v9w",
        isSaved: false,
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
        isSaved: false,
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
      }
    ]
  },
  {
    id: "my-pepper-01",
    type: "demand",
    image: "",
    isSaved: false,
    category: "ម្រេច",
    variety: "ម្រេចកំពត (Black Pepper)",
    price: "40,000",
    unit: "kg",
    quantityAvailable: "100",
    location: "phnomPenh",
    postedTime: "Yesterday",
    createdAt: "2024-04-28T09:30:00Z",
    seller: {
      id: "u-ishowspeed",
      username: "ishowspeed_kh",
      name: "IshowSpeed",
      role: "farmer",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Speed"
    },
    matches: [
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
        id: "m-p-02",
        type: "supply",
        image: "https://kasemall2.kasegro.com/uploads/images/products/origin/74_e91cb03e810cb20b876f8bcd52819fbe.jpeg",
        isSaved: false,
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
      }
    ]
  }
];


export function Matching() {
  const { language, t } = useLanguage();
  const [activeTab, setActiveTab] = useState('supply');
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showStickyNav, setShowStickyNav] = useState(false);

  // Scroll listener for sticky nav
  useEffect(() => {
    const handleScroll = () => {
      setShowStickyNav(window.scrollY > 150);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const supplyTabName = t('find_buyers');
  const demandTabName = t('find_sellers');

  const activeList = activeTab === 'supply' ? MOCK_USER_SUPPLIES : MOCK_USER_DEMANDS;
  const currentPost = activeList[currentIndex] || activeList[0];
  const themeColor = activeTab === 'supply' ? 'green' : 'indigo';

  // Reset index when tab changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [activeTab]);

  const handlePrev = () => {
    setCurrentIndex(prev => (prev > 0 ? prev - 1 : activeList.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prev => (prev < activeList.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-body pb-24 lg:pb-0">
      <div className="hidden lg:block">
        <Header onOpenPostModal={() => setIsPostModalOpen(true)} isSticky={false} />
      </div>
      <MobileBottomNav onOpenPostModal={() => setIsPostModalOpen(true)} />

      {/* PAGE HEADER NAVIGATION - STICKY TOP */}
      <div className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-40 transition-all duration-300">
        <div className="max-w-[1440px] mx-auto px-4 py-3 flex flex-col items-center">

          {/* Row 1: Tabs (Smooth Max-Height Transition) */}
          <div className={`w-full overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] lg:!max-h-[100px] lg:!opacity-100 ${showStickyNav ? 'max-h-0 opacity-0' : 'max-h-[80px] opacity-100'}`}>
            <div className="flex gap-3 w-full max-w-sm mx-auto pb-3">
              <button
                onClick={() => setActiveTab('supply')}
                className={`flex-1 px-6 py-2.5 rounded-xl text-[14px] font-black transition-all duration-300 ${activeTab === 'supply' ? 'bg-green-600 text-white shadow-lg shadow-green-600/20' : 'text-gray-400 hover:text-gray-600 bg-gray-100'}`}
              >
                {supplyTabName}
              </button>
              <button
                onClick={() => setActiveTab('demand')}
                className={`flex-1 px-6 py-2.5 rounded-xl text-[14px] font-black transition-all duration-300 ${activeTab === 'demand' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'text-gray-400 hover:text-gray-600 bg-gray-100'}`}
              >
                {demandTabName}
              </button>
            </div>
          </div>

          {/* Row 2: Switcher (ONLY MOBILE - Always Sticky) */}
          <div className={`lg:hidden flex items-center justify-between w-full max-w-sm mx-auto px-2 transition-transform duration-300 ${showStickyNav ? 'translate-y-0' : 'translate-y-0'}`}>
            <button
              onClick={handlePrev}
              className={`w-10 h-10 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center transition-all active:scale-90 shrink-0 ${themeColor === 'green' ? 'text-green-600' : 'text-indigo-600'}`}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <div className="flex items-center gap-2 px-6 py-1.5 bg-gray-50 rounded-full border border-gray-100 min-w-[90px] justify-center text-[15px]">
              <span className="text-[17px] font-black text-gray-900 leading-none">{currentIndex + 1}</span>
              <span className="text-gray-300 text-xs font-black">/</span>
              <span className="text-gray-400 text-sm font-black">{activeList.length}</span>
            </div>

            <button
              onClick={handleNext}
              className={`w-10 h-10 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center transition-all active:scale-90 shrink-0 ${themeColor === 'green' ? 'text-green-600' : 'text-indigo-600'}`}
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      <main className="flex-1 max-w-[1440px] mx-auto w-full p-4 sm:p-6 lg:p-12 flex flex-col">

        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch gap-y-12 gap-x-4">

          {/* LEFT: YOUR PRODUCT */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <h3 className="text-xl font-black text-gray-900 px-2 flex items-center gap-3">
              <span className={`w-1.5 h-6 rounded-full ${themeColor === 'green' ? 'bg-green-500' : 'bg-indigo-500'}`}></span>
              {t('yourProduct')}
            </h3>
            {activeTab === 'supply' ? (
              <SupplyCard {...currentPost} />
            ) : (
              <DemandCard {...currentPost} />
            )}

            {/* CAROUSEL NAIGATION - CENTERED UNDER YOUR CARD (Only show on Desktop) */}
            <div className="hidden lg:flex mt-8 justify-center items-center gap-8">
              <button
                onClick={handlePrev}
                className={`w-14 h-14 rounded-full bg-white shadow-lg border border-gray-100 flex items-center justify-center transition-all group ${themeColor === 'green' ? 'text-green-600 hover:bg-green-50' : 'text-indigo-600 hover:bg-indigo-50'}`}
              >
                <ChevronLeft className="w-8 h-8 group-hover:-translate-x-1 transition-transform" />
              </button>

              <div className="flex flex-col items-center">
                <div className="flex items-center gap-2">
                  <span className="text-xl font-black text-gray-900">{currentIndex + 1}</span>
                  <span className="text-gray-300 text-sm">/</span>
                  <span className="text-gray-400 font-bold">{activeList.length}</span>
                </div>
              </div>

              <button
                onClick={handleNext}
                className={`w-14 h-14 rounded-full bg-white shadow-lg border border-gray-100 flex items-center justify-center transition-all group ${themeColor === 'green' ? 'text-green-600 hover:bg-green-50' : 'text-indigo-600 hover:bg-indigo-50'}`}
              >
                <ChevronRight className="w-8 h-8 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* CENTER: THE HANDSHAKE BRIDGE */}
          <div className="hidden lg:flex lg:col-span-1 items-center justify-center relative">
            <div className="absolute inset-y-10 left-1/2 -translate-x-1/2 w-px bg-gradient-to-b from-transparent via-gray-300 to-transparent"></div>
            <div className={`relative w-22 h-22 rounded-full bg-white shadow-2xl border-4 border-gray-100 flex items-center justify-center z-10 ${themeColor === 'green' ? 'text-green-600' : 'text-indigo-600'}`}>
              <Handshake className="w-12 h-12 animate-pulse" strokeWidth={2.5} />
            </div>
          </div>

          {/* RIGHT: MARKET OFFERS */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {/* Mobile Handshake Bridge */}
            <div className="lg:hidden flex items-center gap-4 py-4 px-2">
              <div className="h-px bg-gray-200 flex-1"></div>
              <div className={`w-16 h-16 rounded-full bg-white shadow-xl border-4 border-gray-100 flex items-center justify-center z-10 shrink-0 ${themeColor === 'green' ? 'text-green-600' : 'text-indigo-600'}`}>
                <Handshake className="w-8 h-8 animate-pulse" strokeWidth={2.5} />
              </div>
              <div className="h-px bg-gray-200 flex-1"></div>
            </div>

            <h3 className="text-xl font-black text-gray-900 px-2 flex items-center gap-3">
              <span className={`w-1.5 h-6 rounded-full ${themeColor === 'green' ? 'bg-indigo-500' : 'bg-green-500'}`}></span>
              {t('availableOffers')}
            </h3>

            <div className="lg:relative h-full min-h-[500px] lg:min-h-0">
              <div className="lg:absolute lg:inset-0 pr-2 overflow-y-auto custom-scrollbar no-scrollbar-px space-y-4">
                {currentPost.matches.map(match => (
                  activeTab === 'supply' ? (
                    <DemandMiniCard key={match.id} match={match} />
                  ) : (
                    <SupplyMiniCard key={match.id} match={match} />
                  )
                ))}

                {currentPost.matches.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-24 bg-white rounded-[2.5rem] border-2 border-dashed border-gray-100 shadow-sm">
                    <Handshake className="w-16 h-16 text-gray-200 mb-4 opacity-50" />
                    <p className="text-gray-400 font-bold tracking-tight">
                      {t('noMatchesFound')}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>


      </main>

      <div className="hidden lg:block">
        <Footer />
      </div>

      <PostListingModal
        isOpen={isPostModalOpen}
        onClose={() => setIsPostModalOpen(false)}
      />
    </div>
  );
}
