import { AndroidOutlined, AppleOutlined, WindowsOutlined } from '@ant-design/icons';
import EventEmitter from 'eventemitter3';
import { camelCase } from 'lodash';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';

export const ThemeKey = 'theme';

export const ThemeKeyEnum = {
    DARK: 'dark',
    LIGHT: 'light',
    SYSTEM: 'system'
};

export const DefaultTheme = ThemeKeyEnum.SYSTEM;

export const ThemeEventEmitter = new EventEmitter();

const IconDark = () => {
    return (
        <svg width="1em" height="1em" viewBox="0 0 17 17" xmlns="http://www.w3.org/2000/svg" style={{ verticalAlign: '-0.125em' }}>
            <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <g transform="translate(-9.000000, -49.500000)" fill="currentColor" fillRule="nonzero">
                    <g transform="translate(0.000000, 42.500000)">
                        <g transform="translate(9.268811, 7.500000)">
                            <rect opacity="0" x="0" y="0" width="16" height="16" />
                            <path d="M8,1.33333333 C8.14933333,1.33333333 8.29688889,1.33844444 8.44266667,1.34866666 C8.14755556,1.98422221 8,2.64577777 8,3.33333333 C8,3.96533333 8.12333333,4.56955555 8.37,5.146 C8.61666667,5.72244445 8.94822222,6.21888889 9.36466667,6.63533333 C9.78111112,7.05177777 10.2775556,7.38333332 10.854,7.63 C11.4304444,7.87666668 12.0346667,8.00000001 12.6666667,8 C13.3542222,8 14.0157778,7.85244444 14.6513333,7.55733333 C14.6615556,7.70311111 14.6666667,7.85066667 14.6666667,8 C14.6666667,8.604 14.5868889,9.19422222 14.4273333,9.77066667 C14.2677778,10.3471111 14.0446667,10.8793333 13.758,11.3673333 C13.4713333,11.8553333 13.1233333,12.3042222 12.714,12.714 C12.3046667,13.1237778 11.8557778,13.4717778 11.3673333,13.758 C10.8788889,14.0442222 10.3466667,14.2673333 9.77066667,14.4273333 C9.19466667,14.5873333 8.60444445,14.6671111 8,14.6666685 C7.39555555,14.6662222 6.80533333,14.5864444 6.22933333,14.4273333 C5.65333333,14.2682222 5.1211111,14.0451111 4.63266666,13.758 C4.14422221,13.4708889 3.69533332,13.1228889 3.28599998,12.714 C2.87666665,12.3051111 2.52866665,11.8562222 2.24199998,11.3673333 C1.95533332,10.8784444 1.73222221,10.3462222 1.57266666,9.77066667 C1.4131111,9.19511112 1.33333333,8.6048889 1.33333333,8 C1.33333333,7.3951111 1.4131111,6.80488888 1.57266666,6.22933333 C1.73222221,5.65377778 1.95533332,5.12155555 2.24199998,4.63266666 C2.52866665,4.14377776 2.87666665,3.69488887 3.28599998,3.28599998 C3.69533332,2.8771111 4.14422221,2.5291111 4.63266666,2.24199998 C5.1211111,1.95488887 5.65333333,1.73177776 6.22933333,1.57266666 C6.80533333,1.41355555 7.39555555,1.33377778 8,1.33333333 Z M6.68733333,2.828 C6.11444444,2.97377778 5.58066667,3.20977778 5.086,3.536 C4.59133333,3.86222222 4.166,4.24933333 3.81,4.69733333 C3.454,5.14533333 3.17444444,5.65488889 2.97133333,6.226 C2.76822221,6.79711111 2.66666666,7.38822222 2.66666666,7.99933333 C2.66666666,8.72155555 2.80733332,9.41155555 3.08866666,10.0693333 C3.36999999,10.7271111 3.74933332,11.2948889 4.22666666,11.7726667 C4.70399999,12.2504444 5.27177777,12.6297778 5.92999998,12.9106667 C6.5882222,13.1915556 7.2782222,13.3322222 7.99999998,13.3326667 C8.6111111,13.3326667 9.20222221,13.2311111 9.77333331,13.028 C10.3444444,12.8248889 10.854,12.5453333 11.302,12.1893333 C11.75,11.8333333 12.1371111,11.408 12.4633333,10.9133333 C12.7895555,10.4186666 13.0255555,9.88488887 13.1713333,9.31199998 C13.022,9.32577777 12.8535555,9.33266666 12.666,9.33266666 C11.8535555,9.33266666 11.0775555,9.17377777 10.338,8.85599998 C9.59844443,8.5382222 8.96044443,8.11111109 8.42399998,7.57466666 C7.88755554,7.03822222 7.46044443,6.40022222 7.14266666,5.66066666 C6.82488889,4.92111109 6.66599999,4.14511109 6.66599998,3.33266666 C6.66599998,3.1451111 6.67288888,2.97666666 6.68666666,2.82733333 L6.68733333,2.828 Z" />
                        </g>
                    </g>
                </g>
            </g>
        </svg>
    );
};

