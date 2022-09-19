import { getLogParams } from './logParams';
import ClientConfig from '../client.config.json'

// 大数据打点
export const netHiveLog = (data = {}, eventType = '') => {
  const logData = getLogParams(data, eventType);
  $.ajax({
    type: "POST",
    url: ClientConfig.netUrl.hive,
    dataType: "json",
    contentType: "application/json;charset=UTF-8",
    data: { json: JSON.stringify(logData) }})
}

// 获取Ip
export const netIP = async () => {
  window.localStorage.setItem('DEVICE_IP', '');


  return new Promise((resolve, reject) => {
    $.ajax({
      type: "get",
      url: ClientConfig.netUrl.ip,
      dataType: "json",
      contentType: "application/json;charset=UTF-8",
      success: function (res) {
        if (res.status === 200 || res.status === 0) {
          const ip = res.data.ip.toString().replace("\n", "");
          window.localStorage.setItem('DEVICE_IP', ip);
          resolve(ip)
          netHiveLog({ status: res.status }, 'event_remote_success')
        } else {
          netHiveLog({ status: res.status }, 'event_remote_err')
          resolve("0.0.0.0");
        }
      },
      error: function (err) {
        netHiveLog({}, 'event_remote_err');
        resolve("0.0.0.0");
      },
    })
  })
}
