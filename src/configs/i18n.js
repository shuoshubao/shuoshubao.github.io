import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import cn from './locales/zh_CN.json';

export const DefaultI18nLng = 'en';

export const I18nKey = 'lng';

export const initI18n = () => {
    i18n.use(initReactI18next).init({
        resources: {
            cn: {
                translation: cn
            },
            en: {
                translation: en
            }
        },
        fallbackLng: window.localStorage.getItem(I18nKey) || DefaultI18nLng
    });
};

export const I18nOptions = [
    {
        value: 'en',
        label: 'English'
    },
    {
        value: 'cn',
        label: '中文'
    }
];
