import React, { useState } from 'react';
import { Star, CheckCircle, ThumbsUp, MessageSquare, Filter, Plus, X } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS } from '../data/products';

interface Testimonial {
  id: string;
  name: string;
  location: string;
  skinType: string;
  rating: number;
  productName: string;
  productId: string;
  date: string;
  headline: string;
  content: string;
  clinicalOutcome: string;
  helpfulCount: number;
  verified: boolean;
  tag: 'Barrier Recovery' | 'Sensitive & Reactive' | 'Dry & Dehydrated' | 'Dullness & Tone';
}

const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Elena Rostova',
    location: 'Zurich, Switzerland',
    skinType: 'Compromised / Post-Procedure',
    rating: 5,
    productName: 'Barrier Restore Squalane & Ceramide Serum',
    productId: 'barrier-restore-serum',
    date: '3 days ago',
    headline: 'Repaired my severely damaged lipid barrier in under 10 days',
    content: 'After aggressive winter skiing and overusing prescription tretinoin, my skin was stinging even when applying plain water. The Barrier Restore Serum absorbed like pure silk without any tackiness. Within 48 hours the burning calmed down, and in 10 days my skin felt completely cushioned again.',
    clinicalOutcome: '0% stinging reported by day 3; visible redness reduced by ~80%',
    helpfulCount: 42,
    verified: true,
    tag: 'Barrier Recovery'
  },
  {
    id: 'test-2',
    name: 'Marcus Vance',
    location: 'Seattle, WA',
    skinType: 'Reactive / Eczema-Prone',
    rating: 5,
    productName: 'Bio-Cellular Velvet Moisture Barrier Cream',
    productId: 'bio-cellular-moisture-cream',
    date: '1 week ago',
    headline: 'The only cream that doesn’t cause allergic flushing',
    content: 'I have severe contact dermatitis and have tried every French pharmacy and luxury cream imaginable. This velvet formula has zero synthetic perfume or irritating essential oils. The inclusion of Ectoin and murumuru butter creates an imperceptible shield that prevents wind-burn.',
    clinicalOutcome: 'Zero flare-ups over 6 weeks of continuous daily morning and evening use',
    helpfulCount: 31,
    verified: true,
    tag: 'Sensitive & Reactive'
  },
  {
    id: 'test-3',
    name: 'Dr. Camille Laurent',
    location: 'Lyon, France',
    skinType: 'Mature / Dehydrated',
    rating: 5,
    productName: 'Kakadu Plum & Astaxanthin Phyto-Glow Treatment Oil',
    productId: 'phyto-glow-treatment-oil',
    date: '2 weeks ago',
    headline: 'Remarkable natural antioxidant potency without irritation',
    content: 'As a biochemical researcher, I appreciate that Lumen Botanica uses supercritical CO2 extraction for Kakadu plum instead of unstable synthetic ascorbic acid. Astaxanthin gives it a gorgeous natural ruby tint that leaves skin illuminated without pore blockage.',
    clinicalOutcome: 'Noticeable brightening of post-inflammatory hyperpigmentation in 3 weeks',
    helpfulCount: 58,
    verified: true,
    tag: 'Dullness & Tone'
  },
  {
    id: 'test-4',
    name: 'Hannah Zhao',
    location: 'Vancouver, Canada',
    skinType: 'Dry & Flaky',
    rating: 5,
    productName: 'Overnight Bio-Lipid Recovery Balm',
    productId: 'overnight-lipid-recovery-balm',
    date: '3 weeks ago',
    headline: 'Saved my face from brutal winter dehydration',
    content: 'Waking up to plump, supple skin in sub-zero climates used to be impossible. I warm a small dab between my palms and press it into my cheekbones and forehead as the final seal. Woke up with zero tightness or dry flakes.',
    clinicalOutcome: '100% elimination of morning tightness and dry surface scales',
    helpfulCount: 27,
    verified: true,
    tag: 'Dry & Dehydrated'
  },
  {
    id: 'test-5',
    name: 'Julian DeVries',
    location: 'Amsterdam, Netherlands',
    skinType: 'Combination / Sensitive',
    rating: 5,
    productName: 'Gentle Phyto-Purifying Clarifying Cleanser',
    productId: 'phyto-purifying-cleanser',
    date: '1 month ago',
    headline: 'Cleanses thoroughly without the squeaky tight stripped feeling',
    content: 'Most cleansers either leave an oily film or strip my skin barrier completely dry. The yucca saponins and camellia seed in this melt away daily pollution and mineral sunscreen cleanly while maintaining natural softness.',
    clinicalOutcome: 'Skin pH preserved at optimal 5.2 post-rinse',
    helpfulCount: 19,
    verified: true,
    tag: 'Sensitive & Reactive'
  },
  {
    id: 'test-6',
    name: 'Soren Lindqvist',
    location: 'Stockholm, Sweden',
    skinType: 'Very Dry / Arid Climate',
    rating: 5,
    productName: 'Tremella & Centella Calming Hydrating Essence',
    productId: 'calming-hydrating-essence',
    date: '1 month ago',
    headline: 'Infuses cellular hydration deeper than traditional hyaluronic acid',
    content: 'Snow mushroom molecules are genuinely superior in low-humidity environments where standard HA can pull water out of the skin. Layering this twice before the Barrier Serum creates a plump cushion that lasts through 12-hour flights.',
    clinicalOutcome: 'Hydration retained throughout 12+ hour low-humidity air travel',
    helpfulCount: 36,
    verified: true,
    tag: 'Dry & Dehydrated'
  }
];

