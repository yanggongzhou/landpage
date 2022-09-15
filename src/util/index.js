//获取url链接参数
export const getLocationParams = (queryString) => {  // 获取 url 请求参数
    console.error('qwqwqwqw')
    let result = {};
    if (typeof (queryString) === 'object') {
        return queryString;
    }
    let params = queryString || window.location.search;
    if(!params) return result;

    params = params.replace(/['"<>;?]/g, '');
    let _pairs = params.split('&');
    let jsonParamsObj={};
    _pairs.forEach((item) => {
        let array = item.split('=');
        if (array[0].toString() === 'json') {
            jsonParamsObj = JSON.parse(array[1]);
        } else {
            result[decodeURIComponent(array[0])] = decodeURIComponent(array[1]);
        }
    });
    result = Object.assign({}, jsonParamsObj, result);
    return result;
};

export  const isWeiXin =()=>{
    return (/MicroMessenger/ig).test(navigator.userAgent)
};
export  const isQQ =()=>{
    return (/qq/ig).test(navigator.userAgent) && !isWeiXin()
};
export  const isWeibo =()=>{
    return (/WeiBo/ig).test(navigator.userAgent)
};
export  const isAndroid =()=>{
    return !!navigator.userAgent.match(/android/ig)
};

export  const isIos =()=>{
    return !!navigator.userAgent.match(/iPhone|iPad|iPod|iOS/ig);
};

export  const sendToApp =(params)=>{
    if(isIos()){
        window&& window.webkit&&window.webkit.messageHandlers.sendToApp.postMessage(params);
    }else {
        console.log(window);
        window&&window.sendToApp.charge(params)
    }
};

