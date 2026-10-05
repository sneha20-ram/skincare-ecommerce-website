import React, { useState } from 'react';
import { X, ShoppingBag, Trash2, ArrowRight, Sparkles, Tag, Check } from 'lucide-react';
import { useStore, LUXURY_SAMPLES } from '../context/StoreContext';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    removeFromCart,
    updateQuantity,
    subtotal,
    discount,
    discountCode,
    applyDiscountCode,
    removeDiscountCode,
    shippingCost,
    freeShippingThreshold,
    selectedSample,
    setSelectedSample,
    setIsCheckoutOpen
  } = useStore();

  const [promoInput, setPromoInput] = useState('');
  const [promoFeedback, setPromoFeedback] = useState<{ success: boolean; message: string } | null>(null);

  if (!isCartOpen) return null;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const res = applyDiscountCode(promoInput);
    setPromoFeedback(res);
    if (res.success) setPromoInput('');
  };

  const amountUntilFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const freeShippingPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  const total = subtotal - discount + shippingCost;

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF9F5] border-l border-[#DDD8CD] shadow-2xl flex flex-col justify-between">
          
          {/* Drawer Top Header */}
          <div className="p-6 border-b border-[#E8E4DA] bg-[#F4F1EA]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-[#2B2925]" />
                <h3 className="font-serif-luxury text-xl text-[#1E1D1A] font-medium">
                  Your Formulation Bag
                </h3>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-1.5 text-[#5C574F] hover:text-[#1C1B18] transition-colors"
                aria-label="Close bag"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Free Shipping Progress Indicator */}
            <div className="mt-4 pt-3 border-t border-[#DDD8CC] space-y-1.5">
              <div className="flex items-center justify-between text-xs text-[#524E46]">
                {amountUntilFreeShipping === 0 ? (
                  <span className="font-semibold text-[#4B5E38] flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> Free carbon-neutral shipping unlocked!
                  </span>
                ) : (
                  <span>
                    Add <strong className="text-[#1C1B18] tabular-nums">${amountUntilFreeShipping.toFixed(2)}</strong> for free shipping
                  </span>
                )}
                <span className="tabular-nums font-semibold">{freeShippingPercent}%</span>
              </div>
              <div className="w-full h-1.5 bg-[#E2DDD2] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#525E3F] transition-all duration-300"
                  style={{ width: `${freeShippingPercent}%` }}
                />
              </div>
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="py-16 text-center space-y-3">
                <ShoppingBag className="w-10 h-10 text-[#A6A095] mx-auto stroke-1" />
                <p className="font-serif-luxury text-xl text-[#2B2925]">Your bag is empty</p>
                <p className="text-xs text-[#736E66] max-w-xs mx-auto">
                  Explore our pure cellular lipid serums and botanical creams.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-2 px-5 py-2.5 bg-[#2B2925] text-white text-xs uppercase tracking-wider font-semibold hover:bg-[#433F3A] transition-colors rounded-xs"
                >
                  Discover Formulations
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map((item) => (
                  <div
                    key={item.product.id}
                    className="p-3 bg-white border border-[#E8E4DA] rounded-xs flex gap-3 items-center"
                  >
                    {/* Item Thumbnail */}
                    <div className="w-16 h-16 bg-[#F3EFE8] rounded-xs overflow-hidden shrink-0 border border-[#DDD8CD]">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    {/* Item Info */}
                    <div className="flex-grow min-w-0">
                      <div className="text-[10px] text-[#7A756D] uppercase tracking-wider font-semibold">
                        {item.product.category}
                      </div>
                      <h4 className="text-xs font-semibold text-[#1C1B18] truncate">
                        {item.product.name}
                      </h4>
                      <div className="text-xs font-medium text-[#2B2925] tabular-nums mt-0.5">
                        ${item.product.price}.00
                      </div>

                      {/* Quantity Stepper */}
                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex items-center border border-[#DDD8CD] rounded-xs bg-[#FAF9F5]">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="px-2 py-0.5 text-xs text-[#524E46] hover:bg-[#EBE7DF]"
                            aria-label="Decrease"
                          >
                            -
                          </button>
                          <span className="px-2 py-0.5 text-xs font-semibold tabular-nums">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="px-2 py-0.5 text-xs text-[#524E46] hover:bg-[#EBE7DF]"
                            aria-label="Increase"
                          >
                            +
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="p-1 text-[#8C867C] hover:text-[#9A4E38] transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="text-xs font-semibold text-[#1C1B18] tabular-nums self-start pt-1">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}

                {/* Complimentary Luxury Sample Selection */}
                <div className="p-3 bg-[#F2EFE9] border border-[#DDD8CD] rounded-xs space-y-2 mt-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-[#2D2A26] flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#5A6349]" />
                      Complimentary Luxury Sample
                    </span>
                    <span className="text-[10px] uppercase font-bold text-[#5A6349] tracking-wider">
                      Free ($0.00)
                    </span>
                  </div>
                  
                  <select
                    value={selectedSample}
                    onChange={(e) => setSelectedSample(e.target.value)}
                    className="w-full bg-white border border-[#DDD8CD] text-[#2D2A26] text-xs rounded-xs p-2 focus:outline-hidden focus:border-[#736E64]"
                  >
                    {LUXURY_SAMPLES.map((sample) => (
                      <option key={sample} value={sample}>
                        {sample}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}
          </div>

          {/* Drawer Bottom Footer with Checkout Calculation */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-[#E8E4DA] bg-[#F4F1EA] space-y-4">
              
              {/* Promo Code Input */}
              <form onSubmit={handleApplyPromo} className="space-y-1">
                <div className="flex gap-2">
                  <div className="relative flex-grow">
                    <Tag className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-[#7A756D]" />
                    <input
                      type="text"
                      placeholder="Promo code (try BOTANICA15)"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      className="w-full bg-white border border-[#DDD8CD] pl-8 pr-3 py-1.5 text-xs text-[#2D2A26] rounded-xs uppercase tracking-wider focus:outline-hidden focus:border-[#736E64]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-3 py-1.5 bg-[#2B2925] text-white text-xs font-semibold uppercase tracking-wider rounded-xs hover:bg-[#433F3A]"
                  >
                    Apply
                  </button>
                </div>

                {discountCode && (
                  <div className="flex items-center justify-between text-xs text-[#4A5D37] pt-1">
                    <span>Active code: <strong>{discountCode}</strong></span>
                    <button
                      type="button"
                      onClick={removeDiscountCode}
                      className="text-[#9A4E38] underline text-[11px]"
                    >
                      Remove
                    </button>
                  </div>
                )}

                {promoFeedback && !discountCode && (
                  <div className="text-xs text-[#9A4E38] pt-1">
                    {promoFeedback.message}
                  </div>
                )}
              </form>

              {/* Price Calculation */}
              <div className="space-y-1.5 text-xs text-[#524E46] pt-1 border-t border-[#DDD8CD]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="tabular-nums font-medium text-[#1C1B18]">${subtotal.toFixed(2)}</span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-[#4A5D37]">
                    <span>Promotional Savings</span>
                    <span className="tabular-nums font-medium">-${discount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Carbon-Neutral Shipping</span>
                  <span className="tabular-nums font-medium">
                    {shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}
                  </span>
                </div>

                <div className="flex justify-between text-base font-semibold text-[#1C1B18] pt-2 border-t border-[#DDD8CD]">
                  <span>Total</span>
                  <span className="tabular-nums">${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout Action Button */}
              <button
                onClick={handleProceedToCheckout}
                className="w-full py-3.5 bg-[#24221F] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#3D3A35] transition-colors rounded-xs flex items-center justify-center gap-2 shadow-xs"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-center text-[10px] text-[#787268] tracking-wider uppercase">
                Encrypted 256-Bit SSL Checkout · Cash on Delivery Supported
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
