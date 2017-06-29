module.exports = {
  "extends": [
    "eslint:recommended",
    "airbnb"
  ],
  "parser": "babel-eslint",
  "plugins": [

  ],
  "globals": {
    "React": false,
    "ReactDOM": false,
    "PropTypes": false,
    "classnames": false,
    "moment": false,
    "$": false,
    "jQuery": false
  },
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
    // 左大括号
    "space-before-blocks": [2],
    // const 被改变
    "no-const-assign": [2],
    // const let 没重新赋值的用const
    "prefer-const": [1, {
      "destructuring": "any",
      "ignoreReadBeforeAssign": false
    }],
    // 变量声明了没被使用
    // "no-unused-vars": [2],
    // 变量声明覆盖
    "no-shadow": [2, {
      "builtinGlobals": false,
      "hoist": "functions",
      "allow": []
    }],
    // 操作符前后加空格
    "space-infix-ops": [2],
    // 逗号前后的空格
    "comma-spacing": [2, {
      "before": false,
      "after": true
    }],
    // 单行块内 {} 空格
    "block-spacing": [2, "never"],
    // 关键字前后空格
    // as、async、await、break、case、catch、class、const、continue、debugger、default、delete、do、else、export、extends、finally、for、from、function、get、if、import、in、instanceof、let、new、of、return、set、static、super、switch、this、throw、try、typeof、var、void、while、with、yield
    "keyword-spacing": [2, {
      "before": true,
      "after": true,
      "overrides": {
        "if": {"after": false},
        "else": {"before": false},
        "for": {"after": false},
        "while": {"after": false}
      }
    }],
    // parseInt 基数
    // "radix": [2, "always"],
    // 禁止在返回语句中赋值
    // "no-return-assign": [2, "except-parens"],
    // () 前后空格
    "space-in-parens": [2],
    // 一行的最大长度, 默认80
    "max-len": [0],
    // 最多连续多少空行
    "no-multiple-empty-lines": [2, {
      "max": 2
    }],
    // 以空行开始并且以空行结束
    "padded-blocks": [2],
    // 一个表达式含有多个运算符
    "no-mixed-operators": [0],
    // 箭头函数的返回值是三目的时候, 用括号包起来
    "no-confusing-arrow": [2, {
      "allowParens": true
    }],
    // 没必要的escape \
    "no-useless-escape": [2],
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
    // react prop需要有类型验证
    "react/prop-types": [1],
    // react array 的key值不要使用数组的索引, 或包含索引的表达式
    "react/no-array-index-key": [1],
    // react jsx role
    // https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/no-static-element-interactions.md
    "jsx-a11y/no-static-element-interactions": [0],
    // 箭头函数的参数是否加括号
    "arrow-parens": [2, "as-needed"],
    // 箭头函数返回值是否需要{} return ()
    "arrow-body-style": [2, "as-needed"],
    // 当有多行jsx时, 使用() + 换行
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-wrap-multilines.md
    "react/jsx-wrap-multilines": [2, {
      "assignment": true
    }],
    // react jsx闭括号换行
    // "react/jsx-closing-bracket-location": [2, "tag-aligned"],
    // react jsx 每行最多属性数量
    "react/jsx-max-props-per-line": [2, {
      "maximum": 2
    }],
    //
    "react/jsx-no-bind": [2, {
      "allowArrowFunctions": true,
      "ignoreRefs": true,
      "allowBind": true
    }],
    // 为函数指定返回值
    "consistent-return": [0],
    // class的methods中用this
    "class-methods-use-this": [1],
    // import 绝对路径在相对路径之前
    "import/first": [0],
    // import 相对路径
    "import/no-unresolved": [0],
    // import package.json dependencies
    "import/no-extraneous-dependencies": [0],
    // import 文件后缀
    "import/extensions": [2, {
      ".js": "never",
      ".jsx": "never"
    }],
    // <img> 的 alt
    "jsx-a11y/alt-text": [0],
    // JSX 属性双引号
    // "jsx-quotes": [2, "prefer-double"],
    // 对象字面量简写
    "object-shorthand": [2, "always"],
    // 函数参数被重新赋值
    /*"no-param-reassign": [2, {
      "props": false
    }],*/
  }
}
