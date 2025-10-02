import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "mk", "rs"],
  defaultLocale: "en",
  localePrefix: "as-needed",
});
