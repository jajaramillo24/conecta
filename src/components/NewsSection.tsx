import React, { useState } from 'react';
import { NewsArticle, CareerId, UBP_CAREERS } from '../types';
import { Heart, BookOpen, Share2, ArrowRight, Sparkles, Building, Award } from 'lucide-react';

interface NewsSectionProps {
  news: NewsArticle[];
  onOpenMentorshipForAlumni?: (alumniName: string) => void;
}

export const NewsSection: React.FC<NewsSectionProps> = ({ news, onOpenMentorshipForAlumni }) => {
  const [selectedCareer, setSelectedCareer] = useState<CareerId | 'all'>('all');
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [likedArticles, setLikedArticles] = useState<Record<string, number>>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredNews = selectedCareer === 'all'
    ? news
    : news.filter((item) => item.career === selectedCareer);

  const handleLike = (articleId: string, currentLikes: number) => {
    setLikedArticles((prev) => ({
      ...prev,
      [articleId]: (prev[articleId] ?? currentLikes) + 1,
    }));
  };

  const handleShare = (id: string) => {
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-stone-200 pb-6">
        <div>
          <span className="text-xs font-semibold tracking-wider uppercase text-[#A3223A]">
            Ecosistema de Graduados/as
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-stone-900 mt-1">
            Noticias & Trayectorias de Exalumnos
          </h1>
          <p className="text-sm text-stone-600 mt-1.5 max-w-2xl">
            Historias reales de graduados de la Universidad Blas Pascal que lideran empresas, ganan premios nacionales y expanden las fronteras del 
            <span className="font-lema italic text-stone-800 ml-1">Saber y Saber Hacer</span>.
          </p>
        </div>

        {/* Filter Controls (Segmented Bar) */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-white rounded-lg border border-stone-200 shadow-xs">
          <button
            onClick={() => setSelectedCareer('all')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
              selectedCareer === 'all'
                ? 'bg-[#A3223A] text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
            }`}
          >
            Todas las Carreras
          </button>
          {(['tecnologia', 'diseno', 'juridicas', 'cms', 'comunicacion', 'turismo'] as CareerId[]).map((cId) => {
            const career = UBP_CAREERS[cId];
            const isSelected = selectedCareer === cId;
            return (
              <button
                key={cId}
                onClick={() => setSelectedCareer(cId)}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                  isSelected
                    ? 'text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
                }`}
                style={{
                  backgroundColor: isSelected ? career.colorHex : undefined,
                }}
              >
                <span
                  className="w-2 h-2 rounded-full inline-block"
                  style={{ backgroundColor: isSelected ? '#FFFFFF' : career.colorHex }}
                />
                {career.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Featured News Hero Card */}
      {filteredNews.length > 0 && filteredNews[0].featured && selectedCareer === 'all' && (
        <div className="bg-white rounded-xl border border-stone-200 p-6 sm:p-8 shadow-xs grid md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-7 space-y-4">
            {/* Zero-pill metadata: clean text with typographic separators */}
            <div className="flex items-center gap-2 text-xs text-stone-500 font-medium">
              <span
                className="font-semibold"
                style={{ color: UBP_CAREERS[filteredNews[0].career].colorHex }}
              >
                {UBP_CAREERS[filteredNews[0].career].name}
              </span>
              <span aria-hidden="true">·</span>
              <span>{filteredNews[0].date}</span>
              <span aria-hidden="true">·</span>
              <span>{filteredNews[0].readingTime}</span>
              <span aria-hidden="true">·</span>
              <span className="text-[#A3223A] font-semibold flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> Caso Destacado
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight leading-snug">
              {filteredNews[0].title}
            </h2>

            <p className="text-sm text-stone-600 leading-relaxed">
              {filteredNews[0].excerpt}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={() => setSelectedArticle(filteredNews[0])}
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#A3223A] hover:bg-[#8B1D31] text-white text-xs font-semibold rounded-lg transition-colors shadow-xs"
              >
                <span>Leer Nota Completa</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <div className="flex items-center gap-2 text-xs text-stone-500">
                <button
                  onClick={() => handleLike(filteredNews[0].id, filteredNews[0].likes)}
                  className="flex items-center gap-1 text-stone-600 hover:text-[#A3223A] transition-colors p-1"
                >
                  <Heart className="w-4 h-4 text-[#A3223A] fill-[#A3223A]/20" />
                  <span className="font-mono tabular-nums">
                    {likedArticles[filteredNews[0].id] ?? filteredNews[0].likes}
                  </span>
                </button>
              </div>
            </div>
          </div>

          <div className="md:col-span-5 bg-stone-50 border border-stone-200/80 rounded-lg p-6 relative overflow-hidden">
            <div
              className="absolute top-0 right-0 w-32 h-32 opacity-10 rounded-full blur-2xl"
              style={{ backgroundColor: UBP_CAREERS[filteredNews[0].career].colorHex }}
            />
            <div className="relative space-y-3">
              <div className="flex items-center gap-3">
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-xs"
                  style={{ backgroundColor: '#A3223A' }}
                >
                  ML
                </div>
                <div>
                  <h4 className="text-sm font-bold text-stone-900">{filteredNews[0].alumniName}</h4>
                  <p className="text-xs text-stone-500">{filteredNews[0].alumniRole}</p>
                </div>
              </div>
              <blockquote className="font-lema italic text-xs text-stone-700 bg-white p-3 rounded-md border border-stone-200">
                &ldquo;En la UBP no nos enseñaron solo teoría: el lema Saber y Saber Hacer es una filosofía real de salir y picar piedra.&rdquo;
              </blockquote>
              <div className="text-[11px] text-stone-500 space-y-1">
                <div className="flex items-center gap-1.5">
                  <Building className="w-3.5 h-3.5 text-stone-400" />
                  <span>Incubada originariamente en Córdoba / doingLABS</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-stone-400" />
                  <span>Adquirida por Mercado Libre</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Grid of Other Articles */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNews.map((article) => {
          const career = UBP_CAREERS[article.career];
          const likesCount = likedArticles[article.id] ?? article.likes;

          return (
            <article
              key={article.id}
              className="bg-white rounded-xl border border-stone-200 p-6 flex flex-col justify-between hover:border-stone-300 hover:shadow-xs transition-all group"
            >
              <div className="space-y-3">
                {/* Zero-pill metadata */}
                <div className="flex items-center gap-2 text-xs text-stone-500 font-medium">
                  <span
                    className="font-semibold"
                    style={{ color: career.colorHex }}
                  >
                    {career.name}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>{article.date}</span>
                  <span aria-hidden="true">·</span>
                  <span>{article.readingTime}</span>
                </div>

                <h3 className="text-base font-bold text-stone-900 tracking-tight leading-snug group-hover:text-[#A3223A] transition-colors">
                  {article.title}
                </h3>

                <p className="text-xs text-stone-600 line-clamp-3 leading-relaxed">
                  {article.excerpt}
                </p>
              </div>

              <div className="pt-5 border-t border-stone-100 mt-5 flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-stone-800 block">
                    {article.alumniName}
                  </span>
                  <span className="text-[11px] text-stone-500 block truncate max-w-[160px]">
                    {article.alumniRole}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleLike(article.id, article.likes)}
                    className="flex items-center gap-1 text-xs text-stone-500 hover:text-[#A3223A] transition-colors p-1"
                    title="Inspirador / Aplaudir"
                  >
                    <Heart className="w-3.5 h-3.5" />
                    <span className="font-mono tabular-nums">{likesCount}</span>
                  </button>

                  <button
                    onClick={() => setSelectedArticle(article)}
                    className="text-xs font-semibold text-[#A3223A] hover:underline p-1 flex items-center gap-0.5"
                  >
                    <span>Leer</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Modal to Read Full Article */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-xl border border-stone-200 max-w-2xl w-full p-6 sm:p-8 shadow-xl max-h-[90vh] overflow-y-auto space-y-6">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs text-stone-500">
                  <span
                    className="font-semibold"
                    style={{ color: UBP_CAREERS[selectedArticle.career].colorHex }}
                  >
                    {UBP_CAREERS[selectedArticle.career].name}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>{selectedArticle.date}</span>
                  <span aria-hidden="true">·</span>
                  <span>{selectedArticle.readingTime}</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight">
                  {selectedArticle.title}
                </h2>
              </div>
              <button
                onClick={() => setSelectedArticle(null)}
                className="text-stone-400 hover:text-stone-700 p-1 text-xl leading-none font-bold"
              >
                ✕
              </button>
            </div>

            <div className="p-4 bg-stone-50 rounded-lg border border-stone-200 flex items-center justify-between">
              <div>
                <span className="text-sm font-bold text-stone-900 block">
                  {selectedArticle.alumniName}
                </span>
                <span className="text-xs text-stone-500 block">
                  {selectedArticle.alumniRole}
                </span>
              </div>
              <button
                onClick={() => {
                  setSelectedArticle(null);
                  onOpenMentorshipForAlumni?.(selectedArticle.alumniName);
                }}
                className="px-3 py-1.5 text-xs font-semibold text-white bg-[#A3223A] hover:bg-[#8B1D31] rounded-md transition-colors"
              >
                Pedir Mentoría
              </button>
            </div>

            <div className="space-y-4 text-sm text-stone-700 leading-relaxed">
              <p className="font-medium text-stone-900">{selectedArticle.excerpt}</p>
              <p>{selectedArticle.content}</p>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-stone-200">
              <button
                onClick={() => handleShare(selectedArticle.id)}
                className="flex items-center gap-1.5 text-xs font-medium text-stone-600 hover:text-stone-900"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>{copiedId === selectedArticle.id ? '¡Enlace copiado!' : 'Compartir nota'}</span>
              </button>

              <button
                onClick={() => setSelectedArticle(null)}
                className="px-4 py-2 text-xs font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
