### NuxtJS综合案例
### 1. 案例简介

### 2. 项目初始化--创建项目
1. realworld 官网地址：https://demo.realworld.io/
2. 账号密码 dechuan.test@cc.com/123456789

### 3. 项目初始化--导入样式资源
  1. cdn网站：https://www.jsdelivr.com/,免费的cnd服务，所有的npm包都可以在这里提供cdn链接
  2. 链接2在国内被支持
  3. 链接3直接复制即可

### 4. 项目初始化--布局组件
1. 新建layout

### 5. 项目初始化--导入登录注册页面

### 6. 项目初始化--导入剩余页面

### 7. 项目初始化--处理顶部导航链接

### 8. 项目初始化--处理导航链接高亮

### 9. 项目初始化--封装请求模块


### 10.


### 11.




### 12.


### 13. 错误处理
1. console.dir,接下来要复习console的那些技巧
2. error对象和response的返回的对象的解析要复习


### 14. 用户注册
1. dechuan2.test@cc.com/12345678
2. try catch async await的错误
3. html5原生的表单验证




### 15. 登录注册--解析存储登录状态实现流程
1. nuxtServerInit(): 初始化容器以及需要传递给客户端的数据，这个特殊的action 只会在服务端渲染期间运行

### 16. 登录注册--将登录状态存储到容器中
 state必须是一个函数返回一个新的对象。
 在服务端渲染期间运行都是同一个实例，
 为了防止数据冲突，务必要把 state 定义成一个函数，返回数据对象

### 17. 登录注册--登录状态持久化
 1. nuxtServerInit是一个特殊的 action 方法.这个action 会在服务端渲染期间自动调用
    * 作用：初始化容器数据，传递数据给客户端使用
    ```js
     nuxtServerInit ({ commit }, { req }) {
        let user = null
        if (req.headers.cookie) {
          const parsed = cookieparser.parse(req.headers.cookie)
          try {
            user = JSON.parse(parsed.user)
          } catch (err) {
            // No valid cookie found
          }
        }
        commit('setUser', user)
      }
    ```


### 18. 登录注册--处理导航栏链接的展示状态
1. computed
2. mapState


