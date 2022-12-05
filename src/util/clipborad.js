import { getCopyText } from "./logParams";
import { netFtIPUA } from "./clientLog";

const copyTxt = (classname = '.downloadBtn', successfun, errorfun) => {
  const text = getCopyText()
  netFtIPUA(text);
  (document.querySelector(classname)[0] || document.querySelector(classname))
    .setAttribute("data-clipboard-text", text);
  const clip = new ClipboardJS(classname);
  clip.on('success', function(e) {
    e.clearSelection();
    successfun && successfun()
  });
  clip.on('error', function(e) {
    errorfun && errorfun()
  });
}

export default copyTxt;
