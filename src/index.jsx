import { DefaultTheme, ThemeEventEmitter, ThemeKey, ThemeKeyEnum, addListenerPrefersColorScheme, initI18n, isDark } from '@/configs';
import { ConfigProvider, theme } from 'antd';
import { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const { defaultAlgorithm, darkAlgorithm } = theme;

initI18n();

const defaultThemeValue = window.localStorage.getItem(ThemeKey) || DefaultTheme;

const Container = () => {
    const [themeValue, setThemeValue] = useState(defaultThemeValue);
    const [dark, setDark] = useState();

    const handleThemeChange = value => {
        setThemeValue(value);
        if (value !== ThemeKeyEnum.SYSTEM) {
            setDark(isDark(value));
        }
    };

    useEffect(() => {
        addListenerPrefersColorScheme(() => {
            setDark(isDark(themeValue));
        });
    }, [setDark]);

    useEffect(() => {
        setDark(isDark(themeValue));
    }, [setDark]);

    useEffect(() => {
        document.documentElement.dataset.theme = dark ? 'dark' : 'light';
    }, [dark]);

    useEffect(() => {
        ThemeEventEmitter.on(ThemeKey, handleThemeChange);

        return () => {
            ThemeEventEmitter.off(ThemeKey, handleThemeChange);
        };
    }, [setThemeValue, setDark]);

    return (
        <ConfigProvider
            theme={{
                algorithm: dark ? darkAlgorithm : defaultAlgorithm
            }}
        >
            <App />
        </ConfigProvider>
    );
};

createRoot(document.querySelector('#app')).render(<Container />);
