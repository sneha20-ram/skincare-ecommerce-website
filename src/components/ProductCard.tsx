import React, { useState } from 'react';
import { Heart, Plus, Eye, Check } from 'lucide-react';
import { Product } from '../data/products';
import { useStore } from '../context/StoreContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, toggleWishlist, isInWishlist, setActiveProductModal } = useStore();
  const [imageError, setImageError] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const isFavorited = isInWishlist(product.id);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1400);
  };

  const handleCardClick = () => {
    setActiveProductModal(product);
  };

  return (
    <div
      onClick={handleCardClick}
      className="group relative bg-[#FDFCFA] border border-[#EBE7DF] rounded-xs flex flex-col justify-between overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-[#D5CFC2]"
    >
      {/* Visual Slot */}
      <div className="relative aspect-[4/3] bg-[#F3EFE8] overflow-hidden">
        {!imageError ? (
          <img
            src={product.image}
            alt={product.name}
            onError={() => setImageError(true)}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-500 ease-out"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-[#EDE8DE] p-6 text-center text-[#736F66]">
            <span className="font-serif-luxury text-xl mb-1">{product.name}</span>
            <span className="text-xs uppercase tracking-wider">{product.category}</span>
          </div>
        )}

        {/* Quiet Top Tag */}
        {product.tag && (
          <div className="absolute top-3 left-3 bg-[#FAF8F5]/90 backdrop-blur-xs px-2.5 py-1 text-[11px] font-medium tracking-wider uppercase text-[#383530] border border-[#E3DFD5]">
            {product.tag}
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-xs transition-colors ${
            isFavorited
              ? 'bg-[#FAF8F5] text-[#9A4E38]'
              : 'bg-[#FAF8F5]/80 text-[#5C5850] hover:text-[#1F1E1B] hover:bg-[#FAF8F5]'
          }`}
          aria-label={isFavorited ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart className={`w-4 h-4 ${isFavorited ? 'fill-[#9A4E38]' : ''}`} />
        </button>

        {/* Quick View Overlay Button */}
        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/40 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setActiveProductModal(product);
            }}
            className="w-full py-2 bg-white/95 backdrop-blur-sm text-[#1C1B18] text-xs font-semibold uppercase tracking-wider hover:bg-white transition-colors flex items-center justify-center gap-1.5 shadow-sm"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View & Efficacy</span>
          </button>
        </div>
      </div>

      {/* Card Content & Metadata */}
      <div className="p-5 flex flex-col flex-grow justify-between space-y-4">
        <div className="space-y-2">
          {/* Clean Unboxed Metadata with Typographic Separator */}
          <div className="flex items-center justify-between text-xs text-[#7A756D] uppercase tracking-wider font-medium">
            <span>{product.category}</span>
            <span aria-hidden="true">·</span>
            <span>{product.volume}</span>
          </div>

          {/* Product Title */}
          <h3 className="font-serif-luxury text-xl text-[#1E1D1A] font-medium leading-snug group-hover:text-[#4A5538] transition-colors">
            {product.name}
          </h3>

          {/* Key Actives Snippet */}
          <p className="text-xs text-[#635E55] line-clamp-2 leading-relaxed">
            {product.keyActives.join(' · ')}
          </p>
        </div>

        {/* Price & Action Row */}
        <div className="pt-3 border-t border-[#EFECE6] flex items-center justify-between">
          <div>
            <span className="text-base font-semibold text-[#1C1B18] tabular-nums tracking-tight">
              ${product.price}.00
            </span>
            <div className="text-[11px] text-[#7A756D]">
              ★ {product.rating} ({product.reviewCount})
            </div>
          </div>

          <button
            onClick={handleQuickAdd}
            disabled={justAdded}
            className={`px-3.5 py-2 text-xs font-semibold uppercase tracking-wider rounded-xs transition-all flex items-center gap-1.5 ${
              justAdded
                ? 'bg-[#505E3C] text-white'
                : 'bg-[#2B2925] text-white hover:bg-[#433F3A]'
            }`}
          >
            {justAdded ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
