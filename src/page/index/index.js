import { netHiveLog, netIP } from "../../util/clientLog";
import '../../assets/css/base.css';
import './index.scss';

netIP();

window.onload = function () {
  netHiveLog({ action: 1 }, 'eventType_pv')
}



