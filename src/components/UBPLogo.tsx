import React from 'react';

interface UBPLogoProps {
  variant?: 'horizontal' | 'vertical' | 'sigla' | 'white';
  showMotto?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const UBPLogo: React.FC<UBPLogoProps> = ({
  variant = 'horizontal',
  showMotto = false,
  className = '',
  size = 'md',
}) => {
  // Brand color: Pantone 193 C -> #A3223A
  const primaryColor = variant === 'white' ? '#FFFFFF' : '#A3223A';
  const textColor = variant === 'white' ? '#FFFFFF' : '#1A1A1A';
  const mottoColor = variant === 'white' ? 'rgba(255, 255, 255, 0.85)' : '#4A4A4A';

  // SVG representation of the UBP shield/isologotipo:
  // Red square with the iconic book-notch / chevron fold on the right edge.
  // Standard grid: 100x100 square with triangular notch on right: (100,30) -> (78,50) -> (100,70)
  const Shield = ({ width = 42, height = 42 }: { width?: number; height?: number }) => (
    <svg
      width={width}
      height={height}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0 drop-shadow-xs"
    >
      {/* UBP Shield with signature right-edge bookmark notch */}
      <path
        d="M 6 6 L 94 6 L 94 32 L 72 50 L 94 68 L 94 94 L 6 94 Z"
        fill={variant === 'white' ? '#FFFFFF' : '#A3223A'}
      />
      {/* "UBP" wordmark inside shield in Helvetica bold */}
      <text
        x="44"
        y="58"
        textAnchor="middle"
        fill={variant === 'white' ? '#A3223A' : '#FFFFFF'}
        fontFamily="system-ui, -apple-system, 'Plus Jakarta Sans', sans-serif"
        fontWeight="800"
        fontSize="30"
        letterSpacing="0.05em"
      >
        UBP
      </text>
    </svg>
  );

  if (variant === 'sigla') {
    return (
      <div className={`inline-flex items-center gap-2 ${className}`}>
        <Shield width={size === 'sm' ? 32 : size === 'lg' ? 52 : 40} height={size === 'sm' ? 32 : size === 'lg' ? 52 : 40} />
      </div>
    );
  }

  if (variant === 'vertical') {
    return (
      <div className={`flex flex-col items-center text-center ${className}`}>
        <Shield width={size === 'sm' ? 44 : size === 'lg' ? 72 : 56} height={size === 'sm' ? 44 : size === 'lg' ? 72 : 56} />
        <div className="mt-3 flex flex-col items-center leading-none">
          <span
            className="text-[11px] font-medium tracking-[0.22em] uppercase mb-1"
            style={{ color: primaryColor }}
          >
            UNIVERSIDAD
          </span>
          <span
            className="text-lg font-bold tracking-tight"
            style={{ color: textColor }}
          >
            Blas Pascal
          </span>
        </div>
        {showMotto && (
          <span
            className="font-lema text-xs mt-2 italic tracking-normal"
            style={{ color: mottoColor }}
          >
            Saber y Saber Hacer
          </span>
        )}
      </div>
    );
  }

  // Horizontal variant (default)
  const shieldDim = size === 'sm' ? 32 : size === 'lg' ? 48 : 38;
  const univSize = size === 'sm' ? 'text-[9px]' : size === 'lg' ? 'text-[11px]' : 'text-[10px]';
  const nameSize = size === 'sm' ? 'text-sm' : size === 'lg' ? 'text-xl' : 'text-base';

  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      <Shield width={shieldDim} height={shieldDim} />
      <div className="flex flex-col justify-center leading-tight">
        <span
          className={`${univSize} font-semibold tracking-[0.20em] uppercase`}
          style={{ color: primaryColor }}
        >
          UNIVERSIDAD
        </span>
        <span
          className={`${nameSize} font-bold tracking-tight -mt-0.5`}
          style={{ color: textColor }}
        >
          Blas Pascal
        </span>
        {showMotto && (
          <span
            className="font-lema text-[11px] mt-0.5 italic tracking-normal opacity-90"
            style={{ color: mottoColor }}
          >
            Saber y Saber Hacer
          </span>
        )}
      </div>
    </div>
  );
};
