---
title: vue更改props属性值报错
date: 2024-07-25 10:57:19
tags:
    [vue]
categories: 
    - web前端
description: |
    vue更改props属性值报错
---

在更改props属性中的值时，会报错：
>[Vue warn]: Avoid mutating a prop directly since the value will be overwritten whenever the parent component re-renders. Instead, use a data or computed property based on the prop's value. Prop being mutated: "tableData"

<br>
<br>

 **原因：** props是单向数据绑定的，当父组件中的值发生变化，会将值传导给子组件，但是不会反过来（在vue2.0中废除了props的双向数据绑定），这是为了子组件无意中修改了父组件中的状态，使应用的数据流变得难以理解 

**解决办法：** 在子组件中复制一个副本：
```javascript
	<script>
	export default {
		props:['name'],
		data() {
			return {
				sonName: this.name
			}
		}
	</script>
```

将值拷贝到子组件之后再进行操作，如果这里是一个复杂数据类型，则需用使用深拷贝或者JSON来进行拷贝

