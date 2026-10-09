import React, { useState } from 'react';
import { MentorshipBooking, SessionReview } from '../types';
import { Star, CheckCircle, Award, Sparkles, MessageSquare } from 'lucide-react';

interface SessionReviewModalProps {
  booking: MentorshipBooking | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmitReview: (bookingId: string, review: SessionReview) => void;
}

export const SessionReviewModal: React.FC<SessionReviewModalProps> = ({
  booking,
  isOpen,
  onClose,
  onSubmitReview,
}) => {
  if (!isOpen || !booking) return null;

  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [feedbackText, setFeedbackText] = useState('');
  const [helpedCareerGoal, setHelpedCareerGoal] = useState<boolean>(true);
  const [punctuality, setPunctuality] = useState<boolean>(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const review: SessionReview = {
      rating,
      feedbackText: feedbackText.trim() || 'Sesión excelente y muy enriquecedora para mi desarrollo profesional.',
      helpedCareerGoal,
      punctuality,
      submittedAt: new Date().toISOString(),
    };
    onSubmitReview(booking.id, review);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-2xl border border-stone-200 max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-6">
        <div className="flex items-start justify-between border-b border-stone-100 pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#A3223A]">
              <Award className="w-3.5 h-3.5" />
              <span>Cierre & Evaluación Recíproca (Paso 6)</span>
            </div>
            <h2 className="text-xl font-extrabold text-stone-900 mt-0.5">
              Valorar Sesión con {booking.mentorName}
            </h2>
            <p className="text-xs text-stone-500">
              {booking.date} · {booking.time} (30 min)
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-stone-400 hover:text-stone-700 text-xl font-bold"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 text-xs">
          {/* Star Rating */}
          <div className="text-center space-y-2 py-2 bg-stone-50 rounded-xl border border-stone-200">
            <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider">
              ¿Cómo calificarías la sesión de orientación?
            </label>
            <div className="flex items-center justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => {
                const filled = (hoverRating ?? rating) >= star;
                return (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(null)}
                    className="p-1 transition-transform hover:scale-125 focus:outline-hidden"
                  >
                    <Star
                      className={`w-7 h-7 ${
                        filled
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-stone-300'
                      }`}
                    />
                  </button>
                );
              })}
            </div>
            <div className="text-[11px] font-semibold text-stone-500">
              {rating === 5 && '¡Excelente! Aporte decisivo para mi perfil'}
              {rating === 4 && 'Muy buena y orientadora'}
              {rating === 3 && 'Buena, resolvió dudas básicas'}
              {rating === 2 && 'Regular'}
              {rating === 1 && 'No cumplió expectativas'}
            </div>
          </div>

          {/* Impact Checkboxes */}
          <div className="space-y-2.5">
            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={helpedCareerGoal}
                onChange={(e) => setHelpedCareerGoal(e.target.checked)}
                className="w-4 h-4 text-[#A3223A] rounded border-stone-300 focus:ring-[#A3223A]"
              />
              <span className="text-stone-700 font-medium">
                La sesión me ayudó a aclarar mi camino laboral o validar competencias técnicas.
              </span>
            </label>

            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={punctuality}
                onChange={(e) => setPunctuality(e.target.checked)}
                className="w-4 h-4 text-[#A3223A] rounded border-stone-300 focus:ring-[#A3223A]"
              />
              <span className="text-stone-700 font-medium">
                El intercambio respetó la duración pactada de 30 minutos y el horario.
              </span>
            </label>
          </div>

          {/* Qualitative Feedback */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider">
              Feedback Cualitativo para el Mentor:
            </label>
            <textarea
              rows={3}
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
              placeholder="Contanos brevemente qué aprendizajes te llevás o qué recomendaciones te resultaron más útiles..."
              className="w-full px-3 py-2 border border-stone-200 rounded-lg focus:border-[#A3223A] focus:outline-hidden"
            />
          </div>

          {/* Reciprocity Badge Notice */}
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg flex items-start gap-2 text-emerald-800 text-[11px]">
            <Sparkles className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div className="leading-snug">
              Tu valoración retroalimenta la red comunitaria de la UBP y otorga al egresado el <strong>Sello de Mentor Activo UBP</strong> para su perfil profesional.
            </div>
          </div>

          {/* Buttons */}
          <div className="pt-2 border-t border-stone-200 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-stone-600 font-semibold hover:text-stone-900"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-[#A3223A] hover:bg-[#8B1D31] text-white font-bold rounded-lg transition-colors shadow-xs"
            >
              Enviar Valoración
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
