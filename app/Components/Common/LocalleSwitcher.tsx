'use client';

import { usePathname, useRouter } from '@/i18n/navigation';
import { useLocale } from 'next-intl';

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
    <select
      className=""
      value={locale}
      onChange={e => switchLocale(e.target.value)}>
      <option value="en">EN</option>
      <option value="mk">MK</option>
      <option value="rs">RS</option>
    </select>
  );
}