## 安装依赖
```
npm install
```
## 运行项目
```
npm run dev
```
## 打包项目
```
npm run build
```


# 一. 框架结构
```
├─library   项目框架
│  ├─components             组件
│  ├─directive              指令
│  ├─globalErrorHandler     异常处理
│  ├─layouts                布局
│  ├─request                网络请求
│  ├─styles                 样式
│  ├─useSetup               插件加载
│  └─variables              样式变量
├─mock      模拟服务器
├─public    公共文件
└─src       项目目录
    ├─api           接口配置
    ├─assets        静态资源
    ├─components    组件
    ├─config        全局配置
    ├─directive     指令
    ├─router        路由
    ├─store         store 状态管理
    ├─utils         工具包
    └─views         页面
├─.env.development  测试服配置
├─.env.production   正试服配置
├─.env.mockjs       模拟服务器配置
├─package.json      依赖包文件
├─vue.config.js     vue配置文件
```

# 二. 全局网络请求工具:HTTP
1. 使用说明:在需要使用的地方直接:
```
   HTTP[method](url,Param).then(resp => {
      console.log("resp:", resp)
    }).catch(err => {
      console.log("err:", err)
    }).finally(() => {
      console.log("请求结束")
    })

    url:必须在src/api/modules/xxx.js  中声明,对应其中的 key
    例如:
    export default {
        user: "/api/user/",
        login_user: "/account/login_user/",
    }   
```
2. 支持的方法 method:
```
   1. get
   2. getById
   3. getRead
   4. getReadById
   5. post
   6. patch
   7. put
   8. delete
```
