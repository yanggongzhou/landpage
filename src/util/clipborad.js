import { getCopyText } from "./logParams";

const copyTxt = (classname = 'downloadBtn', callback) => {
  let isJumpToStore = false;
  const _classname = `.${classname}`;
  document.querySelector(_classname)
    .setAttribute("data-clipboard-text", getCopyText());
  const clip = new ClipboardJS(_classname);
  clip.on('success', function(e) {
    e.clearSelection();
    if (isJumpToStore) return
    callback && callback()
    isJumpToStore = true
    clearTimeout(timer);
  });
  clip.on('error', function() {
    if (isJumpToStore) return
    callback && callback()
    isJumpToStore = true
    clearTimeout(timer);
  });
  // 300 ms之后ClipboardJS没有回调就执行, 兼容部分机型ClipboardJS没有回调
  let timer = setTimeout(function(){
    if (isJumpToStore) return
    callback && callback()
    isJumpToStore = true
  }, 300);
}

export default copyTxt;
