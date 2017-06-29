# 安装

* gem install jekyll

# 初始化

* jekyll new siteName

# 开启服务

* cd siteName
* jekyll serve

> http://localhost:4000

# 用法

## jekyll build

* jekyll build

> 当前文件夹中的内容将会生成到 ./site 文件夹中

* jekyll build --destination <destination>

> 当前文件夹中的内容将会生成到目标文件夹<destination>中

* jekyll build --source <source> --destination <destination>

> 指定源文件夹<source>中的内容将会生成到目标文件夹<destination>中

* jekyll build --watch

> 当前文件夹中的内容将会生成到 ./site 文件夹中

## jekyll serve

* jekyll serve
* jekyll serve --detach
* jekyll serve --watch

# Github

1. git clone https://github.com/shuoshubao/blog.git
2. 将git里面的 `.git` 文件夹和 `README.md` 文件拷贝到jekyll目录下
3. 提交到github

