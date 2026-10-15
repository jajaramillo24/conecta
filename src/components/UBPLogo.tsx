import React from 'react';

interface UBPLogoProps {
  variant?: 'horizontal' | 'vertical' | 'sigla' | 'white';
  showMotto?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

/** Assets rendered from the official artwork supplied for this project. */
export const UBPLogo: React.FC<UBPLogoProps> = ({
  variant = 'horizontal',
  showMotto = false,
  className = '',
  size = 'md',
}) => {
  if (variant === 'sigla' || variant === 'horizontal') {
    const dimension = size === 'sm' ? 42 : size === 'lg' ? 60 : 48;
    return (
      <div className={`inline-flex items-center gap-2.5 ${className}`}>
        <img src="/ubp-shield-red.png" width={dimension} height={dimension} alt="" className="shrink-0 object-contain" />
        {variant === 'horizontal' && (
          <div className="leading-tight">
            <span className="block text-[10px] font-semibold uppercase tracking-[0.16em] text-[#A3223A]">Universidad</span>
            <span className="block text-sm font-bold text-stone-900 sm:text-base">Blas Pascal</span>
            {showMotto && <span className="block font-lema text-[11px] text-stone-600">Saber y Saber Hacer</span>}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`${variant === 'white' ? 'inline-block rounded-lg bg-white p-3' : 'inline-block'} ${className}`}>
      <img
        src={variant === 'white' ? '/ubp-logo-black.png' : '/ubp-logo-red.png'}
        alt="Universidad Blas Pascal"
        className={size === 'lg' ? 'w-40 h-auto' : size === 'sm' ? 'w-24 h-auto' : 'w-32 h-auto'}
      />
      {showMotto && <span className="block pt-1 text-center font-lema text-[11px] text-stone-700">Saber y Saber Hacer</span>}
    </div>
  );
};
