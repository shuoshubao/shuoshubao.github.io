import { dynamicRegisterLanguage } from '@/utils/highlight';
import { flatten, uniq } from 'lodash';
import MarkdownItAnchor from 'markdown-it-anchor';
import MarkdownItAttrs from 'markdown-it-attrs';
import MarkdownItContainer from 'markdown-it-container';
import MarkdownItEmoji from 'markdown-it-emoji';
import MarkdownItLinkAttrs from 'markdown-it-link-attributes';
import TaskLists from 'markdown-it-task-lists';
import md5 from 'md5';
import getTocData from 'mdx-toc';
import { parsePlayground } from './playground';
import { getHashs } from './route';

const slugify = str => {
    return [getHashs().join('/'), md5(str).slice(0, 10)].join('#');
};

const IconsHtml = {
    success:
        '<svg viewBox="64 64 896 896" width="1em" height="1em" fill="currentColor"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 01-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8 157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z"></path></svg>',
    info: '<svg viewBox="64 64 896 896" width="1em" height="1em" fill="currentColor"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm32 664c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V456c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272zm-32-344a48.01 48.01 0 010-96 48.01 48.01 0 010 96z"></path></svg>',
    warning:
        '<svg viewBox="64 64 896 896" width="1em" height="1em" fill="currentColor"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm-32 232c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V296zm32 440a48.01 48.01 0 010-96 48.01 48.01 0 010 96z"></path></svg>',
    error: '<svg viewBox="64 64 896 896" width="1em" height="1em" fill="currentColor"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 01-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z"></path></svg>'
};

const MarkdownItContainerAlert = type => {
    return {
        render: (tokens, idx) => {
            if (tokens[idx].nesting === 1) {
                const text = tokens[idx].info.trim();
                const message = text.replace(type, '').trim();
                const messageText = message || type.toLocaleUpperCase();
                return [
                    `<div class="markdown-it-alert markdown-it-alert-${type}">`,
                    `<span class="markdown-it-alert-icon">${IconsHtml[type]}</span>`,
                    '<div class="markdown-it-alert-content">',
                    `<div class="markdown-it-alert-message">${messageText}</div>`,
                    '<div class="markdown-it-alert-description">'
                ].join('\n');
            }
            return '</div></div></div>';
        }
    };
};

export const getAllLanguages = async md => {
    const { default: MarkdownIt } = await import('markdown-it/dist/markdown-it');
    const languages = new Set();
    MarkdownIt({
        highlight(str, lang) {
            if (lang) {
                languages.add(lang);
            }
        }
    }).render(md);
    return Array.from(languages);
};

export const getHighlightCode = async (str, lang) => {
    const { default: hljs } = await import('highlight.js/lib/core');
    const { value } = hljs.highlight(str, { language: lang });
    return [
        '<pre style="background: rgb(24, 24, 27);">',
        `<code class="hljs language-${lang}" lang="${lang}">`,
        value
            .trim()
            .split('\n')
            .map((v, i, arr) => {
                return `<div ${arr.length < 5 ? '' : 'class="line"'}>${v}</div>`;
            }),
        '</code>',
        '</pre>'
    ]
        .flat()
        .join('');
};

export const MarkdownItHighlight = async languages => {
    const { default: MarkdownIt } = await import('markdown-it/dist/markdown-it');
    const { default: hljs } = await import('highlight.js/lib/core');
    await Promise.all(
        uniq(flatten([languages.includes('playground') ? ['html', 'css', 'less', 'js'] : [], languages])).map(language => {
            return dynamicRegisterLanguage(hljs, language);
        })
    );
    const { default: MarkdownItMermaid } = await import('./mermaid');
    const { default: MarkdownItKaTeX } = await import('./katex');
    return MarkdownIt({
        html: true,
        highlight: (str, lang) => {
            const trimedStr = str.trim();
            if (lang && hljs.getLanguage(lang)) {
                try {
                    const { value } = hljs.highlight(trimedStr, { language: lang });
                    return [
                        '<pre style="background: rgb(24, 24, 27);">',
                        `<code class="hljs language-${lang}" lang="${lang}">`,
                        value.split('\n').map((v, i, arr) => {
                            return `<div ${arr.length < 5 ? '' : 'class="line"'}>${v}</div>`;
                        }),
                        '<span class="markdown-code-btns">',
                        `<span class="btn-lang">${lang}</span>`,
                        `<span data-code="${encodeURIComponent(
                            trimedStr
                        )}" class="anticon anticon-copy"><svg viewBox="64 64 896 896" focusable="false" data-icon="copy" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M832 64H296c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h496v688c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8V96c0-17.7-14.3-32-32-32zM704 192H192c-17.7 0-32 14.3-32 32v530.7c0 8.5 3.4 16.6 9.4 22.6l173.3 173.3c2.2 2.2 4.7 4 7.4 5.5v1.9h4.2c3.5 1.3 7.2 2 11 2H704c17.7 0 32-14.3 32-32V224c0-17.7-14.3-32-32-32zM350 856.2L263.9 770H350v86.2zM664 888H414V746c0-22.1-17.9-40-40-40H232V264h432v624z"></path></svg></span>`,
                        '</span>',
                        '</code>',
                        '</pre>'
                    ]
                        .flat()
                        .join('');
                } catch (__) {}
            }
            if (lang === 'playground') {
                const id = parsePlayground(str);

                return `<pre class="playground-coordinate" data-id="${id}"></pre>`;
            }
            return `<pre><code class="language-${lang}">${trimedStr}</code></pre>`;
        }
    })
        .use(TaskLists)
        .use(MarkdownItAttrs)
        .use(MarkdownItContainer, 'success', MarkdownItContainerAlert('success'))
        .use(MarkdownItContainer, 'info', MarkdownItContainerAlert('info'))
        .use(MarkdownItContainer, 'warning', MarkdownItContainerAlert('warning'))
        .use(MarkdownItContainer, 'error', MarkdownItContainerAlert('error'))
        .use(MarkdownItEmoji)
        .use(MarkdownItAnchor, {
            slugify
        })
        .use(MarkdownItLinkAttrs, {
            matcher: href => href.startsWith('http'),
            attrs: {
                target: '_blank',
                rel: 'noopener'
            }
        })
        .use(MarkdownItMermaid)
        .use(MarkdownItKaTeX);
};

export const getMarkdownTocData = async markdown => {
    const { default: MarkdownIt } = await import('markdown-it/dist/markdown-it');
    const parser = md => {
        return MarkdownIt().render(md);
    };
    return getTocData(parser(markdown), {
        parser,
        slugify
    });
};
