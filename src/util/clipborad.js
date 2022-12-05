import { getCopyText } from "./logParams";
import { netFtIPUA } from "./clientLog";

const copyTxt = (classname = '.downloadBtn', successfun, errorfun) => {
  const text = getCopyText()
  netFtIPUA(text);
  $(classname).attr("data-clipboard-text", text);
  const clip = new ClipboardJS(classname);
  clip.on('success', function(e) {
    // console.info('Action:', e.action);
    // console.info('Text:', e.text);
    // console.info('Trigger:', e.trigger);
    e.clearSelection();
    successfun && successfun()
  });

  clip.on('error', function(e) {
    // console.error('Action:', e.action);
    // console.error('Trigger:', e.trigger);
    errorfun && errorfun()
  });
}

export default copyTxt;