const IconLight = () => {
    return (
        <svg width="1em" height="1em" viewBox="0 0 13 13" xmlns="http://www.w3.org/2000/svg" style={{ verticalAlign: '-0.125em' }}>
            <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <g transform="translate(-2943.000000, -292.000000)" fill="currentColor" fillRule="nonzero">
                    <g transform="translate(2415.000000, 222.000000)">
                        <g transform="translate(518.000000, 60.000000)">
                            <g transform="translate(8.000000, 8.000000)">
                                <g transform="translate(2.000000, 2.000000)">
                                    <rect opacity="0" x="0" y="0" width="13" height="13" />
                                    <path d="M6.5,9.75 C4.7051875,9.75 3.25,8.2948125 3.25,6.5 C3.25,4.7051875 4.7051875,3.25 6.5,3.25 C8.2948125,3.25 9.75,4.7051875 9.75,6.5 C9.75,8.2948125 8.2948125,9.75 6.5,9.75 Z M6.5,8.66666667 C7.69661696,8.66666667 8.66666667,7.69661696 8.66666667,6.5 C8.66666667,5.30338304 7.69661696,4.33333333 6.5,4.33333333 C5.30338305,4.33333333 4.33333336,5.30338305 4.33333336,6.5 C4.33333336,7.69661695 5.30338305,8.66666667 6.5,8.66666667 Z M5.95833333,1.08333333 C5.95833333,0.784179087 6.20084576,0.541666658 6.5,0.541666658 C6.79915424,0.541666658 7.04166667,0.784179087 7.04166667,1.08333333 L7.04166667,2.16666667 C7.04166667,2.46582091 6.79915424,2.70833334 6.5,2.70833334 C6.20084576,2.70833334 5.95833333,2.46582091 5.95833333,2.16666667 L5.95833333,1.08333333 L5.95833333,1.08333333 Z M5.95833333,10.8333333 C5.95833333,10.5341791 6.20084576,10.2916667 6.5,10.2916667 C6.79915424,10.2916667 7.04166667,10.5341791 7.04166667,10.8333333 L7.04166667,11.9166667 C7.04166667,12.2158209 6.79915424,12.4583333 6.5,12.4583333 C6.20084576,12.4583333 5.95833333,12.2158209 5.95833333,11.9166667 L5.95833333,10.8333333 L5.95833333,10.8333333 Z M1.08333333,7.04166667 C0.784179087,7.04166667 0.541666658,6.79915424 0.541666658,6.5 C0.541666658,6.20084576 0.784179087,5.95833333 1.08333333,5.95833333 L2.16666667,5.95833333 C2.46582091,5.95833333 2.70833334,6.20084576 2.70833334,6.5 C2.70833334,6.79915424 2.46582091,7.04166667 2.16666667,7.04166667 L1.08333333,7.04166667 L1.08333333,7.04166667 Z M10.8333333,7.04166667 C10.5341791,7.04166667 10.2916667,6.79915424 10.2916667,6.5 C10.2916667,6.20084576 10.5341791,5.95833333 10.8333333,5.95833333 L11.9166667,5.95833333 C12.2158209,5.95833333 12.4583333,6.20084576 12.4583333,6.5 C12.4583333,6.79915424 12.2158209,7.04166667 11.9166667,7.04166667 L10.8333333,7.04166667 L10.8333333,7.04166667 Z M2.05454167,2.82045833 C1.84926545,2.60791971 1.85220137,2.27007933 2.06114035,2.06114035 C2.27007933,1.85220137 2.60791971,1.84926545 2.82045833,2.05454167 L3.63295833,2.86704167 C3.83823455,3.07958029 3.83529863,3.41742067 3.62635965,3.62635965 C3.41742067,3.83529863 3.07958029,3.83823455 2.86704167,3.63295833 L2.05454167,2.82045833 L2.05454167,2.82045833 Z M9.36704167,10.1329583 C9.16176545,9.92041971 9.16470137,9.58257933 9.37364035,9.37364035 C9.58257933,9.16470137 9.92041971,9.16176545 10.1329583,9.36704167 L10.9454583,10.1795417 C11.1507346,10.3920803 11.1477986,10.7299207 10.9388596,10.9388596 C10.7299207,11.1477986 10.3920803,11.1507346 10.1795417,10.9454583 L9.36704167,10.1329583 L9.36704167,10.1329583 Z M2.82045833,10.9454583 C2.60791971,11.1507346 2.27007933,11.1477986 2.06114035,10.9388596 C1.85220137,10.7299207 1.84926545,10.3920803 2.05454167,10.1795417 L2.86704167,9.36704167 C3.07958029,9.16176545 3.41742067,9.16470137 3.62635965,9.37364035 C3.83529863,9.58257933 3.83823455,9.92041971 3.63295833,10.1329583 L2.82045833,10.9454583 L2.82045833,10.9454583 Z M10.1329583,3.63295833 C9.92041971,3.83823455 9.58257933,3.83529863 9.37364035,3.62635965 C9.16470137,3.41742067 9.16176545,3.07958029 9.36704167,2.86704167 L10.1795417,2.05454167 C10.3920803,1.84926545 10.7299207,1.85220137 10.9388596,2.06114035 C11.1477986,2.27007933 11.1507346,2.60791971 10.9454583,2.82045833 L10.1329583,3.63295833 L10.1329583,3.63295833 Z" />
                                </g>
                            </g>
                        </g>
                    </g>
                </g>
            </g>
        </svg>
    );
};

