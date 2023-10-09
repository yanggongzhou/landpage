import { getCopyText } from "./logParams";

const copyExecCommand = (text) => {
  try {
    var _textArea = document.createElement('textArea')
    _textArea.value = text
    _textArea.style.width = "0px";
    _textArea.style.height = "0px";
    _textArea.style.clip = "rect(0, 0, 0, 0)";
    _textArea.style.position = 'fixed'
    _textArea.style.left = '-99px'
    _textArea.style.top = '-99px'
    _textArea.setAttribute('readonly', 'readonly')
    document.body.appendChild(_textArea)
    _textArea.select()
    var successful = document.execCommand('copy')
    if (!successful) {
      console.error("document.execCommand was unsuccessful");
    }
    document.body.removeChild(_textArea);
  } catch (e) {
    // trying IE specific stuff
    console.error("document.execCommand was unsuccessful", e)
    try {
      window.clipboardData && window.clipboardData.setData("text", text);
    } catch (err) {
      console.error("window.clipboardData was unsuccessful", err)
    }
  }
};

const copyText = (fn) => {
  const text = getCopyText();
  if (navigator.clipboard && navigator.permissions) {
    navigator.clipboard.writeText(text)
      .catch((e) => {
        console.error("navigator.clipboard", e)
        copyExecCommand()
      }).finally(() => { fn && fn() })
  } else {
    copyExecCommand(text)
    fn && fn();
  }
}

export default copyText;
