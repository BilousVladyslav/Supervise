import { L10nConfig, L10nLoader } from 'angular-l10n';

import { i18nAsset } from './l18n';

export const l10nConfig: L10nConfig = {
  format: 'language-region',
  providers: [{ name: 'app', asset: i18nAsset }],
  cache: false,
  keySeparator: '.',
  defaultLocale: {
    language: 'en-US',
    currency: 'USD',
    timeZone: 'America/Los_Angeles'
  },
  schema: [
    {
      locale: {
        language: 'en-US',
        currency: 'USD',
        timeZone: 'America/Los_Angeles'
      },
      dir: 'ltr',
      text: 'English'
    },
    {
      locale: {
        language: 'uk-UA', currency: 'UAH', timeZone: 'Europe/Kiev' },
      dir: 'ltr',
      text: 'Українська',
    }
  ]
};

export function initL10n(l10nLoader: L10nLoader): () => Promise<void> {
  return () => l10nLoader.init();
}
