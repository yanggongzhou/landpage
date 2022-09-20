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
2. zepto
3. 微软分析
4. 谷歌分析
5. rem

#### 公共参数 src/client.config.json
```
{
  "name": "platform name",          // 平台名称
  "googleCode": "G-KMV3QH0B9M",     // 谷歌分析code
  "microsoftCode": "bd2lt7m40g",    // 微软分析code
  "rem": {
    "type": "vertical",             // 模式 值vertical｜horizontal 监听竖屏可设置horizontal 
    "horizontalWidth": 1624,        // 横屏rem对比参数 模式为horizontal时需设置
    "verticalWidth": 750            // 竖屏rem对比参数
  },
  "adjustObj": {                    // 大数据打点、剪切板等必要参数
    "bookId": "",                   // 书籍ID
    "token": "",                    // token
    "cid": 0,                       // 章节ID
    "shareCode": 0                  // 分享code
  },
  "defaultChannelCode": {
    "ios": "GSIZ1000001",           // ios默认渠道号
    "android": "GSAZ1000001"        // android默认渠道号
  },
  "logParam": {                     // 大数据打点等必要参数
    "bline": "",
    "pline": "",
    "pkna": "",
    "app_version": "1.0.0",
    "imei": "",
    "oaid": "",
    "idfa": "",
    "type": ""
  },
  "logDataType": "xxx_luodiye_xxx_", // 大数据打点自定义data type 必要参数
  "clientId": "ftb_",                // 剪切板参数头部信息
  "downloadLink": {                  // 下载商店链接
    "ios": "https://itunes.apple.com/us/app/id1517946671",
    "android": "https://play.google.com/store/apps/details?id=com.webfic.novel"
  },
  "netUrl": {
    "ip": "https://api.gostory.com/gostory/ap001/remote",       // 服务端获取IP链接
    "hive": "https://log.gostory.com/h5_standard_final_log.php" // 大数据链接
  },
  ....                                // 其余可根据项目需要自行配置
}
```
