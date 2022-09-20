import { netHiveLog, netIP } from "./util/clientLog";
import copyTxt from "./util/clipborad";
import './assets/css/base.css';
import './index.scss';

netIP();

$(".downloadBtn").on('click', () => {
  copyTxt('.downloadBtn')
})

window.onload = function () {
  netHiveLog({ action: 1 }, 'eventType_pv')

  // $(".downloadBtn").on('click', () => {
  //   copyTxt('.downloadBtn')
  // })
}



