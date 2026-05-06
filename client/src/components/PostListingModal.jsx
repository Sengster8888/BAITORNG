import {
  X,
  Check,
  Search,
  Package,
  MapPin,
  Clock,
  ArrowRight,
  Handshake,
  Leaf,
  Banana,
  Grape,
  Apple,
  Carrot as CarrotIcon,
  Wheat,
  Cherry,
  Coffee,
  Plus,
} from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import { translations } from "../utils/translations";
import { useLanguage } from "../features/profile/LanguageContext";
import { SupplyCard } from "./SupplyCard";
import { DemandCard } from "./DemandCard";

const FlameIcon = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.256 1.181-3.103.414.869 1.414 1.603 2.319 1.603Z" />
  </svg>
);

const POPULAR_PRODUCTS = [
  { id: "rice", name: "Rice", icon: Wheat, color: "text-amber-500" },
  { id: "orange", name: "Orange", icon: Apple, color: "text-orange-500" },
  { id: "banana", name: "Banana", icon: Banana, color: "text-yellow-500" },
  { id: "mango", name: "Mango", icon: Grape, color: "text-green-500" },
  { id: "durian", name: "Durian", icon: Apple, color: "text-lime-600" },
  { id: "tomato", name: "Tomato", icon: Apple, color: "text-red-500" },
  { id: "carrot", name: "Carrot", icon: CarrotIcon, color: "text-orange-600" },
  { id: "pepper", name: "Pepper", icon: Coffee, color: "text-gray-600" },
];

const PRODUCT_DATABASE = [
  ...POPULAR_PRODUCTS,
  { id: "garlic", name: "Garlic", icon: Cherry, color: "text-gray-400" },
  { id: "ginger", name: "Ginger", icon: Cherry, color: "text-orange-400" },
  { id: "corn", name: "Corn", icon: Wheat, color: "text-yellow-400" },
  { id: "potato", name: "Potato", icon: Cherry, color: "text-yellow-700" },
  { id: "chili", name: "Chili", icon: FlameIcon, color: "text-red-600" },
];

const LOCATIONS = [
  "phnomPenh",
  "banteayMeanchey",
  "battambang",
  "kampongCham",
  "kampongChhnang",
  "kampongSpeu",
  "kampongThom",
  "kampot",
  "kandal",
  "kep",
  "kohKong",
  "kratie",
  "mondulkiri",
  "oddarMeanchey",
  "pailin",
  "preahSihanouk",
  "preahVihear",
  "preyVeng",
  "pursat",
  "ratanakiri",
  "siemReap",
  "stungTreng",
  "svayRieng",
  "takeo",
  "tboungKhmum",
];

