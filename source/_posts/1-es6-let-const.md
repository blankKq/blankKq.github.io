---
title: es6之let，const的使用
date: 2024-07-24 20:34:18
tags:
    [es6, js]
categories: 
    - web前端
description: |
    es6之let，const新特性
---

# let，const的一些特点

 1. 使用let或者const定义会形成块级作用域，一个{}就是一个作用域
 2. let，const没有与解析
 3. 同一个作用域下不能同时定义同一个变量
 4. for循环时使用let来定义变量

 	```javascript
	let arr = [1,2,3,4,5]
    for (let i = 0, len = arr.length; i < len; i++) {
      console.log(i) // 0 1 2 3 4 
    }
    alert(i) // 报错，i is not defined
	```
	```javascript
	let arr = [1,2,3,4,5]
    for (let i = 0, len = arr.length; i < len; i++) {
      let i = 'i 是否已经被定义了？'
      console.log(i) // 此时代码并没有报错，证明let i = 0 和let i = 'i 是否已经被定义了？'并没有在同一个作用域下
    }
	```
	从以上两段代码中可以看出来在for循环的过程中使用let定义的变量i的时候，（）也形成了一个作用域，该作用域是 { } 里边的一个父级作用域
5. 暂时性死区(TDZ)：let，const定义变量的时候没有变量的声明提升，所以在定义这个变量之前是不能对这个变量进行操作的
	```javascript
	// 暂时性死区
    a = 30; // 暂时性死区开始(ReferenceError)
    alert(a)  // ReferenceError
    alert(b) // ReferenceError
    let a = 10; // 暂时性死区结束
    let b = 20;
	```
6. const定义的变量不能再次重新被赋值
7. 使用const定义变量的时候必须赋值
	```javascript
	const a ;
    console.log(a)  //  SyntaxError: Missing initializer in const declaration
	```