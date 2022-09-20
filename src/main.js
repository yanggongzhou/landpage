import { netHiveLog, netIP } from "./util/clientLog";
import './assets/css/base.css';
import './index.scss';
import copyTxt from "./util/clipborad";

netIP();

window.onload = function () {
  netHiveLog({ action: 1 }, 'eventType_pv')

  $(".downloadBtn").on('click', () => {
    copyTxt('.downloadBtn')
  })
}



