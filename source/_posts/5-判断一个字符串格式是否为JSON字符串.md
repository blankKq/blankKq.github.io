---
title: 如何判断一个字符串格式是否为JSON字符串
date: 2024-07-25 11:33:56
tags:
    [js]
categories: 
    - web前端
description: |
    如何判断一个字符串格式是否为JSON字符串
---

代码如下：
````javascript
function isJSON(str) {
    if (typeof str == 'string') {
        try {
            var obj=JSON.parse(str);
            if(Object.prototype.toString.call(obj) == '[object Object]' && obj ){
                return true;
            }else{
                return false;
            }

        } catch(e) {
            console.log('error：'+str+'!!!'+e);
            return false;
        }
    }
    console.log('It is not a string!')
}
````