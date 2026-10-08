import React from 'react';
import { UBPLogo } from './UBPLogo';
import { MapPin, Phone, Mail, Globe, ExternalLink, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-stone-900 text-stone-300 border-t border-stone-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="space-y-4">
            <UBPLogo variant="white" size="md" showMotto={true} />
            <p className="text-xs text-stone-400 leading-relaxed pr-4">
              Plataforma de vinculación integral entre la comunidad de graduados y los estudiantes de la Universidad Blas Pascal.
            </p>
            <div className="pt-2 text-xs text-stone-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
              <span>Red Activa de +20.000 Graduados</span>
            </div>
          </div>

          {/* Institutional Ecosystem */}
          <div className="space-y-3 text-xs">
            <h4 className="font-bold uppercase tracking-wider text-white text-[11px]">
              Ecosistema Institucional UBP
            </h4>
            <ul className="space-y-2 text-stone-400">
              <li>
                <span className="text-white font-medium">Centro de Graduados/as:</span> Acompañamiento profesional y formación continua.
              </li>
              <li>
                <span className="text-white font-medium">CMS (Córdoba Management School):</span> Escuela de negocios de posgrado.
              </li>
              <li>
                <span className="text-white font-medium">doingLABS:</span> Incubadora universitaria de startups tecnológicas.
              </li>
              <li>
                <span className="text-white font-medium">Secretaría de Extensión:</span> Deportes, cultura y pasantías laborales.
              </li>
            </ul>
          </div>

          {/* Campus & Contact */}
          <div className="space-y-3 text-xs">
            <h4 className="font-bold uppercase tracking-wider text-white text-[11px]">
              Sede & Campus Universitario
            </h4>
            <div className="space-y-2.5 text-stone-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#A3223A] shrink-0 mt-0.5" />
                <span>Av. Donato Álvarez 3800, Argüello, X5014 Córdoba, Argentina</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-stone-500 shrink-0" />
                <span>0810-1223-UBP (827) / (0351) 414-4444</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-stone-500 shrink-0" />
                <span>graduados@ubp.edu.ar</span>
              </div>
            </div>
          </div>

          {/* Identity & Legal Notice */}
          <div className="space-y-3 text-xs">
            <h4 className="font-bold uppercase tracking-wider text-white text-[11px]">
              Manual de Identidad
            </h4>
            <p className="text-stone-400 leading-relaxed text-[11px]">
              Diseñado estrictamente bajo las directrices del Manual de Marca UBP: Pantone 193 C (<span className="text-white font-mono">#A3223A</span>), tipografía Bitter Itálica institucional y códigos cromáticos por carrera.
            </p>
            <div className="p-3 bg-stone-800/80 rounded-lg border border-stone-700/60 text-[11px] text-stone-300">
              <span className="font-lema italic text-white block mb-0.5">
                &ldquo;Saber y Saber Hacer&rdquo;
              </span>
              <span>Filosofía que distingue al graduado pascalino en Argentina y el mundo.</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 mt-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <p>© {new Date().getFullYear()} Universidad Blas Pascal. Todos los derechos reservados.</p>
          <div className="flex items-center gap-4 text-stone-400">
            <span>Argüello · Córdoba</span>
            <span aria-hidden="true">·</span>
            <span>MiUBP Alumnos</span>
            <span aria-hidden="true">·</span>
            <span>Portal de Empleo UBP</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
