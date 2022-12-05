import { getLogParams } from './logParams';
import { isIos } from "./other";

const { ios, android, netUrl } = PlatformConfig;

// 大数据打点
export const netHiveLog = (data = {}, eventType = '') => {
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
  window.localStorage.setItem('DEVICE_IP', '');
  $.ajax({
    type: "get",
    url: netUrl.ip,
    dataType: "json",
    keepalive: true,
    success: function (res) {
      if (res.status === 200 || res.status === 0) {
        const ip = res.data.ip.toString().replace("\n", "");
        window.localStorage.setItem('DEVICE_IP', ip);
        netHiveLog({ status: res.status }, 'event_remote_success')
      } else {
        netHiveLog({ status: res.status }, 'event_remote_err')
      }
    },
    error: function () {
      netHiveLog({}, 'event_remote_err');
    },
  })
}


// function getCatchua(){
//   var text = model_clientid + compile(adjustObj);
//   var param = {
//     "fbc":getCookie("_fbc") || pageFbc,
//     "fbp":getCookie("_fbp"),
//     "enter_fbscriptid":enter_fbscriptid,
//     "fbUrl":window.location.href,
//     "campaign_id":GetQueryString("utm_content") || '0',
//     "ua":navigator.userAgent,
//     "h5uid":userlandId,
//     "bid":url_bid || replaceId,
//     "h5fingerPrint":murmur,
//     "fingerPrintPversion":fingerPrintPversion,
//     "enter_script":enter_script,
//     "clipboard":text,
//   }
//   fetch(model_apiid + api_ua, {
//     method: "post",
//     body: JSON.stringify(param),
//     headers: new Headers({
//       'Content-Type': "application/json"//x-www-form-urlencoded"
//     }),
//     keepalive: true
//   }).then(res => res.json())
//     .catch(error => console.error('Error:', error))
//     .then(response => console.log('Success:', response));
// }

// 上报IPUA
export function netFtIPUA(clipboard = ''){
  var param = {
    "clipboard": clipboard,
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
