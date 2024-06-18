import { I18nextProvider } from 'react-i18next';
import i18next from 'i18next';

import common_en from '../translations/en/common.json';
import common_es from '../translations/es/common.json';
import common_de from '../translations/de/common.json';
import common_cn from '../translations/cn/common.json';

i18next.init({
  interpolation: { escapeValue: false },
  lng: 'en',
  resources: {
    en: {
      common: common_en
    },
    es: {
      common: common_es
    },
    de: {
      common: common_de
    },
    cn: {
      common: common_cn
    }
  }
});

export default function I18nProvider({ children }) {
  return (
    <I18nextProvider i18n={i18next}>
      {children}
    </I18nextProvider>
  )
}