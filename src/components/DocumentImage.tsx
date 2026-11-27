import { useState } from 'react';
import { ImageOff, ZoomIn, X } from 'lucide-react';
import type { ImageHotspot } from '../data/courseContent';

interface DocumentImageProps {
  src: string;
  alt: string;
  caption: string;
  sourceLabel?: string;
  hotspots?: ImageHotspot[];
  activeHotspotId?: string | null;
  onSelectHotspot?: (id: string) => void;
  aspectClassName?: string;
}

export function DocumentImage({
  src,
  alt,
  caption,
  sourceLabel,
  hotspots,
  activeHotspotId,
  onSelectHotspot,
  aspectClassName = 'aspect-[4/3]',
}: DocumentImageProps) {
  const [failed, setFailed] = useState(false);
  const [zoomed, setZoomed] = useState(false);

  return (
    <figure className="w-full">
      <div
        className={`relative w-full ${aspectClassName} rounded-xl overflow-hidden bg-slate-100 border border-slate-200`}
      >
        {failed ? (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-slate-100 to-slate-200 text-slate-600">
            <ImageOff className="w-8 h-8 mb-2 text-slate-400" aria-hidden="true" />
            <p className="text-sm font-semibold text-slate-700">{caption}</p>
            <p className="text-xs text-slate-500 mt-1">
              Document du cahier temporairement indisponible
            </p>
          </div>
        ) : (
          <img
            src={src}
            alt={alt}
            referrerPolicy="no-referrer"
            onError={() => setFailed(true)}
            className="w-full h-full object-contain bg-slate-50"
          />
        )}

        {!failed && hotspots && hotspots.length > 0 && (
          <div className="absolute inset-0">
            {hotspots.map((spot) => {
              const isSelected = activeHotspotId === spot.id;
              return (
                <button
                  key={spot.id}
                  type="button"
                  onClick={() => onSelectHotspot?.(spot.id)}
                  aria-label={`Observer le repère ${spot.number} : ${spot.label}`}
                  aria-pressed={isSelected}
                  style={{
                    left: `${spot.xPercent}%`,
                    top: `${spot.yPercent}%`,
                  }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-full font-bold text-sm tabular-nums flex items-center justify-center transition-transform duration-150 cursor-pointer shadow-md border-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 ${
                    isSelected
                      ? 'bg-blue-700 text-white border-white scale-115 z-20'
                      : 'bg-white text-slate-900 border-blue-700 hover:scale-110 z-10'
                  }`}
                >
                  {spot.number}
                </button>
              );
            })}
          </div>
        )}

        {!failed && (
          <button
            type="button"
            onClick={() => setZoomed(true)}
            aria-label={`Agrandir l'image : ${caption}`}
            className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-900 text-white text-xs font-medium transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <ZoomIn className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Agrandir</span>
          </button>
        )}
      </div>

      <figcaption className="mt-2.5 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-600">
        <span className="font-medium text-slate-800">{caption}</span>
        {sourceLabel && <span className="text-slate-500">{sourceLabel}</span>}
      </figcaption>

      {zoomed && !failed && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Vue agrandie : ${caption}`}
          className="fixed inset-0 z-50 bg-slate-950/85 flex items-center justify-center p-4 sm:p-8"
          onClick={() => setZoomed(false)}
        >
          <div
            className="relative max-w-4xl w-full bg-white rounded-2xl p-4 sm:p-5 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-4 pb-3 mb-3 border-b border-slate-200">
              <p className="text-sm font-semibold text-slate-900">{caption}</p>
              <button
                type="button"
                onClick={() => setZoomed(false)}
                aria-label="Fermer la vue agrandie"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold cursor-pointer"
              >
                <X className="w-4 h-4" aria-hidden="true" />
                <span>Fermer</span>
              </button>
            </div>
            <div className="max-h-[75vh] overflow-auto flex items-center justify-center bg-slate-50 rounded-xl p-2">
              <img
                src={src}
                alt={alt}
                referrerPolicy="no-referrer"
                className="max-h-[70vh] w-auto object-contain rounded-lg"
              />
            </div>
          </div>
        </div>
      )}
    </figure>
  );
}
