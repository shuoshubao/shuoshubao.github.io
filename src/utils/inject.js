/* eslint-disable no-console,sonarjs/cognitive-complexity */

// eslint-disable-next-line no-extra-semi
(async () => {
    try {
        const ConsoleTimeKey = window.name;

        console.time(ConsoleTimeKey);

        window.React = window.parent.React;
        window.ReactDOM = window.parent.ReactDOM;
        window.dayjs = window.parent.dayjs;
        window._ = window.parent._;

        const loadScript = src => {
            return new Promise(resolve => {
                const script = document.createElement('script');
                script.onload = () => {
                    resolve();
                };
                script.src = src;
                document.head.appendChild(script);
            });
        };

        const ScriptList = [
            'https://registry.npmmirror.com/antd/5.19.4/files/dist/antd.min.js',
            'https://registry.npmmirror.com/@babel/standalone/7.22.9/files/babel.min.js'
        ];

        await Promise.all(ScriptList.map(loadScript));

        // eslint-disable-next-line
        for (const src of PlaygroundJsAssets) {
            await loadScript(src);
        }

        const { Babel } = window;

        const ExternalMap = {
            react: 'React',
            'react-dom': 'ReactDOM',
            dayjs: 'dayjs',
            antd: 'antd',
            lodash: '_'
        };

        // eslint-disable-next-line quotes
        const { code } = Babel.transform(decodeURIComponent(atob('__JsCode__')), {
            filename: [window.name, '.js'].join(''),
            sourceType: 'module',
            presets: [
                [
                    'env',
                    {
                        modules: false
                    }
                ],
                'react',
                'typescript'
            ],
            targets: {
                chrome: '200'
            }
        });

        const CodeList = code.replaceAll('/*#__PURE__*/', '').split('\n');

        CodeList.forEach((v, i) => {
            if (v.includes('import') && v.includes('from')) {
                const name = v.split("'")[1];
                const externalName = ExternalMap[name];

                if (externalName) {
                    if (v.includes('{')) {
                        if (v.includes(',') && v.indexOf(',') < v.indexOf('{')) {
                            CodeList[i] = v.replace(v.slice('import'.length + 1, v.indexOf(',') + 1), '');
                        }
                        CodeList[i] = CodeList[i].replace('import', 'const').replace('from', '=').replace(name, externalName).replaceAll("'", '');
                    } else {
                        CodeList[i] = '';
                    }
                }
            }
        });

        const script = document.createElement('script');
        script.setAttribute('type', 'module');
        script.innerHTML = CodeList.join('\n');
        document.body.appendChild(script);

        window.parent.postMessage(
            {
                type: 'playground',
                id: window.name,
                eventName: 'initialized',
                // eslint-disable-next-line no-undef
                initializedTime: Date.now() - PlaygroundStartTime
            },
            '/'
        );

        console.timeEnd(ConsoleTimeKey);
    } catch (e) {
        console.error(e);
        window.parent.postMessage(
            {
                type: 'playground',
                id: window.name,
                eventName: 'error',
                error: e,
                // eslint-disable-next-line no-undef
                initializedTime: Date.now() - PlaygroundStartTime
            },
            '/'
        );
    }
})();
