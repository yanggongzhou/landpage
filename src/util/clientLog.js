import { getLogParams } from './logParams';

// 大数据打点
export const netHiveLog = (data = {}, eventType = '') => {
  const logData = getLogParams(data, eventType);
  $.ajax({
    type: "POST",
    url: PlatformConfig.netUrl.hive,
    dataType: "json",
    contentType: "application/json;charset=UTF-8",
    data: { json: JSON.stringify(logData) }})
}

// 获取Ip
export const netIP = () => {
  window.localStorage.setItem('DEVICE_IP', '');
  $.ajax({
    type: "get",
    url: PlatformConfig.netUrl.ip,
    dataType: "json",
    contentType: "application/json;charset=UTF-8",
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
