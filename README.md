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
```

```
