export const xpexFontStack = [
  'Inter',
  'system-ui',
  '-apple-system',
  'BlinkMacSystemFont',
  'Segoe UI',
  'sans-serif',
].join(', ');

export const xpexFontClassName = 'font-xpex-system';

export const xpexBrandTokens = {
  colors: {
    navy: '#071B33',
    electricBlue: '#2563EB',
    gold: '#F5B301',
    green: '#22C55E',
    darkBackground: '#050B14',
    cardBackground: '#0D1726',
  },
  fontFamily: xpexFontStack,
} as const;
