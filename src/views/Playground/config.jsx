const AssetRule = [
  (label, index, name) => {
    return {
      required: true,
      message: '不得为空'
    }
  },
  (label, index, name) => {
    return {
      type: 'url',
      message: '必须是 URL'
    }
  }
]

export const formColumns = [
  {
    label: 'CSS',
    name: 'cssAssets',
    tooltip: '额外的 CSS 资源',
    formListConfig: {
      record: '',
      rules: AssetRule
    },
    template: {
      tpl: 'input'
    }
  },
  {
    label: 'JavaScript',
    name: 'jsAssets',
    tooltip: '额外的 JavaScript 资源',
    formListConfig: {
      record: '',
      rules: AssetRule
    },
    template: {
      tpl: 'input'
    }
  }
]
