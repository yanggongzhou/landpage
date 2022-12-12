import { netFtIPUA, netHiveLog, netIP, netIPUA } from "./util/clientLog";
import copyTxt from "./util/clipborad";
import './index.scss';
import { isAndroid, isIos } from "./util/other";
import { getCookie, setCookie } from "./util/cookie";
import { addFingerprint } from "./util/fingerprint";
import getChapterInfo from "./util/getChapterInfo";
import { throttle } from "./util/throttle-debounce";
import { languageSwitching } from "./util/language";
import defaultImg from './assets/images/default.png';
import { getAdjustParams } from "./util/logParams";

// 获取IP
netIP();
// 曝光
netHiveLog( `luodiyelogPV_init_${PlatformConfig.logId}`, {action: 1 })
window.allowPvIPUA = true;
// 下载事件
const onDownload = throttle((e) => {
  const domName = e.target.dataset.name
  // 点击跳转时，如果是从推荐弹窗的书籍点击跳转的，打点带的参数书籍ID bookId为推荐书籍的， 剪切板还是A书的
  if(domName === 'Recommend') {
    netHiveLog( `luodiyelogClick_click_${PlatformConfig.logId}_${domName}`, { action: 2, bookId: e.target.dataset.bookid })
  } else {
    netHiveLog( `luodiyelogClick_click_${PlatformConfig.logId}_${domName}`, { action: 2 })
  }
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
  const { bid } = getAdjustParams();
  if (!bid) return;
  const cookieData = getCookie(`dz_ldy_${bid}`);
  try {
    if(!cookieData) {
      setCookie( `dz_ldy_${bid}`, JSON.stringify({
        expressTime: new Date().getTime(),
      }))
      return true;
    } else {
      const expressTime = JSON.parse(cookieData).expressTime;
      const nowTime = new Date().getTime();
      return (isIos && nowTime - expressTime < 10 * 60 * 1000) || (isAndroid && nowTime - expressTime < 5 * 60 * 1000);
    }
  } catch (e) {
  }
  return true;
}

// 关闭推荐弹框
const showPopup = () => {
  document.getElementById('popup').setAttribute("style", "display: flex")
  document.body.setAttribute("style", "overflow: hidden")
  netHiveLog( `Rec_window_view_${PlatformConfig.logId}`)
}

// 渲染推荐书籍
const printRecommendBookDom = () => {
  const popupImgDom = document.getElementById('popupImgDom');
  const recommendDom = popup_books ? JSON.parse(popup_books).map((item, index) => {
    return `<figure class="popupImgItem">
      <div class="popupItemMark${index}" data-bookid="${item.bookId}" data-name="Recommend"></div>
      <img class="popupItemImg" src="${item.cover}" alt="">
      <div class="popupImgBlur"></div>
      <figcaption class="title">${item.bookName}</figcaption>
    </figure>`;
  }).join('') : ''
  if (!recommendDom) return;
  popupImgDom.innerHTML = recommendDom;
  // 推荐书籍下载
  setTimeout(() => {
    // 推荐书籍下载
    const recommendDom0 = document.querySelector(".popupItemMark0")
    const recommendDom1 = document.querySelector(".popupItemMark1")
    const recommendDom2 = document.querySelector(".popupItemMark2")
    recommendDom0.onclick = onDownload;
    recommendDom1.onclick = onDownload;
    recommendDom2.onclick = onDownload;

    const imgDom = document.querySelectorAll(".popupItemImg")
    for (let i = 0; i < imgDom.length; i ++) {
      imgDom[i].onerror = imgErr;
    }
  }, 0)
}
// 兜底图
const imgErr = (e) => {
  e.target.src = defaultImg
}

document.title = document.querySelector(".imgTitle").textContent || PlatformConfig.name
languageSwitching(); // 设置语言
addFingerprint(); // 指纹
printRecommendBookDom(); // 渲染推荐书籍
// 设置主题色
document.querySelector('.downloadText').setAttribute('style', `color: ${PlatformConfig.color}`)
document.querySelector('.imgTitle').setAttribute('style', `color: ${PlatformConfig.color}`)
// 下载按钮
const downloadDomArr = document.querySelectorAll(".downloadBtn, .downloadText, .handImg, .bookName, .imgTitle, .topImg, .topName, .h1Title")
for (let i = 0; i < downloadDomArr.length; i ++) {
  downloadDomArr[i].onclick = onDownload;
}
// 关闭推荐弹框
const popupCloseDomArr = document.querySelectorAll(".mask, .popupClose")
for (let i = 0; i < popupCloseDomArr.length; i ++) {
  popupCloseDomArr[i].onclick = function (e) {
    document.getElementById('popup').setAttribute("style", "display: none")
    document.body.removeAttribute("style")
    e.preventDefault();
  }
}

if (!isShowA()) {
  setTimeout(() => {
    showPopup()
  }, 5000)
}

getChapterInfo(); // 监听当前章节位置
window.onload = function () {
  getChapterInfo(); // 监听当前章节位置
}

