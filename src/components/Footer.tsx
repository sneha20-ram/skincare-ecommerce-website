import React, { useState } from 'react';
import { ArrowRight, Check, ShieldCheck, Leaf, Globe } from 'lucide-react';
import { useStore } from '../context/StoreContext';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { setSelectedCategory, setIsQuizOpen } = useStore();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 4000);
  };

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    onNavigate('catalog');
  };

  return (
    <footer className="bg-[#1C1B18] text-[#E5E0D5] pt-16 pb-12 border-t border-[#33302B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Top Newsletter & Brand Manifesto */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start pb-12 border-b border-[#2E2B26]">
          
          <div className="lg:col-span-6 space-y-4">
            <span className="font-serif-luxury text-2xl tracking-widest text-white uppercase block">
              LUMEN BOTANICA
            </span>
            <p className="text-sm text-[#A8A296] font-light max-w-md leading-relaxed">
              Formulating clinical botanicals at the confluence of cellular lipid biology and biodynamic herbology. Packaged exclusively in violet biophotonic glass.
            </p>
            <div className="flex items-center gap-6 pt-2 text-xs text-[#7A756C]">
              <span>ISO 22716 GMP Certified</span>
              <span>·</span>
              <span>Leaping Bunny Cruelty-Free</span>
              <span>·</span>
              <span>Carbon-Neutral Dispatch</span>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-3">
            <div className="text-xs uppercase tracking-wider font-semibold text-white">
              The Botanical Gazette
            </div>
            <p className="text-xs text-[#A8A296] leading-relaxed">
              Receive seasonal clinical research monographs, harvest updates from our biodynamic growers, and early formulation allotments.
            </p>

            <form onSubmit={handleSubscribe} className="flex gap-2 pt-1">
              <input
                type="email"
                required
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-[#2B2925] border border-[#3E3A34] text-xs text-white px-4 py-2.5 rounded-xs flex-grow focus:outline-hidden focus:border-[#736E64] placeholder-[#736E66]"
              />
              <button
                type="submit"
                className="px-5 py-2.5 bg-[#FAF8F5] text-[#1C1B18] text-xs uppercase tracking-wider font-semibold hover:bg-[#DDD8CD] transition-colors rounded-xs flex items-center gap-1.5 shrink-0"
              >
                <span>Subscribe</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>

            {subscribed && (
              <div className="text-xs text-[#A1B882] flex items-center gap-1.5 pt-1">
                <Check className="w-3.5 h-3.5" />
                <span>Thank you. Your introductory botanical welcome note is on its way.</span>
              </div>
            )}
          </div>

        </div>

        {/* Navigation Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-xs">
          
          <div className="space-y-3">
            <div className="font-semibold text-white uppercase tracking-wider text-[11px]">
              Formulations
            </div>
            <ul className="space-y-2 text-[#A8A296]">
              <li>
                <button onClick={() => handleCategoryClick('Cleansers')} className="hover:text-white transition-colors">
                  Purifying Cleansers
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryClick('Essences & Serums')} className="hover:text-white transition-colors">
                  Lipid & Ceramide Serums
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryClick('Moisturizers')} className="hover:text-white transition-colors">
                  Barrier Velvet Creams
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryClick('Treatments & Oils')} className="hover:text-white transition-colors">
                  Treatment & Phyto-Oils
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryClick('Sun Protection')} className="hover:text-white transition-colors">
                  Physical Mineral SPF
                </button>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <div className="font-semibold text-white uppercase tracking-wider text-[11px]">
              Cellular Science
            </div>
            <ul className="space-y-2 text-[#A8A296]">
              <li>
                <button onClick={() => onNavigate('science')} className="hover:text-white transition-colors">
                  Miron Violet Biophotonics
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('ingredients')} className="hover:text-white transition-colors">
                  Active Herbarium Glossary
                </button>
              </li>
              <li>
                <button onClick={() => setIsQuizOpen(true)} className="hover:text-white transition-colors">
                  Diagnostic Skin Quiz
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('rituals')} className="hover:text-white transition-colors">
                  3-Step Protocol Method
                </button>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <div className="font-semibold text-white uppercase tracking-wider text-[11px]">
              Care & Inquiries
            </div>
            <ul className="space-y-2 text-[#A8A296]">
              <li className="hover:text-white cursor-pointer transition-colors">
                Complimentary Consultations
              </li>
              <li className="hover:text-white cursor-pointer transition-colors">
                Shipping & Carbon Offset
              </li>
              <li className="hover:text-white cursor-pointer transition-colors">
                Recycling & Glass Return
              </li>
              <li className="hover:text-white cursor-pointer transition-colors">
                Batch Verification Certificates
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <div className="font-semibold text-white uppercase tracking-wider text-[11px]">
              Atelier & Ethics
            </div>
            <p className="text-[#8C867C] leading-relaxed">
              Crafted in certified laboratory suites in Zurich and Northern California. 100% renewable cold energy processing.
            </p>
            <div className="text-[#787268] pt-1">
              Contact: atelier@lumenbotanica.com
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Subtle Legal */}
        <div className="pt-8 border-t border-[#2B2925] flex flex-col sm:flex-row items-center justify-between text-xs text-[#736E66] gap-4">
          <div>
            &copy; {new Date().getFullYear()} LUMEN BOTANICA Inc. All formulations dermatologist verified.
          </div>
          <div className="flex items-center gap-6">
            <span className="hover:text-[#A8A296] cursor-pointer">Privacy Charter</span>
            <span className="hover:text-[#A8A296] cursor-pointer">Terms of Service</span>
            <span className="hover:text-[#A8A296] cursor-pointer">Accessibility</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
