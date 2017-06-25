module.exports = {
  "extends": "airbnb",
  "parser": "babel-eslint",
  "plugins": [

  ],
  "env": {
    "browser": true,
    "node": true
  },
  "rules": {
    // 缩进
    "indent": [2, 2],
    // 分号
    "semi": [2, "never"],
    // 尾逗号
    "comma-dangle": [2, "never"],
    // 全等
    "eqeqeq": [2, "always"],
    // [] {} 前后空格
    "object-curly-spacing": [2, "never"],
    // const 被改变
    "no-const-assign": [2],
    // const let 没重新赋值的用const
    "prefer-const": [2, {
      "destructuring": "any",
      "ignoreReadBeforeAssign": false
    }],
    // 变量声明了没被使用
    "no-unused-vars": [2],
    // 操作符前后加空格
    "space-infix-ops": [2],
    // 关键字前后空格
    // as、async、await、break、case、catch、class、const、continue、debugger、default、delete、do、else、export、extends、finally、for、from、function、get、if、import、in、instanceof、let、new、of、return、set、static、super、switch、this、throw、try、typeof、var、void、while、with、yield
    "keyword-spacing": [2, {
      "before": true,
      "after": true,
      "overrides": {
        "if": { "after": false },
        "else": { "before": false },
        "for": { "after": false },
        "while": { "after": false }
      }
    }],
    // 一行的最大长度, 默认80
    "max-len": [0],
    // 最多连续多少空行
    "no-multiple-empty-lines": [2, { "max": 2 }],
    // 一个表达式含有多个运算符
    "no-mixed-operators": [0],
    // 箭头函数的返回值是三目的时候, 用括号包起来
    "no-confusing-arrow": [2, { "allowParens": true }],
    // react 组件method顺序
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/sort-comp.md
    "react/sort-comp": [1],
    // react属性: dangerouslySetInnerHTML
    "react/no-danger": [0],
    // react jsx文件扩展名
    "react/jsx-filename-extension": [1, {
      "extensions": [".js", ".jsx"]
    }],
    // react jsx 缩进
    "react/jsx-indent": [2, 2],
    // react ref属性值不能是字符串 必须是函数
    "react/no-string-refs": [2],
    // react prop必须有类型验证
    "react/prop-types": [2],
    // react array 的key值不要使用数组的索引, 或包含索引的表达式
    // "react-no-array-index-key": [2],
    // react jsx role
    // https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/no-static-element-interactions.md
    "jsx-a11y/no-static-element-interactions": [0],
    // 箭头函数的参数是否加括号
    "arrow-parens": [2, "as-needed"],
    // 箭头函数返回值是否需要{} return ()
    "arrow-body-style": [2, "as-needed"],
    // 当有多行jsx时, 使用() + 换行
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-wrap-multilines.md
    "react/jsx-wrap-multilines": [2, { "assignment": true }],
    // 为函数指定返回值
    "consistent-return": [0],
    // class的methods中用this
    "class-methods-use-this": [1],
    // import 相对路径
    "import/no-unresolved": [0],
  }
}
