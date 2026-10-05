import React, { useState } from 'react';
import { ShoppingBag, Heart, Search, X, Menu } from 'lucide-react';
import { useStore } from '../context/StoreContext';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  const {
    cartCount,
    setIsCartOpen,
    wishlist,
    setIsWishlistOpen,
    setIsQuizOpen,
    searchQuery,
    setSearchQuery
  } = useStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [showPromoBanner, setShowPromoBanner] = useState(true);

  const handleNavClick = (sectionId: string) => {
    onNavigate(sectionId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FBFBF9]/95 backdrop-blur-md border-b border-[#EBE8E0]">
      {/* Slim Dismissible Top Notification Bar */}
      {showPromoBanner && (
        <div className="bg-[#2D2A26] text-[#EFECE6] px-4 py-2 text-xs flex items-center justify-between tracking-wide font-medium">
          <div className="mx-auto text-center flex items-center gap-3">
            <span>Complimentary carbon-neutral shipping on orders over $75</span>
            <span className="hidden sm:inline text-[#A8A49D]">·</span>
            <span className="hidden sm:inline text-[#D4C3A3]">Use code BOTANICA15 for 15% off first order</span>
          </div>
          <button
            onClick={() => setShowPromoBanner(false)}
            className="text-[#A8A49D] hover:text-white transition-colors p-1"
            aria-label="Dismiss banner"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Top Bar Contract: Zone 1 (Wordmark) - Zone 2 (Nav Links) - Zone 3 (Actions) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('home');
          }}
          className="font-serif-luxury text-2xl sm:text-3xl tracking-widest text-[#1C1B18] font-medium uppercase whitespace-nowrap"
        >
          LUMEN BOTANICA
        </a>

        {/* Zone 2: 4-6 clean text navigation links with hover underline */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium tracking-wide text-[#4A4742]">
          <button
            onClick={() => handleNavClick('catalog')}
            className="hover:text-[#1C1B18] transition-colors relative py-1 hover:underline underline-offset-8 decoration-[#8C8275]"
          >
            Formulations
          </button>
          <button
            onClick={() => handleNavClick('reviews')}
            className="hover:text-[#1C1B18] transition-colors relative py-1 hover:underline underline-offset-8 decoration-[#8C8275]"
          >
            Reviews
          </button>
          <button
            onClick={() => handleNavClick('rituals')}
            className="hover:text-[#1C1B18] transition-colors relative py-1 hover:underline underline-offset-8 decoration-[#8C8275]"
          >
            Daily Rituals
          </button>
          <button
            onClick={() => handleNavClick('ingredients')}
            className="hover:text-[#1C1B18] transition-colors relative py-1 hover:underline underline-offset-8 decoration-[#8C8275]"
          >
            Herbarium Actives
          </button>
          <button
            onClick={() => handleNavClick('science')}
            className="hover:text-[#1C1B18] transition-colors relative py-1 hover:underline underline-offset-8 decoration-[#8C8275]"
          >
            Cellular Science
          </button>
          <button
            onClick={() => setIsQuizOpen(true)}
            className="text-[#5A6349] font-semibold hover:text-[#3B4230] transition-colors py-1 hover:underline underline-offset-8 decoration-[#5A6349]"
          >
            Skin Diagnostic
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions (Search, Wishlist, Bag) */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Search Toggle */}
          <div className="relative">
            {showSearchInput ? (
              <div className="flex items-center bg-[#F2EFE9] border border-[#DDD8CD] rounded px-2 py-1">
                <Search className="w-4 h-4 text-[#757169] mr-1.5 shrink-0" />
                <input
                  type="text"
                  placeholder="Search serums, SPF..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-32 sm:w-44 text-xs bg-transparent border-none outline-none text-[#1C1B18] placeholder-[#8F8A80]"
                  autoFocus
                />
                <button
                  onClick={() => {
                    setShowSearchInput(false);
                    setSearchQuery('');
                  }}
                  className="text-[#757169] hover:text-[#1C1B18] ml-1"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowSearchInput(true)}
                className="p-2 text-[#4A4742] hover:text-[#1C1B18] transition-colors"
                aria-label="Search formulations"
                title="Search formulations"
              >
                <Search className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            onClick={() => setIsWishlistOpen(true)}
            className="p-2 text-[#4A4742] hover:text-[#1C1B18] transition-colors relative"
            aria-label="View Wishlist"
            title="Saved Formulations"
          >
            <Heart className="w-5 h-5" />
            {wishlist.length > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-[#8C7A6B] text-white text-[10px] font-semibold rounded-full flex items-center justify-center tabular-nums">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Shopping Bag Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-2 px-3 py-2 bg-[#2D2A26] text-white text-xs tracking-wider uppercase font-medium hover:bg-[#1C1B18] transition-colors rounded-sm"
            aria-label="Shopping Bag"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">Bag</span>
            <span className="w-4 h-4 bg-white/20 rounded-full flex items-center justify-center text-[10px] tabular-nums font-bold">
              {cartCount}
            </span>
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#4A4742] hover:text-[#1C1B18]"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FBFBF9] border-b border-[#EBE8E0] px-6 py-6 space-y-4">
          <div className="flex flex-col space-y-3 text-base font-medium text-[#2D2A26]">
            <button
              onClick={() => handleNavClick('catalog')}
              className="text-left py-2 border-b border-[#EFECE6]"
            >
              All Formulations
            </button>
            <button
              onClick={() => handleNavClick('reviews')}
              className="text-left py-2 border-b border-[#EFECE6]"
            >
              Client Reviews & Efficacy
            </button>
            <button
              onClick={() => handleNavClick('rituals')}
              className="text-left py-2 border-b border-[#EFECE6]"
            >
              Daily Rituals
            </button>
            <button
              onClick={() => handleNavClick('ingredients')}
              className="text-left py-2 border-b border-[#EFECE6]"
            >
              Herbarium Actives
            </button>
            <button
              onClick={() => handleNavClick('science')}
              className="text-left py-2 border-b border-[#EFECE6]"
            >
              Cellular Science & Violet Glass
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsQuizOpen(true);
              }}
              className="text-left py-2 text-[#5A6349] font-semibold"
            >
              Take Skin Diagnostic Quiz
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
