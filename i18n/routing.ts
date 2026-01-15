import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["mk", "en", "rs"],
  defaultLocale: "mk",
  localePrefix: "always",
});
