/*
 * @Author: shuoshubao
 * @Date: 2025-02-20 12:47:27
 * @LastEditors: shuoshubao
 * @LastEditTime: 2025-02-20 12:47:44
 * @Description: npm cdn 地址拼接
 */
import { setAttrs } from '@nbfe/tools';

// npm cdn 地址拼接: 阿里
export const getAliNpmCdnUrl = ({ name, version, path }) => {
    return ['https://registry.npmmirror.com', name, version, 'files', path].join('/');
};

const LoadScriptStore = new Map();

/**
 * 异步加载 js
 * @param {String} src js文件url
 * @param {String} moduleName 全局对象名
 * @returns Promise(umd 全局变量)
 */
export const loadScript = (src = '', moduleName = '') => {
    if (LoadScriptStore.has(src)) {
        return LoadScriptStore.get(src);
    }

    const requestInstance = new Promise((resolve, reject) => {
        const el = document.createElement('script');

        setAttrs(el, { src });

        el.onload = () => {
            resolve(window[moduleName] ?? null);
        };

        el.onerror = () => {
            reject(new Error(`加载js文件失败: ${src}`));
        };

        document.head.append(el);
    });

    LoadScriptStore.set(src, requestInstance);

    return requestInstance;
};

const LoadStyleStore = new Map();

/**
 * 异步加载 css
 * x@param {String} href css文件url
 * @returns Promise
 */
export const loadStyle = (href = '') => {
    if (LoadStyleStore.has(href)) {
        return LoadStyleStore.get(href);
    }

    const requestInstance = new Promise((resolve, reject) => {
        const el = document.createElement('link');

        setAttrs(el, { rel: 'stylesheet', href });

        el.onload = () => {
            resolve();
        };

        el.onerror = () => {
            reject(new Error(`加载css文件失败: ${href}`));
        };

        document.head.append(el);
    });

    LoadStyleStore.set(href, requestInstance);

    return requestInstance;
};
