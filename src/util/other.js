export function randomString() {
  const len = 16;
  const $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
  /** **默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
  const maxPos = $chars.length;
  let pwd = '';
  for (let i = 0; i < len; i++) {
    pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return pwd;
}

// 获取地址栏参数
export function GetQueryString(name) {
  const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  const r = window.location.search.substr(1).match(reg);
  if (r !== null) {
    return unescape(r[ 2 ]);
  }
}

// 获取cookie
export function getCookie(name, cookieStr) {
  const strcookie = cookieStr || document.cookie; // 获取cookie字符串
  const arrcookie = strcookie.split("; "); // 分割
  // 遍历匹配
  for (let i = 0; i < arrcookie.length; i++) {
    const arr = arrcookie[ i ].split("=");
    if (arr[ 0 ] === name) {
      return arr[ 1 ];
    }
  }
  return ''
}

// 判断安卓ios
const u = navigator.userAgent;
export const isIos = (!!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) || (!!u.match(/iPhone|mac|iPod|iPad|ios/i));
export const isAndroid = (!!u.match(/AppleWebKit.*Mobile.*/)) && (u.indexOf('Android') > -1 || u.indexOf('Adr') > -1);

export function compile(code) {
  code = JSON.stringify(code);
  const res = [];
  code.split("").forEach((c, i) => {
    res.push((code.charCodeAt(i) + 2).toString(16));
  });
  return res.join("");
}
