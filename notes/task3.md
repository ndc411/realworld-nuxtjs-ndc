###

### 10. 视图布局
1. 默认使用layouts/default.vue组件作为包裹组件
2. 想使用其他的父组件，如layouts/foo.vue，则需要指定组件中的layout，layout: 'foo'
```js
  export default {
    name: 'Test',
    layout: 'foo'
  }
```

### 11. 异步数据-asyncData
1. 基本用法
    * 她会将asyncData返回的数据融合到组件data方法返回数据一并给组件
    * 调用时机：服务端渲染期间和客户端路由更新之前
2. 注意事项
    * 只能在页面组件中使用
    * 没有this，因为它是组件初始化之前被调用的
3. 总结
    * 当你想要动态页面内容有利于SEO或者是提升首屏渲染速度的时候，就在asyncData中国发请求拿取数据
    * 如果是非异步数据或者普通数据，则正常的初始化到data中即可