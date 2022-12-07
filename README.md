#### 处理事项
1. 图片资源默认1MB以内打包生成base64形式 [详细可查sources](https://webpack.docschina.org/loaders/html-loader/#sources)
2. js默认压缩babel向下兼容性，且不妨碍在线排查问题（已开通sourcemap）
3. css 默认压缩，关闭sourceMap以减小体积
4. 注入标签
5. html不压缩处理
6. 各产品线总输出文件为单个html, 可在打包时配置替换sourcemap的绝对地址（位置config/outFileMerge.js）

##### mate标签  位置config/defaultTag.js

```
<meta charset="UTF-8">
<!-- 响应式 -->
<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no, maximum-scale=1, minimum-scale=1, user-scalable=no">
<!-- windows phone 点击无高光 -->
<meta name="msapplication-tap-highlight" content="no">
<!-- 网页不会被缓存 -->
<meta http-equiv="pragma" content=no-cache>
<meta http-equiv="Cache-Control" content=no-cache>
<meta http-equiv="Expires" content=0>
<!-- 兼容 -->
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
```

##### script
1. 剪切板 ClipboardJS
2. zepto // v3不用
3. 微软分析
4. 谷歌分析
5. rem
6. 指纹分析

#### 公共参数 PlatformConfig  dev 环境默认取值 /platform 下第一个文件
```
platform文件夹下区分各个产品线差异, 根据实际需求配置相关参数
build 以正确的json文件个数生成同等的html文件数
serve 默认取第一个json文件作为本地开发环境json配置文件
```
#### 目录简要

```
-landpage
    -config                       // webpack配置文件夹
        -defaultTag.js            // mate标签 常用第三方库clipboard、zepto等, 输出给HtmlWebpackPlugin参数
        -entry.js                 // 配置entry入口和生成多页面（依赖/platform中的.json文件数） -- 注意：commonjs规范 引入自定义组件
        -mock.js                  // 本地化mock数据
        -outFileMerge.js          // build后执行node config/outFileMerge.js，目的是合并js、css、map到html文件
        -readPlatform.js          // 读取/platform中的.json文件名称和内容
    -webpack.config.js            // webpack配置
    -dist                         // build result
    -platform                     // 不同产品线具体配置
    -src                          // 工作区
        -assets                   // 静态资源
        -index.ejs                // 模版文件 -- 注意：commonjs规范 引入自定义组件
        -main.js                  // entry入口 -- es6的module规范
        -util                     // 其他 js自定义方法等
        -*.html                   // 其他 自定义组件等
---
```

#### 环境

jenkins: http://192.168.0.60:1808/jenkins/job/TEST-hwyc_landpage_model/
测试环境： https://landpage.hw.dzods.cn/landpage_model/v3/xsdq.html


