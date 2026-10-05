import React, { useState, useMemo } from 'react';
import { Filter, SlidersHorizontal, RotateCcw } from 'lucide-react';
import { PRODUCTS, Product } from '../data/products';
import { ProductCard } from './ProductCard';
import { useStore } from '../context/StoreContext';

const CATEGORIES = [
  'All',
  'Cleansers',
  'Essences & Serums',
  'Moisturizers',
  'Treatments & Oils',
  'Sun Protection'
];

const CONCERNS = [
  'All',
  'Barrier Repair',
  'Dehydration',
  'Redness',
  'Hyperpigmentation',
  'Uneven Tone',
  'Congestion'
];

export const ProductCatalog: React.FC = () => {
  const {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    selectedConcern,
    setSelectedConcern
  } = useStore();

  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category filter
      if (selectedCategory !== 'All' && product.category !== selectedCategory) {
        return false;
      }

      // Concern filter
      if (selectedConcern !== 'All') {
        const matchesConcern = product.concerns.some(c =>
          c.toLowerCase().includes(selectedConcern.toLowerCase())
        );
        if (!matchesConcern) return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const inName = product.name.toLowerCase().includes(query);
        const inSubtitle = product.subtitle.toLowerCase().includes(query);
        const inActives = product.keyActives.some(a => a.toLowerCase().includes(query));
        const inCategory = product.category.toLowerCase().includes(query);
        if (!inName && !inSubtitle && !inActives && !inCategory) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // featured maintains default order
    });
  }, [selectedCategory, selectedConcern, searchQuery, sortBy]);

  const resetFilters = () => {
    setSelectedCategory('All');
    setSelectedConcern('All');
    setSearchQuery('');
    setSortBy('featured');
  };

  const isFiltered = selectedCategory !== 'All' || selectedConcern !== 'All' || searchQuery !== '';

  return (
    <section id="catalog" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-[#EBE7DF] gap-4">
        <div>
          <div className="text-xs uppercase tracking-widest text-[#7B766D] font-medium mb-2">
            The Apothecary Shelf
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl text-[#1E1D1A] font-normal [text-wrap:balance]">
            Cellular Formulations
          </h2>
        </div>
        
        <p className="text-sm text-[#666159] max-w-md leading-relaxed">
          Biocompatible lipid carriers, botanical actives, and clean restorative serums preserved in ultraviolet glass.
        </p>
      </div>

      {/* Filter Toolbar */}
      <div className="space-y-4 mb-10">
        
        {/* Category Segmented Controls (Section 1A DO: interactive button segmented controls) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 text-xs uppercase tracking-wider font-semibold whitespace-nowrap transition-colors rounded-xs border ${
                selectedCategory === cat
                  ? 'bg-[#2A2824] text-[#FAF8F5] border-[#2A2824]'
                  : 'bg-[#F7F5F0] text-[#5C574F] border-[#E5E1D7] hover:border-[#BFB9AD] hover:text-[#1F1E1B]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Sub-bar: Concern Filters, Active Search Tag, Sort Selector */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2 text-xs">
          
          {/* Concern Dropdown / Pills */}
          <div className="flex items-center gap-2">
            <span className="text-[#78736A] uppercase tracking-wider font-medium flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5" />
              Target Concern:
            </span>
            <select
              value={selectedConcern}
              onChange={(e) => setSelectedConcern(e.target.value)}
              className="bg-[#F7F5F0] border border-[#DDD9CF] text-[#2D2A26] rounded-xs px-3 py-1.5 text-xs font-medium focus:outline-hidden focus:border-[#736E64]"
            >
              {CONCERNS.map((concern) => (
                <option key={concern} value={concern}>
                  {concern === 'All' ? 'All Skin Concerns' : concern}
                </option>
              ))}
            </select>

            {isFiltered && (
              <button
                onClick={resetFilters}
                className="flex items-center gap-1 text-[#8C4A38] hover:text-[#682E20] font-medium ml-2 transition-colors"
                title="Reset all filters"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            )}
          </div>

          {/* Right: Results Count & Sort Dropdown */}
          <div className="flex items-center gap-4 ml-auto">
            <span className="text-[#78736A] tabular-nums">
              Showing {filteredProducts.length} formulation{filteredProducts.length !== 1 ? 's' : ''}
            </span>

            <div className="flex items-center gap-1.5">
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#78736A]" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-[#F7F5F0] border border-[#DDD9CF] text-[#2D2A26] rounded-xs px-2.5 py-1.5 text-xs font-medium focus:outline-hidden focus:border-[#736E64]"
              >
                <option value="featured">Sort: Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>

        </div>

      </div>

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 px-4 bg-[#F7F5F0] border border-[#EBE7DE] rounded-xs">
          <p className="font-serif-luxury text-2xl text-[#2B2925] mb-2">No matching formulations found</p>
          <p className="text-sm text-[#706B62] mb-6 max-w-md mx-auto">
            We couldn't find any products matching your current combination of filters.
          </p>
          <button
            onClick={resetFilters}
            className="px-5 py-2.5 bg-[#2B2925] text-white text-xs uppercase tracking-wider font-semibold hover:bg-[#433F3A] transition-colors rounded-xs"
          >
            Clear All Filters
          </button>
        </div>
      )}
    </section>
  );
};
