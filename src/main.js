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

// 关闭推荐弹框
const closePopup = (e) => {
  document.getElementById('popup').setAttribute("style", "display: none")
  document.body.removeAttribute("style")
  e.preventDefault();
}
// 关闭推荐弹框
const showPopup = () => {
  document.getElementById('popup').setAttribute("style", "display: flex")
  document.body.setAttribute("style", "overflow: hidden")
  netHiveLog( `Rec_window_view_${PlatformConfig.logId}`)
}

window.onload = function () {
  document.title = document.querySelector(".imgTitle").textContent || PlatformConfig.name
  addFingerprint(); // 指纹
  getChapterInfo(); // 获取当前章节位置
  if (!isShowA()) {
    setTimeout(() => {
      showPopup()
    }, 5000)
  }
  // 下载按钮
  const downloadDomArr = document.querySelectorAll(".downloadBtn, .downloadText, .handImg, .bookName, .imgTitle, .topImg, .topName, .h1Title")
  for (let i = 0; i < downloadDomArr.length; i ++) {
    downloadDomArr[i].addEventListener('click', onDownload)
  }
  // 关闭推荐弹框
  const popupCloseDomArr = document.querySelectorAll(".mask, .popupClose")
  for (let i = 0; i < popupCloseDomArr.length; i ++) {
    popupCloseDomArr[i].addEventListener('click', closePopup)
  }
}
window.onbeforeunload = function () {
  const downloadDomArr = document.querySelectorAll(".downloadBtn, .downloadText, .handImg, .bookName, .imgTitle, .topImg, .topName, .h1Title")
  for (let i = 0; i < downloadDomArr.length; i ++) {
    downloadDomArr[i].removeEventListener('click', onDownload)
  }
  // 关闭推荐弹框
  const popupCloseDomArr = document.querySelectorAll(".mask, .popupClose")
  for (let i = 0; i < popupCloseDomArr.length; i ++) {
    popupCloseDomArr[i].removeEventListener('click', closePopup)
  }
}

