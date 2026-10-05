import React, { useState } from 'react';
import { Leaf, Sparkles, Droplet, Shield, ArrowUpRight } from 'lucide-react';
import { INGREDIENT_GLOSSARY, Ingredient, PRODUCTS } from '../data/products';
import { useStore } from '../context/StoreContext';

export const IngredientGlossary: React.FC = () => {
  const { setActiveProductModal } = useStore();
  const [selectedIngredient, setSelectedIngredient] = useState<Ingredient>(INGREDIENT_GLOSSARY[0]);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Lipid & Barrier', 'Hydrator & Humectant', 'Soothing & Adaptogen', 'Antioxidant & Brightening'];

  const filteredIngredients = INGREDIENT_GLOSSARY.filter(item => {
    if (activeCategory === 'All') return true;
    return item.category === activeCategory;
  });

  const matchingProducts = PRODUCTS.filter(p => selectedIngredient.usedInProductIds.includes(p.id));

  return (
    <section id="ingredients" className="bg-[#F5F2EB] py-16 md:py-24 border-t border-b border-[#E3DFD5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <div className="text-xs uppercase tracking-widest text-[#757067] font-medium mb-2 flex items-center gap-1.5">
            <Leaf className="w-3.5 h-3.5 text-[#5A6349]" />
            <span>The Botanical Herbarium</span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl text-[#1E1D1A] font-normal [text-wrap:balance]">
            Cellular Actives & Clinical Phyto-Chemistry
          </h2>
          <p className="text-sm text-[#615C54] mt-3 leading-relaxed">
            Every botanical extract is selected for molecular biocompatibility with human cutaneous lipids. Cold-pressed or supercritical fluid extracted to protect heat-sensitive phytosterols.
          </p>
        </div>

        {/* Categories Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none mb-8">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 text-xs uppercase tracking-wider font-semibold whitespace-nowrap rounded-xs border transition-colors ${
                activeCategory === cat
                  ? 'bg-[#292723] text-white border-[#292723]'
                  : 'bg-white/80 text-[#59554E] border-[#DDD8CC] hover:bg-white hover:text-[#1C1B18]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Master Showcase: Left Active Explorer, Right Detailed Spotlight */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Ingredient Selectors */}
          <div className="lg:col-span-5 space-y-3">
            {filteredIngredients.map((ing) => {
              const isSelected = selectedIngredient.id === ing.id;
              return (
                <div
                  key={ing.id}
                  onClick={() => setSelectedIngredient(ing)}
                  className={`p-4 rounded-xs border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-white border-[#2B2925] shadow-xs'
                      : 'bg-[#FAF8F5] border-[#E0DCD2] hover:bg-white hover:border-[#CCC6BA]'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[11px] text-[#7A756C] uppercase tracking-wider font-semibold block mb-0.5">
                        {ing.category}
                      </span>
                      <h4 className="font-serif-luxury text-lg text-[#1C1B18] font-medium">
                        {ing.name}
                      </h4>
                      <p className="text-xs text-[#635E55] italic">
                        {ing.botanicalName}
                      </p>
                    </div>
                    
                    <span className="text-xs text-[#706B62] tabular-nums mt-1">
                      {ing.usedInProductIds.length} formulation{ing.usedInProductIds.length > 1 ? 's' : ''}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: In-Depth Clinical Dossier */}
          <div className="lg:col-span-7 bg-white border border-[#DDD8CD] rounded-xs p-6 sm:p-8 space-y-6">
            
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-[#E8E4DA] pb-4 gap-2">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#5A6349] font-semibold">
                  {selectedIngredient.category} · Origin: {selectedIngredient.origin}
                </span>
                <h3 className="font-serif-luxury text-2xl sm:text-3xl text-[#1E1D1A] font-medium mt-1">
                  {selectedIngredient.name}
                </h3>
                <div className="text-xs text-[#706B62] italic mt-0.5">
                  Taxonomy: {selectedIngredient.botanicalName}
                </div>
              </div>
            </div>

            <p className="text-sm text-[#4A463F] leading-relaxed">
              {selectedIngredient.description}
            </p>

            {/* Clinical Evidence Box */}
            <div className="p-4 bg-[#F5F2EB] border border-[#DDD8CD] rounded-xs space-y-1.5">
              <div className="text-xs uppercase tracking-wider font-semibold text-[#3D3A35] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#5A6349]" />
                Clinical Efficacy Highlight
              </div>
              <p className="text-xs text-[#292723] font-medium leading-relaxed">
                "{selectedIngredient.clinicalHighlight}"
              </p>
            </div>

            {/* Key Biological Benefits */}
            <div className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#383530]">
                Skin Actions:
              </span>
              <ul className="space-y-1.5">
                {selectedIngredient.benefits.map((b, i) => (
                  <li key={i} className="text-xs text-[#524E47] flex items-start gap-2">
                    <span className="text-[#5A6349] font-bold">·</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Matching Formulations */}
            <div className="pt-4 border-t border-[#E8E4DA] space-y-3">
              <span className="text-xs uppercase tracking-wider font-semibold text-[#383530] block">
                Formulations Infused with {selectedIngredient.name}:
              </span>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {matchingProducts.map(prod => (
                  <button
                    key={prod.id}
                    onClick={() => setActiveProductModal(prod)}
                    className="p-3 bg-[#FAF8F5] border border-[#E0DCD2] hover:bg-white hover:border-[#383530] transition-colors rounded-xs text-left flex items-center justify-between group"
                  >
                    <div className="min-w-0 pr-2">
                      <div className="text-xs font-semibold text-[#1C1B18] truncate group-hover:text-[#4B5E38]">
                        {prod.name}
                      </div>
                      <div className="text-[11px] text-[#787268] tabular-nums">
                        ${prod.price}.00 · {prod.volume}
                      </div>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-[#8C867C] group-hover:text-[#1C1B18] shrink-0" />
                  </button>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
