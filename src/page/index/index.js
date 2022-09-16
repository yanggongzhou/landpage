import '../../style/base.css';
import './index.scss';
import './app.config';
import {
    sendToApp,
    getLocationParams
} from "../../util";


class Index {
    constructor(token) {
        this.token = token;
        this.chargeList = [];
        this.params = {};
    }

    init() {
        // this.initData();
        this.initRender();
    }
    initData() {
        $.ajax({
            url: 'http://192.168.31.129:3000/user/getInfo',
            type: 'GET',
            data: {},
            dataType: 'json',
            success: (res) => {
                console.log(res);
                this.chargeList = res || [];
            },
            error: function (err) {
                console.log(err);
            }
        });
    }

    initRender() {
        const html = $('#temp').html();
        $('.wrapper').append(html);
    }
}


window.onload = function () {
  const params = getLocationParams();
  let token = '';
  if (params && params.token) {
    token = params.token;
  }
  new Index(token).init();
};
