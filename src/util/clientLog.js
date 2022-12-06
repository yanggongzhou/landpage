import { getAdjustParams, getCopyText, getLogParams } from './logParams';
import { isIos } from "./other";

const { ios, android, netUrl } = PlatformConfig;

// 大数据打点
export const netHiveLog = (eventType = '', data = {}) => {
  const logData = getLogParams(data, eventType);
  const formData = new FormData();
  formData.append("json",JSON.stringify(logData));
  fetch(netUrl.hive, {
    method: "post",
    body: formData,
    keepalive: true
  }).then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => console.log('Success:', response))
}
// 获取Ip失败
const getIpErr = () => {
  window.sessionStorage.setItem('DEVICE_IP', '0.0.0.0');
  netHiveLog(`luodiyelogClick_click_${PlatformConfig.logId}_requestStatus_failed`)
}
// 获取Ip
export const netIP = () => {
  const sessionIP = window.sessionStorage.getItem('DEVICE_IP')
  if (sessionIP && sessionIP !== '0.0.0.0') return
  fetch(netUrl.ip, {
    method: "get",
    keepalive: true
  }).then(response => {
    response.json().then((res) => {
      console.log(res);
      if (res.status === 200 || res.status === 0) {
        const ip = res.data.ip.toString().replace("\n", "");
        window.sessionStorage.setItem('DEVICE_IP', ip || '0.0.0.0');
        window.adjustObj.ip = ip || '0.0.0.0';
      } else {
        getIpErr()
      }
    }).catch(() => {
      getIpErr()
    })
  }).catch(() => {
    getIpErr()
  })
}

// 繁体上报IPUA
export function netIPUA() {
  const { fbp, fbc, campaign_id, ua, h5uid, bid, h5fingerPrint, url } = getAdjustParams();
  const params = {
    fbp,
    fbc,
    enter_fbscriptid,
    fbUrl: url,
    campaign_id,
    ua,
    h5uid,
    bid,
    h5fingerPrint,
    fingerPrintPversion,
    enter_script,
    clipboard: getCopyText(),
  }
  fetch(netUrl.ipua, {
    method: "post",
    body: JSON.stringify(params),
    headers: new Headers({
      'Content-Type': "application/json" // x-www-form-urlencoded"
    }),
    keepalive: true
  }).then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => console.log('Success:', response));
}

// 繁体上报IPUA
export function netFtIPUA(){
  const param = {
    "clipboard": getCopyText(),
    "ua": navigator.userAgent,
    "pname": isIos ? ios.pname : android.pname,
  }
  fetch(netUrl.ipua, {
    method: "post",
    body: JSON.stringify(param),
    headers: new Headers({
      'Content-Type': "application/json" // x-www-form-urlencoded"
    }),
    keepalive: true
  }).then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => console.log('Success:', response));
}
