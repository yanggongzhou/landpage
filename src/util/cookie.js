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
// 写入cookie
export function setCookie(name,value) {
  var Days = 60;
  var exp = new Date();
  exp.setTime(exp.getTime() + Days*24*60*60*1000);
  document.cookie = name + "=" + value + ";expires=" + exp.toGMTString();
}

export function delCookie(name) {
  var exp = new Date();
  exp.setTime(exp.getTime() - 1);
  var cval=getCookie(name);
  if(cval!=null)
    document.cookie= name + "="+cval+";expires="+exp.toGMTString();
}
