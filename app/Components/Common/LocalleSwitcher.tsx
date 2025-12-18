'use client';

import { usePathname, useRouter } from '@/i18n/navigation';
import { useLocale } from 'next-intl';
import { ChevronDown } from 'lucide-react';

export default function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (newLocale: string) => {
    if (newLocale !== locale) {
      router.replace(pathname, { locale: newLocale, scroll: false });
    //   router.refresh();
    }
  };

  return (
    <div className="relative inline-flex items-center">
      <select
        aria-label="Select language"
        className="appearance-none bg-white/80 backdrop-blur-sm border border-gray-300 text-sm font-medium rounded pl-4 pr-8 py-1.5 shadow hover:shadow-md transition focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent cursor-pointer"
        value={locale}
        onChange={e => switchLocale(e.target.value)}
      >
        <option value="en">🇬🇧</option>
        <option value="mk">🇲🇰</option>
        <option value="rs">🇷🇸</option>
      </select>
      <ChevronDown className="pointer-events-none absolute right-2 h-4 w-4 text-gray-500" />
    </div>
  );
}