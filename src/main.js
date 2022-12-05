import { netHiveLog, netIP } from "./util/clientLog";
import copyTxt from "./util/clipborad";
import './index.scss';
import { isIos } from "./util/other";
import { getCookie, setCookie } from "./util/cookie";

netIP();

// 下载按钮
$(".downloadBtn").on('click', () => {
  const downloadUrl = isIos ? PlatformConfig.ios.shop : PlatformConfig.android.shop;
  copyTxt('.downloadBtn',
    () => {
      window.location.href = downloadUrl
    },
    () => {
      window.location.href = downloadUrl
    })
})

// 关闭推荐弹框
$(".mask, .popupClose").on('click', (e) => {
  $("#popup").attr("style", "display: none");
  $("body").removeAttr("style");
  e.preventDefault();
})

window.onload = function () {
  netHiveLog({ action: 1 }, 'eventType_pv')

  // $(".downloadBtn").on('click', () => {
  //   copyTxt('.downloadBtn')
  // })

  const cookieData = getCookie(PlatformConfig.productName);
  if(!cookieData) {
    setCookie(PlatformConfig.productName, JSON.stringify({ time: new Date().getTime(), sss: 'ssss' }))
  } else {
    const expressTime = JSON.parse(cookieData).time;
    const nowTime = new Date().getTime();
    if (nowTime - expressTime >= 10 * 60 * 1000) {
      setTimeout(() => {
        $("#popup").attr("style", "display: flex");
        $("body").attr("style", "overflow: hidden");
      }, 2000)
    }
  }

}



