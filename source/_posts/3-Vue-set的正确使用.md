---
title: this.$set的正确使用
date: 2024-07-25 10:59:15
tags:
    [vue]
categories: 
    - web前端
description: |
    this.$set的正确使用
---
## this.#set(obj, key, value)
我们在项目开发的过程中，经常会遇到这种情况：为data中的某一个对象添加一个属性
````javascript
<template>
  <div class="hello">
    <button @click="setMessage">添加属性</button>
    {{ student.name }}
    <input type="text" v-model="student.age">
  </div>
</template>
````
	
````javascript
<script>
export default {
  data() {
    return {
      student: {
        name: '张三',
      }
    }
  },
  methods: {
    setMessage() {
      this.student.age = 15
      console.log(this.student)
    }
  }
}
</script>
````

 当我们点击按钮，为student添加一个age属性，看看视图层是否能够更新
 
![在这里插入图片描述](./1.png)
![在这里插入图片描述](./2.png)
在这里我们发现虽然这个对象身上已经有了该属性，但是视图层并没有更新该数据，是什么造成的呢？由于受JavaScript的限制，vue.js不能监听对象属性的添加和删除，因为在vue组件初始化的过程中，会调用getter和setter方法，所以该属性必须是存在在data中，视图层才会响应该数据的变化

那么，我们该如何解决这个问题呢
解决这个问题的方法大体有两种：

 1. 使用this.$set(obj, key, value)/vue.set(obj, key, value)

 ````javascript
<script>
export default {
  data() {
    return {
      student: {
        name: '张三',
      }
    }
  },
  methods: {
    setMessage() {
      this.$set(this.student, 'age', 15)
      console.log(this.student)
    }
  }
}
</script>
  ````
2. 通过Object.assign(target, sources)方法
	
````javascript
<script>
export default {
  data() {
    return {
      student: {
        name: '张三',
      }
    }
  },
  methods: {
    setMessage() {
      this.student.age = 15
      this.student = Object.assign({}, this.student)
      console.log(this.student)
    }
  }
}
</script>
````

我们发现，通过这两种方式为对象添加属性之后，他的对象身上多了get和set方法，所以，此时我们再次操作该属性的时候，就会引起视图的更新啦
![在这里插入图片描述](./3.png)