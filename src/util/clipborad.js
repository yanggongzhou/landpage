import { getCopyText } from "./logParams";

const copyTxt = (classname = '.downloadBtn') => {
  const text = getCopyText()
  $(classname).attr("data-clipboard-text", text);
  const clip = new ClipboardJS(classname);
  clip.on('success', function(e) {
    console.info('Action:', e.action);
    console.info('Text:', e.text);
    console.info('Trigger:', e.trigger);
    e.clearSelection();
  });

  clip.on('error', function(e) {
    console.error('Action:', e.action);
    console.error('Trigger:', e.trigger);
  });
}

export default copyTxt;
