---
title: html2canvas生成图片底部出现白边儿的解决方法
date: 2024-07-26 08:44:24
tags:
    [canvas, html2canvas]
categories: 
    - web前端
description: |
    #### 场景
    使用html2canvas的时候，生成的图片底部出现了白边

    #### 产生白边原因

    可能是由于像素渲染问题导致的。移动设备的屏幕像素密度（Pixel Density）较高，有时会导致在两个相邻元素之间出现细小的间隙或白线。
---
#### 场景
使用html2canvas的时候，生成的图片底部出现了白边

#### 产生白边原因

可能是由于像素渲染问题导致的。移动设备的屏幕像素密度（Pixel Density）较高，有时会导致在两个相邻元素之间出现细小的间隙或白线。

#### 解决方法
将canvas画布高度调小1像素
```
var targetDom = document.getElementById(picDom);
const setup = {
    useCORS: true, // 使用跨域
    height: targetDom.scrollHeight - 1, //canvas高, 高度减 1 是为了解决底部出现白线问题
    width: targetDom.scrollWidth, //canvas宽
    scale: this.isPad ? 6 : 7.5, //按比例增加分辨率 (2=双倍).
    dpi: window.devicePixelRatio * 2 //设备像素比
 };
html2canvas(this.$refs[picRef], setup).then(canvas => {
    let blockDataURL = canvas.toDataURL("image/jpg");
});
```