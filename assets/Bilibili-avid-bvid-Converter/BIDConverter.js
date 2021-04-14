function convertBID(id)
{
    "use strict";
    const AV_PATTERN = /^av(\d+)$/i;
    const BV_PATTERN = /^BV([A-Za-z0-9]+)$/i;

    const TABLE = "fZodR9XQDSUm21yCkr6zBqiveYah8bt4xsWpHnJE7jL5VG3guMTKNPAwcF".split("");
    const S = [ 11, 10, 3, 8, 4, 6 ];
    const XOR = 177451812;
    const ADD = 8728348608;
    
    let map = new Map();
    TABLE.forEach(
        function(item, index)
        {
            map[item] = index;
        }
    );
    
    id = id.trim();
    
    if (AV_PATTERN.test(id))
    {
        id = parseInt(id.substring(2));
        id = (id ^ XOR) + ADD;
        let r = "BV1  4 1 7  ".split("");

        for (let i = 0; i < 6; ++i)
        {
            r[S[i]] = TABLE[Math.floor(id / Math.floor(Math.pow(58, i))) % 58];
        }
        return r.join("");
    }
    if (BV_PATTERN.test(id))
    {
        let r = 0;
        for (let i = 0; i < 6; ++i)
        {
            r += map[id[S[i]]] * Math.floor(Math.pow(58, i));
        }
        return "av" + ((r - ADD) ^ XOR);
    }
    else
    {
        return "不是有效的avid或bvid";
    }
}
