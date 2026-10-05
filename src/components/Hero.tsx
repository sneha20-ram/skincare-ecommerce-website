import React from 'react';
import { ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';
import { useStore } from '../context/StoreContext';

interface HeroProps {
  onExplore: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExplore }) => {
  const { setIsQuizOpen } = useStore();

  return (
    <section id="home" className="relative bg-[#F7F5F0] overflow-hidden border-b border-[#E8E4DA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Editorial Headline & Intentional Storytelling */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-8">
            {/* Clean unboxed metadata with typographic separators */}
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#787268] font-medium">
              <span>Cellular Lipid Architecture</span>
              <span aria-hidden="true">·</span>
              <span>100% Bio-Identical Actives</span>
              <span aria-hidden="true">·</span>
              <span>Swiss & Nordic Botanicals</span>
            </div>

            <h1 className="font-serif-luxury text-4xl sm:text-5xl lg:text-6xl text-[#1E1D1A] font-normal leading-[1.12] tracking-tight [text-wrap:balance]">
              Pure botanical chemistry formulated for deep barrier resilience.
            </h1>

            <p className="text-base sm:text-lg text-[#54504A] font-light leading-relaxed max-w-xl">
              Engineered with cold-pressed adaptogens, extremolyte antioxidants, and bio-identical ceramides. Designed to replenish compromised stratum corneum lipids without endocrine disruptors or synthetic silicones.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                onClick={onExplore}
                className="px-7 py-3.5 bg-[#262421] text-[#FAF8F5] text-xs uppercase tracking-widest font-semibold hover:bg-[#3D3A35] transition-colors rounded-xs flex items-center justify-center gap-3 group shadow-xs"
              >
                <span>Explore Formulations</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={() => setIsQuizOpen(true)}
                className="px-7 py-3.5 bg-transparent border border-[#3D3A35] text-[#262421] text-xs uppercase tracking-widest font-semibold hover:bg-[#EBE7DD] transition-colors rounded-xs flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-[#757169]" />
                <span>Skin Diagnostic Quiz</span>
              </button>
            </div>

            {/* Clinical Evidence & Purity Badges (Unboxed editorial text with clean divider) */}
            <div className="pt-6 border-t border-[#E2DDD2] grid grid-cols-3 gap-4 text-left">
              <div>
                <div className="font-serif-luxury text-2xl sm:text-3xl text-[#1C1B18] font-normal tabular-nums">
                  94%
                </div>
                <div className="text-xs text-[#6B665E] mt-1 leading-snug">
                  Barrier lipid restoration in 14 days
                </div>
              </div>
              <div>
                <div className="font-serif-luxury text-2xl sm:text-3xl text-[#1C1B18] font-normal tabular-nums">
                  100%
                </div>
                <div className="text-xs text-[#6B665E] mt-1 leading-snug">
                  Miron biophotonic violet glass
                </div>
              </div>
              <div>
                <div className="font-serif-luxury text-2xl sm:text-3xl text-[#1C1B18] font-normal tabular-nums">
                  0%
                </div>
                <div className="text-xs text-[#6B665E] mt-1 leading-snug">
                  Fillers, fragrance & microplastics
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[16/10] sm:aspect-[16/11] lg:aspect-[4/3] rounded-xs overflow-hidden bg-[#ECE8DF] shadow-md border border-[#DFDAD0]">
              <img
                src="/src/assets/images/hero_skincare_editorial_1791181745255.jpg"
                alt="Lumen Botanica luxury glass formulations arranged on natural stone"
                className="w-full h-full object-cover object-center transform hover:scale-[1.02] transition-transform duration-700 ease-out"
                loading="eager"
                referrerPolicy="no-referrer"
              />
              
              {/* Subtle glass reflection tag */}
              <div className="absolute bottom-4 left-4 right-4 bg-[#FAF9F5]/90 backdrop-blur-md px-4 py-3 border border-[#E3DFD5] flex items-center justify-between text-xs text-[#3E3A34]">
                <div>
                  <span className="font-medium text-[#1A1917] block">The Core Barrier Triad</span>
                  <span className="text-[11px] text-[#69645C]">Purify · Cellular Plump · Lipid Occlusion</span>
                </div>
                <button
                  onClick={onExplore}
                  className="text-xs font-semibold text-[#1C1B18] underline underline-offset-4 hover:text-[#5A6349] transition-colors whitespace-nowrap"
                >
                  View Trio &rarr;
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
