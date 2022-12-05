import { getCookie } from "./cookie";
import { netFtIPUA, netHiveLog, netIPUA } from "./clientLog";
// 指纹

export const addFingerprint = () => {
  Fingerprint2.get({ excludes: { enumerateDevices: true, deviceMemory: true, audio: true } }, function (components) {
    const values = components.map(function (component, index) {
      return component.value;
    });
    const murmur = PlatformConfig.productName + '_' + Fingerprint2.x64hash128(values.join(""), 31);
    window.adjustObj.h5fingerPrint = murmur;
    if(enter_script !== '3'){
      fbq('init' , enter_fbscriptid , { external_id : murmur});
      fbq('track', 'PageView', { external_id : murmur});
      searchFbp(getCookie("_fbp"))
    }else{
      startLogPvHandle()
    }
  });
}

function searchFbp(status){
  window.fbcSearcchTimer = setInterval(function() {
    console.log('开始轮询',status,document.cookie);
    if(document.cookie.indexOf("_fbp") == -1)return
    console.log('轮询结束');
    clearTimer()
    startLogPvHandle()
  }, 100);
  window.fbcSearcchTimer2 = setTimeout(function() {
    clearInterval(fbcSearcchTimer)
    console.error('结束');
    clearTimer()
    startLogPvHandle()
  }, 3500);
  function clearTimer(){
    clearInterval(window.fbcSearcchTimer)&&clearInterval(fbcSearcchTimer)
    clearInterval(window.fbcSearcchTimer2)&&clearInterval(fbcSearcchTimer2)
  }
}

function startLogPvHandle() {
  netHiveLog({ action: 1 }, 'luodiyelogPV_comein_' + PlatformConfig.logId)
  // 立即点击不会上报ua
  if(!window.allowPvIPUA) return
  // 统一下分是否进行上报
  if (['1', '2', '3', '4'].indexOf(model_productid) !== -1) {
    netFtIPUA()
  } else {
    netIPUA()
  }
}
