import React, { useState } from 'react';
import { useApp, ActiveTab } from '../context/AppContext';
import { Logo } from './Logo';
import {
  Home,
  Users,
  GraduationCap,
  Sparkles,
  Bot,
  Sun,
  Moon,
  UserCheck,
  Shield,
  Menu,
  X,
  ChevronRight,
  Compass,
  Radar,
  Route,
  Mail,
  LogIn,
  UserPlus,
  LogOut,
  User as UserIcon
} from 'lucide-react';

export const Header: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    currentUser,
    setCurrentUser,
    switchRole,
    isDarkMode,
    toggleDarkMode,
    openAuthModal,
    setIsAssistantOpen,
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Complete, clean menu items for seamless navigation
  const mainMenuItems: { id: ActiveTab; label: string; icon: React.ReactNode; isSpecial?: boolean }[] = [
    { id: 'inicio', label: 'Inicio', icon: <Home className="w-4 h-4" /> },
    { id: 'sobre-nosotros', label: 'Sobre Nosotros', icon: <Users className="w-4 h-4" /> },
    { id: 'oportunidades', label: 'Oportunidades', icon: <GraduationCap className="w-4 h-4" /> },
    { id: 'radar', label: 'Radar', icon: <Radar className="w-4 h-4" /> },
    { id: 'ruta', label: 'Ruta al Éxito', icon: <Route className="w-4 h-4" /> },
    { id: 'inspirate', label: 'Inspírate', icon: <Sparkles className="w-4 h-4 text-[#D4AF37]" />, isSpecial: true },
    { id: 'contacto', label: 'Contacto', icon: <Mail className="w-4 h-4" /> },
  ];

  const handleNavClick = (id: ActiveTab) => {
    if (id === 'ldf-assistant') {
      setIsAssistantOpen(true);
    } else {
      setActiveTab(id);
    }
    setMobileMenuOpen(false);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setActiveTab('inicio');
  };

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/90 dark:bg-[#130D08]/90 border-b border-[#B8860B]/30 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Brand & Logo matching official image */}
        <button
          onClick={() => setActiveTab('inicio')}
          className="flex items-center space-x-2 text-left group focus:outline-none shrink-0"
        >
          <Logo variant="horizontal" size="md" className="group-hover:scale-102 transition-transform duration-300" />
        </button>

        {/* Desktop Navigation Menu */}
        <nav className="hidden xl:flex items-center space-x-1 bg-gray-100/90 dark:bg-[#1C120C]/90 p-1.5 rounded-full border border-gray-200/80 dark:border-[#3D2314]">
          {mainMenuItems.map((item) => {
            const isActive = activeTab === item.id || (item.id === 'sobre-nosotros' && activeTab === 'nosotros');
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`relative px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center space-x-1.5 transition-all duration-200 whitespace-nowrap ${
                  isActive
                    ? 'bg-white dark:bg-[#2E1B0F] text-[#B8860B] dark:text-[#D4AF37] shadow-xs font-bold ring-1 ring-[#B8860B]/30'
                    : 'text-gray-700 dark:text-gray-300 hover:text-[#B8860B] dark:hover:text-[#D4AF37] hover:bg-white/60 dark:hover:bg-[#2E1B0F]/50'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Medium Screen Compact Navigation (Lg to Xl) */}
        <nav className="hidden lg:flex xl:hidden items-center space-x-1 bg-gray-100/90 dark:bg-[#1C120C]/90 p-1.5 rounded-full border border-gray-200/80 dark:border-[#3D2314]">
          {mainMenuItems.slice(0, 5).map((item) => {
            const isActive = activeTab === item.id || (item.id === 'sobre-nosotros' && activeTab === 'nosotros');
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`relative px-3 py-1.5 rounded-full text-xs font-semibold flex items-center space-x-1 transition-all duration-200 whitespace-nowrap ${
                  isActive
                    ? 'bg-white dark:bg-[#2E1B0F] text-[#B8860B] dark:text-[#D4AF37] shadow-xs font-bold'
                    : 'text-gray-700 dark:text-gray-300 hover:text-[#B8860B] dark:hover:text-[#D4AF37]'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Action Controls: Iniciar Sesión, Registrarse & Assistant */}
        <div className="hidden md:flex items-center space-x-2">
          {/* AI Assistant Quick Launcher */}
          <button
            onClick={() => setIsAssistantOpen(true)}
            className="px-3 py-1.5 rounded-full bg-[#B8860B]/10 hover:bg-[#B8860B]/20 text-[#B8860B] dark:text-[#D4AF37] border border-[#B8860B]/30 text-xs font-semibold flex items-center space-x-1.5 transition-all duration-200 hover:scale-105"
            title="Abrir Asistente IA Líderes del Futuro"
          >
            <Bot className="w-4 h-4 text-[#B8860B] dark:text-[#D4AF37]" />
            <span className="hidden lg:inline">Asistente IA</span>
          </button>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#2E1B0F] transition-colors"
            title={isDarkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
            aria-label="Alternar tema"
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-[#D4AF37]" /> : <Moon className="w-4 h-4 text-gray-700" />}
          </button>

          {/* User Profile Button: Strictly 'Hola Estudiante de LDF' without image */}
          {currentUser ? (
            <div className="flex items-center space-x-2 pl-1 border-l border-gray-200 dark:border-[#2E1B0F]">
              <button
                onClick={() => setActiveTab('mi-futuro')}
                className="flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-gray-100 dark:bg-[#251810] border border-gray-200 dark:border-[#3A2214] hover:border-[#B8860B] text-xs font-bold transition-all text-[#2E1B0F] dark:text-white"
              >
                <span>Hola Estudiante de LDF</span>
              </button>

              <button
                onClick={handleLogout}
                className="p-2 rounded-full text-gray-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors"
                title="Cerrar Sesión"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-2 pl-1">
              <button
                onClick={() => openAuthModal('login')}
                className="px-3.5 py-1.5 rounded-full text-xs font-bold text-gray-700 dark:text-gray-200 hover:text-[#B8860B] dark:hover:text-[#D4AF37] hover:bg-gray-100 dark:hover:bg-[#2E1B0F] transition-all flex items-center space-x-1"
              >
                <LogIn className="w-3.5 h-3.5 text-[#B8860B]" />
                <span>Iniciar Sesión</span>
              </button>

              <button
                onClick={() => openAuthModal('register')}
                className="px-4 py-2 rounded-full text-xs font-bold bg-gradient-to-r from-[#B8860B] via-[#D4AF37] to-[#B8860B] text-white shadow-md hover:brightness-110 hover:shadow-lg transition-all flex items-center space-x-1.5"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>Registrarse</span>
              </button>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Toggle Button */}
        <div className="flex items-center space-x-2 lg:hidden">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full text-gray-600 dark:text-gray-300"
            aria-label="Alternar tema"
          >
            {isDarkMode ? <Sun className="w-5 h-5 text-[#D4AF37]" /> : <Moon className="w-5 h-5" />}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl bg-gray-100 dark:bg-[#2E1B0F] text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-[#3D2314]"
            aria-label="Abrir menú"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden glass-panel border-b border-[#B8860B]/20 px-4 pt-3 pb-6 space-y-4 animate-in slide-in-from-top duration-300">
          <div className="grid grid-cols-1 gap-1">
            {mainMenuItems.map((item) => {
              const isActive = activeTab === item.id || (item.id === 'sobre-nosotros' && activeTab === 'nosotros');
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-left font-medium text-sm transition-colors ${
                    isActive
                      ? 'bg-[#B8860B]/15 text-[#B8860B] dark:text-[#D4AF37] font-bold'
                      : 'text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-[#2E1B0F]'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    {item.icon}
                    <span>{item.label}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </button>
              );
            })}

            <button
              onClick={() => {
                setIsAssistantOpen(true);
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-left font-semibold text-sm bg-[#B8860B]/10 text-[#B8860B] dark:text-[#D4AF37] border border-[#B8860B]/20 mt-1"
            >
              <div className="flex items-center space-x-3">
                <Bot className="w-4 h-4" />
                <span>Asistente IA Educativa</span>
              </div>
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            </button>
          </div>

          {/* Auth Action Buttons in Mobile Menu */}
          <div className="pt-3 border-t border-gray-200 dark:border-[#2E1B0F] space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  openAuthModal('login');
                  setMobileMenuOpen(false);
                }}
                className="py-2.5 rounded-xl bg-gray-100 dark:bg-[#251810] text-[#2E1B0F] dark:text-white font-bold text-xs border border-gray-200 dark:border-[#3A2214] flex items-center justify-center space-x-1.5"
              >
                <LogIn className="w-4 h-4 text-[#B8860B]" />
                <span>Iniciar Sesión</span>
              </button>

              <button
                onClick={() => {
                  openAuthModal('register');
                  setMobileMenuOpen(false);
                }}
                className="py-2.5 rounded-xl bg-gradient-to-r from-[#B8860B] to-[#D4AF37] text-white font-bold text-xs flex items-center justify-center space-x-1.5 shadow-md"
              >
                <UserPlus className="w-4 h-4" />
                <span>Registrarse</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};


