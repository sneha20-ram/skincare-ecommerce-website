/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductCatalog } from './components/ProductCatalog';
import { CustomerReviews } from './components/CustomerReviews';
import { IngredientGlossary } from './components/IngredientGlossary';
import { RitualsAndScience } from './components/RitualsAndScience';
import { Footer } from './components/Footer';
import { ScrollReveal } from './components/ScrollReveal';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { SkinQuiz } from './components/SkinQuiz';
import { ProductModal } from './components/ProductModal';
import { CheckoutModal } from './components/CheckoutModal';

function MainLayout() {
  const { activeProductModal, setActiveProductModal } = useStore();

  const handleNavigate = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FBFBF9] text-[#1E1E1E] flex flex-col font-sans-clean">
      {/* Top Navbar */}
      <Navbar onNavigate={handleNavigate} />

      {/* Main Page Flow */}
      <main className="flex-grow">
        {/* Editorial Campaign Hero */}
        <Hero onExplore={() => handleNavigate('catalog')} />

        {/* Product Catalog & Live Filtering */}
        <ScrollReveal>
          <ProductCatalog />
        </ScrollReveal>

        {/* Customer Reviews & Verified Testimonials */}
        <ScrollReveal>
          <CustomerReviews />
        </ScrollReveal>

        {/* 3-Step Daily Protocols & Biophotonic Violet Glass Science */}
        <ScrollReveal>
          <RitualsAndScience />
        </ScrollReveal>

        {/* The Botanical Herbarium & Ingredients Glossary */}
        <ScrollReveal>
          <IngredientGlossary />
        </ScrollReveal>
      </main>

      {/* Brand Footer */}
      <ScrollReveal direction="none">
        <Footer onNavigate={handleNavigate} />
      </ScrollReveal>

      {/* Drawers & Modals */}
      <CartDrawer />
      <WishlistDrawer />
      <SkinQuiz />
      <CheckoutModal />

      {/* Product Detail / Quick View Modal */}
      {activeProductModal && (
        <ProductModal
          product={activeProductModal}
          onClose={() => setActiveProductModal(null)}
        />
      )}
    </div>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <MainLayout />
    </StoreProvider>
  );
}
