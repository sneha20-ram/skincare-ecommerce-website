import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, Truck, CreditCard, Banknote, PackageCheck, Printer } from 'lucide-react';
import { useStore, OrderDetails } from '../context/StoreContext';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    subtotal,
    discount,
    shippingCost,
    selectedSample,
    clearCart,
    confirmedOrder,
    setConfirmedOrder
  } = useStore();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'cod'>('card');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isCheckoutOpen && !confirmedOrder) return null;

  const total = subtotal - discount + shippingCost;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const newOrder: OrderDetails = {
        orderId: `LB-${Math.floor(10000 + Math.random() * 90000)}`,
        customerName: `${firstName} ${lastName}`.trim() || 'Valued Client',
        email: email || 'client@lumenbotanica.com',
        address: address || '142 Botanical Way',
        city: city || 'San Francisco',
        postalCode: postalCode || '94107',
        items: [...cart],
        subtotal,
        discount,
        shipping: shippingCost,
        total,
        sampleName: selectedSample,
        paymentMethod: paymentMethod === 'cod' ? 'Cash on Delivery (COD)' : 'Encrypted Credit Card (**** 4242)',
        date: new Date().toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric'
        })
      };

      setConfirmedOrder(newOrder);
      clearCart();
      setIsSubmitting(false);
    }, 1200);
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    setConfirmedOrder(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="fixed inset-0" onClick={handleClose} />

      <div className="relative w-full max-w-3xl bg-[#FAF9F5] border border-[#DDD8CD] shadow-2xl rounded-xs overflow-hidden z-10 max-h-[92vh] flex flex-col">
        
        {/* Modal Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E8E4DA] bg-[#F4F1EA]">
          <div className="flex items-center gap-2">
            <span className="font-serif-luxury text-xl text-[#1E1D1A] font-medium tracking-wide">
              {confirmedOrder ? 'Order Confirmation & Receipt' : 'Checkout & Dispatch'}
            </span>
          </div>

          <button
            onClick={handleClose}
            className="p-1.5 text-[#5C574F] hover:text-[#1C1B18] transition-colors rounded-xs"
            aria-label="Close checkout"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-8 overflow-y-auto">
          {confirmedOrder ? (
            /* Post-Order Confirmation & Receipt Summary */
            <div className="space-y-6">
              
              <div className="text-center py-4 border-b border-[#E8E4DA] space-y-2">
                <div className="w-12 h-12 bg-[#EFF5EA] text-[#4A5D37] rounded-full flex items-center justify-center mx-auto mb-2">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <div className="text-xs uppercase tracking-widest text-[#4A5D37] font-semibold">
                  Order Successfully Verified & Placed
                </div>
                <h2 className="font-serif-luxury text-3xl text-[#1E1D1A] font-medium">
                  Thank You, {confirmedOrder.customerName}
                </h2>
                <p className="text-xs text-[#6B665D]">
                  Order confirmation and carbon-neutral tracking have been dispatched to <strong>{confirmedOrder.email}</strong>.
                </p>
              </div>

              {/* Order Reference Badge & Dispatch Timeline */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div className="p-3 bg-white border border-[#E5E1D7] rounded-xs">
                  <div className="text-[#807B72] uppercase tracking-wider text-[10px] font-semibold">Order ID</div>
                  <div className="font-serif-luxury text-lg text-[#1C1B18] font-bold tabular-nums">
                    #{confirmedOrder.orderId}
                  </div>
                </div>

                <div className="p-3 bg-white border border-[#E5E1D7] rounded-xs">
                  <div className="text-[#807B72] uppercase tracking-wider text-[10px] font-semibold">Est. Delivery</div>
                  <div className="text-sm font-semibold text-[#1C1B18] flex items-center gap-1.5 mt-0.5">
                    <Truck className="w-4 h-4 text-[#5A6349]" /> 2–4 Business Days
                  </div>
                </div>

                <div className="p-3 bg-white border border-[#E5E1D7] rounded-xs">
                  <div className="text-[#807B72] uppercase tracking-wider text-[10px] font-semibold">Payment Status</div>
                  <div className="text-sm font-semibold text-[#1C1B18] mt-0.5">
                    {confirmedOrder.paymentMethod.includes('COD') ? 'Cash on Delivery' : 'Paid · SSL Verified'}
                  </div>
                </div>
              </div>

              {/* Receipt Breakdown */}
              <div className="border border-[#E2DDD2] bg-white rounded-xs p-5 space-y-4">
                <div className="text-xs uppercase tracking-wider font-semibold text-[#2D2A26] border-b border-[#EFECE6] pb-2">
                  Order Manifest Summary
                </div>

                <div className="space-y-3">
                  {confirmedOrder.items.map((item) => (
                    <div key={item.product.id} className="flex justify-between text-xs items-center">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold tabular-nums text-[#6E6960]">{item.quantity}x</span>
                        <span className="text-[#1C1B18] font-medium">{item.product.name}</span>
                        <span className="text-[#787268]">({item.product.volume})</span>
                      </div>
                      <span className="tabular-nums font-semibold text-[#1C1B18]">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}

                  <div className="flex justify-between text-xs items-center text-[#556345] pt-1">
                    <span>Deluxe Complimentary Sample: {confirmedOrder.sampleName}</span>
                    <span className="font-semibold uppercase tracking-wider text-[11px]">Free</span>
                  </div>
                </div>

                {/* Financial Summary */}
                <div className="border-t border-[#EFECE6] pt-3 space-y-1.5 text-xs text-[#524E46]">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="tabular-nums font-medium text-[#1C1B18]">${confirmedOrder.subtotal.toFixed(2)}</span>
                  </div>
                  {confirmedOrder.discount > 0 && (
                    <div className="flex justify-between text-[#4A5D37]">
                      <span>Discount Applied</span>
                      <span className="tabular-nums font-medium">-${confirmedOrder.discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Carbon-Neutral Dispatch</span>
                    <span className="tabular-nums font-medium">
                      {confirmedOrder.shipping === 0 ? 'FREE' : `$${confirmedOrder.shipping.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-base font-bold text-[#1C1B18] pt-2 border-t border-[#EFECE6]">
                    <span>Grand Total</span>
                    <span className="tabular-nums">${confirmedOrder.total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="text-xs text-[#736E66] pt-2 border-t border-[#EFECE6]">
                  <strong>Dispatch Address:</strong> {confirmedOrder.address}, {confirmedOrder.city}, {confirmedOrder.postalCode}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={() => window.print()}
                  className="px-5 py-2.5 bg-[#FAF8F5] border border-[#DDD8CD] text-[#24221F] text-xs uppercase tracking-wider font-semibold hover:bg-[#EBE7DD] transition-colors rounded-xs flex items-center justify-center gap-2"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Receipt</span>
                </button>

                <button
                  onClick={handleClose}
                  className="flex-grow px-5 py-2.5 bg-[#24221F] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#3D3A35] transition-colors rounded-xs text-center"
                >
                  Return to Formulations Shelf
                </button>
              </div>

            </div>
          ) : (
            /* Checkout Form */
            <form onSubmit={handleSubmitOrder} className="space-y-6">
              
              {/* Contact Information */}
              <div className="space-y-3">
                <div className="text-xs uppercase tracking-wider font-semibold text-[#2D2A26] border-b border-[#E8E4DA] pb-1.5">
                  1. Contact Information
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block text-[#524E46] mb-1 font-medium">First Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Eleanor"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full bg-white border border-[#DDD8CD] px-3 py-2 rounded-xs focus:outline-hidden focus:border-[#736E64]"
                    />
                  </div>

                  <div>
                    <label className="block text-[#524E46] mb-1 font-medium">Last Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Vance"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full bg-white border border-[#DDD8CD] px-3 py-2 rounded-xs focus:outline-hidden focus:border-[#736E64]"
                    />
                  </div>

                  <div>
                    <label className="block text-[#524E46] mb-1 font-medium">Email Address (for tracking) *</label>
                    <input
                      type="email"
                      required
                      placeholder="eleanor@botanica.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-white border border-[#DDD8CD] px-3 py-2 rounded-xs focus:outline-hidden focus:border-[#736E64]"
                    />
                  </div>

                  <div>
                    <label className="block text-[#524E46] mb-1 font-medium">Phone Number (delivery updates) *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+1 (555) 349-2018"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-white border border-[#DDD8CD] px-3 py-2 rounded-xs focus:outline-hidden focus:border-[#736E64]"
                    />
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="space-y-3">
                <div className="text-xs uppercase tracking-wider font-semibold text-[#2D2A26] border-b border-[#E8E4DA] pb-1.5">
                  2. Shipping Destination
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block text-[#524E46] mb-1 font-medium">Street Address *</label>
                    <input
                      type="text"
                      required
                      placeholder="742 Evergreen Terrace, Suite 4B"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full bg-white border border-[#DDD8CD] px-3 py-2 rounded-xs focus:outline-hidden focus:border-[#736E64]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[#524E46] mb-1 font-medium">City / Municipality *</label>
                      <input
                        type="text"
                        required
                        placeholder="Portland"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full bg-white border border-[#DDD8CD] px-3 py-2 rounded-xs focus:outline-hidden focus:border-[#736E64]"
                      />
                    </div>

                    <div>
                      <label className="block text-[#524E46] mb-1 font-medium">Postal / Zip Code *</label>
                      <input
                        type="text"
                        required
                        placeholder="97201"
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                        className="w-full bg-white border border-[#DDD8CD] px-3 py-2 rounded-xs focus:outline-hidden focus:border-[#736E64]"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="space-y-3">
                <div className="text-xs uppercase tracking-wider font-semibold text-[#2D2A26] border-b border-[#E8E4DA] pb-1.5 flex items-center justify-between">
                  <span>3. Payment Selection</span>
                  <span className="text-[11px] font-normal text-[#5A6349] flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" /> 256-Bit TLS Secured
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  {/* Card Option */}
                  <label
                    onClick={() => setPaymentMethod('card')}
                    className={`p-3.5 border rounded-xs cursor-pointer transition-all flex items-start gap-3 ${
                      paymentMethod === 'card'
                        ? 'border-[#24221F] bg-white shadow-xs'
                        : 'border-[#DDD8CD] bg-[#F7F5F0] hover:bg-white'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === 'card'}
                      onChange={() => setPaymentMethod('card')}
                      className="mt-0.5"
                    />
                    <div>
                      <div className="font-semibold text-[#1C1B18] flex items-center gap-1.5">
                        <CreditCard className="w-4 h-4 text-[#5A6349]" /> Credit / Debit Card
                      </div>
                      <div className="text-[11px] text-[#736E66] mt-0.5">
                        Visa, Mastercard, Amex, Apple Pay
                      </div>
                    </div>
                  </label>

                  {/* Cash on Delivery Option */}
                  <label
                    onClick={() => setPaymentMethod('cod')}
                    className={`p-3.5 border rounded-xs cursor-pointer transition-all flex items-start gap-3 ${
                      paymentMethod === 'cod'
                        ? 'border-[#24221F] bg-white shadow-xs'
                        : 'border-[#DDD8CD] bg-[#F7F5F0] hover:bg-white'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                      className="mt-0.5"
                    />
                    <div>
                      <div className="font-semibold text-[#1C1B18] flex items-center gap-1.5">
                        <Banknote className="w-4 h-4 text-[#5A6349]" /> Cash on Delivery (COD)
                      </div>
                      <div className="text-[11px] text-[#736E66] mt-0.5">
                        Pay upon courier arrival at your doorstep
                      </div>
                    </div>
                  </label>
                </div>

                {paymentMethod === 'card' && (
                  <div className="p-4 bg-white border border-[#DDD8CD] rounded-xs space-y-3 text-xs mt-2">
                    <div>
                      <label className="block text-[#524E46] mb-1 font-medium">Card Number</label>
                      <input
                        type="text"
                        placeholder="•••• •••• •••• 4242"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full bg-[#FAF9F5] border border-[#DDD8CD] px-3 py-2 rounded-xs focus:outline-hidden"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[#524E46] mb-1 font-medium">Expiration (MM/YY)</label>
                        <input
                          type="text"
                          placeholder="12/28"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          className="w-full bg-[#FAF9F5] border border-[#DDD8CD] px-3 py-2 rounded-xs focus:outline-hidden"
                        />
                      </div>
                      <div>
                        <label className="block text-[#524E46] mb-1 font-medium">CVC / Security Code</label>
                        <input
                          type="text"
                          placeholder="842"
                          value={cardCvc}
                          onChange={(e) => setCardCvc(e.target.value)}
                          className="w-full bg-[#FAF9F5] border border-[#DDD8CD] px-3 py-2 rounded-xs focus:outline-hidden"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Order Final Overview */}
              <div className="p-4 bg-[#F2EFE9] border border-[#DDD8CD] rounded-xs space-y-2 text-xs">
                <div className="flex justify-between text-[#524E46]">
                  <span>Subtotal ({cart.length} items)</span>
                  <span className="tabular-nums font-semibold text-[#1C1B18]">${subtotal.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-[#4A5D37]">
                    <span>Introductory Discount</span>
                    <span className="tabular-nums font-semibold">-${discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-[#524E46]">
                  <span>Carbon-Neutral Delivery</span>
                  <span className="tabular-nums font-semibold">
                    {shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-base font-bold text-[#1C1B18] pt-2 border-t border-[#DDD8CD]">
                  <span>Final Total to Authorize</span>
                  <span className="tabular-nums">${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-[#24221F] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#3D3A35] transition-colors rounded-xs flex items-center justify-center gap-2 shadow-sm"
              >
                {isSubmitting ? (
                  <span>Verifying & Placing Dispatch Request...</span>
                ) : (
                  <span>Complete Order · ${total.toFixed(2)}</span>
                )}
              </button>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};
