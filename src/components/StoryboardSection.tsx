import React, { useState } from 'react';
import { STORYBOARD_STEPS } from '../data/mockData';
import { 
  Compass, 
  UserCheck, 
  Filter, 
  Video, 
  Clock, 
  Award, 
  CheckCircle2, 
  ArrowRight, 
  BookOpen, 
  Users, 
  Sparkles,
  Layers,
  ShieldCheck,
  Target
} from 'lucide-react';

interface StoryboardSectionProps {
  onGoToDirectory: () => void;
  onGoToSessions: () => void;
}

export const StoryboardSection: React.FC<StoryboardSectionProps> = ({
  onGoToDirectory,
  onGoToSessions,
}) => {
  const [activeStep, setActiveStep] = useState<number>(1);

  const getStepIcon = (stepNum: number) => {
    switch (stepNum) {
      case 1: return <Compass className="w-5 h-5 text-[#A3223A]" />;
      case 2: return <UserCheck className="w-5 h-5 text-blue-600" />;
      case 3: return <Filter className="w-5 h-5 text-amber-600" />;
      case 4: return <Video className="w-5 h-5 text-purple-600" />;
      case 5: return <Clock className="w-5 h-5 text-emerald-600" />;
      case 6: return <Award className="w-5 h-5 text-[#A3223A]" />;
      default: return <Sparkles className="w-5 h-5 text-stone-500" />;
    }
  };

  const selectedStepData = STORYBOARD_STEPS.find((s) => s.stepNumber === activeStep) || STORYBOARD_STEPS[0];

  return (
    <div className="space-y-10 animate-fadeIn">
      {/* 1. Academic Header */}
      <div className="border-b border-stone-200 pb-6 space-y-2">
        <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#A3223A]">
          <BookOpen className="w-4 h-4" />
          <span>Cátedra de Innovación · Turno Tarde · Grupo 5</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-stone-900">
          Storyboard del Viaje del Usuario & Dimensiones de Validación
        </h1>
        <p className="text-sm text-stone-600 max-w-3xl leading-relaxed">
          Esta maqueta web interactiva tangibiliza el proceso de innovación centrado en las necesidades del estudiante de 4to año y la comunidad de egresados de la Universidad Blas Pascal.
        </p>
      </div>

      {/* 2. Interactive Storyboard Carousel / Step Explorer */}
      <section className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 pb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#A3223A]">
              Prototipo Conceptual (Sección 5.1 del Documento)
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-stone-900">
              El Viaje del Usuario en 6 Momentos Clave
            </h2>
          </div>
          <span className="text-xs text-stone-500 font-medium">
            Paso {activeStep} de 6
          </span>
        </div>

        {/* Steps Ribbon / Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {STORYBOARD_STEPS.map((step) => {
            const isSelected = activeStep === step.stepNumber;
            return (
              <button
                key={step.stepNumber}
                type="button"
                onClick={() => setActiveStep(step.stepNumber)}
                className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between space-y-2 ${
                  isSelected
                    ? 'border-[#A3223A] bg-[#A3223A]/5 ring-1 ring-[#A3223A] shadow-xs'
                    : 'border-stone-200 hover:border-stone-300 bg-white hover:bg-stone-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-extrabold ${
                    isSelected ? 'bg-[#A3223A] text-white' : 'bg-stone-200 text-stone-700'
                  }`}>
                    {step.stepNumber}
                  </span>
                  {getStepIcon(step.stepNumber)}
                </div>
                <div className={`text-xs font-bold leading-tight ${isSelected ? 'text-[#A3223A]' : 'text-stone-800'}`}>
                  {step.title.replace(`${step.stepNumber}. `, '')}
                </div>
              </button>
            );
          })}
        </div>

        {/* Step Highlight Showcase */}
        <div className="bg-stone-50 rounded-xl border border-stone-200 p-6 sm:p-8 grid md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-[#A3223A]/10 text-[#A3223A] text-xs font-bold">
              <span>Momento {selectedStepData.stepNumber}:</span>
              <span>{selectedStepData.title}</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-stone-900 leading-snug">
              {selectedStepData.shortDesc}
            </h3>

            <div className="space-y-3 pt-2 text-xs leading-relaxed">
              <div className="bg-white p-3.5 rounded-lg border border-stone-200">
                <span className="font-bold text-stone-800 block mb-1">
                  Vivencia del Usuario (Estudiante / Egresado):
                </span>
                <p className="text-stone-600">
                  {selectedStepData.userStory}
                </p>
              </div>

              <div className="bg-white p-3.5 rounded-lg border border-stone-200">
                <span className="font-bold text-[#A3223A] block mb-1">
                  Respuesta del Sistema UBP Conecta:
                </span>
                <p className="text-stone-600">
                  {selectedStepData.systemAction}
                </p>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-3">
              {activeStep > 1 && (
                <button
                  onClick={() => setActiveStep((prev) => prev - 1)}
                  className="px-3.5 py-2 bg-white border border-stone-300 text-stone-700 rounded-lg text-xs font-semibold hover:bg-stone-50"
                >
                  ← Paso Anterior
                </button>
              )}
              {activeStep < 6 ? (
                <button
                  onClick={() => setActiveStep((prev) => prev + 1)}
                  className="px-4 py-2 bg-[#A3223A] text-white rounded-lg text-xs font-bold hover:bg-[#8B1D31] flex items-center gap-1.5"
                >
                  <span>Siguiente Paso</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  onClick={onGoToDirectory}
                  className="px-4 py-2 bg-stone-900 text-white rounded-lg text-xs font-bold hover:bg-stone-800 flex items-center gap-1.5"
                >
                  <span>Probar Flujo en el Directorio</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          <div className="md:col-span-5 flex flex-col items-center justify-center p-6 bg-white rounded-xl border border-stone-200 text-center space-y-3 shadow-2xs">
            <div className="w-16 h-16 rounded-2xl bg-[#A3223A]/10 text-[#A3223A] flex items-center justify-center">
              {getStepIcon(selectedStepData.stepNumber)}
            </div>
            <div className="font-bold text-stone-900 text-sm">
              {selectedStepData.screenshotLabel}
            </div>
            <p className="text-[11px] text-stone-500 max-w-xs">
              Mapeado en el guion gráfico del documento escrito para validar la transición de la incertidumbre al networking profesional activo.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Las 4 Dimensiones de Hipótesis a Validar (Sección 5.2 del Documento) */}
      <section className="space-y-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#A3223A]">
            Metodología Empírica (Sección 5.2)
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-stone-900 mt-0.5">
            Las 4 Hipótesis & Dimensiones para Testeo con Usuarios
          </h2>
          <p className="text-xs text-stone-600 mt-1">
            Cada componente de este prototipo fue concebido para medir métricas precisas con estudiantes y egresados reales.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {/* Dimensión 1 */}
          <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#A3223A] uppercase tracking-wider">
                Dimensión 1 · Usabilidad Front-End
              </span>
              <Target className="w-4 h-4 text-[#A3223A]" />
            </div>
            <h3 className="font-bold text-stone-900 text-sm">
              Tasa de Finalización del Flujo Crítico
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              <strong>Hipótesis:</strong> Un estudiante puede encontrar a un egresado de su área y completar una solicitud de mentoría con objetivo definido en <strong className="text-stone-800">menos de 4 pasos e inferior a 3 minutos</strong>, superando la frustración del contacto en frío tradicional.
            </p>
            <div className="pt-2 border-t border-stone-100 flex items-center gap-2 text-[11px] text-emerald-700 font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Validable en la vista: Directorio de Mentores & Modal de Agendamiento</span>
            </div>
          </div>

          {/* Dimensión 2 */}
          <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#A3223A] uppercase tracking-wider">
                Dimensión 2 · Compromiso Temporal
              </span>
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
            </div>
            <h3 className="font-bold text-stone-900 text-sm">
              Viabilidad de Disponibilidad del Egresado (Anti-Burnout)
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              <strong>Hipótesis:</strong> Al observar que el sistema limita las sesiones a <strong className="text-stone-800">bloques fijos de 30 minutos</strong> y exige un temario previo obligatorio, la predisposición del graduado a registrarse y abrir cupos mensuales <strong className="text-stone-800">supera el 70%</strong>, mitigando el temor a la pérdida de tiempo.
            </p>
            <div className="pt-2 border-t border-stone-100 flex items-center gap-2 text-[11px] text-emerald-700 font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Validable en la vista: Topes de disponibilidad mensual (1-2 cupos)</span>
            </div>
          </div>

          {/* Dimensión 3 */}
          <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#A3223A] uppercase tracking-wider">
                Dimensión 3 · Canal de Interacción
              </span>
              <Video className="w-4 h-4 text-blue-600" />
            </div>
            <h3 className="font-bold text-stone-900 text-sm">
              Preferencia de Canal: Híbrido vs. Remoto
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              <strong>Hipótesis:</strong> Los estudiantes prefieren la <strong className="text-stone-800">flexibilidad remota</strong> para consultas breves de currículum o entrevistas técnicas, pero valoran instancias <strong className="text-stone-800">presenciales en el campus</strong> cuando se trata de mesas temáticas, networking o ferias de talento.
            </p>
            <div className="pt-2 border-t border-stone-100 flex items-center gap-2 text-[11px] text-emerald-700 font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Validable en la vista: Selector de formato Campus Argüello / Meet</span>
            </div>
          </div>

          {/* Dimensión 4 */}
          <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#A3223A] uppercase tracking-wider">
                Dimensión 4 · Propuesta de Valor
              </span>
              <Award className="w-4 h-4 text-amber-600" />
            </div>
            <h3 className="font-bold text-stone-900 text-sm">
              Claridad & Diferenciación Institucional
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              <strong>Hipótesis:</strong> Tanto estudiantes como graduados perciben a UBP Conecta como una herramienta <strong className="text-stone-800">diferenciada y superior a LinkedIn</strong> o los boletines de correo masivo, reconociendo el valor del sentido de pertenencia y la confianza institucional.
            </p>
            <div className="pt-2 border-t border-stone-100 flex items-center gap-2 text-[11px] text-emerald-700 font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Validable en la vista: Mis Conexiones & Valoraciones comunitarias</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Equipo de Innovación Grupo 5 */}
      <section className="bg-stone-50 rounded-2xl border border-stone-200 p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-[#A3223A]" />
          <h3 className="text-lg font-bold text-stone-900">
            Equipo Elaborador · Grupo 5 (Innovación - Turno Tarde)
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
          {[
            { name: 'Lobos Zoe', career: 'Administración' },
            { name: 'Loza Valeria', career: 'Turismo' },
            { name: 'Beas Gonzalo', career: 'Marketing' },
            { name: 'Octavio Lopez', career: 'Contador' },
            { name: 'Romero Ary German', career: 'Telecomunicación' },
            { name: 'Juan Jaramillo', career: 'Ing. Informática' },
            { name: 'Juri Nam Santiago', career: 'Ing. Informática' },
            { name: 'Karpowicz Edgar', career: 'Ing. Informática' },
            { name: 'Rodrigues Valentina', career: 'Com. Audiovisual' },
          ].map((member, i) => (
            <div
              key={i}
              className="bg-white p-3 rounded-lg border border-stone-200 flex items-center justify-between"
            >
              <span className="font-bold text-stone-800">{member.name}</span>
              <span className="text-[11px] text-stone-500 font-medium">{member.career}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
