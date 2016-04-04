---
layout: post
title:  "Sublime"
date:   2016-01-15 11:11:11
categories: tool
permalink: tool/sublime
---



# 最佳配置

    {
      "font_size": 18,
      "tab_size": 2,
      // 自动换行
      "word_wrap": false,
      // tab变成空格
      "translate_tabs_to_spaces": false,
      // 突出显示当前光标所在的行
      "highlight_line": true,
      // 光标样式
      "caret_style": "smooth",
      // 保存文件时会删除每行结束后多余的空格
      "trim_trailing_white_space_on_save": true,
      // ctrl+f时，自动复制到查找面板的文本框里
      "find_selected_text": true,
      // 空格、制表符显示点：all、selection、none
      "draw_white_space": "all",
      // 保存时在最后添加一个空行 (看着办)
      // "ensure_newline_at_eof_on_save": true,
    }

# [Package Control](https://packagecontrol.io/installation)

### sublime text 2

    import urllib2,os,hashlib; h = '2915d1851351e5ee549c20394736b442' + '8bc59f460fa1548d1514676163dafc88'; pf = 'Package Control.sublime-package'; ipp = sublime.installed_packages_path(); os.makedirs( ipp ) if not os.path.exists(ipp) else None; urllib2.install_opener( urllib2.build_opener( urllib2.ProxyHandler()) ); by = urllib2.urlopen( 'http://packagecontrol.io/' + pf.replace(' ', '%20')).read(); dh = hashlib.sha256(by).hexdigest(); open( os.path.join( ipp, pf), 'wb' ).write(by) if dh == h else None; print('Error validating download (got %s instead of %s), please try manual install' % (dh, h) if dh != h else 'Please restart Sublime Text to finish installation')

### sublime text 3

    import urllib.request,os,hashlib; h = '2915d1851351e5ee549c20394736b442' + '8bc59f460fa1548d1514676163dafc88'; pf = 'Package Control.sublime-package'; ipp = sublime.installed_packages_path(); urllib.request.install_opener( urllib.request.build_opener( urllib.request.ProxyHandler()) ); by = urllib.request.urlopen( 'http://packagecontrol.io/' + pf.replace(' ', '%20')).read(); dh = hashlib.sha256(by).hexdigest(); print('Error validating download (got %s instead of %s), please try manual install' % (dh, h)) if dh != h else open(os.path.join( ipp, pf), 'wb' ).write(by)

# 注册码

### sublime text 3

    —– BEGIN LICENSE —–
    Michael Barnes
    Single User License
    EA7E-821385
    8A353C41 872A0D5C DF9B2950 AFF6F667
    C458EA6D 8EA3C286 98D1D650 131A97AB
    AA919AEC EF20E143 B361B1E7 4C8B7F04
    B085E65E 2F5F5360 8489D422 FB8FC1AA
    93F6323C FD7F7544 3F39C318 D95E6480
    FCCC7561 8A4A1741 68FA4223 ADCEDE07
    200C25BE DBBC4855 C4CFB774 C5EC138C
    0FEC1CEF D9DCECEC D3A5DAD1 01316C36
    —— END LICENSE ——

# 插件

* [Emmet](http://shuoshubao.github.io/tool/emmet.html)
* CSS3
* jQuery
* LESS
* SCSS
* CSScomb
* JsFormat
* Quote HTML
* HTML-CSS-JS Prettify
* All Autocomplete
* AutoFileName
* DocBlockr
* DeleteBlankLines
* Console API Snippets
* SFTP
* Nodejs

# 快捷键

## 文件

* ctrl+o 打开
* ctrl+n 新建标签页
* ctrl+shift+n 新建窗口
* ctrl+w 关闭标签页
* ctrl+shift+w 关闭窗口
* ctrl+` 打开控制台
* ctrl+shift+p 打开命令面板
* ctrl+p 搜索项目中的文件
* ctrl+g 跳到指定行

## 编辑

* ctrl+c 复制（选中部分/当前行）
* ctrl+x 剪切（选中部分/当前行）
* ctrl+v 粘贴
* ctrl+shift+v 粘贴+缩进
* ctrl+k,ctrl+v 从粘贴板
* ctrl+z 撤销
* ctrl+y 重复上次操作

### 行

* ctrl+[
* ctrl+]
* ctrl+shift+up
* ctrl+shift+down
* ctrl+shift+d 复制并新建一行
* ctrl+shift+k 删除行
* ctrl+j 合并行
* ctrl+alt+back 删除空行（DeleteBlankLines插件）
* ctrl+alt+back 删剩余空行（DeleteBlankLines插件）

### 注释

* ctrl+/
* ctrl+shift+/

### 文本

* ctrl+enter 往下插入行
* ctrl+shift+enter 往上插入行
* ctrl+delete 删除光标至单词尾
* ctrl+backspace 删除光标至单词头
* ctrl+k,ctrl+k 删除光标至行尾
* ctrl+k,ctrl+backspace 删除光标至行首
* ctrl+t 交换光标左右字符

### 标签

* alt+. 补全标签
* alt+shift+w 为选中域包裹一对闭合标签（js中也可以用，改变开始标签名,结束标签名同步变化）
* ctrl+alt+enter 为选中域包裹一对闭合标签
* ctrl+e 将光标前的单词补全为闭合标签

### 大小写

* ctrl+k,ctrl+u 大写
* ctrl+k,ctrl+l 小写

### 折叠

* ctrl+shift+[ 折叠
* ctrl+shift+] 展开
* ctrl+shift+j 展开所有
* ctrl+k,ctrl+t 折叠标签属性
* ctrl+k,ctrl+数字 折叠n层

### 排序

* f9 行按升序排
* ctrl+f9 行按升序排,区分大小写


## 选择

* ctrl+a 全选
* ctrl+d 选择单词
* ctrl+l 选择行
* ctrl+alt+up 添加上一行
* ctrl+alt+down 添加下一行
* ctrl+shift+l 选择多行
* esc 只留第一个选择
* ctrl+shift+a 选中标签里面的全部内容不包括标签
* ctrl+shift+j 选中缩进里面的全部内容
* ctrl+shift+m 选中花括号里面的全部内容不包括花括号