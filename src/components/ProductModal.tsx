import React, { useState } from 'react';
import { X, Heart, Star, Check, Shield, Droplets, Sparkles, Send } from 'lucide-react';
import { Product, Review } from '../data/products';
import { useStore } from '../context/StoreContext';

interface ProductModalProps {
  product: Product;
  onClose: () => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({ product, onClose }) => {
  const { addToCart, toggleWishlist, isInWishlist } = useStore();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'efficacy' | 'ritual' | 'inci' | 'reviews'>('efficacy');
  const [reviewsList, setReviewsList] = useState<Review[]>(product.reviews);
  const [showAddReview, setShowAddReview] = useState(false);
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewTitle, setNewReviewTitle] = useState('');
  const [newReviewComment, setNewReviewComment] = useState('');
  const [newReviewSkinType, setNewReviewSkinType] = useState('Combination');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const [addedNotice, setAddedNotice] = useState(false);

  const isFavorited = isInWishlist(product.id);

  const handleAdd = () => {
    addToCart(product, quantity);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2000);
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewAuthor.trim() || !newReviewComment.trim()) return;

    const newRev: Review = {
      id: `user-rev-${Date.now()}`,
      author: newReviewAuthor.trim(),
      rating: newReviewRating,
      date: 'Just now',
      title: newReviewTitle.trim() || 'Verified Experience',
      comment: newReviewComment.trim(),
      verified: true,
      skinType: newReviewSkinType
    };

    setReviewsList([newRev, ...reviewsList]);
    setReviewSubmitted(true);
    setNewReviewAuthor('');
    setNewReviewTitle('');
    setNewReviewComment('');
    setTimeout(() => {
      setShowAddReview(false);
      setReviewSubmitted(false);
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm overflow-y-auto">
      {/* Click outside backdrop */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Modal Container */}
      <div className="relative w-full max-w-4xl bg-[#FAF9F5] border border-[#DDD8CD] shadow-2xl rounded-xs overflow-hidden z-10 max-h-[92vh] flex flex-col">
        
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E8E4DA] bg-[#F4F1EA]">
          <div className="text-xs uppercase tracking-widest text-[#787268] font-medium flex items-center gap-2">
            <span>{product.category}</span>
            <span aria-hidden="true">·</span>
            <span>{product.volume}</span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-[#59554E] hover:text-[#1F1E1B] transition-colors rounded-xs"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-8">
          
          {/* Top Section: Split Image and Contiguous Purchase Module */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            
            {/* Left: Product Image */}
            <div className="md:col-span-6 aspect-[4/3] bg-[#EBE7DF] rounded-xs overflow-hidden border border-[#DED9CE]">
              <img
                src={product.image}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center"
              />
            </div>

            {/* Right: Contiguous Purchase Module */}
            <div className="md:col-span-6 space-y-4">
              {product.tag && (
                <span className="text-xs uppercase tracking-wider font-semibold text-[#5A6349] block">
                  {product.tag}
                </span>
              )}

              <h2 className="font-serif-luxury text-2xl sm:text-3xl text-[#1E1D1A] font-medium leading-tight">
                {product.name}
              </h2>

              <p className="text-xs text-[#706B62] italic leading-relaxed">
                {product.subtitle}
              </p>

              {/* Price and Rating baseline */}
              <div className="flex items-center justify-between pt-2 border-t border-[#E8E4DA]">
                <div className="text-2xl font-serif-luxury font-semibold text-[#1C1B18] tabular-nums">
                  ${product.price}.00
                </div>
                <div className="flex items-center gap-1 text-xs text-[#524E46]">
                  <div className="flex text-[#B38D46]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="font-semibold tabular-nums ml-1">{product.rating}</span>
                  <span className="text-[#878278]">({reviewsList.length} reviews)</span>
                </div>
              </div>

              <p className="text-xs text-[#59554E] leading-relaxed">
                {product.description}
              </p>

              {/* Key Actives Pill-Free List */}
              <div className="pt-2 text-xs text-[#635E56] space-y-1">
                <span className="font-semibold uppercase tracking-wider text-[#383530] block">
                  Cellular Actives:
                </span>
                <p className="leading-relaxed">
                  {product.keyActives.join(' · ')}
                </p>
              </div>

              {/* Quantity Stepper & Buy Action Button */}
              <div className="pt-4 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-[#CEC8BB] bg-white rounded-xs">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-2 text-sm text-[#4A4742] hover:bg-[#F2EFE9] transition-colors"
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                    <span className="px-3 py-2 text-xs font-semibold tabular-nums min-w-[2rem] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 py-2 text-sm text-[#4A4742] hover:bg-[#F2EFE9] transition-colors"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={handleAdd}
                    className={`flex-grow py-3 px-6 text-xs uppercase tracking-widest font-semibold transition-all rounded-xs flex items-center justify-center gap-2 ${
                      addedNotice
                        ? 'bg-[#4B5E38] text-white'
                        : 'bg-[#24221F] text-white hover:bg-[#3D3A35]'
                    }`}
                  >
                    {addedNotice ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Added to Bag</span>
                      </>
                    ) : (
                      <span>Add to Bag · ${(product.price * quantity).toFixed(2)}</span>
                    )}
                  </button>

                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className={`p-3 border rounded-xs transition-colors ${
                      isFavorited
                        ? 'border-[#9A4E38] bg-[#FCEEEA] text-[#9A4E38]'
                        : 'border-[#CEC8BB] bg-white text-[#524E47] hover:text-[#1C1B18]'
                    }`}
                    aria-label="Save to Wishlist"
                  >
                    <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
                  </button>
                </div>

                <div className="flex items-center justify-between text-[11px] text-[#736E66] pt-1">
                  <span className="flex items-center gap-1">
                    <Shield className="w-3 h-3 text-[#5A6349]" /> 100% Satisfaction Guarantee
                  </span>
                  <span>Free Samples Included</span>
                </div>
              </div>

            </div>

          </div>

          {/* Deep-Dive Tab Navigation */}
          <div className="border-t border-[#E8E4DA] pt-6">
            <div className="flex border-b border-[#DDD8CD] gap-6 text-xs uppercase tracking-wider font-semibold">
              <button
                onClick={() => setActiveTab('efficacy')}
                className={`pb-3 transition-colors relative ${
                  activeTab === 'efficacy'
                    ? 'text-[#1F1E1B] border-b-2 border-[#24221F]'
                    : 'text-[#7D786F] hover:text-[#24221F]'
                }`}
              >
                Clinical Study & Proof
              </button>
              <button
                onClick={() => setActiveTab('ritual')}
                className={`pb-3 transition-colors relative ${
                  activeTab === 'ritual'
                    ? 'text-[#1F1E1B] border-b-2 border-[#24221F]'
                    : 'text-[#7D786F] hover:text-[#24221F]'
                }`}
              >
                Ritual Application
              </button>
              <button
                onClick={() => setActiveTab('inci')}
                className={`pb-3 transition-colors relative ${
                  activeTab === 'inci'
                    ? 'text-[#1F1E1B] border-b-2 border-[#24221F]'
                    : 'text-[#7D786F] hover:text-[#24221F]'
                }`}
              >
                Full INCI Ingredients
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`pb-3 transition-colors relative ${
                  activeTab === 'reviews'
                    ? 'text-[#1F1E1B] border-b-2 border-[#24221F]'
                    : 'text-[#7D786F] hover:text-[#24221F]'
                }`}
              >
                Verified Reviews ({reviewsList.length})
              </button>
            </div>

            {/* Tab Contents */}
            <div className="py-6">
              
              {/* Tab 1: Clinical Efficacy */}
              {activeTab === 'efficacy' && (
                <div className="space-y-4">
                  <div className="p-4 bg-[#F2EFE9] border border-[#DDD8CD] rounded-xs space-y-2">
                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#4A5538]">
                      <Sparkles className="w-4 h-4" />
                      Third-Party Clinical Validation
                    </div>
                    <p className="text-sm text-[#2D2A26] font-medium leading-relaxed">
                      "{product.clinicalProof}"
                    </p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-xs text-[#524E46]">
                    <div className="p-3 bg-white border border-[#E5E1D7] rounded-xs">
                      <div className="font-semibold text-[#1C1B18] mb-1">Dermatologist Verified</div>
                      Certified non-irritating and suitable for post-laser & retinoid-sensitized skin.
                    </div>
                    <div className="p-3 bg-white border border-[#E5E1D7] rounded-xs">
                      <div className="font-semibold text-[#1C1B18] mb-1">Microbiome Balanced</div>
                      Preserves beneficial cutaneous flora and maintains optimal stratum corneum pH (5.2).
                    </div>
                    <div className="p-3 bg-white border border-[#E5E1D7] rounded-xs">
                      <div className="font-semibold text-[#1C1B18] mb-1">Clean Extraction</div>
                      Supercritical carbon dioxide and cold-bio filtration without hexane solvents.
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 2: Ritual Application */}
              {activeTab === 'ritual' && (
                <div className="space-y-4 text-xs text-[#4F4B44]">
                  <div className="flex items-center gap-3">
                    <span className="font-semibold uppercase tracking-wider text-[#24221F]">
                      Placement in Routine:
                    </span>
                    <span className="bg-[#EBE7DD] text-[#24221F] px-2.5 py-1 font-medium rounded-xs">
                      {product.ritual.step}
                    </span>
                    <span className="text-[#787268]">
                      ( {product.ritual.am ? 'AM' : ''} {product.ritual.am && product.ritual.pm ? '·' : ''} {product.ritual.pm ? 'PM' : ''} )
                    </span>
                  </div>

                  <div className="p-4 bg-white border border-[#E2DDD2] rounded-xs">
                    <div className="font-semibold text-[#1F1E1B] mb-1 uppercase tracking-wider">
                      Sensory Method
                    </div>
                    <p className="text-sm leading-relaxed text-[#383530]">
                      {product.ritual.instructions}
                    </p>
                  </div>

                  <div className="text-[11px] text-[#787268] italic">
                    Pro-tip: For maximum bio-absorption, apply immediately after misting or showering while the skin is still slightly dewy with hydration.
                  </div>
                </div>
              )}

              {/* Tab 3: INCI Ingredients */}
              {activeTab === 'inci' && (
                <div className="space-y-4">
                  <p className="text-xs text-[#6B665E] leading-relaxed">
                    We believe in complete ingredient transparency. Every botanical extract is ethically wild-harvested or organically cultivated.
                  </p>
                  <div className="flex flex-wrap gap-1.5 text-xs text-[#383530]">
                    {product.fullIngredients.map((item, idx) => (
                      <span
                        key={idx}
                        className="bg-white border border-[#E0DCD2] px-2.5 py-1 rounded-xs"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                  <div className="text-[11px] text-[#787268] pt-2">
                    Free from: Parabens, phthalates, synthetic fragrance, artificial colorants, sulfates, drying denatured alcohol, silicones, and mineral oil.
                  </div>
                </div>
              )}

              {/* Tab 4: Verified Reviews & Add Review Form */}
              {activeTab === 'reviews' && (
                <div className="space-y-6">
                  
                  {/* Reviews Summary & Write Toggle */}
                  <div className="flex items-center justify-between pb-4 border-b border-[#E8E4DA]">
                    <div>
                      <span className="font-serif-luxury text-xl text-[#1E1D1A]">Customer Experiences</span>
                      <p className="text-xs text-[#7A756D]">Based on {reviewsList.length} verified real-world purchases</p>
                    </div>

                    <button
                      onClick={() => setShowAddReview(!showAddReview)}
                      className="px-3.5 py-1.5 bg-[#2B2925] text-white text-xs uppercase tracking-wider font-semibold rounded-xs hover:bg-[#433F3A] transition-colors"
                    >
                      {showAddReview ? 'Cancel Review' : 'Write a Review'}
                    </button>
                  </div>

                  {/* Add Review Form */}
                  {showAddReview && (
                    <form onSubmit={handleReviewSubmit} className="p-4 bg-white border border-[#DDD8CD] rounded-xs space-y-3">
                      <div className="text-xs font-semibold uppercase tracking-wider text-[#2B2925]">
                        Share Your Formulation Experience
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        <div>
                          <label className="block text-[#57534D] mb-1 font-medium">Your Name</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Sarah J."
                            value={newReviewAuthor}
                            onChange={(e) => setNewReviewAuthor(e.target.value)}
                            className="w-full bg-[#FAF9F5] border border-[#DDD8CD] px-3 py-1.5 rounded-xs focus:outline-hidden focus:border-[#736E64]"
                          />
                        </div>

                        <div>
                          <label className="block text-[#57534D] mb-1 font-medium">Your Skin Type</label>
                          <select
                            value={newReviewSkinType}
                            onChange={(e) => setNewReviewSkinType(e.target.value)}
                            className="w-full bg-[#FAF9F5] border border-[#DDD8CD] px-3 py-1.5 rounded-xs focus:outline-hidden focus:border-[#736E64]"
                          >
                            <option value="Dry">Dry / Compromised</option>
                            <option value="Sensitive">Sensitive & Reactive</option>
                            <option value="Combination">Combination</option>
                            <option value="Oily">Oily / Blemish-Prone</option>
                            <option value="Normal">Normal</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        <div>
                          <label className="block text-[#57534D] mb-1 font-medium">Rating</label>
                          <select
                            value={newReviewRating}
                            onChange={(e) => setNewReviewRating(Number(e.target.value))}
                            className="w-full bg-[#FAF9F5] border border-[#DDD8CD] px-3 py-1.5 rounded-xs focus:outline-hidden focus:border-[#736E64]"
                          >
                            <option value={5}>5 Stars - Pure Botanical Magic</option>
                            <option value={4}>4 Stars - High Quality Formulation</option>
                            <option value={3}>3 Stars - Average Results</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-[#57534D] mb-1 font-medium">Headline</label>
                          <input
                            type="text"
                            placeholder="e.g. Noticeable difference in 3 days"
                            value={newReviewTitle}
                            onChange={(e) => setNewReviewTitle(e.target.value)}
                            className="w-full bg-[#FAF9F5] border border-[#DDD8CD] px-3 py-1.5 rounded-xs focus:outline-hidden focus:border-[#736E64]"
                          />
                        </div>
                      </div>

                      <div className="text-xs">
                        <label className="block text-[#57534D] mb-1 font-medium">Your Review</label>
                        <textarea
                          required
                          rows={3}
                          placeholder="How did your skin react? What was the texture and scent like?"
                          value={newReviewComment}
                          onChange={(e) => setNewReviewComment(e.target.value)}
                          className="w-full bg-[#FAF9F5] border border-[#DDD8CD] p-3 rounded-xs focus:outline-hidden focus:border-[#736E64]"
                        />
                      </div>

                      <div className="flex items-center justify-between pt-1">
                        {reviewSubmitted ? (
                          <span className="text-xs text-[#4A5D37] font-semibold flex items-center gap-1">
                            <Check className="w-3.5 h-3.5" /> Review submitted and published!
                          </span>
                        ) : <span />}

                        <button
                          type="submit"
                          className="px-4 py-2 bg-[#2D2A26] text-white text-xs uppercase tracking-wider font-semibold rounded-xs hover:bg-[#433F3A] flex items-center gap-1.5"
                        >
                          <Send className="w-3 h-3" />
                          <span>Publish Review</span>
                        </button>
                      </div>
                    </form>
                  )}

                  {/* Reviews List */}
                  <div className="space-y-4">
                    {reviewsList.map((rev) => (
                      <div key={rev.id} className="p-4 bg-white border border-[#E8E4DA] rounded-xs space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-semibold text-[#1C1B18]">{rev.author}</span>
                            {rev.verified && (
                              <span className="text-[10px] text-[#556345] uppercase tracking-wider font-semibold">
                                ✓ Verified Purchase
                              </span>
                            )}
                          </div>
                          <span className="text-[11px] text-[#8C867D]">{rev.date}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <div className="flex text-[#B38D46]">
                            {[...Array(rev.rating)].map((_, i) => (
                              <Star key={i} className="w-3 h-3 fill-current" />
                            ))}
                          </div>
                          {rev.skinType && (
                            <span className="text-[11px] text-[#787268]">· Skin: {rev.skinType}</span>
                          )}
                        </div>

                        <h4 className="text-xs font-semibold text-[#24221F]">{rev.title}</h4>
                        <p className="text-xs text-[#524E47] leading-relaxed">{rev.comment}</p>
                      </div>
                    ))}
                  </div>

                </div>
              )}

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
