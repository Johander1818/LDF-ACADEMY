import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { AboutUs } from './components/AboutUs';
import { Opportunities } from './components/Opportunities';
import { Inspirate } from './components/Inspirate';
import { RadarEducativo } from './components/RadarEducativo';
import { RutaAlExito } from './components/RutaAlExito';
import { MiFuturo } from './components/MiFuturo';
import { Contacto } from './components/Contacto';
import { LDFAssistant } from './components/LDFAssistant';
import { OpportunityDetailModal } from './components/OpportunityDetailModal';
import { AuthModal } from './components/AuthModal';

const MainLayout: React.FC = () => {
  const { activeTab } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-[#130D08] text-[#2E1B0F] dark:text-gray-100 transition-colors">
      <Header />

      <main className="flex-1">
        {/* Tab Router */}
        {activeTab === 'inicio' && (
          <>
            <Hero />
            <AboutUs />
            <Opportunities />
            <Inspirate />
          </>
        )}

        {(activeTab === 'sobre-nosotros' || activeTab === 'nosotros') && <AboutUs />}
        {activeTab === 'oportunidades' && <Opportunities />}
        {activeTab === 'inspirate' && <Inspirate />}
        {activeTab === 'radar' && <RadarEducativo />}
        {activeTab === 'ruta' && <RutaAlExito />}
        {activeTab === 'mi-futuro' && <MiFuturo />}
        {activeTab === 'contacto' && <Contacto />}
      </main>

      <Footer />

      {/* Floating AI Assistant & Modals */}
      <LDFAssistant />
      <OpportunityDetailModal />
      <AuthModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
