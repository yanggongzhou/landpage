#### 处理事项
1. 图片资源默认1MB以内打包生成base64形式 [详细可查sources](https://webpack.docschina.org/loaders/html-loader/#sources)
2. js默认压缩babel向下兼容性，且不妨碍在线排查问题（已开通sourcemap）
3. html不压缩处理
4. css 默认压缩，关闭sourceMap以减小体积
5. 注入标签
##### mate

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
platform
```
#### 目录简要

```
-landpage
    -config                       // webpack配置
    -webpack.config.js
    -dist                         // build result
    -platform                     // 不同产品线具体配置
    -src                          // 工作区
        -assets                   // 静态资源
        -index.ejs                // 模版文件 -- 注意：commonjs规范 引入自定义组件
        -main.js                  // entry入口 -- es6的module规范
        -util                     // 其他 自定义方法等
        -*.html                   // 其他 自定义组件等
---
```

#### 环境

jenkins: http://192.168.0.60:1808/jenkins/job/TEST-hwyc_landpage_model/

测试环境： https://landpage.hw.dzods.cn/landpage_model/v3/xsdq.html


