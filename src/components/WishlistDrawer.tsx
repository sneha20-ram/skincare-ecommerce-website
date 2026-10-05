import React from 'react';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS } from '../data/products';

export const WishlistDrawer: React.FC = () => {
  const { isWishlistOpen, setIsWishlistOpen, wishlist, toggleWishlist, addToCart } = useStore();

  if (!isWishlistOpen) return null;

  const wishlistProducts = PRODUCTS.filter(p => wishlist.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={() => setIsWishlistOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF9F5] border-l border-[#DDD8CD] shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-6 border-b border-[#E8E4DA] bg-[#F4F1EA] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-[#9A4E38]" />
              <h3 className="font-serif-luxury text-xl text-[#1E1D1A] font-medium">
                Saved Formulations ({wishlist.length})
              </h3>
            </div>
            <button
              onClick={() => setIsWishlistOpen(false)}
              className="p-1.5 text-[#5C574F] hover:text-[#1C1B18] transition-colors"
              aria-label="Close wishlist"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {wishlistProducts.length === 0 ? (
              <div className="py-16 text-center space-y-3">
                <Heart className="w-10 h-10 text-[#A6A095] mx-auto stroke-1" />
                <p className="font-serif-luxury text-xl text-[#2B2925]">No saved formulations</p>
                <p className="text-xs text-[#736E66] max-w-xs mx-auto">
                  Click the heart icon on any botanical serum or cream to curate your personal shelf.
                </p>
                <button
                  onClick={() => setIsWishlistOpen(false)}
                  className="mt-2 px-5 py-2.5 bg-[#2B2925] text-white text-xs uppercase tracking-wider font-semibold hover:bg-[#433F3A] transition-colors rounded-xs"
                >
                  Explore Formulations
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {wishlistProducts.map((prod) => (
                  <div
                    key={prod.id}
                    className="p-3 bg-white border border-[#E8E4DA] rounded-xs flex gap-3 items-center"
                  >
                    <div className="w-16 h-16 bg-[#F3EFE8] rounded-xs overflow-hidden shrink-0 border border-[#DDD8CD]">
                      <img
                        src={prod.image}
                        alt={prod.name}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    <div className="flex-grow min-w-0">
                      <div className="text-[10px] text-[#7A756D] uppercase tracking-wider font-semibold">
                        {prod.category} · {prod.volume}
                      </div>
                      <h4 className="text-xs font-semibold text-[#1C1B18] truncate">
                        {prod.name}
                      </h4>
                      <div className="text-xs font-semibold text-[#1C1B18] tabular-nums mt-0.5">
                        ${prod.price}.00
                      </div>

                      <div className="flex items-center gap-3 mt-2">
                        <button
                          onClick={() => {
                            addToCart(prod, 1);
                          }}
                          className="px-2.5 py-1 bg-[#24221F] text-white text-[11px] uppercase tracking-wider font-semibold rounded-xs hover:bg-[#3D3A35] flex items-center gap-1"
                        >
                          <ShoppingBag className="w-3 h-3" />
                          <span>Move to Bag</span>
                        </button>

                        <button
                          onClick={() => toggleWishlist(prod.id)}
                          className="text-xs text-[#8C867C] hover:text-[#9A4E38] transition-colors flex items-center gap-1"
                        >
                          <Trash2 className="w-3 h-3" />
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {wishlistProducts.length > 0 && (
            <div className="p-6 border-t border-[#E8E4DA] bg-[#F4F1EA]">
              <button
                onClick={() => {
                  wishlistProducts.forEach(p => addToCart(p, 1));
                  setIsWishlistOpen(false);
                }}
                className="w-full py-3 bg-[#24221F] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#3D3A35] transition-colors rounded-xs"
              >
                Add All Saved to Bag
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
