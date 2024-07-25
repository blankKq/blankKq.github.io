---
title: 如何为element-ui组件定义的事件添加自己的参数
date: 2024-07-25 11:31:51
tags:
    [vue, element-ui]
categories: 
    - web前端
description: |
    我们在使用element-ui组件的时候，该如何为element-ui中定义好的事件添加一些自己的参数呢？
---

我们在使用element-ui组件的时候，该如何为element-ui中定义好的事件添加一些自己的参数呢？

废话不多说，直接看代码：
这是一个简单的应用，在我们选中按钮的时候，需用将他的名字也传递过去
````
<template>
	<div class="hello">
		<div v-for="(item, index) in items" :key="index">
			<el-radio @change="(data) => {getdata(item.name, data)}" v-model="radio" label="1">{{ item.name }}</el-radio>
			<el-radio v-model="radio" label="2">{{ item.name }}</el-radio>
		</div>
	</div>
</template>
````
````
<script>
export default {
  data() {
    return {
      radio: "1",
      items: [{name: 'lis'}, {name: '13'}]
    };
  },
  methods: {
    getdata(index, data) {
      console.log(data, index);
    }
  },
  mounted() {}
};
</script>
````

原理：这里形成了闭包，在点击的时候，会将change事件中默认的参数传递到匿名函数里边，然后再获取到这个参数


补充：可以使用$event 来获取到事件对象e