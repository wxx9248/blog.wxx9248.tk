function avbvconv(s, callback)
{
    "use strict";
    var API_ROOT = "https://cf-proxy.wxx9248.tk/biliapi/x/web-interface/view";
    var AV_PATTERN = /^AV(\d+)$/i;
    var BV_PATTERN = /^BV([A-Za-z0-9]+)$/i;
    
    var request = API_ROOT;
    var retjson = 
    {
        "success":      null,
        "ajax_status":  null,
        "code":         null,
        "msg":          null,
        "id":           null
    }
    var id_type = null
    
    s = s.trim();
    
    if (AV_PATTERN.test(s))
    {
        id_type = "aid";
        request += "?aid=" + s.match(AV_PATTERN)[1];
    }
    else if (BV_PATTERN.test(s))
    {
        id_type = "bvid";
        request += "?bvid=" + s.match(BV_PATTERN)[1];
    }
    else
    {
        retjson["success"] = -1;
        retjson["code"] = -1;
        retjson["msg"] = "非法的输入值：不是avid或者bvid";
        
        callback(retjson)
		return
    }
    
    $.ajax(
        {
            type:               "GET",
            url:                request,
            dataType:           "json",
            scriptCharset:      "utf-8",
            success:            function(data, status)
            {
                "use strict";
                if (data["code"])
                {
                    retjson["success"] = 0;
                }
                else
                {
                    retjson["success"] = 1;
                    if (id_type === "aid")
                    {
                        retjson["id"] = data["data"]["bvid"];
                    }
                    else
                    {
                        retjson["id"] = "AV" + data["data"]["aid"];
                    }
                }
                retjson["ajax_status"] = status;
                retjson["code"] = data["code"];
                retjson["msg"] = data["message"];
				callback(retjson);
            },
            error:              function(xhr, status)
            {
                "use strict";
                retjson["success"] = 0;
				retjson["ajax_status"] = status;
                retjson["msg"] = "bilibili API 调用失败";
  				callback(retjson);
            }
        }
    )
}
