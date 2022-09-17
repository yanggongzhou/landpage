import ClientConfig from '../client.config.json';
const { type = "vertical", horizontalWidth = 1624, verticalWidth = 750 } = ClientConfig.rem || {};

// 设置REM
export const setRem = () => {
  if (type === 'horizontal') {
    recalc()
  } else {
    document.documentElement.style.fontSize = 100 * (document.documentElement.clientWidth / verticalWidth) + 'px'
  }
}

export const recalc = () => {
  const clientWidth = document.documentElement.clientWidth
  const clientHeight = document.documentElement.clientHeight
  if (clientHeight < clientWidth) {
    // console.log('横屏状态！')
    document.documentElement.style.fontSize = 100 * (clientWidth / horizontalWidth) + 'px'
  } else {
    // console.log('竖屏状态！')
    document.documentElement.style.fontSize = 100 * (clientWidth / verticalWidth) + 'px'
  }
  listen();
}

export const listen = () => {
  if (!document.addEventListener || type === "vertical") return
  const resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize'
  window.addEventListener(resizeEvt, recalc, false)
  document.addEventListener('DOMContentLoaded', recalc, false)
}

export const removeListen = () => {
  if (!document.addEventListener || type === "vertical") return
  const resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize'
  window.removeEventListener(resizeEvt, recalc, false)
  document.removeEventListener('DOMContentLoaded', recalc, false)
}
