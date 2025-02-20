/*
 * @Author: shuoshubao
 * @Date: 2025-02-20 12:34:50
 * @LastEditors: shuoshubao
 * @LastEditTime: 2025-02-20 12:53:52
 * @Description: monaco-editor
 */
import { getAliNpmCdnUrl, loadScript } from '@/utils/package';

export const MonacoEditorBaseConfig = {
    theme: 'vs-dark',
    autoIndent: true,
    formatOnPaste: true,
    formatOnType: true,
    fontSize: 14,
    automaticLayout: true,
    scrollBeyondLastLine: false
};

export const getMonacoEditor = async () => {
    const prettierFiles = ['standalone.js', 'parser-babel.js', 'parser-html.js', 'parser-postcss.js'];

    await Promise.all(
        prettierFiles.map(item => {
            return loadScript(
                getAliNpmCdnUrl({
                    name: 'prettier',
                    version: '2.7.1',
                    path: item
                })
            );
        })
    );

    const { default: MonacoEditorLoader } = await import('@monaco-editor/loader');
    MonacoEditorLoader.config({
        paths: {
            vs: 'https://registry.npmmirror.com/monaco-editor/0.44.0/files/min/vs'
        }
    });
    return await MonacoEditorLoader.init();
};
