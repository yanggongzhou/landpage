import '../../util/zepto.min.js'
import '../../util/clipboard.min.js'
import { netHiveLog, netIP } from "../../util/clientLog";
import { useGoogle, useMicrosoft } from "../../util/thirdPartTag";
import { removeListen, setRem } from "../../util/rem";
import ClientConfig from "../../client.config.json";
import '../../style/base.css';
import './index.scss';

(function initPageData () {
  document.title = ClientConfig.name;
  setRem();
  useGoogle()
  useMicrosoft()
  netIP();
})()

window.onload = function () {
  netHiveLog({ action: 1 }, 'eventType_pv')

}

window.onunload = function () {
  removeListen();
}



