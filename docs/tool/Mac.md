# 1. 终端自动补全忽略大小写

### 输入

* $ nano .inputrc

### 粘贴

* set completion-ignore-case on
* set show-all-if-ambiguous on
* TAB: menu-complete

### 保存

* Control+O，回车保存

### 重启

* 重启终端生效


# 2. 关闭/开启 Spotlight

### 关闭

> sudo launchctl unload -w /System/Library/LaunchDaemons/com.apple.metadata.mds.plist

### 开启

> sudo launchctl load -w /System/Library/LaunchDaemons/com.apple.metadata.mds.plist


# 3. 快捷键

* cmd+,                 打开当前app的设置
* cmd+w                 关闭当前标签页
* cmd+q                 退出当前程序
* cmd+h                 隐藏除了当前窗口
* cmd+alt+h             隐藏除了当前窗口以外的所有窗口
* cmd+shift+delete      清空垃圾桶
* cmd+alt+shift+delete  清空垃圾桶（无提示）
* cmd+左右               行首/末
* cmd+上下               顶/底部
* fn+上下                    翻页


# 4. 关闭/开启 自动生成 .DS_Store 文件

### 关闭

> defaults write com.apple.desktopservices DSDontWriteNetworkStores -bool TRUE

### 开启

> defaults delete com.apple.desktopservices DSDontWriteNetworkStores

# 5. 显示/隐藏 隐藏文件(夹)

### 显示

> defaults write com.apple.Finder AppleShowAllFiles YES

### 隐藏

> defaults write com.apple.Finder AppleShowAllFiles NO

# 6. 删除所有的 .DS_Store 文件

> sudo find / -name ".DS_Store" -depth -exec rm {} \;

# 7. Alias

> vim ~/.bash_profile

```
alias dev = ssh root@172.34.56
alias gst = git status
alias gpl = git pull
alias gps = git push
```