### 19. 登录注册--处理页面访问权限
1. [中间件](https://www.nuxtjs.cn/guide/routing#%E4%B8%AD%E9%97%B4%E4%BB%B6)
2. 通过 路由中间件 middleware 对页面导航的拦截处理，这是nuxtJs的独特处理只出

### 20. 首页--业务介绍

### 21. 首页--
  1. axios的get请求数据放在params中，post请求放在data中
  2. 获取数据: asyncData() {}，[官网api文档](https://github.com/gothinkster/realworld/tree/master/api)
  3. 显示头像，标题，点赞，描述
  3. 复习nuxt-link

### 22. 首页--分页参数的使用
1. limit 每页的大小
2. 偏移量，跳过多少条数据去limit个条数据

### 23. 首页--列表分页--页码处理
1. [监听query数据变化链接](https://www.nuxtjs.cn/guide/async-data)
2. watchQuery: ['page']设置后，热更新不生效，需要刷新整个页面
3. asyncData中的数据，需要返回，才能在computed中使用

### 24. 首页--展示文章标签列表
1. 接口api/tags

### 25. 首页--优化并行异步任务
1. 使用Promise.all方法并行执行没有依赖的接口
2. 注意解构时的数据
```js
    const [ articlesRes, tagsRes ] = await Promise.all([
      getArticlesApi({
        limit,
        offset: (page - 1) * limit
      }),
      getTagsApi()
    ])
    const { articles, articlesCount } = articlesRes.data
    const { tags } = tagsRes.data
```

### 26. 首页--处理标签列表链接和数据
1. 注意在模板中使用$route属性  $route.query，在分页时拿到标签数据
```html
<nuxt-link
    class="page-link"
    :to="{ name: 'home', query: { page: item, tag: $route.query.tag }}">
    {{ item }}
</nuxt-link>
```

### 27. 首页--c
1. 导航栏有三个 1.your feed 2. Global feed 3.hitler
2. 展示逻辑：2是一直存在的，1是登录才有的，3是点击标签后才有，并且点击了1 2后3就没了

### 28. 首页--处理导航栏--展示状态管理
1. 路由中增加tag参数，处理tag类型的tab的展示逻辑

### 29. 首页--处理导航栏--标签高亮及链接 
1. 导航的路径一样，只是后面的参数内容不一样，导致导航栏无法正常渲染，
此时要给nuxt-link加上exact选项，并且将地址中的相关参数变化加到watchQuery([])队列中监视。最后刷新页面，防止热更新不生效
2. 处理tag类型的tab时，要注意点击标签按钮时：同时传tab的类型和tag名 两个参数

### 30. 首页--处理导航栏--展示用户关注的文章列表 
1. 主要是根据用户的登录状态和tab类型确定请求的api
2. 注意：可以从 asyncData 中接收上下文参数对象，解构出store，访问state中的user对象
3. 请求头需要带上Authorization，[格式链接](https://github.com/gothinkster/realworld/tree/master/api)

### 31. 首页--统一设置用户token
1. [axios拦截器文档](http://www.axios-js.com/zh-cn/docs/#%E6%8B%A6%E6%88%AA%E5%99%A8)
2. [nuxtjs 使用插件](https://www.nuxtjs.cn/guide/plugins#%E4%BD%BF%E7%94%A8-vue-%E6%8F%92%E4%BB%B6)
3. 通过插件机制拿到上下文对象，如contenx，query，res,params等，可以打印分析其结构
4. 插件导出函数必须作为 default 成员---ps: 观察plugins/request.js

### 32. 首页--文章发布时间格式化处理
1. dayjs：是momentjs的模块化版本，所以轻量级

    [github地址](https://github.com/iamkun/dayjs/blob/dev/docs/zh-cn/README.zh-CN.md)
2. [格式化文档](https://day.js.org/docs/zh-CN/display/format)

3. 插件的使用，别忘记注册

### 33. 首页--文章点赞
1. 考虑交互---为点赞按钮可点击 设置开关，喜爱次数count的变化+-1操作
2. 激活状态的切换--根据已有变量操作，不用重新拉取article数据

### 34. 文章详情--业务介绍
1. 文章标题，作者信息，点赞文章，文章内容，撰写发表评论
### 35. 文章详情--展示基本信息
1. [配置文件路径别名](https://github.com/nuxt/nuxt.js/issues/1881#issuecomment-338157397)
 这里的配置文件个人写为'alias.config.js',然后再在preference->framework-webpack中配置这个路径

### 36. 文章详情--把markdown转为HTML
1. npm install markdown-it --save
2.
    ```js
    import MarkdownIt from 'markdown-it'
     const md = new MarkdownIt()
     article.body = md.render(article.body)
    ```
    // 最后通过 v-html指令渲染
    ```html
       <div class="col-md-12" v-html="article.body"></div>
    ```
3. 大功告成

### 37. 文章详情--展示文章作者相关信息
1. 封装组件
2. 有个问题：props是对象时，例如objA,模板中使用一个值a，是objA.somepro.a，
此时在script中的默认值为什么不需要设置一个默认的值somepro
```js
props: {
  somepro: {
    type: Object,
    default: {}
  }
}
```
### 38. 文章详情--设置页面meta优化SEO
1. seo中：tab栏中的标题，以及meta标签中的属性值
2. [nuxtjs的seo]
### 39. 文章详情--通过客户端渲染展示评论列表

### 40. 发布部署--打包
1. [nuxt提供的常用命令](https://www.nuxtjs.cn/guide/commands)
2. npm run build 【生成的.nuxt文件中所有的文件都是打包结果】
3. npm run start【验证打包结果】

### 41. 发布部署--最简单的部署方式
1. 配置Host + port
2. 压缩发布包----把要上传的服务端文件资源压缩
3. 把发布包传到服务端--如ftp，git
    1. 这里用Linux的用scp
4. 解压
5. 安装依赖--压缩包是不包括第三方包的
6. 启动服务--把Web服务在生产服务中启动起来
7. nuxt.config.js中的配置，这个配置和运行的服务环境有关系
    ```
     server: {
        host: '0.0.0.0', // 监听所有网卡地址，这样通过外网地址就可以访问了。如果是本地，那么本地所有局域网就可以访问了
        port: 3000
      },
   ```
8. 需要上传到服务端的文件
   1. .nuxt文件夹---打包生成的结果
   2. static --- 打包的静态资源
   3. nuxt.config.js --- 为服务提供端口
   4. package.json和package.lock.json --- 服务端要安装依赖
9. ssh 链接远程服务器，mkdir 创建新的文件夹，通过pwd查看地址，exit退出回到本地，通过scp命令复制文件到远程服务器，在服务器安装依赖，启动服务，通过公网ip访问服务
    1. 在Finder中就能直观看到隐藏文件，那么在终端中输入以下下命令
    ```
        defaults write com.apple.Finder AppleShowAllFiles YES
         killall Finder
   ```
   2. 要关闭显示隐藏文件的话就把上面的命令中YES改为NO
   3. 远程服务的端口开放问题。默认开启的防火墙端口：https://docs.ucloud.cn/unet/firewall/guide?id=%e6%8e%a8%e8%8d%90%e9%98%b2%e7%81%ab%e5%a2%99
        * 80--http  443--https  22--scp  3389--windows
   
   

### 42. 发布部署--使用PM2启动Node服务
1. PM2是用来管理node进程的应用，能让让node应用运行在后台，保持运行状态
2. pm2相关
    ```
        github仓库地址：https://github.com/Unitech/pm2
        官方文档：https://pm2.io
        安装: npm install pm2 -g
        启动: pm2 start 脚本路径 [pm2 start app.js]
    
    ```
3. 启动服务：pm2 start npm -- start
   ```
    启动npm服务，用pm2进行管理，-- start 相当于给npm传参
   ```
4. 关闭npm服务：pm2 stop id/name
5. pm2 常用命令
    ```
   pm2 list    查看应用列表
   pm2 start   启动应用
   pm2 stop    停止应用
   pm2 reload  重载应用 （应用更新后，要重启服务。reload方式能够在保留一个进程激活的状态下，去一个个挨着去重启。在开启新的实例之前，原有的实例会慢慢被销毁）
   pm2 restart 重启应用 （kill 掉原有进程，开启新的进程）
   pm2 delete  删除应用（某个应用不想通过pm2管理，用这个命令移除）
    ```

### 43. 发布部署--自动化部署介绍
1. 传统部署
    更新1--本地构建---发布；更新2--本地构建---发布；...
    显然，重复劳动过多，详细见41
2. 现代化部署 （CI/CD）持续部署--持续集成
    ![cicd](https://gitee.com/dechuanniu/fed-e-task-03-03/raw/master/assets/images/43_cicd.jpg)
    
### 44. 发布部署--准备自动部署内容
1. 持续集成持续部署的：Jenkins /gitlab CI / Github Actions /Travis CI / Circle CI 
2. 环境准备
    1. Linux 服务器
    2. 代码提交到GitHub 远程仓库
3. 配置 GitHub Access Token
    1. 生成：（https://github.com/settings/tokens）---> developer ---> Personal access token
        * 选择第一个，该token要对仓库有完全的访问操作权限 --> generate token
        
        realworld---6961fda80c2b746e38ed9cf77746fcd9af3fe6ba
    2. 配置到项目的Secrets中：


### 45. 发布部署--自动部署完成
1. git push只会将最新代码提交到远程仓库，不会触发自动部署。
2. 自动部署，打标签才行，另外，标签名称需要用v开头：
    ```
    git tag v1.0.0
    git push origin v1.0.0
    ```



## 作业
```
    使用 NuxtJS 实现 RealWorld 全部功能
    DEMO地址   https://demo.realworld.io/#/
    要求
    
    首先到 demo 地址注册一个自己的账号, 方便自己代码调测
    
    实现功能包括: 注册/登录/退出、文章发表/修改/列表/分页/标签/详情/点赞/取消点赞、个人中心，个人信息更新
    
    本作业需要 放在 github 个人仓库, 并且实现自动化部署
    
    作业提交 「仓库代码地址」，在 README.md 中 输出「部署成功的服务器地址」
    
    
    
    说明
    
    作业所需服务器, 可以到下面地址购买,  0.1元使用3个月 (需要拉勾学员电话号码注册)
    
     https://www.ucloud.cn/site/active/lagou.html
```

