# 安装

> npm install gitbook-cli -g

# 初始化

> gitbook init

# 服务

> gitbook serve

# 构建

> gitbook build


# book.json 书的信息

```json
{
  "gitbook": "2.x.x",
  "title": "ES6入门指南",
  "description": "This is such a great book!",
  "isbn": "978-3-16-148410-0",
  "language": "en, ar, bn, ca, cs, de, en, es, fa, fi, fr, he, it, ja, ko, no, pl, pt, ro, ru, sv, tr, uk, vi, zh-hans, zh-tw",
  "direction": "ltr",
  "structure": {
    "readme": "README.md"
  },
  "variables": {
    "myTest": "Hello World"
  },
  "styles": {
    "website": "styles/website.css",
    "ebook": "styles/ebook.css",
    "pdf": "styles/pdf.css",
    "mobi": "sty  les/mobi.css",
    "epub": "styles/epub.css"
  },
  "plugins": ["myplugin"],
  "pluginsConfig": {
    "myPlugin": {
      "message": "Hello World"
    }
  },
  "pdf": {
    "headerTemplate": "Header of the PDF with _TITLE_",
    "footerTemplate": "Footer HTML template. Available variables: _PAGENUM_, _TITLE_, _AUTHOR_ and _SECTION_."
  }
}
```



# SUMMARY.md 目录

```
Summary

[Chapter 1](chapter1.md)
[Chapter 2](chapter2.md)
[Chapter 3](chapter3.md)
```

# Cover 封面

```
big     cover.jpg           1800x2360
small   cover_small.jpg     200x262
```

# GLOSSARY.md 词汇表

```
term
Definition for this term

Another term
With it's definition, this can contain bold text and all other kinds of inline markup ...
```

# Templating 模板

```
// 模板语言 Nunjucks + Jinja2
{% raw %}
  this will {{ not be processed }}
{% endraw %}

// 定义变量 book.json
{
  "variables": {
    "myVariable": "Hello World"
  }
}
// 调用变量
{{ book.myVariable }}
{{ book.foo.bar }}
{{ book["bar"] }}
// Context variables 上下文变量
file.path
file.mtime
// Tags 标签
if
for
include
```

# ignoring 忽略的文件和文件夹

```
.gitignore, .bookignore .ignore
```

# github

```
// webhook
https://www.gitbook.com/book/shuoshubao/es6/settings/github
Username/Repo
```