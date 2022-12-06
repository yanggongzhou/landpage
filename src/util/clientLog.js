import { getAdjustParams, getCopyText, getLogParams } from './logParams';
import { isIos } from "./other";

const { ios, android, netUrl } = PlatformConfig;

// 大数据打点
export const netHiveLog = (eventType = '', data = {}) => {
  const logData = getLogParams(data, eventType);
  $.ajax({
    type: "post",
    url: netUrl.hive,
    dataType: "json",
    keepalive: true,
    data: { json: JSON.stringify(logData) }})
}

// 获取Ip
export const netIP = () => {
  const sessionIP = window.sessionStorage.getItem('DEVICE_IP')
  if (sessionIP && sessionIP !== '0.0.0.0') return
    $.ajax({ type: "get", url: netUrl.ip, dataType: "json", keepalive: true,
      success: function (res) {
        if (res.status === 200 || res.status === 0) {
          const ip = res.data.ip.toString().replace("\n", "");
          window.sessionStorage.setItem('DEVICE_IP', ip || '0.0.0.0');
          window.adjustObj.ip = ip || '0.0.0.0';
        } else {
          netHiveLog(`luodiyelogClick_click_${PlatformConfig.logId}_requestStatus_failed`)
        }
      },
      error: function () {
        window.sessionStorage.setItem('DEVICE_IP', '0.0.0.0');
        netHiveLog(`luodiyelogClick_click_${PlatformConfig.logId}_requestStatus_failed`)
      },
    })
}

// 繁体上报IPUA
export function netIPUA() {
  const adjustObj = window.adjustObj || getAdjustParams();
  const { fbp, fbc, campaign_id, ua, h5uid, bid, h5fingerPrint, url } = adjustObj
  const params = {
    fbp,
    fbc,
    enter_fbscriptid,
    fbUrl: url,
    campaign_id, ua, h5uid, bid, h5fingerPrint,
    fingerPrintPversion,
    enter_script,
    clipboard: getCopyText(),
  }
  fetch(netUrl.ipua, {
    method: "post",
    body: JSON.stringify(params),
    headers: new Headers({
      'Content-Type': "application/json"//x-www-form-urlencoded"
    }),
    keepalive: true
  }).then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => console.log('Success:', response));
}

// 繁体上报IPUA
export function netFtIPUA(){
  var param = {
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
