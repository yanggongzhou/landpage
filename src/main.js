import { netHiveLog, netIP } from "./util/clientLog";
import copyTxt from "./util/clipborad";
import './index.scss';

netIP();
// 下载按钮
$(".downloadBtn").on('click', () => {
  copyTxt('.downloadBtn')
})

// 关闭推荐弹框
$(".mask, .popupClose").on('click', (e) => {
  $("#popup").attr("style", "display: none");
  e.preventDefault();
})


window.onload = function () {
  netHiveLog({ action: 1 }, 'eventType_pv')

  // $(".downloadBtn").on('click', () => {
  //   copyTxt('.downloadBtn')
  // })

}