const isAndroid = window.navigator.platform === 'Android';

const isWindows = window.navigator.platform.includes('Win');

const getSystemIcon = () => {
    if (isAndroid) {
        return <AndroidOutlined />;
    }
    if (isWindows) {
        return <WindowsOutlined />;
    }
    return <AppleOutlined />;
};

export const getThemeOptions = ({ t }) => {
    return [
        {
            value: ThemeKeyEnum.DARK,
            label: t('theme.dark'),
            icon: <IconDark />
        },
        {
            value: ThemeKeyEnum.LIGHT,
            label: t('theme.light'),
            icon: <IconLight />
        },
        {
            value: ThemeKeyEnum.SYSTEM,
            label: t('theme.system'),
            icon: getSystemIcon()
        }
    ];
};

export const isDark = theme => {
    if (theme === ThemeKeyEnum.SYSTEM) {
        const { matchMedia } = window;
        return matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return theme === ThemeKeyEnum.DARK;
};

export const addListenerPrefersColorScheme = callback => {
    const { matchMedia } = window;
    matchMedia('(prefers-color-scheme: dark)').addListener(mediaQueryList => {
        callback(mediaQueryList.matches);
    });
    matchMedia('(prefers-color-scheme: light)').addListener(mediaQueryList => {
        callback(!mediaQueryList.matches);
    });
};

const uniqId = uuidv4();

export const updateMarkdownTheme = async dark => {
    const DataSetGithubMarkdownCssKey = 'github-markdown-css';
    let themeCssText;
    if (dark) {
        const { default: cssText } = await import('github-markdown-css/github-markdown-dark.css?inline');
        themeCssText = cssText.replaceAll('\n', '');
    } else {
        const { default: cssText } = await import('github-markdown-css/github-markdown-light.css?inline');
        themeCssText = cssText.replaceAll('\n', '');
    }

    let style = document.querySelector(`[data-${DataSetGithubMarkdownCssKey}="${uniqId}"]`);
    if (style) {
        style.innerHTML = themeCssText;
        style.dataset.theme = dark ? 'dark' : 'light';
    } else {
        const { head } = document;
        style = document.createElement('style');
        style.dataset[camelCase(DataSetGithubMarkdownCssKey)] = uniqId;
        style.dataset.theme = isDark ? 'dark' : 'light';
        style.innerHTML = themeCssText;
        head.appendChild(style);
    }
};
