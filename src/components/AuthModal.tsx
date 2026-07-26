import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { UserRole } from '../types';
import {
  X,
  UserCheck,
  ShieldCheck,
  User,
  Sparkles,
  Mail,
  Lock,
  ArrowRight,
  GraduationCap
} from 'lucide-react';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, setIsAuthModalOpen, setCurrentUser, authModalInitialMode } = useApp();

  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>('estudiante');
  const [educationalLevel, setEducationalLevel] = useState('Universitario (en curso)');
  const [interestArea, setInterestArea] = useState('Medicina y Ciencias de la Salud');

  React.useEffect(() => {
    if (isAuthModalOpen) {
      setMode(authModalInitialMode || 'login');
    }
  }, [isAuthModalOpen, authModalInitialMode]);

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setCurrentUser({
      id: `usr-${Date.now()}`,
      name: name || 'Estudiante LDF',
      email: email || 'estudiante@ejemplo.com',
      role: 'estudiante',
      educationalLevel,
      interestArea,
      registeredAt: new Date().toISOString().split('T')[0],
    });

    setIsAuthModalOpen(false);
  };

  const handleQuickLogin = () => {
    setCurrentUser({
      id: 'usr-estudiante-01',
      name: 'Estudiante LDF',
      email: 'estudiante@ejemplo.com',
      role: 'estudiante',
      educationalLevel: 'Universitario (en curso)',
      interestArea: 'Medicina y Ciencias de la Salud',
      registeredAt: '2026-01-15',
    });
    setIsAuthModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-[#1C120C] w-full max-w-md rounded-3xl shadow-2xl border border-gray-200 dark:border-[#2E1B0F] p-6 sm:p-8 space-y-6 animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-gray-200 dark:border-[#2E1B0F] pb-4">
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-xl bg-[#B8860B]/10 text-[#B8860B]">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold font-[#Outfit] text-[#2E1B0F] dark:text-white">
                {mode === 'login' ? 'Iniciar Sesión' : 'Crear Cuenta LDF Academy'}
              </h3>
              <p className="text-[11px] text-gray-500">
                {mode === 'login' ? 'Ingresa con tu correo de estudiante registrado' : 'Registro de perfil de estudiante'}
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsAuthModalOpen(false)}
            className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-[#251810] text-gray-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Demo Login Switcher for Students */}
        <div className="p-3.5 rounded-2xl bg-gray-50 dark:bg-[#251810] border border-gray-200 dark:border-[#3A2214] space-y-2">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
            Acceso Rápido de Estudiante (Demo)
          </span>
          <button
            type="button"
            onClick={handleQuickLogin}
            className="w-full py-2.5 rounded-xl bg-white dark:bg-[#1C120C] text-[#2E1B0F] dark:text-white border border-gray-200 dark:border-[#3A2214] hover:border-[#B8860B] flex items-center justify-center space-x-1.5 shadow-xs font-bold text-xs"
          >
            <UserCheck className="w-4 h-4 text-[#B8860B]" />
            <span>Ingresar como Estudiante</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {mode === 'register' && (
            <div>
              <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-1">Nombre Completo</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ej. Johan Castillo"
                className="w-full p-3 rounded-xl bg-gray-50 dark:bg-[#251810] border border-gray-200 dark:border-[#3A2214] text-gray-800 dark:text-gray-100"
              />
            </div>
          )}

          <div>
            <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-1">Correo Electrónico</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu.correo@ejemplo.com"
                className="w-full pl-9 p-3 rounded-xl bg-gray-50 dark:bg-[#251810] border border-gray-200 dark:border-[#3A2214] text-gray-800 dark:text-gray-100"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-1">Contraseña</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 p-3 rounded-xl bg-gray-50 dark:bg-[#251810] border border-gray-200 dark:border-[#3A2214] text-gray-800 dark:text-gray-100"
              />
            </div>
          </div>

          {mode === 'register' && selectedRole === 'estudiante' && (
            <>
              <div>
                <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-1">Nivel Académico</label>
                <select
                  value={educationalLevel}
                  onChange={(e) => setEducationalLevel(e.target.value)}
                  className="w-full p-3 rounded-xl bg-gray-50 dark:bg-[#251810] border border-gray-200 dark:border-[#3A2214]"
                >
                  <option value="Bachillerato completo">Bachillerato completo</option>
                  <option value="Técnico Superior (ITLA / INFOTEP)">Técnico Superior (ITLA / INFOTEP)</option>
                  <option value="Universitario (en curso)">Universitario (en curso)</option>
                  <option value="Graduado de Licenciatura">Graduado de Licenciatura</option>
                  <option value="Profesional / Posgrado">Profesional / Posgrado</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-1">Área o Carrera de Interés</label>
                <select
                  value={interestArea}
                  onChange={(e) => setInterestArea(e.target.value)}
                  className="w-full p-3 rounded-xl bg-gray-50 dark:bg-[#251810] border border-gray-200 dark:border-[#3A2214]"
                >
                  <option value="Medicina y Ciencias de la Salud">Medicina y Ciencias de la Salud</option>
                  <option value="Tecnología, Sistemas e IA">Tecnología, Sistemas e IA</option>
                  <option value="Derecho, Leyes y Ciencias Políticas">Derecho, Leyes y Ciencias Políticas</option>
                  <option value="Ingeniería, Arquitectura y Mecatrónica">Ingeniería, Arquitectura y Mecatrónica</option>
                  <option value="Negocios, Finanzas y Emprendimiento">Negocios, Finanzas y Emprendimiento</option>
                  <option value="Agronomía, Biotecnología y Medio Ambiente">Agronomía, Biotecnología y Medio Ambiente</option>
                  <option value="Educación, Pedagogía y Psicología">Educación, Pedagogía y Psicología</option>
                  <option value="Artes, Diseño, Comunicación y Cine">Artes, Diseño, Comunicación y Cine</option>
                </select>
              </div>
            </>
          )}

          <button
            type="submit"
            className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#B8860B] to-[#D4AF37] hover:from-[#A07308] hover:to-[#B8860B] text-white font-bold text-xs shadow-md transition-all flex items-center justify-center space-x-1.5"
          >
            <span>{mode === 'login' ? 'Iniciar Sesión Estudiante' : 'Completar Registro Estudiantil'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center text-xs text-gray-500 pt-2 border-t border-gray-100 dark:border-[#2E1B0F]">
          {mode === 'login' ? (
            <p>
              ¿No tienes cuenta aún?{' '}
              <button
                onClick={() => setMode('register')}
                className="font-bold text-[#B8860B] hover:underline"
              >
                Regístrate gratis
              </button>
            </p>
          ) : (
            <p>
              ¿Ya tienes cuenta?{' '}
              <button
                onClick={() => setMode('login')}
                className="font-bold text-[#B8860B] hover:underline"
              >
                Inicia sesión
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
