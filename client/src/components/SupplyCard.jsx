import {
  Bookmark,
  MapPin,
  Package,
  Clock,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router";
import { useLanguage } from "../features/profile/LanguageContext";

export function SupplyCard({
  id,
  image,
  category,
  variety,
  price,
  unit,
  quantityAvailable,
  location,
  postedTime,
  seller,
  preview = false,
  isSaved = false,
}) {
  const { t } = useLanguage();

  const roleStyles = {
    farmer: { avatar: "bg-[#00a73d]", badge: "bg-[#00a73d]", text: "text-white" },
    middleman: { avatar: "bg-[#f64900]", badge: "bg-[#f64900]", text: "text-white" },
    buyer: { avatar: "bg-[#eab308]", badge: "bg-[#eab308]", text: "text-white" },
    default: { avatar: "bg-gray-600", badge: "bg-gray-600", text: "text-white" },
  };
  const currentStyle = roleStyles[seller?.role || "default"] || roleStyles.default;

  const cardContent = (
    <div className={`bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm ${!preview ? "hover:shadow-xl group" : ""} transition-all duration-300 flex flex-col h-full`}>
      {/* Image Section */}
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100 block">
        {!preview ? (
          <Link to={`/listing/${id}`}>
            {image ? (
              <img src={image} alt={variety} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100 text-white">
                <Package className="w-12 h-12 mb-2 opacity-20 text-gray-400" />
                <span className="text-[10px] font-bold uppercase tracking-widest opacity-40 text-gray-400">{t("addPhoto")}</span>
              </div>
            )}
          </Link>
        ) : (
          <div className="w-full h-full">
            {image ? <img src={image} alt={variety} className="w-full h-full object-cover" /> : <div className="w-full h-full bg-gray-100" />}
          </div>
        )}
        
        <div className={`absolute top-0 left-0 px-5 py-2 ${currentStyle.badge} ${currentStyle.text} rounded-br-2xl text-[14px] font-bold uppercase shadow-lg z-10 font-body`}>
          {t(seller?.role || "farmer")}
        </div>

        {!preview && (
          <button className="absolute top-3 right-3 w-9 h-9 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-all backdrop-blur-md shadow-md border border-white/50 z-20 active:scale-90">
            <Bookmark className={`w-4.5 h-4.5 ${isSaved ? "text-green-600 fill-green-600" : "text-green-600"} transition-colors`} />
          </button>
        )}
      </div>

      {/* Content Section */}
      <div className="p-5 flex-1 flex flex-col">
        <h3 className="text-xl font-body font-bold text-gray-900 mb-2 truncate">
          {t(category || "other")} <span className="mx-2 text-gray-300 font-body">—</span> {variety || "..."}
        </h3>

        <div className="flex items-center gap-1.5 mb-6">
          {!price || price === "0" || price === "negotiable" ? (
            <div className="px-4 py-1.5 rounded-xl border-2 font-black bg-green-50 border-green-100 text-green-700">
              <span className="text-lg font-body">{t("negotiable")}</span>
            </div>
          ) : (
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-black font-body tracking-tight text-green-600">{price}</span>
              <span className="text-gray-400 text-lg font-body font-medium">៛</span>
              <span className="text-gray-400 text-base font-body font-medium">/ {unit || "kg"}</span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-3 gap-3 mb-6">
          {[ 
            { icon: Package, text: `${quantityAvailable || "0"} ${unit || "kg"}` },
            { icon: MapPin, text: location ? t(location) : t("locationLabel") },
            { icon: Clock, text: postedTime || "..." }
          ].map((info, idx) => (
            <div key={idx} className={`flex flex-col items-center justify-center h-[72px] p-2 rounded-2xl bg-gray-50 border border-gray-100 shadow-sm transition-transform ${!preview ? "hover:scale-[1.02]" : ""}`}>
              <info.icon className="w-5 h-5 text-gray-500 mb-1" />
              <span className="text-[12px] font-body font-bold text-gray-600 tracking-tight leading-normal text-center truncate w-full px-1">{info.text}</span>
            </div>
          ))}
        </div>

        <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <div className={`w-10 h-10 shrink-0 rounded-full flex items-center justify-center text-white text-base font-extrabold shadow-inner ${currentStyle.avatar}`}>
              {seller?.avatar ? <img src={seller.avatar} className="w-full h-full object-cover rounded-full" /> : seller?.name?.charAt(0) || "?"}
            </div>
            <div className="flex items-center gap-1 min-w-0 transition-all group/seller">
              <div className="text-[15px] font-black text-gray-900 truncate tracking-tight group-hover/seller:text-green-600 transition-colors">
                {seller?.name || "..."}
              </div>
            </div>
          </div>
          {!preview && (
            <Link to={`/listing/${id}`} className="flex-shrink-0 flex items-center justify-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-full text-xs font-bold transition-all shadow-lg active:scale-95 group/btn ml-2">
              {t("viewDetails")} <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );

  return cardContent;
}
