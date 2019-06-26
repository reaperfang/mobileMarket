## 电商前端框架


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
├── build                                       // webpack配置文件
├── config                                      // 项目打包路径
├── src                                          
│   ├── api                                     // 接口api
│   ├── assets                                  // 静态文件目录
│   ├── components                              // 公共组件目录
│   ├── config                                  // 项目配置目录
│   ├── router                                  // 路由目录
│   ├── store                                   // 状态管理目录
│   ├── styles                                  // 样式目录
│   ├── system                                  
│   │  ├── appConfig.js                         // 常量配置
│   │  ├── auth.js                              // Cookie操作方法
│   │  ├── permission.js                        // 权限验证方法
│   │  ├── request.js                           // 接口请求方法
│   ├── utils                                   // 常用方法封装
│   ├── views                                   // 页面目录
│   ├── App.vue                                 // vue主文件
│   ├── main.js                                 // 项目主文件
│   ├── thirdParty.js                           // 第三方文件
.
```