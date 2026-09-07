export const getLanguagesEnum = ({ JavascriptRef, CssRef, HtmlRef }) => {
    return [
        {
            label: 'React',
            value: 'js',
            language: 'javascript',
            ref: JavascriptRef
        },
        {
            label: 'Less',
            value: 'css',
            language: 'less',
            ref: CssRef
        },
        {
            label: 'HTML',
            value: 'html',
            language: 'html',
            ref: HtmlRef
        }
    ];
};

export const AssetRules = [
    {
        required: true,
        message: '不得为空'
    },
    {
        type: 'url',
        message: '必须是 URL'
    }
];

export const AssetFormListFields = [
    {
        label: 'CSS',
        name: 'cssAssets',
        tooltip: '额外的 CSS 资源',
        placeholder: '请输入 CSS'
    },
    {
        label: 'JavaScript',
        name: 'jsAssets',
        tooltip: '额外的 JavaScript 资源',
        placeholder: '请输入 JavaScript'
    }
];
