import { netFtIPUA, netHiveLog, netIP, netIPUA } from "./util/clientLog";
import copyTxt from "./util/clipborad";
import './index.scss';
import { isIos } from "./util/other";
import { addFingerprint } from "./util/fingerprint";
import getChapterInfo from "./util/getChapterInfo";
import { throttle } from "./util/throttle-debounce";
import { languageSwitching } from "./util/language";
import { getCopyText } from "./util/logParams";
// 获取IP
netIP();
// 曝光
netHiveLog( `luodiyelogPV_init_${PlatformConfig.logId}`, {action: 1 })
window.allowPvIPUA = true;
// 下载事件
const onDownload = throttle((e) => {
  const domName = e.target.dataset.name
  window.allowPvIPUA = false;
  if (['1', '2', '3', '4'].indexOf(PlatformConfig.id) !== -1) {
    netFtIPUA()
  } else {
    netIPUA()
  }
  let downloadUrl = '';
  if (isIos) {
    if (PlatformConfig.id === '5' || PlatformConfig.id === '4') { // xsydb ios webfic
      downloadUrl = PlatformConfig.ios.deeplink + getCopyText()
    } else {
      downloadUrl = PlatformConfig.ios.shop;
    }
  } else {
    downloadUrl = PlatformConfig.android.shop
  }

  copyTxt(e.target.className, () => {
    window.location.href = downloadUrl
    netHiveLog( `findBug_${PlatformConfig.logId}_successjump`, { action: 2 })
  });
  netHiveLog( `luodiyelogClick_click_${PlatformConfig.logId}_${domName}`, { action: 2 })
  try {
    if(enter_script === '3'){
      ttq.track('ClickButton')
    } else {
      PlatformConfig.logParam.bline === 'ft' ? fbq("track", "FindLocation") : fbq("track", "FindLocation", { external_id : window.adjustObj.h5fingerPrint});
    }
  } catch (e) {}
}, 500)

document.title = document.querySelector(".imgTitle").textContent || PlatformConfig.name
languageSwitching(); // 设置语言
addFingerprint(); // 指纹
// 设置主题色
document.querySelector('.downloadText').setAttribute('style', `color: ${PlatformConfig.color}`)
document.querySelector('.imgTitle').setAttribute('style', `color: ${PlatformConfig.color}`)
// 下载按钮
const downloadDomArr = document.querySelectorAll(".downloadBtn, .downloadText, .handImg, .bookName, .imgTitle, .topImg, .topName, .h1Title")
for (let i = 0; i < downloadDomArr.length; i ++) {
  downloadDomArr[i].onclick = onDownload;
}

getChapterInfo(); // 监听当前章节位置
window.onload = function () {
  getChapterInfo(); // 监听当前章节位置
}

