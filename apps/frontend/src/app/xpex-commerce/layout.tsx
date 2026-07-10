import { ReactNode } from 'react';
import clsx from 'clsx';
import { xpexFontClassName } from '@gitroom/frontend/app/xpex-brand-tokens';
import '../global.scss';

export default function XpeXCommerceLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className={clsx(xpexFontClassName, 'dark')}>{children}</body>
    </html>
  );
}
