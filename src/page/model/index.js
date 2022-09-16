function getCatchua(){
    var param = {
        "fbc":getCookie("_fbc") || pageFbc,
        "fbp":getCookie("_fbp"),
        "enter_fbscriptid":enter_fbscriptid,
        "fbUrl":window.location.href,
        "campaign_id":GetQueryString("utm_content") || '0',
        "ua":navigator.userAgent,
        "h5uid":userlandId,
        "bid":url_bid || replaceId,
        "h5fingerPrint":murmur,
        "fingerPrintPversion":fingerPrintPversion,
        "enter_script":enter_script,
    }
    $.ajax({
        type: "POST",
        url: model_apiid + api_ua,
        dataType: "json",
        contentType: "application/json;charset=UTF-8",
        data: JSON.stringify(param),
        success: function (res) {
        },
        error: function (err) {
        },
    });
}
