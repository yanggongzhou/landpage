import { netFtIPUA, netHiveLog, netIP, netIPUA } from "./util/clientLog";
import copyTxt from "./util/clipborad";
import './index.scss';
import { isAndroid, isIos } from "./util/other";
import { getCookie, setCookie } from "./util/cookie";
import { addFingerprint } from "./util/fingerprint";
import getChapterInfo from "./util/getChapterInfo";
import { throttle } from "./util/throttle-debounce";
import { languageSwitching } from "./util/language";
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
  const cookieData = getCookie(PlatformConfig.productName);
  try {
    if(!cookieData || JSON.parse(cookieData).pathname !== window.location.pathname ) {
      setCookie(PlatformConfig.productName, JSON.stringify({
        expressTime: new Date().getTime(),
        pathname: window.location.pathname
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
  const recommendDom = popup_books ? JSON.parse(popup_books).map(item => {
    return `<figure class="popupImgItem">
      <div class="popupItemMark" data-bookid="${item.bookId}" data-name="Recommend"></div>
      <img src="${item.cover}" alt="">
      <figcaption class="title">${item.bookName}</figcaption>
    </figure>`;
  }).join('') : ''
  if (!recommendDom) return;
  popupImgDom.innerHTML = recommendDom;
  // 推荐书籍下载
  setTimeout(() => {
    // 推荐书籍下载
    const recommendDomArr = document.querySelectorAll(".popupImgItem")
    for (let i = 0; i < recommendDomArr.length; i ++) {
      recommendDomArr[i].onclick = onDownload;
    }
  }, 0)
}

document.title = document.querySelector(".imgTitle").textContent || PlatformConfig.name
languageSwitching(); // 设置语言
addFingerprint(); // 指纹
getChapterInfo(); // 监听当前章节位置
printRecommendBookDom(); // 渲染推荐书籍
// 设置主题色
document.querySelector('.downloadText').setAttribute('style', `color: ${PlatformConfig.color}`)
document.querySelector('.imgTitle').setAttribute('style', `color: ${PlatformConfig.color}`)

window.onload = function () {
  if (!isShowA()) {
    setTimeout(() => {
      showPopup()
    }, 5000)
  }
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
}

