## 电商前端pc端框架


### 项目运行


```
git clone http://git.300.cn/NRCP/nrcp-web/bms.git  

cd bms

npm install

npm run dev

```

### 项目详情

```
.
├── build                                       // webpack配置文件和服务启动文件
├── config                                      // 环境变量配置
├── dist                                        // 打包后的静态文件
├── src                                          
│   ├── api                                     // 接口api（其中index.js是聚合索引文件）
│   ├── assets                                  // 静态文件目录
│   ├── bizComps                              // 公共组件目录（很多页面级的功能组件继承自此目录下的base组件）
│   ├── config                                  // 项目配置目录
│   ├── router                                  // 路由目录（其中index.js是聚合索引文件，按需模块化的添加你的路由文件）
│   ├── store                                   // 状态管理目录
│   ├── styles                                  // 样式目录
│   ├── system                                  
│   │  ├── appConfig.js                         // 系统配置
│   │  ├── auth.js                              // 系统认证token管理
│   │  ├── permission.js                        // 系统权限验证
│   │  ├── request.js                           // 接口请求方法封装
│   │  ├── constant.js                          // 常量配置
│   ├── utils                                   // 工具箱集合（其中index.js是聚合索引文件,使用时在页面中导入utils模块，然后用.运算符直接取到对应的方                                                              法名即可使用）
│   ├── views                                   // 页面目录
│   ├── App.vue                                 // vue主文件
│   ├── main.js                                 // 项目主文件
.
```