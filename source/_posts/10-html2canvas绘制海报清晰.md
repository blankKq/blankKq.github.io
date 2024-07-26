---
title: html2canvas绘制海报清晰
date: 2024-07-26 08:42:32
tags:
    [canvas, html2canvas]
categories: 
    - web前端
description: |
   解决html2canvas绘制海报，生成海报比较模糊问题
---


#### 场景
使用html2canvas绘制海报，生成海报比较模糊
#### 解决方案
##### 方案一：增大dpi

>dpi:DPI是指某些设备分辨率的度量单位。DPI越低，扫描的清晰度越低，DPI越高，清晰度越高。
由于受网络传输速度的影响，web上使用的图片都是72dpi，照片使用300dpi或者更高350dpi，会很清晰。

##### 方案二：增大scale

>scale会缩放canvas画布，提高/减小生成图片分辨率

```
scale: 3, // 按比例增加分辨率 (2=双倍).
```

##### 方案三：将页面图片引入方式由背景图改为img标签

##### 方案四：分割转换
>将目标元素分割为多个小块，并分别进行转换，最后将分割的图片交给后端把图片合成起来

```
    /**
     * 绘制海报
     * @param {*} picDom
     * @param {*} picRef
     */
    createImgDebris(picDom, picRef) {
      return new Promise(resolve => {
        var targetDom = document.getElementById(picDom);
        const setup = {
          useCORS: true, // 使用跨域
          height: targetDom.scrollHeight - 1, //canvas高, 高度减 1 是为了解决底部出现白线问题
          width: targetDom.scrollWidth, //canvas宽
          scale: this.isPad ? 6 : 7.5, //按比例增加分辨率 (2=双倍).
          // scale: list.length > 25 ? 4.5 : 5.2, //按比例增加分辨率 (2=双倍).
          // dpi: window.devicePixelRatio * 2 //设备像素比
          dpi: window.devicePixelRatio * 2 //设备像素比
        };
        html2canvas(this.$refs[picRef], setup).then(canvas => {
          let blockDataURL = canvas.toDataURL("image/jpg");
          resolve(blockDataURL);
        });
      });
    },
    
    /**
     * 海报生成图片
     */
    creatImg(type) {
      let promiseList = [
        this.createImgDebris("imgBoxBanner", "pictureBanner"),
        this.createImgDebris("imgBoxBox50", "pictureBox50")
      ];
      Promise.all(promiseList).then(resList => {
        this.uploadImg(resList, "image/jpg")
      });
    },
```

合并上传

```
    /**
     * 合并上传图片
     * @param {*} imgList
     * @param {*} imgType
     */
    async uploadImg(imgList, imgType = "image/jpg") {
      return new Promise((resolve, reject) => {
        try {
          // 创建 FormData 对象并添加图像数据
          const formData = new FormData();
          for (let len = imgList.length, i = 0; i < len; i++) {
            let img = imgList[i];
            const binaryImageData = atob(img.split(",")[1]);
            // 创建一个缓冲数组来存储二进制数据
            const buffer = new Uint8Array(binaryImageData.length);
            // 将二进制数据复制到缓冲数组中
            for (let i = 0; i < binaryImageData.length; i++) {
              buffer[i] = binaryImageData.charCodeAt(i);
            }
            // 将缓冲数组转换为 Blob 对象
            const blob = new Blob([buffer], { type: imgType });
            formData.append("files", blob, imgType);
          }
          mergeMaterialPost(formData).then(res => {
            resolve(res);
          });
        } catch (error) {
          reject(error);
        }
      });
    },


```
