import { compile, getCookie, GetQueryString, isIos, randomString } from './other'
import ClientConfig from '../client.config.json';

export const getUserLandId = () => {
  const userlandId = window.localStorage.getItem('USER_LANDPID');
  if (!userlandId) {
    const _id = randomString();
    window.localStorage.setItem('USER_LANDPID', _id);
    return _id
  }
  return userlandId;
}

const getAdjustParams = () => {
  const utm_content = GetQueryString("utm_content") || '0';
  const utm_campaign = GetQueryString("utm_campaign") || '0';
  const campaignList = utm_campaign !== "0" ? utm_campaign.split("_") : [0, 0, 0, 0, 0, 0, 0, 0, 0];
  let channelCode;
  let token = ClientConfig.adjustObj.token;
  if (utm_campaign && utm_campaign !== "0") {
    channelCode = campaignList[ 2 ];
    token = campaignList[ 4 ];
  } else {
    channelCode = isIos ? ClientConfig.defaultChannelCode.ios : ClientConfig.defaultChannelCode.android;
  }
  const bookId = campaignList[ 3 ] || Number(GetQueryString('bookId')) || ClientConfig.adjustObj.bookId;
  return {
    ip: window.localStorage.getItem('DEVICE_IP') || "0.0.0.0",
    log_id: randomString(),
    h5uid: getUserLandId(),
    token,
    bookId,
    bid: bookId,
    channelCode,
    cid: ClientConfig.adjustObj.cid,
    shareCode: ClientConfig.adjustObj.shareCode,
    url: window.location.href,
    fbp: getCookie("_fbp"),
    fbc: getCookie("_fbc") || `fb.1.${new Date().getTime()}.${GetQueryString('fbclid') || '0'}`,
    campaign_id: utm_content,
    campaign_name: utm_campaign,
    ua: navigator.userAgent,
  }
}

/**
 * 获取大数据打点参数
 */
export const getLogParams = (data, eventType) => {
  const adjustObj = getAdjustParams();
  return {
    ...ClientConfig.logParam,
    log_id: randomString(), // 日志id 随机生成，16位字符串即可
    cts: new Date().getTime(), // 客户端时间，精确到毫秒
    chid: adjustObj.channelCode, // 渠道号
    uid: getUserLandId(),
    event: eventType, // 事件名称
    data: {
      type: ClientConfig.logDataType,
      action: 3, // 1 pv | 2 按钮点击下载
      planId: adjustObj.campaign_id || '0',
      planName: adjustObj.campaign_name,
      clipboard: adjustObj,
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
  // console.log('ip---------->', adjustObj.ip)
  return ClientConfig.clientId + compile(adjustObj);
}
