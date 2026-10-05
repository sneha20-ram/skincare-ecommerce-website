import React, { useState } from 'react';
import { X, Sparkles, Check, ArrowRight, ArrowLeft, RefreshCw, ShoppingBag } from 'lucide-react';
import { SKIN_QUIZ_QUESTIONS, PRODUCTS, Product } from '../data/products';
import { useStore } from '../context/StoreContext';

export const SkinQuiz: React.FC = () => {
  const { isQuizOpen, setIsQuizOpen, addToCart, setIsCartOpen, applyDiscountCode } = useStore();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [ritualAdded, setRitualAdded] = useState(false);

  if (!isQuizOpen) return null;

  const handleSelectOption = (questionId: string, value: string) => {
    const updated = { ...answers, [questionId]: value };
    setAnswers(updated);

    if (currentStep < SKIN_QUIZ_QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handleRestart = () => {
    setAnswers({});
    setCurrentStep(0);
    setIsCompleted(false);
    setRitualAdded(false);
  };

  // Determine tailored routine based on answers
  const getTailoredRoutine = (): {
    profileTitle: string;
    profileDescription: string;
    products: Product[];
    totalPrice: number;
    bundlePrice: number;
  } => {
    const skinType = answers['skinType'] || 'Dry';
    const concern = answers['primaryConcern'] || 'Barrier Repair';

    let cleanser = PRODUCTS.find(p => p.id === 'phyto-purifying-cleanser')!;
    let serum = PRODUCTS.find(p => p.id === 'barrier-restore-serum')!;
    let moisturizer = PRODUCTS.find(p => p.id === 'bio-cellular-moisture-cream')!;

    if (concern === 'Luminosity') {
      serum = PRODUCTS.find(p => p.id === 'phyto-glow-treatment-oil') || serum;
    } else if (concern === 'Texture') {
      serum = PRODUCTS.find(p => p.id === 'resurfacing-lactic-pha-elixir') || serum;
    } else if (skinType === 'Sensitive') {
      serum = PRODUCTS.find(p => p.id === 'calming-hydrating-essence') || serum;
    }

    if (skinType === 'Dry' && (answers['sensitivityLevel'] === 'High' || answers['climate'] === 'Arid')) {
      moisturizer = PRODUCTS.find(p => p.id === 'overnight-lipid-recovery-balm') || moisturizer;
    }

    const items = [cleanser, serum, moisturizer];
    const total = items.reduce((sum, item) => sum + item.price, 0);
    const bundlePrice = Math.round(total * 0.85); // 15% discount for complete ritual

    let profileTitle = 'Lipid-Replenishing Barrier Protocol';
    let profileDescription = 'Calibrated to rebuild moisture-locking intercellular bilayers and calm micro-capillary flushing.';

    if (concern === 'Luminosity') {
      profileTitle = 'Cellular Radiance & Antioxidant Defense Protocol';
      profileDescription = 'Concentrated in supercritical Kakadu plum Vitamin C and astaxanthin to sweep free radicals and brighten uneven tone.';
    } else if (concern === 'Texture') {
      profileTitle = 'Micro-Resurfacing & Smoothing Protocol';
      profileDescription = 'Buffered large-molecule PHA and gentle lactic acid paired with balancing camellia lipids for clear, smooth skin.';
    }

    return {
      profileTitle,
      profileDescription,
      products: items,
      totalPrice: total,
      bundlePrice
    };
  };

  const ritual = getTailoredRoutine();

  const handleAddRitualToBag = () => {
    ritual.products.forEach(p => {
      addToCart(p, 1);
    });
    applyDiscountCode('BOTANICA15');
    setRitualAdded(true);
    setTimeout(() => {
      setIsQuizOpen(false);
      setIsCartOpen(true);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="fixed inset-0" onClick={() => setIsQuizOpen(false)} />

      <div className="relative w-full max-w-2xl bg-[#FAF9F5] border border-[#DDD8CD] shadow-2xl rounded-xs overflow-hidden z-10 max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E8E4DA] bg-[#F4F1EA]">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#787268] font-medium">
            <Sparkles className="w-3.5 h-3.5 text-[#5A6349]" />
            <span>Cellular Skin Diagnostic</span>
          </div>

          <button
            onClick={() => setIsQuizOpen(false)}
            className="p-1.5 text-[#59554E] hover:text-[#1F1E1B] transition-colors rounded-xs"
            aria-label="Close quiz"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto">
          {!isCompleted ? (
            <div className="space-y-6">
              
              {/* Progress Steps */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-[#7A756D]">
                  <span className="uppercase tracking-wider font-semibold">
                    Diagnostic Step {currentStep + 1} of {SKIN_QUIZ_QUESTIONS.length}
                  </span>
                  <span className="tabular-nums">
                    {Math.round(((currentStep + 1) / SKIN_QUIZ_QUESTIONS.length) * 100)}% Complete
                  </span>
                </div>
                <div className="w-full h-1 bg-[#EBE7DF] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#525E3F] transition-all duration-300 ease-out"
                    style={{
                      width: `${((currentStep + 1) / SKIN_QUIZ_QUESTIONS.length) * 100}%`
                    }}
                  />
                </div>
              </div>

              {/* Question */}
              <div className="space-y-2 pt-2">
                <h3 className="font-serif-luxury text-2xl sm:text-3xl text-[#1E1D1A] font-medium leading-snug">
                  {SKIN_QUIZ_QUESTIONS[currentStep].question}
                </h3>
                <p className="text-xs text-[#736E66]">
                  {SKIN_QUIZ_QUESTIONS[currentStep].description}
                </p>
              </div>

              {/* Options */}
              <div className="grid grid-cols-1 gap-3 pt-2">
                {SKIN_QUIZ_QUESTIONS[currentStep].options.map((opt) => {
                  const isSelected = answers[SKIN_QUIZ_QUESTIONS[currentStep].id] === opt.value;
                  return (
                    <button
                      key={opt.value}
                      onClick={() => handleSelectOption(SKIN_QUIZ_QUESTIONS[currentStep].id, opt.value)}
                      className={`text-left p-4 rounded-xs border transition-all flex items-start justify-between group ${
                        isSelected
                          ? 'border-[#3D3A35] bg-white shadow-xs'
                          : 'border-[#E2DDD2] bg-[#F7F5F0] hover:bg-white hover:border-[#BFB9AD]'
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="text-sm font-semibold text-[#1C1B18] group-hover:text-[#4B5E38] transition-colors">
                          {opt.label}
                        </div>
                        <div className="text-xs text-[#6E6960] leading-relaxed">
                          {opt.description}
                        </div>
                      </div>
                      <div className={`w-4 h-4 rounded-full border mt-0.5 ml-4 flex items-center justify-center shrink-0 ${
                        isSelected ? 'border-[#3D3A35] bg-[#3D3A35]' : 'border-[#C7C1B5]'
                      }`}>
                        {isSelected && <Check className="w-2.5 h-2.5 text-white" />}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Navigation Back */}
              {currentStep > 0 && (
                <div className="pt-2">
                  <button
                    onClick={() => setCurrentStep(currentStep - 1)}
                    className="flex items-center gap-1.5 text-xs text-[#78736A] hover:text-[#1C1B18] transition-colors"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Previous Question</span>
                  </button>
                </div>
              )}

            </div>
          ) : (
            /* Results Screen */
            <div className="space-y-6">
              
              <div className="border-b border-[#E8E4DA] pb-4">
                <div className="text-xs uppercase tracking-widest text-[#525E3F] font-semibold flex items-center gap-1.5 mb-1">
                  <Check className="w-3.5 h-3.5" />
                  Diagnostic Synthesis Complete
                </div>
                <h3 className="font-serif-luxury text-2xl sm:text-3xl text-[#1E1D1A] font-medium">
                  {ritual.profileTitle}
                </h3>
                <p className="text-xs text-[#635E55] mt-1 leading-relaxed">
                  {ritual.profileDescription}
                </p>
              </div>

              {/* Recommended 3-Step Daily Ritual */}
              <div className="space-y-3">
                <div className="text-xs uppercase tracking-wider font-semibold text-[#383530]">
                  Your Prescribed 3-Step Daily Ritual:
                </div>

                <div className="space-y-3">
                  {ritual.products.map((prod, idx) => (
                    <div
                      key={prod.id}
                      className="p-3 bg-white border border-[#E0DCD1] rounded-xs flex items-center gap-4"
                    >
                      <div className="w-14 h-14 bg-[#F2EFE9] shrink-0 rounded-xs overflow-hidden border border-[#DDD8CD]">
                        <img
                          src={prod.image}
                          alt={prod.name}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      
                      <div className="flex-grow min-w-0">
                        <div className="text-[10px] text-[#7A756D] uppercase tracking-wider font-semibold">
                          Step 0{idx + 1} · {prod.category}
                        </div>
                        <h4 className="text-xs font-semibold text-[#1C1B18] truncate">
                          {prod.name}
                        </h4>
                        <div className="text-[11px] text-[#69645B] truncate">
                          {prod.keyActives[0]}
                        </div>
                      </div>

                      <div className="text-xs font-semibold text-[#1C1B18] tabular-nums shrink-0">
                        ${prod.price}.00
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pricing & 1-Click Bundle Action */}
              <div className="p-4 bg-[#F2EFE9] border border-[#DDD8CD] rounded-xs space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-[#2D2A26]">
                      Complete Ritual Trio Bundle
                    </div>
                    <div className="text-[11px] text-[#556345] font-medium">
                      Includes 15% diagnostic courtesy savings + free carbon-neutral shipping
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-[#8C867C] line-through tabular-nums mr-2">
                      ${ritual.totalPrice}.00
                    </span>
                    <span className="text-lg font-serif-luxury font-bold text-[#1C1B18] tabular-nums">
                      ${ritual.bundlePrice}.00
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleAddRitualToBag}
                  disabled={ritualAdded}
                  className={`w-full py-3 text-xs uppercase tracking-widest font-semibold transition-all rounded-xs flex items-center justify-center gap-2 ${
                    ritualAdded
                      ? 'bg-[#4B5E38] text-white'
                      : 'bg-[#24221F] text-white hover:bg-[#3D3A35]'
                  }`}
                >
                  {ritualAdded ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Ritual Added to Bag!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add Entire 3-Step Ritual to Bag (${ritual.bundlePrice}.00)</span>
                    </>
                  )}
                </button>
              </div>

              {/* Restart */}
              <div className="pt-2 text-center">
                <button
                  onClick={handleRestart}
                  className="text-xs text-[#787268] hover:text-[#1C1B18] flex items-center gap-1 mx-auto transition-colors"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Retake Diagnostic Quiz</span>
                </button>
              </div>

            </div>
          )}
        </div>

      </div>
    </div>
  );
};
