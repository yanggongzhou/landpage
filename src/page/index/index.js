import '../../util/vue.min.js'
import { netHiveLog, netIP } from "../../util/clientLog";
import { useGoogle, useMicrosoft } from "../../util/thirdPartTag";
import { removeListen, setRem } from "../../util/rem";
import ClientConfig from "../../client.config.json";
import sensors from '../../util/sentry'
import vueclipboard from 'vue-clipboard2'
import '../../style/base.css';
import './index.scss';

Vue.use(vueclipboard)
Vue.prototype.$sensors = sensors;

var vm = new Vue({
  el: 'App',
  data() {
    return {
      msg: 'Hello'
    }
  },
  async beforeCreate () {
    await netIP();
    useGoogle();
    useMicrosoft();
  },
  async mounted () {
    console.error('vue-------------->', this.msg)
    await netHiveLog({ action: 1 }, 'eventType_pv')
    this.initPageData();
  },
  methods: {
    // 初始化
    initPageData () {
      document.title = ClientConfig.name;
      setRem();
    }
  },
  beforeDestroy () {
    removeListen();
    this.$sensors.logout();
  },
})



