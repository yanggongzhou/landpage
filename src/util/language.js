import { GetQueryString } from "./other";

const languagePack = {
  "To See The Full Vision": {
    "cn": "解鎖更多精彩內容",
    "en": "To See The Full Vision",
    "es": "Ver la Versión Completa",
    "in": "Lihat versi lengkap",
    "tl": "Upang makita ang full version",
    "th": "ดูเวอร์ชันเต็ม",
    "ko": "풀버전 보기",
  },
  ">>> Tap for more exciting contents": {
    "cn": ">>點擊繼續閱讀精彩內容<<",
    "en": ">>Tap for more exciting contents<<",
    "es": ">>Toca para ver más contenido emocionante<<",
    "in": ">>Ketuk untuk konten yang lebih menarik<<",
    "tl": ">>I-tap para sa higit pang kapana-panabik na content<<",
    "th": ">>กดเพื่อเนื้อหาที่น่าสนใจเพิ่มเติม<<",
    "ko": ">>더 많은 흥미로운 콘텐츠를 보려면 탭하세요<<",
  },
  "Tap to be redirected, if fails you can download the app and search for number: xxxx to continue reading": {
    "cn": "點擊進入應用，失敗時可下載APP繼續閱讀 <br/>下載APP在書城搜索書號: xxxx 就可以找到後續內容哦",
    "en": "Tap to be redirected, if fails you can download the app and search for number: xxxx to continue reading",
    "es": "Toca para ser redirigido, si aparece error, puede descargar la aplicación y buscar el número: xxxx para continuar leyendo",
    "in": "Ketuk untuk dialihkan, jika gagal Anda dapat mengunduh aplikasi dan mencari nomor: xxxx untuk melanjutkan membaca",
    "tl": "I-tap para ma-redirect, kung mag-fail ay maaaring mong i-download ang app at i-search ang numero: xxxx upang magpatuloy sa pagbabasa",
    "th": "กดเพื่อเชื่อมต่อใหม่ หากล้มเหลว คุณสามารถดาวน์โหลดแอปนี้ และค้นหาหมายเลข: xxxx เพื่ออ่านต่อ",
    "ko": "전송받기 하려면 탭하세요. 실패할 경우 앱을 다운로드해서 숫자 xxxx를 검색하면 계속 읽을 수 있습니다.",
  },
}

export function languageSwitching() {
  const languageType = GetQueryString('language') || PlatformConfig.language
  if (!languageType) return
  var asynHtml = [
    { 'class': '.downloadText', 'text': '>>> Tap for more exciting contents' },
    { 'class': '.downloadp', 'text': 'Tap to be redirected, if fails you can download the app and search for number: xxxx to continue reading' },
  ]
  asynHtml.forEach(function (obj, index) {
    if (languagePack[obj.text][languageType]) {
      document.querySelector(obj.class).innerHTML = languagePack[obj.text][languageType].replace(/x_x/ig, bookNo);
    }
  })
  const downloadpDom = document.querySelector('.downloadp');
  if (PlatformConfig.logParam.bline === 'ft') {
    document.querySelector('.downloadText').innerText = ">>點擊繼續閱讀精彩內容<<"
  }
  if (!bookNo) {
    downloadpDom.setAttribute('style', 'display: none')
  } else {
    downloadpDom.innerHTML = PlatformConfig.logParam.bline === 'ft' ?
      '點擊進入應用，失敗時可下載APP繼續閱讀 <br/>下載APP在書城搜索書號: <span class="biaoji">' + '{{land_info.bookNo}}' + '</span> 就可以找到後續內容哦' :
      downloadpDom.textContent.replace('xxxx', `<span class="biaoji"> ${ bookNo } </span>`);
  }
}
