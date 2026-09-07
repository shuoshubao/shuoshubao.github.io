let hljsPromise = null;

// 加载 highlight.js
export const loadHljs = () => {
    hljsPromise ??= (async () => {
        const { default: hljs } = await import('https://code.bdstatic.com/npm/@highlightjs/cdn-assets@11.12.0/es/core.min.js');

        const [
            { default: javascript },
            { default: xml },
            { default: markdown },
            { default: bash },
            { default: css },
            { default: less },
            { default: json },
            { default: php },
            { default: yaml },
            { default: python }
        ] = await Promise.all([
            import('https://code.bdstatic.com/npm/@highlightjs/cdn-assets@11.12.0/es/languages/javascript.min.js'),
            import('https://code.bdstatic.com/npm/@highlightjs/cdn-assets@11.12.0/es/languages/xml.min.js'),
            import('https://code.bdstatic.com/npm/@highlightjs/cdn-assets@11.12.0/es/languages/markdown.min.js'),
            import('https://code.bdstatic.com/npm/@highlightjs/cdn-assets@11.12.0/es/languages/bash.min.js'),
            import('https://code.bdstatic.com/npm/@highlightjs/cdn-assets@11.12.0/es/languages/css.min.js'),
            import('https://code.bdstatic.com/npm/@highlightjs/cdn-assets@11.12.0/es/languages/less.min.js'),
            import('https://code.bdstatic.com/npm/@highlightjs/cdn-assets@11.12.0/es/languages/json.min.js'),
            import('https://code.bdstatic.com/npm/@highlightjs/cdn-assets@11.12.0/es/languages/php.min.js'),
            import('https://code.bdstatic.com/npm/@highlightjs/cdn-assets@11.12.0/es/languages/yaml.min.js'),
            import('https://code.bdstatic.com/npm/@highlightjs/cdn-assets@11.12.0/es/languages/python.min.js')
        ]);

        hljs.registerLanguage('javascript', javascript);
        hljs.registerLanguage('xml', xml);
        hljs.registerLanguage('markdown', markdown);
        hljs.registerLanguage('bash', bash);
        hljs.registerLanguage('css', css);
        hljs.registerLanguage('less', less);
        hljs.registerLanguage('json', json);
        hljs.registerLanguage('php', php);
        hljs.registerLanguage('yaml', yaml);
        hljs.registerLanguage('python', python);

        hljs.registerAliases('js', { languageName: 'javascript' });
        hljs.registerAliases('html', { languageName: 'xml' });
        hljs.registerAliases('md', { languageName: 'markdown' });
        hljs.registerAliases('sh', { languageName: 'bash' });
        hljs.registerAliases('py', { languageName: 'python' });

        return hljs;
    })();
    return hljsPromise;
};

let hljsCssPromise = null;

export const loadHljsCss = () => {
    hljsCssPromise ??= (() => {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://code.bdstatic.com/npm/@highlightjs/cdn-assets@11.12.0/styles/vs2015.min.css';
        document.head.appendChild(link);
    })();
    return hljsCssPromise;
};
