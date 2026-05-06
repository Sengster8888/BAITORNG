import { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, Bookmark } from "lucide-react";
import { useLanguage } from "../features/profile/LanguageContext";
import { SupplyCard } from "../components/SupplyCard";
import { DemandCard } from "../components/DemandCard";

export function Saved() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("supply");

  // Mock data for saved items
  const savedItems = [
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

  const filteredItems = savedItems.filter(item => item.type === activeTab);

  return (
    <div className="flex-1 bg-white sm:bg-gray-50 flex flex-col font-body pb-20 sm:pb-10">
      {/* Mobile Top Bar */}
      <div className="sm:hidden sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 h-14 px-4 flex items-center gap-4">
        <button onClick={() => navigate('/')} className="p-2 -ml-2 text-gray-900">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-[17px] font-bold text-gray-900">{t('savedItems')}</h1>
      </div>

      <div className="flex-1 max-w-[1440px] mx-auto w-full sm:px-4 sm:py-8 lg:py-12">
        {/* Desktop Header */}
        <div className="hidden sm:flex items-center gap-4 mb-8">
            <h1 className="text-2xl font-black text-gray-900 tracking-tight">{t('savedItems')}</h1>
        </div>

        {/* Content Section */}
        <div className="bg-white min-h-[500px] sm:rounded-[2.5rem] sm:shadow-xl sm:shadow-green-900/5 sm:border sm:border-gray-100 p-6 sm:p-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-green-50 flex items-center justify-center text-green-600">
                <Bookmark className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-black text-gray-900 leading-none mb-1">{t('savedItems')}</h2>
                <p className="text-sm text-gray-400 font-bold">{filteredItems.length} {t('items') || 'Items'}</p>
              </div>
            </div>

            {/* Tab Switcher */}
            <div className="flex items-center p-1 bg-gray-50 rounded-2xl border border-gray-100 self-start md:self-center">
              <button
                onClick={() => setActiveTab("supply")}
                className={`px-6 py-2.5 rounded-xl text-[14px] font-black transition-all duration-300 ${activeTab === "supply" ? "bg-green-600 text-white shadow-lg shadow-green-600/20" : "text-gray-400 hover:text-gray-600"}`}
              >
                {t('supply') || 'Supply'}
              </button>
              <button
                onClick={() => setActiveTab("demand")}
                className={`px-6 py-2.5 rounded-xl text-[14px] font-black transition-all duration-300 ${activeTab === "demand" ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20" : "text-gray-400 hover:text-gray-600"}`}
              >
                {t('demand') || 'Demand'}
              </button>
            </div>
          </div>

          {filteredItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-gray-400">
              <Bookmark className="w-16 h-16 mb-4 opacity-10" />
              <p className="font-bold">{t('noSavedItems') || 'No saved items yet'}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredItems.map((item) => (
                item.type === 'demand' 
                  ? <DemandCard key={item.id} {...item} /> 
                  : <SupplyCard key={item.id} {...item} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
