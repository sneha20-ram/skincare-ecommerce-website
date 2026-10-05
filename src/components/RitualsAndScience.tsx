import React from 'react';
import { Sun, Moon, Shield, Award, CheckCircle2, Droplets } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS } from '../data/products';
import stillImage from '../assets/images/botanical_ingredients_still_1791181791874.jpg';

export const RitualsAndScience: React.FC = () => {
  const { setActiveProductModal, setIsQuizOpen } = useStore();

  const openProduct = (id: string) => {
    const prod = PRODUCTS.find(p => p.id === id);
    if (prod) setActiveProductModal(prod);
  };

  return (
    <div id="rituals" className="bg-[#FAF9F5] border-b border-[#E8E4DA]">
      {/* 1. Daily Rituals Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        
        <div className="max-w-2xl mb-12">
          <div className="text-xs uppercase tracking-widest text-[#787268] font-medium mb-2">
            The Botanical Protocol
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl text-[#1E1D1A] font-normal [text-wrap:balance]">
            The 3-Step Daily Barrier Architecture
          </h2>
          <p className="text-sm text-[#615C54] mt-3 leading-relaxed">
            Healthy skin requires no 12-step routines that compromise the microbiome. Our clinical methodology relies on three foundational steps calibrated to epidermal lipid physiology.
          </p>
        </div>

        {/* 3 Step Protocol Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Step 1 */}
          <div className="p-6 bg-white border border-[#E0DCD2] rounded-xs space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-[#7A756D]">
                <span className="font-semibold uppercase tracking-wider text-[#5A6349]">01 · Purify</span>
                <span className="flex items-center gap-1"><Sun className="w-3 h-3 text-[#B89843]" /> AM / <Moon className="w-3 h-3 text-[#5C6479]" /> PM</span>
              </div>
              <h3 className="font-serif-luxury text-2xl text-[#1C1B18] font-medium">
                Saponin Clarification
              </h3>
              <p className="text-xs text-[#5E5951] leading-relaxed">
                Lifts daily air-pollution particles, oxidized sebum, and mineral SPF without stripping stratum corneum intercellular lipids.
              </p>
            </div>

            <div className="pt-4 border-t border-[#EFECE6] space-y-2">
              <div className="text-xs font-semibold text-[#1C1B18]">Gentle Phyto-Purifying Cleanser</div>
              <p className="text-[11px] text-[#736F66]">Cold-Pressed Camellia Seed + Yucca Saponins</p>
              <button
                onClick={() => openProduct('phyto-purifying-cleanser')}
                className="text-xs font-semibold text-[#2D2A26] underline underline-offset-4 hover:text-[#5A6349] transition-colors"
              >
                Inspect Cleanser &rarr;
              </button>
            </div>
          </div>

          {/* Step 2 */}
          <div className="p-6 bg-white border border-[#E0DCD2] rounded-xs space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-[#7A756D]">
                <span className="font-semibold uppercase tracking-wider text-[#5A6349]">02 · Rebuild</span>
                <span className="flex items-center gap-1"><Sun className="w-3 h-3 text-[#B89843]" /> AM / <Moon className="w-3 h-3 text-[#5C6479]" /> PM</span>
              </div>
              <h3 className="font-serif-luxury text-2xl text-[#1C1B18] font-medium">
                Cellular Lipid Infusion
              </h3>
              <p className="text-xs text-[#5E5951] leading-relaxed">
                Floods thirsty cellular matrices with bio-identical Ceramides 1, 3, 6-II and micro-weight snow mushroom humectants.
              </p>
            </div>

            <div className="pt-4 border-t border-[#EFECE6] space-y-2">
              <div className="text-xs font-semibold text-[#1C1B18]">Barrier Restore Squalane & Ceramide Serum</div>
              <p className="text-[11px] text-[#736F66]">3% Bio-Ceramides + Tremella + Olive Squalane</p>
              <button
                onClick={() => openProduct('barrier-restore-serum')}
                className="text-xs font-semibold text-[#2D2A26] underline underline-offset-4 hover:text-[#5A6349] transition-colors"
              >
                Inspect Serum &rarr;
              </button>
            </div>
          </div>

          {/* Step 3 */}
          <div className="p-6 bg-white border border-[#E0DCD2] rounded-xs space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-[#7A756D]">
                <span className="font-semibold uppercase tracking-wider text-[#5A6349]">03 · Seal & Shield</span>
                <span className="flex items-center gap-1"><Sun className="w-3 h-3 text-[#B89843]" /> AM / <Moon className="w-3 h-3 text-[#5C6479]" /> PM</span>
              </div>
              <h3 className="font-serif-luxury text-2xl text-[#1C1B18] font-medium">
                Extremolyte Occlusion
              </h3>
              <p className="text-xs text-[#5E5951] leading-relaxed">
                Forms a breathable biocompatible shield with Ectoin 2% and wild Murumuru butter, locking hydration for 48 hours.
              </p>
            </div>

            <div className="pt-4 border-t border-[#EFECE6] space-y-2">
              <div className="text-xs font-semibold text-[#1C1B18]">Bio-Cellular Velvet Moisture Barrier Cream</div>
              <p className="text-[11px] text-[#736F66]">Fermented Centella + Ectoin + Murumuru Butter</p>
              <button
                onClick={() => openProduct('bio-cellular-moisture-cream')}
                className="text-xs font-semibold text-[#2D2A26] underline underline-offset-4 hover:text-[#5A6349] transition-colors"
              >
                Inspect Barrier Cream &rarr;
              </button>
            </div>
          </div>

        </div>

      </section>

      {/* 2. Cellular Science & Violet Miron Glass Section */}
      <section id="science" className="bg-[#24221F] text-[#FAF8F5] py-16 md:py-24 border-t border-[#3B3833]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Glass & Preservation Philosophy */}
            <div className="lg:col-span-6 space-y-6">
              <div className="text-xs uppercase tracking-widest text-[#B5AE9F] font-medium">
                Biophotonic Preservation
              </div>
              
              <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl text-white font-normal leading-tight [text-wrap:balance]">
                Preserved in authentic Miron violet glass. Never plastic.
              </h2>

              <p className="text-sm sm:text-base text-[#D4CFC4] font-light leading-relaxed">
                Standard clear or amber cosmetic bottles allow harmful visible light to penetrate, rapidly oxidizing fragile botanical vitamins, phytosterols, and cold-pressed lipids within weeks.
              </p>

              <div className="space-y-4 pt-2 text-xs text-[#C7C2B7]">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#A1B882] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">Spectral Light Filter:</strong> Blocks all wavelengths of visible light (400–700 nm) while allowing beneficial UVA and infrared frequencies that naturally preserve botanical vitality.
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#A1B882] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">Eliminates Harsh Preservatives:</strong> Because light degradation is physically stopped by the violet glass, our formulas stay clinically potent with minimal bio-ferment preservatives.
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#A1B882] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">Infinitely Recyclable:</strong> 100% heavy mineral glass, non-leaching, and BPA/phthalate-free.
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={() => setIsQuizOpen(true)}
                  className="px-6 py-3 bg-[#EAE5D9] text-[#24221F] text-xs uppercase tracking-widest font-semibold hover:bg-white transition-colors rounded-xs"
                >
                  Find Your Custom Protocol
                </button>
              </div>
            </div>

            {/* Right Column: Visual of Botanical Alchemy Still Life */}
            <div className="lg:col-span-6">
              <div className="aspect-[4/3] rounded-xs overflow-hidden border border-[#47433C] bg-[#1C1B18] shadow-xl">
                <img
                  src={stillImage}
                  alt="Lumen Botanica natural botanical extraction still life"
                  className="w-full h-full object-cover object-center"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};
