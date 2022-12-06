import { compile, GetQueryString, isAndroid, isIos, randomString } from './other'
import { getCookie } from "./cookie";

const { logParam = {}, adjustObj, clientId, ios, android } = PlatformConfig;
const log_id = randomString();

export const getUserLandId = () => {
  const userlandId = window.localStorage.getItem('USER_LANDPID');
  if (!userlandId) {
    const _id = randomString();
    window.localStorage.setItem('USER_LANDPID', _id);
    return _id
  }
  return userlandId;
}
window.adjustObj = {};

export const getAdjustParams = () => {
  const utm_content = GetQueryString("utm_content") || '0';
  const utm_campaign = GetQueryString("utm_campaign") || '0';
  const campaignList = utm_campaign !== "0" ? utm_campaign.split("_") : [0, 0, 0, 0, 0, 0, 0, 0, 0];
  let channelCode;
  let token = adjustObj.token;
  if (utm_campaign && utm_campaign !== "0") {
    channelCode = (enter_script === '3' || model_productid === '8') ? campaignList[ 2 ] : campaignList[1];
    token = (enter_script === '3' || model_productid === '8') ? campaignList[ 4 ] : campaignList[3];
  } else {
    channelCode = isIos ? ios.channelCode : android.channelCode;
  }
  // replaceId 是智投后台配置默认bookId
  const bookId = ((enter_script === '3' || model_productid==='8') ? campaignList[ 3 ] : campaignList[2]) || replaceId || adjustObj.bookId;
  const recommendObj = window.recommendObj || {} // 推荐书籍数据
  const res = {
    ip: window.sessionStorage.getItem('DEVICE_IP') || "0.0.0.0",
    sex: model_sex,
    log_id,
    h5uid: getUserLandId(),
    token: token,
    bookId,
    bid: bookId,
    channelCode,
    cid: window.adjustObj.cid || adjustObj.cid,
    shareCode: adjustObj.shareCode,
    url: window.location.href,
    fbp: getCookie("_fbp"),
    fbc: getCookie("_fbc") || `fb.1.${new Date().getTime()}.${GetQueryString('fbclid') || '0'}`,
    campaign_id: utm_content,
    campaign_name: utm_campaign,
    ua: navigator.userAgent,
    h5fingerPrint: window.adjustObj.h5fingerPrint || '',
    ttclid: GetQueryString('ttclid') || '0',
    media: enter_script === '3' ? 'tiktok' : 'facebook',
    enter_script,
    enter_fbscriptid,
    currentFlag: window.adjustObj.currentFlag || 0,
    ...recommendObj,
  }

  if(enter_script !== '3'){
    // facebook 广告组配置
    const tf_ad = {
      tf_group_id: GetQueryString("ad_group_id") || '0',
      tf_group_name: GetQueryString("ad_group_name") || '0',
      tf_ad_id: GetQueryString("ad_id") || '0',
      tf_ad_name: GetQueryString("ad_name") || '0',
    }
    return {
      ...res,
      ...tf_ad
    }
  }
  return res
}

window.adjustObj = getAdjustParams();
/**
 * 获取大数据打点参数
 */
export const getLogParams = (data, eventType) => {
  const adjustObj = getAdjustParams();
  const date = new Date()
  return {
    ...logParam,
    log_id: randomString(), // 日志id 随机生成，16位字符串即可
    cts: date.getTime(), // 客户端时间，精确到毫秒
    chid: adjustObj.channelCode, // 渠道号
    uid: getUserLandId(),
    pline: isIos ? 'ios': (isAndroid ? 'android' : 'incompatible'),
    pkna: isIos ? ios.pname : android.pname,
    event: eventType, // 事件名称
    type: "luodiye", // 智投/落地页必须是"luodiye"
    data: {
      action: 3, // 1 pv | 2 按钮点击下载
      logDate: date.toLocaleDateString().replace(/\//g, '-'),
      planId: adjustObj.campaign_id || '0',
      planName: adjustObj.campaign_name,
      clipboard: adjustObj,
      myfbc: getCookie("_fbc") ? 'facebook' : 'dianzhong',
      ...adjustObj,
      ...data,
    }
  }
}

/**
 * 获取剪切板参数
 */
export const getCopyText = () => {
  const adjustObj = getAdjustParams();
  return clientId + compile(adjustObj);
}