export function PostListingModal({ isOpen, onClose }) {
  const { t } = useLanguage();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [variety, setVariety] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [listingType, setListingType] = useState("supply");

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files || []);
    const remainingSlots = 6 - imagePreviews.length;
    if (remainingSlots <= 0) return;

    files.slice(0, remainingSlots).forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviews((prev) => [...prev, reader.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index) => {
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const searchResults = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return [];

    return PRODUCT_DATABASE.filter((p) => {
      const khName = translations.kh[p.id]?.toLowerCase() || "";
      const enName = translations.en[p.id]?.toLowerCase() || "";
      return khName.includes(term) || enName.includes(term);
    });
  }, [searchTerm]);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center sm:p-6 overflow-y-auto sm:overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-green-950/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Main Content: Sheet for Mobile, Modal for Desktop */}
      <div className="relative bg-white shadow-2xl w-full max-w-5xl h-[92vh] sm:h-[85vh] rounded-t-[32px] sm:rounded-3xl overflow-hidden flex flex-col md:flex-row border border-white/20 animate-in slide-in-from-bottom sm:zoom-in duration-300">
        {/* Mobile Drag Indicator */}
        <div className="sm:hidden flex justify-center py-2 shrink-0">
          <div className="w-12 h-1.5 bg-gray-200 rounded-full" />
        </div>

        <div className="flex-1 flex flex-col h-full overflow-hidden">
          {/* Sticky Header: Consistent on Desktop, Vital for Mobile */}
          <div className="px-6 py-4 sm:p-8 border-b border-gray-100 flex items-center justify-between shrink-0">
            <div className="flex-1">
              <h2 className="text-2xl sm:text-3xl font-heading text-gray-900 border-l-4 border-green-600 pl-4">
                {listingType === "supply"
                  ? t("postProductTitle")
                  : t("requestProductTitle")}
              </h2>
              <p className="text-sm sm:text-base text-gray-600 mt-2 pl-4">
                {t("formGuidance")}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors ml-4"
            >
              <X className="w-6 h-6 text-gray-400" />
            </button>
          </div>

          {/* Scrollable Form Body */}
          <div className="flex-1 overflow-y-auto p-6 sm:p-10 custom-scrollbar">
            <div className="max-w-3xl">
              <div className="flex flex-col gap-6 mb-10">
                <div className="flex p-1 bg-gray-100 rounded-2xl w-full max-w-sm">
                  <button
                    onClick={() => {
                      setListingType("supply");
                      setImagePreviews([]);
                    }}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all ${listingType === "supply" ? "bg-white text-green-700 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
                  >
                    <Leaf className="w-4 h-4" />
                    {t("iWantToSell")}
                  </button>
                  <button
                    onClick={() => {
                      setListingType("demand");
                      setImagePreviews([]);
                    }}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all ${listingType === "demand" ? "bg-white text-indigo-700 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
                  >
                    <Handshake className="w-4 h-4" />
                    {t("iWantToBuy")}
                  </button>
                </div>
              </div>

              <div className={`space-y-10`}>
                {/* Product Information Section Title */}
                <div className="border-b-2 border-gray-200 pb-4">
                  <h3 className="text-lg sm:text-xl font-heading text-gray-900 font-bold">
                    {t("productInfoSection")}
                  </h3>
                </div>

                {/* Step 1: Product Selection */}
                <div className="flex flex-col gap-[10px]">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <label className="text-[17px] font-bold text-gray-700 font-body uppercase tracking-wider">
                      1. {t("selectProduct")}
                    </label>
                    <div className="relative group w-full sm:w-72">
                      <Search
                        className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${listingType === "demand" ? "text-indigo-400 group-focus-within:text-indigo-600" : "text-green-400 group-focus-within:text-green-600"}`}
                      />
                      <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder={t("searchPlaceholder")}
                        className={`w-full bg-gray-50 border-2 ${listingType === "demand" ? "border-transparent focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 focus:bg-white" : "border-transparent focus:border-green-500/50 focus:ring-4 focus:ring-green-500/10 focus:bg-white"} px-11 py-3.5 rounded-2xl text-base outline-none transition-all font-body placeholder:text-gray-400`}
                      />
                    </div>
                  </div>

                  {searchTerm.trim() !== "" ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 animate-in slide-in-from-top-2 duration-300">
                      {searchResults.map((p) => (
                        <button
                          key={p.id}
                          onClick={() => {
                            setSelectedProduct(p.id);
                            setSearchTerm("");
                          }}
                          className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${selectedProduct === p.id ? "border-green-600 bg-green-50 shadow-sm" : "border-gray-50 bg-gray-50 hover:border-gray-100"}`}
                        >
                          <div
                            className={`w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm ${p.color}`}
                          >
                            <p.icon className="w-5 h-5" />
                          </div>
                          <span className="text-xs font-bold text-gray-700 font-body">
                            {t(p.id)}
                          </span>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                      {POPULAR_PRODUCTS.map((product) => (
                        <button
                          key={product.id}
                          onClick={() => setSelectedProduct(product.id)}
                          className={`flex flex-col items-center gap-2 p-3 rounded-2xl border-2 transition-all active:scale-95 ${selectedProduct === product.id ? "border-green-600 bg-green-50 shadow-sm ring-1 ring-green-600/20" : "border-gray-50 bg-gray-50/50 hover:border-gray-100 hover:bg-gray-50"}`}
                        >
                          <div
                            className={`w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm ${product.color}`}
                          >
                            <product.icon className="w-6 h-6" />
                          </div>
                          <span
                            className={`text-[11px] font-bold font-body ${selectedProduct === product.id ? "text-green-700" : "text-gray-500"}`}
                          >
                            {t(product.id)}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Step 2: Photo (Supply Only) */}
                {listingType === "supply" && (
                  <div className="flex flex-col gap-[10px]">
                    <div className="flex items-center justify-between">
                      <label className="text-[17px] font-bold text-gray-700 font-body uppercase tracking-tight">
                        2. {t("addPhoto")}
                      </label>
                      <span
                        className={`text-xs font-black p-1.5 rounded-lg ${imagePreviews.length >= 6 ? "bg-red-50 text-red-500" : "bg-green-50 text-green-600"}`}
                      >
                        {imagePreviews.length} / 6
                      </span>
                    </div>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                      {imagePreviews.map((preview, index) => (
                        <div
                          key={index}
                          className="relative aspect-square rounded-2xl overflow-hidden border border-gray-100 group shadow-sm animate-in zoom-in duration-300"
                        >
                          <img
                            src={preview}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                          <button
                            onClick={() => removeImage(index)}
                            className="absolute top-1.5 right-1.5 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center shadow-lg active:scale-90"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                      {imagePreviews.length < 6 && (
                        <div className="relative aspect-square">
                          <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleImageChange}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                          />
                          <div className="w-full h-full border-2 border-dashed border-gray-200 bg-gray-50 rounded-2xl flex flex-col items-center justify-center hover:border-green-500 hover:bg-green-50 transition-all">
                            <Plus className="w-6 h-6 text-gray-400 mb-1" />
                            <span className="text-[10px] font-bold text-gray-400 font-body uppercase tracking-widest">
                              {t("addPhoto")}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Step 3: Variety */}
                <div className="flex flex-col gap-[10px]">
                  <label className="text-[17px] font-bold text-gray-700 font-body uppercase tracking-tight">
                    {listingType === "supply" ? "3. " + t("productNameLabel") : "2. " + t("demandProductLabel")}
                  </label>
                  <input
                    type="text"
                    value={variety}
                    onChange={(e) => setVariety(e.target.value)}
                    placeholder={t("varietyPlaceholder")}
                    className={`w-full h-[60px] bg-gray-50 border-2 border-transparent focus:bg-white rounded-2xl px-6 outline-none focus:ring-4 transition-all text-lg font-medium font-body ${
                      listingType === "demand" 
                        ? "focus:border-indigo-500/50 focus:ring-indigo-500/10" 
                        : "focus:border-green-500/50 focus:ring-green-500/10"
                    }`}
                  />
                </div>

                {/* Price & Quantity Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-start">
                  <div className="flex flex-col gap-[10px]">
                    <label className="text-[17px] font-bold text-gray-700 font-body uppercase tracking-tight">
                      {listingType === "supply" ? "4." : "3."}{" "}
                      {listingType === "supply" ? t("pricePerUnitLabel") : t("targetPrice")}
                    </label>
                    <div className="relative h-[60px]">
                      <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder={t("negotiable")}
                        className={`w-full h-full bg-gray-50 border-2 border-transparent focus:bg-white rounded-2xl pl-6 pr-12 outline-none focus:ring-4 ${listingType === "demand" ? "focus:border-indigo-500/50 focus:ring-indigo-500/10 text-indigo-600" : "focus:border-green-500/50 focus:ring-green-500/10 text-green-600"} transition-all text-xl font-black font-body`}
                      />
                      {price !== "" && (
                        <span className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 font-black text-xl">
                          ៛
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col gap-[10px]">
                    <label className="text-[17px] font-bold text-gray-700 font-body uppercase tracking-tight">
                      {listingType === "supply" ? "5." : "4."}{" "}
                      {listingType === "supply" ? t("quantityAvailable") : t("quantityNeeded")}
                    </label>
                    <div className="relative h-[60px]">
                      <input
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        placeholder="0"
                        className={`w-full h-full bg-gray-50 border-2 border-transparent focus:bg-white rounded-2xl pl-6 pr-14 outline-none focus:ring-4 transition-all text-xl font-black font-body ${
                          listingType === "demand" 
                            ? "focus:border-indigo-500/50 focus:ring-indigo-500/10" 
                            : "focus:border-green-500/50 focus:ring-green-500/10"
                        }`}
                      />
                      <span className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 font-black italic text-sm">
                        kg
                      </span>
                    </div>
                  </div>
                </div>

                {/* Location Selection */}
                <div className="flex flex-col gap-[10px]">
                  <label className="text-[17px] font-bold text-gray-700 font-body uppercase tracking-tight">
                    {listingType === "supply" ? "6. " + t("productLocationLabel") : "5. " + t("deliveryLocation")}
                  </label>
                  <p className="text-sm text-gray-600 -mt-1.5 font-body">
                    {listingType === "supply" ? t("productLocationHelper") : t("deliveryLocationHelper")}
                  </p>
                  <select
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className={`w-full h-[60px] bg-gray-50 border-2 border-transparent focus:bg-white rounded-2xl px-6 outline-none focus:ring-4 transition-all text-lg font-medium font-body appearance-none cursor-pointer ${
                      listingType === "demand" 
                        ? "focus:border-indigo-500/50 focus:ring-indigo-500/10" 
                        : "focus:border-green-500/50 focus:ring-green-500/10"
                    }`}
                  >
                    <option value="" disabled>
                      {t("selectLocation")}
                    </option>
                    {LOCATIONS.map((loc) => (
                      <option key={loc} value={loc}>
                        {t(loc)}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Description */}
                <div className="flex flex-col gap-[10px]">
                  <label className="text-[17px] font-bold text-gray-700 font-body uppercase tracking-tight">
                    {listingType === "supply" ? "7. " + t("descriptionLabel") : "6. " + t("demandDescriptionLabel")}
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder={listingType === "demand" ? t("demandDescriptionPlaceholder") : t("descriptionPlaceholder")}
                    rows={4}
                    className={`w-full bg-gray-50 border-2 border-transparent rounded-2xl px-6 py-4 outline-none focus:bg-white focus:ring-4 transition-all text-lg font-medium font-body resize-none custom-scrollbar ${
                      listingType === "demand" 
                        ? "focus:border-indigo-500/50 focus:ring-indigo-500/10" 
                        : "focus:border-green-500/50 focus:ring-green-500/10"
                    }`}
                  />
                </div>

                {/* Final Review & Publish (Mobile Only) */}
                <div className="md:hidden pt-2 pb-10 space-y-4">
                  <div className="p-4 bg-gray-50 border border-gray-100 rounded-[32px] scale-95 origin-center">
                    {listingType === "demand" ? (
                      <DemandCard
                        category={selectedProduct || "other"}
                        variety={variety || "..."}
                        price={price ? (Number(price) || 0).toLocaleString() : ""}
                        unit="kg"
                        quantityAvailable={(Number(quantity) || 0).toLocaleString()}
                        location={location}
                        postedTime="Just now"
                        seller={{ name: "You", role: "farmer" }}
                        preview={true}
                      />
                    ) : (
                      <SupplyCard
                        image={imagePreviews[0] || ""}
                        category={selectedProduct || "other"}
                        variety={variety || "..."}
                        price={price ? (Number(price) || 0).toLocaleString() : ""}
                        unit="kg"
                        quantityAvailable={(Number(quantity) || 0).toLocaleString()}
                        location={location}
                        postedTime="Just now"
                        seller={{ name: "You", role: "farmer" }}
                        preview={true}
                      />
                    )}
                  </div>
                  <button
                    className={`w-full py-5 ${listingType === "demand" ? "bg-indigo-600 shadow-indigo-600/20" : "bg-green-600 shadow-green-600/20"} text-white rounded-[24px] font-extrabold text-xl transition-all shadow-xl active:scale-[0.98] flex items-center justify-center gap-3`}
                  >
                    {listingType === "supply" ? t("publish") : t("postDemand")}
                    <ArrowRight className="w-6 h-6" />
                  </button>
                </div>

                {/* Desktop Publisher (Preserved spacing) */}
                <div className="hidden md:block pt-4">
                  <button
                    className={`w-full py-5 ${listingType === "demand" ? "bg-indigo-600 hover:bg-indigo-700" : "bg-green-600 hover:bg-green-700"} text-white rounded-2xl font-extrabold text-xl transition-all shadow-xl active:scale-[0.98] flex items-center justify-center gap-3`}
                  >
                    {listingType === "supply" ? t("publish") : t("postDemand")}
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Preview Sidebar (Completely Hidden on Mobile) */}
        <div className="hidden md:flex w-[420px] bg-gray-50/50 p-10 flex-col items-center justify-center relative overflow-hidden shrink-0 border-l border-gray-100">
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
            <svg width="100%" height="100%">
              <pattern
                id="pattern"
                width="40"
                height="40"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M0 40L40 0M-10 10L10 -10M30 50L50 30"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </pattern>
              <rect width="100%" height="100%" fill="url(#pattern)" />
            </svg>
          </div>

          <div className="relative z-10 w-full max-w-[320px] perspective-1000">
            {listingType === "demand" ? (
              <DemandCard
                category={selectedProduct || "other"}
                variety={variety || "..."}
                price={price ? (Number(price) || 0).toLocaleString() : ""}
                unit="kg"
                quantityAvailable={(Number(quantity) || 0).toLocaleString()}
                location={location}
                postedTime="Just now"
                seller={{ name: "You", role: "farmer" }}
                preview={true}
              />
            ) : (
              <SupplyCard
                image={imagePreviews[0] || ""}
                category={selectedProduct || "other"}
                variety={variety || "..."}
                price={price ? (Number(price) || 0).toLocaleString() : ""}
                unit="kg"
                quantityAvailable={(Number(quantity) || 0).toLocaleString()}
                location={location}
                postedTime="Just now"
                seller={{ name: "You", role: "farmer" }}
                preview={true}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
