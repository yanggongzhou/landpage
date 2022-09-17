import sensors from 'sa-sdk-javascript'
import ClientConfig from '../client.config.json'
import { getUserLandId } from './logParams'

// 神策系统配置
sensors.init({
  name: 'sensors',
  server_url: ClientConfig.sentryData.url, // 数据接收地址
  is_track_single_page: true, // 单页应用页面浏览事件采集(url改变就触发)
  use_app_track: true,
  show_log: process.env.NODE_ENV !== 'production', // 控制台显示数据开
  heatmap: { // 热图设置 default开启 not_collect关闭（详细配置解释看官方文档）
    clickmap: 'default', // 点击热图，收集点击事件
    scroll_notice_map: 'default', // 视区热图，收集页面区域停留时间
  }
})

// 注册公共属性
sensors.registerPage({
  clientId: ClientConfig.clientId,
  platformName: ClientConfig.name,
  referrer: document.referrer,
  ua: navigator.userAgent,
});

// 绑定用户
const userId = getUserLandId();
sensors.login(userId);

// 自动采集事件埋点
if (ClientConfig.sentryData.isAutoTrack) {
  sensors.quick('autoTrack') // 首次触发页面加载事件 $pageview
}

export default sensors;
