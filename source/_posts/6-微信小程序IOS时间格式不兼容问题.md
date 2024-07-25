---
title: 微信小程序 IOS中new Date()时间格式不兼容问题
date: 2024-07-25 11:37:36
tags:
    [js, 微信小程序, IOS]
categories: 
    - web前端
description: |
    ##### 问题描述：
     - 最近在小程序项目中遇到了处理Date时间格式的需求，在Android手机测试是没有发现问题的，但是在IOS上 时间转换出现了错误。
---
##### 问题描述：
 - 最近在小程序项目中遇到了处理Date时间格式的需求，在Android手机测试是没有发现问题的，但是在IOS上 时间转换出现了错误。
##### 解决方案：
 - 这里主要兼容问题在于Android可以处理 =='-'== 与 =='/'==  ，而IOS只能处理 =='/'== 的时间格式，具体如下：
 ```javascript
 	/** 问题描述 */
    let dateStr1 = '2022-12-12';
    let dateStr2 = '2022-12-12 00:00';
    let date1 = new Date(dateStr1);  // IOS系统自动转换失败得到null，Android 以正常显示
    let date2 = new Date(dateStr2);  // IOS 和 Android 都可以正常显示

    /** 解决办法 - 将时间格式转换为 /  */
    let date3 = new Date(dateStr2.replace(/-/g, '/'));  // 此时 IOS 和 Android 都可以正常显示了
```
##### 总结：
 - 这里需要注意的是 当日期格式 中不带有 具体时分秒的时候，IOS并不会出现错误。
