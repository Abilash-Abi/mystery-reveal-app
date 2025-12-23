
import React from 'react';

interface TileGridProps {
  imageUrl: string;
  revealedTiles: number[];
  totalTiles: number;
}

const TileGrid: React.FC<TileGridProps> = ({ imageUrl, revealedTiles, totalTiles }) => {
  return (
    <div className="relative w-full max-w-lg aspect-[3/2] mx-auto rounded-2xl overflow-hidden shadow-2xl border-4 border-slate-700">
      {/* The background image */}
      <img 
        src={imageUrl} 
        alt="Mystery Reveal" 
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* The grid of obscuring tiles - 2 rows, 5 columns for 10 tiles */}
      <div 
        className="absolute inset-0 grid" 
        style={{ 
          gridTemplateColumns: `repeat(5, 1fr)`,
          gridTemplateRows: `repeat(2, 1fr)` 
        }}
      >
        {Array.from({ length: totalTiles }).map((_, index) => {
          const isRevealed = revealedTiles.includes(index);
          return (
            <div
              key={index}
              className={`
                reveal-grid-item border border-slate-800/30
                ${isRevealed ? 'revealed' : 'bg-slate-900'}
              `}
            >
              {!isRevealed && (
                <div className="w-full h-full flex items-center justify-center text-slate-700 font-bold text-3xl">
                  {index + 1}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TileGrid;
