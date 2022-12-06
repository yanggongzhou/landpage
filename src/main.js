import { netFtIPUA, netHiveLog, netIP, netIPUA } from "./util/clientLog";
import copyTxt from "./util/clipborad";
import './index.scss';
import { isAndroid, isIos } from "./util/other";
import { getCookie, setCookie } from "./util/cookie";
import { addFingerprint } from "./util/fingerprint";
import getChapterInfo from "./util/getChapterInfo";
import { throttle } from "./util/throttle-debounce";
// 获取IP
netIP();
// 曝光
netHiveLog( `luodiyelogPV_init_${PlatformConfig.logId}`, {action: 1 })
window.allowPvIPUA = true;
// 下载事件
const onDownload = throttle((e) => {
  console.log('e------------------------->', e.target.className, e.target.dataset.name)
  const domName = e.target.dataset.name
  window.allowPvIPUA = false;
  if (['1', '2', '3', '4'].indexOf(model_productid) !== -1) {
    netFtIPUA()
  } else {
    netIPUA()
  }
  const downloadUrl = isIos ? PlatformConfig.ios.shop : PlatformConfig.android.shop;
  copyTxt(e.target.className, () => {
    window.location.href = downloadUrl
    netHiveLog( `findBug_${PlatformConfig.logId}_successjump`, { action: 2 })
  });
  netHiveLog( `luodiyelogClick_click_${PlatformConfig.logId}_${domName}`, {action: 2})
  try {
    if(enter_script === '3'){
      ttq.track('ClickButton')
    } else {
      PlatformConfig.logParam.bline === 'ft' ? fbq("track", "FindLocation") : fbq("track", "FindLocation", { external_id : window.adjustObj.h5fingerPrint});
    }
  } catch (e) {}
}, 500)
// 下载按钮
$(".downloadBtn, .downloadText, .handImg, .bookName, .imgTitle, .topImg, .topName, .h1Title").on('click', onDownload)

// 关闭推荐弹框
$(".mask, .popupClose").on('click', (e) => {
  $("#popup").attr("style", "display: none");
  $("body").removeAttr("style");

  e.preventDefault();
})

// 展示A书还是B书
const isShowA = () => {
  const cookieData = getCookie(PlatformConfig.productName);
  if(!cookieData) {
    setCookie(PlatformConfig.productName, JSON.stringify({ expressTime: new Date().getTime() }))
    return true;
  } else {
    const expressTime = JSON.parse(cookieData).expressTime;
    const nowTime = new Date().getTime();
    return (isIos && nowTime - expressTime < 10 * 60 * 1000) || (isAndroid && nowTime - expressTime < 5 * 60 * 1000);
  }
}

window.onload = function () {
  document.title = $(".imgTitle").text() || PlatformConfig.name
  addFingerprint(); // 指纹
  getChapterInfo(); // 获取当前章节位置
  if (!isShowA()) {
    setTimeout(() => {
      $("#popup").attr("style", "display: flex");
      $("body").attr("style", "overflow: hidden");
      netHiveLog( `Rec_window_view_${PlatformConfig.logId}`)
    }, 5000)
  }
}


