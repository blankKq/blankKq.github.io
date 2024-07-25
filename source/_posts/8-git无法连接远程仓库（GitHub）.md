---
title: git无法连接远程仓库（GitHub）
date: 2024-07-25 11:44:15
tags:
    [git]
categories: 
    - 工具
description: |
   git报错ssh: connect to host github.com port 22: Connection timed out
---

##### 问题描述
 - 某一天，开开心心的写完了一篇博客，在向GitHub推送的时候突然报错了，乍一看，报错了，顿时....

![在这里插入图片描述](./1.png)
通过查阅资料尝试了几种方法之后解决了，在这做个记录。

###### 解决方法

首先需要检查一下SSH是否能够连接成功，输入以下命令
```
ssh -T git@github.com
```
若还是报这个错ssh: connect to host github.com port 22: Connection timed out就可以使用以下解决办法

 1. 打开git bash 命令行窗口，找到密钥生成位置
 	```
 	cd ~/.ssh
 	```
 	如果找不到，则需要确认是否生成并配置了ssh
 2. 查看文件是否存在
	 ```
	ls
	 ```
 3. 若存在则在继续在终端输入以下命令新建一个文件
 	```
 	vim config
 	```
 4. 接着输入下面内容
 	```
 	Host github.com
	User 注册github的邮箱
	Hostname ssh.github.com
	PreferredAuthentications publickey
	IdentityFile ~/.ssh/id_rsa
	Port 443
 	```
	![在这里插入图片描述](./2.png)
 5. 最后:ZZ退出编辑即可

###### 验证

 - `ssh -T git@github.com`
 - 出现提示yes回车即可
 ![在这里插入图片描述](./3.png)
 验证就能顺利通过了