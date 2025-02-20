/*
 * @Author: shuoshubao
 * @Desc:   自动生成代码, highlight.js 动态注册语言包
 * @Date:   2023-04-07 18:04:05
 * @Last Modified by:   shuoshubao
 * @Last Modified time: 2023-04-09 22:19:58
 */
const { writeFileSync } = require('fs');
const { basename } = require('path');
const glob = require('glob');
const hljs = require('highlight.js');

const HighlightLanguages = glob
    .sync('node_modules/highlight.js/lib/languages/*.js')
    .filter(v => !v.endsWith('.js.js'))
    .reduce((prev, cur) => {
        const filename = basename(cur, '.js');
        const path = cur.split('/').slice(1).join('/').slice(0, -3);
        const { aliases = [] } = require(path)(hljs);
        prev.push([filename, ...aliases]);
        return prev;
    }, []);

const contentList = [];

HighlightLanguages.forEach(v => {
    const [language] = v;
    const template = `
    if (language === '${language}') {
      const { default: languageDefinition } = await import('highlight.js/lib/languages/${language}')
      registerLanguage('${language}', languageDefinition)
    }
  `;
    contentList.push(template.trim());
});

const content = `
/* eslint-disable */
// 自动生成的代码, 请不要修改

export const HighlightLanguages = ${JSON.stringify(HighlightLanguages)}

export const dynamicRegisterLanguage = async (hljs, lang) => {
  const { getLanguage, registerLanguage } = hljs
  if (!HighlightLanguages.flat().includes(lang)) {
    return
  }
  if (getLanguage(lang)) {
    return
  }
  const [language] = HighlightLanguages.find(v => v.includes(lang))
  ${contentList.join('\n')}
}
`;

writeFileSync('src/utils/highlight.js', content.trim());