export const CustomerReviews: React.FC = () => {
  const { setActiveProductModal } = useStore();
  const [testimonials, setTestimonials] = useState<Testimonial[]>(INITIAL_TESTIMONIALS);
  const [selectedTag, setSelectedTag] = useState<string>('All');
  const [helpfulVoted, setHelpfulVoted] = useState<Record<string, boolean>>({});

  // Review submission state
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [authorName, setAuthorName] = useState('');
  const [authorLocation, setAuthorLocation] = useState('');
  const [authorSkinType, setAuthorSkinType] = useState('Combination');
  const [authorProduct, setAuthorProduct] = useState(PRODUCTS[0].id);
  const [authorRating, setAuthorRating] = useState(5);
  const [authorHeadline, setAuthorHeadline] = useState('');
  const [authorContent, setAuthorContent] = useState('');
  const [authorOutcome, setAuthorOutcome] = useState('');
  const [authorTag, setAuthorTag] = useState<'Barrier Recovery' | 'Sensitive & Reactive' | 'Dry & Dehydrated' | 'Dullness & Tone'>('Barrier Recovery');
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const tags = ['All', 'Barrier Recovery', 'Sensitive & Reactive', 'Dry & Dehydrated', 'Dullness & Tone'];

  const filteredTestimonials = testimonials.filter((t) => {
    if (selectedTag === 'All') return true;
    return t.tag === selectedTag;
  });

  const handleHelpfulClick = (id: string) => {
    if (helpfulVoted[id]) return;
    setHelpfulVoted(prev => ({ ...prev, [id]: true }));
    setTestimonials(prev =>
      prev.map(item =>
        item.id === id ? { ...item, helpfulCount: item.helpfulCount + 1 } : item
      )
    );
  };

  const handleOpenProduct = (productId: string) => {
    const prod = PRODUCTS.find(p => p.id === productId);
    if (prod) setActiveProductModal(prod);
  };

  const handleSubmitNewReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !authorContent.trim() || !authorHeadline.trim()) return;

    const matchedProd = PRODUCTS.find(p => p.id === authorProduct);

    const newEntry: Testimonial = {
      id: `test-user-${Date.now()}`,
      name: authorName.trim(),
      location: authorLocation.trim() || 'Verified Client',
      skinType: authorSkinType,
      rating: authorRating,
      productName: matchedProd ? matchedProd.name : 'Barrier Restore Serum',
      productId: authorProduct,
      date: 'Just now',
      headline: authorHeadline.trim(),
      content: authorContent.trim(),
      clinicalOutcome: authorOutcome.trim() || 'Immediate comfort and supple barrier nourishment observed',
      helpfulCount: 1,
      verified: true,
      tag: authorTag
    };

    setTestimonials([newEntry, ...testimonials]);
    setSubmitSuccess(true);
    setTimeout(() => {
      setSubmitSuccess(false);
      setShowReviewModal(false);
      setAuthorName('');
      setAuthorLocation('');
      setAuthorHeadline('');
      setAuthorContent('');
      setAuthorOutcome('');
    }, 1500);
  };

  return (
    <section id="reviews" className="bg-[#FAF9F5] py-16 md:py-24 border-t border-[#E8E4DA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header & High-Level Proof Metrics */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-8 border-b border-[#E8E4DA]">
          <div className="space-y-3 max-w-xl">
            <div className="text-xs uppercase tracking-widest text-[#787268] font-medium flex items-center gap-2">
              <span>Verified Client Evidence</span>
              <span aria-hidden="true">·</span>
              <span>Dermatological Registry</span>
            </div>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl text-[#1E1D1A] font-normal [text-wrap:balance]">
              Observed Results & Real-World Efficacy
            </h2>
            <p className="text-sm text-[#615C54] leading-relaxed">
              Unfiltered reviews from patients and customers treating sensitized barriers, chronic redness, and environmental lipid depletion with our botanical protocols.
            </p>
          </div>

          {/* Social Proof Scoreboard (Clean editorial math & tabular figures) */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-6 sm:gap-8 bg-white p-5 border border-[#E2DDD2] rounded-xs shadow-2xs">
            <div className="text-center sm:text-left pr-4 border-r border-[#EBE7DF]">
              <div className="font-serif-luxury text-4xl text-[#1C1B18] font-bold tabular-nums">
                4.9<span className="text-xl text-[#787268] font-normal">/5.0</span>
              </div>
              <div className="flex text-[#B38D46] justify-center sm:justify-start my-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
              <div className="text-[11px] text-[#787268] tabular-nums">
                1,420+ Verified Purchases
              </div>
            </div>

            <div className="space-y-1 text-xs text-[#524E46]">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-[#1C1B18] tabular-nums">98%</span>
                <span>would recommend to a friend</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-[#1C1B18] tabular-nums">94%</span>
                <span>reported reduced skin stinging & redness</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-[#1C1B18] tabular-nums">96%</span>
                <span>noted zero pore clogging or irritation</span>
              </div>
            </div>

            <button
              onClick={() => setShowReviewModal(true)}
              className="w-full sm:w-auto px-4 py-3 bg-[#24221F] text-white text-xs uppercase tracking-wider font-semibold hover:bg-[#3D3A35] transition-colors rounded-xs flex items-center justify-center gap-1.5 shrink-0"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Share Experience</span>
            </button>
          </div>
        </div>

        {/* Filter Segmented Controls */}
        <div className="flex items-center justify-between flex-wrap gap-4 pt-2">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-4 py-2 text-xs uppercase tracking-wider font-semibold whitespace-nowrap transition-colors rounded-xs border ${
                  selectedTag === tag
                    ? 'bg-[#2A2824] text-[#FAF8F5] border-[#2A2824]'
                    : 'bg-white text-[#5C574F] border-[#E2DDD2] hover:border-[#BFB9AD] hover:text-[#1F1E1B]'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          <div className="text-xs text-[#787268] tabular-nums">
            Showing {filteredTestimonials.length} verified review{filteredTestimonials.length !== 1 ? 's' : ''}
          </div>
        </div>

        {/* Testimonials 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTestimonials.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-[#E0DCD2] p-6 rounded-xs flex flex-col justify-between space-y-4 hover:border-[#C4BEAF] hover:shadow-xs transition-all"
            >
              <div className="space-y-3">
                {/* Header: Author & Verified Status */}
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-sm font-semibold text-[#1C1B18] flex items-center gap-1.5">
                      <span>{item.name}</span>
                      {item.verified && (
                        <span title="Verified Customer Purchase" className="inline-flex items-center">
                          <CheckCircle className="w-3.5 h-3.5 text-[#5A6349] shrink-0" />
                        </span>
                      )}
                    </h4>
                    {/* Clean unboxed metadata with subtle dot separator */}
                    <div className="text-[11px] text-[#7A756D] mt-0.5">
                      <span>{item.location}</span>
                      <span aria-hidden="true" className="mx-1">·</span>
                      <span>Skin: {item.skinType}</span>
                    </div>
                  </div>

                  <div className="flex text-[#B38D46]">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-current" />
                    ))}
                  </div>
                </div>

                {/* Formulation Tag Clickable Link */}
                <button
                  onClick={() => handleOpenProduct(item.productId)}
                  className="text-left text-xs font-semibold text-[#5A6349] hover:underline underline-offset-4 line-clamp-1"
                >
                  Formulation: {item.productName} &rarr;
                </button>

                {/* Review Headline & Body */}
                <h5 className="font-serif-luxury text-lg text-[#1C1B18] font-medium leading-snug">
                  "{item.headline}"
                </h5>

                <p className="text-xs text-[#524E47] leading-relaxed">
                  {item.content}
                </p>
              </div>

              {/* Bottom: Clinical Highlight and Helpful Action */}
              <div className="pt-4 border-t border-[#EFECE6] space-y-3">
                <div className="p-2.5 bg-[#FAF8F5] border border-[#EBE7DF] rounded-xs text-[11px] text-[#47433C]">
                  <strong className="text-[#1C1B18] block font-semibold mb-0.5">Observed Benefit:</strong>
                  {item.clinicalOutcome}
                </div>

                <div className="flex items-center justify-between text-xs text-[#787268] pt-1">
                  <span className="text-[11px]">{item.date}</span>

                  <button
                    onClick={() => handleHelpfulClick(item.id)}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xs text-xs transition-colors ${
                      helpfulVoted[item.id]
                        ? 'text-[#4A5D37] bg-[#EFF5EA] font-semibold'
                        : 'text-[#6B665E] hover:text-[#1C1B18] hover:bg-[#F2EFE9]'
                    }`}
                  >
                    <ThumbsUp className="w-3 h-3" />
                    <span className="tabular-nums">Helpful ({item.helpfulCount})</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Share Experience Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm overflow-y-auto">
          <div className="fixed inset-0" onClick={() => setShowReviewModal(false)} />

          <div className="relative w-full max-w-xl bg-[#FAF9F5] border border-[#DDD8CD] shadow-2xl rounded-xs overflow-hidden z-10 max-h-[92vh] flex flex-col">
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#E8E4DA] bg-[#F4F1EA]">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-[#5A6349]" />
                <span className="font-serif-luxury text-xl text-[#1E1D1A] font-medium">
                  Submit Formulation Review
                </span>
              </div>
              <button
                onClick={() => setShowReviewModal(false)}
                className="p-1.5 text-[#5C574F] hover:text-[#1C1B18]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 sm:p-8 overflow-y-auto">
              {submitSuccess ? (
                <div className="text-center py-8 space-y-2">
                  <CheckCircle className="w-10 h-10 text-[#4A5D37] mx-auto" />
                  <h3 className="font-serif-luxury text-2xl text-[#1C1B18]">Thank You For Contributing</h3>
                  <p className="text-xs text-[#6B665E]">
                    Your clinical testimonial has been added to the registry for verification.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmitNewReview} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[#524E46] mb-1 font-medium">Your Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Rachel S."
                        value={authorName}
                        onChange={(e) => setAuthorName(e.target.value)}
                        className="w-full bg-white border border-[#DDD8CD] px-3 py-2 rounded-xs focus:outline-hidden focus:border-[#736E64]"
                      />
                    </div>
                    <div>
                      <label className="block text-[#524E46] mb-1 font-medium">Location *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. London, UK"
                        value={authorLocation}
                        onChange={(e) => setAuthorLocation(e.target.value)}
                        className="w-full bg-white border border-[#DDD8CD] px-3 py-2 rounded-xs focus:outline-hidden focus:border-[#736E64]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[#524E46] mb-1 font-medium">Formulation Evaluated *</label>
                      <select
                        value={authorProduct}
                        onChange={(e) => setAuthorProduct(e.target.value)}
                        className="w-full bg-white border border-[#DDD8CD] px-3 py-2 rounded-xs focus:outline-hidden focus:border-[#736E64]"
                      >
                        {PRODUCTS.map(p => (
                          <option key={p.id} value={p.id}>{p.name}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-[#524E46] mb-1 font-medium">Concern Category</label>
                      <select
                        value={authorTag}
                        onChange={(e) => setAuthorTag(e.target.value as any)}
                        className="w-full bg-white border border-[#DDD8CD] px-3 py-2 rounded-xs focus:outline-hidden focus:border-[#736E64]"
                      >
                        <option value="Barrier Recovery">Barrier Recovery</option>
                        <option value="Sensitive & Reactive">Sensitive & Reactive</option>
                        <option value="Dry & Dehydrated">Dry & Dehydrated</option>
                        <option value="Dullness & Tone">Dullness & Tone</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[#524E46] mb-1 font-medium">Skin Baseline</label>
                      <input
                        type="text"
                        placeholder="e.g. Sensitive / Rosacea-Prone"
                        value={authorSkinType}
                        onChange={(e) => setAuthorSkinType(e.target.value)}
                        className="w-full bg-white border border-[#DDD8CD] px-3 py-2 rounded-xs focus:outline-hidden focus:border-[#736E64]"
                      />
                    </div>

                    <div>
                      <label className="block text-[#524E46] mb-1 font-medium">Rating</label>
                      <select
                        value={authorRating}
                        onChange={(e) => setAuthorRating(Number(e.target.value))}
                        className="w-full bg-white border border-[#DDD8CD] px-3 py-2 rounded-xs focus:outline-hidden focus:border-[#736E64]"
                      >
                        <option value={5}>5 Stars - Transformative Efficacy</option>
                        <option value={4}>4 Stars - High Quality Formulation</option>
                        <option value={3}>3 Stars - Moderate Results</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[#524E46] mb-1 font-medium">Headline *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Calmed stinging redness within 48 hours"
                      value={authorHeadline}
                      onChange={(e) => setAuthorHeadline(e.target.value)}
                      className="w-full bg-white border border-[#DDD8CD] px-3 py-2 rounded-xs focus:outline-hidden focus:border-[#736E64]"
                    />
                  </div>

                  <div>
                    <label className="block text-[#524E46] mb-1 font-medium">Detailed Clinical Feedback *</label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Describe your skin condition prior to using the formulation, application experience, and how your barrier felt over time."
                      value={authorContent}
                      onChange={(e) => setAuthorContent(e.target.value)}
                      className="w-full bg-white border border-[#DDD8CD] p-3 rounded-xs focus:outline-hidden focus:border-[#736E64]"
                    />
                  </div>

                  <div>
                    <label className="block text-[#524E46] mb-1 font-medium">Measured Outcome</label>
                    <input
                      type="text"
                      placeholder="e.g. 100% elimination of flaking within 1 week"
                      value={authorOutcome}
                      onChange={(e) => setAuthorOutcome(e.target.value)}
                      className="w-full bg-white border border-[#DDD8CD] px-3 py-2 rounded-xs focus:outline-hidden focus:border-[#736E64]"
                    />
                  </div>

                  <div className="pt-2 flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setShowReviewModal(false)}
                      className="px-4 py-2 border border-[#DDD8CD] text-[#4A4742] hover:bg-[#EBE7DF] rounded-xs font-semibold uppercase tracking-wider"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 bg-[#24221F] text-white hover:bg-[#3D3A35] rounded-xs font-semibold uppercase tracking-wider"
                    >
                      Publish Testimonial
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
