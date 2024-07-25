---
title: 小程序1rpx边框不完美解决方案
date: 2024-07-25 11:41:27
tags:
    [css, 微信小程序]
categories: 
    - web前端
description: |
    * 在小程序开发中，1rpx边框随处可见，如果只是简单的使用`border: 1rpx solid red;`的话，在不同的机型上会有不同的表现， IOS机型可能存在边框缺失，安卓边框较粗。
---

##### 问题描述
* 在小程序开发中，1rpx边框随处可见，如果只是简单的使用`border: 1rpx solid red;`的话，在不同的机型上会有不同的表现， IOS机型可能存在边框缺失，安卓边框较粗。

##### 原因
首先先看看IOS边框缺失的问题
> 当父元素的高度为奇数时，容易出现上下边框缺失，同理，当父元素宽度为奇数时，容易出现左右边框缺失

解决办法是在边框内部添加一个1rpx的元素或是伪元素，撑开内部使元素的宽高为偶数

然而我们发现这种方案在Iphone 6等2倍屏可以生效， 但放在如Iphone X等3倍屏下面就很飘了， 还是经常会出现边框缺失的情况， 这种情况下再去把父元素改为2和3共同的倍数就非常不现实了。

再回过头看导致边框缺失的具体原因是啥。

在这之前需要了解下高分屏的物理像素和虚拟像素的概念

简单来说物理像素是设备的实际像素

虚拟像素是设备的坐标点， 可以简单理解为css像素

而rpx类似rem，渲染后实际转换成px之后可能存在小数，在不同的设备上多多少少会存在渲染的问题。而1rpx的问题就更加明显，因为不足1个物理像素的话，在IOS会进行四舍五入，而安卓好像统一向上取整，这也是上面两种设备表现不同的原因。

###### 解决办法

我们采用的方法是采用translate:scale(0.5)的方法对边框进行缩放

具体的代码如下

```

.border1rpx, .border1rpx_before{
  position: relative;
  border-width: 0rpx !important;
  padding: 0.5rpx;
  z-index: 0;
}
.border1rpx::after, .border1rpx_before::before{
  content: "";
  border-style: inherit;
  border-color: inherit;
  border-radius: inherit;
  box-sizing: border-box !important;
  position: absolute;
  border-width: 2rpx !important;
  left: 0;
  top: 0;
  width: 200% !important;
  height: 200% !important;
  transform-origin: 0 0;
  transform: scale(0.5) !important;
  z-index: -1;
}
.border1rpx-full { margin: -1rpx; }
```

1. 给.border1rpx的元素设置边框宽度为0
2. 给::after伪元素宽高为两倍，边框设置2rpx，
3. 边框其他样式继承元素的设置
4. 然后再缩放0.5来达到边框为1rpx的效果