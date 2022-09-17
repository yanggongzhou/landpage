import axios from 'axios'
import { getLogParams } from './logParams';
import ClientConfig from '../client.config.json'

// 大数据打点
export const netHiveLog = (data = {}, eventType = '') => {
  const logData = getLogParams(data, eventType);
  axios({ method: 'get', url: ClientConfig.netUrl.hive, params: { json: JSON.stringify(logData) } })
}

// 获取Ip
export const netIP = async () => {
  window.localStorage.setItem('DEVICE_IP', '');
  return new Promise((resolve, reject) => {
    axios({ method: 'get', url: ClientConfig.netUrl.ip })
      .then((res) => {
        if (res.status === 200 || res.status === 0) {
          const ip = res.data.ip.toString().replace("\n", "");
          window.localStorage.setItem('DEVICE_IP', ip);
          resolve(ip)
        }
        netHiveLog({ status: res.status }, 'event_remote_success')
      })
      .catch(() => {
        netHiveLog({}, 'event_remote_err');
        resolve("0.0.0.0");
      })
  })
}
