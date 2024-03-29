import _ from "lodash";
import Cookies from "js-cookie";

/**
 * @description 判断-是否是有效的数据
 * @param {any} val 传入的值
 * @returns {boolean} 返回boolean
 */
const isValidVal = (val) => {
    if ([null, undefined, ""].includes(val)) {
        return false;
    }
    return true;
};

/**
 * @description 判断-是否是有效的非空数组
 * @param {any} list 传入的值
 * @returns {boolean} 返回boolean
 */
const isValidArr = (list) => {
    if (_.isArray(list) && !_.isEmpty(list)) {
        return true;
    }
    return false;
};
/**
 * @description 删除对象中value为 null, undefined，'' 的 key
 * @param {Object} data 传入的对象
 * @returns {Object} 返回value有值的key对象
 */
const clearInvalidKey = (data) => {
    const _obj = { ...data };
    for (let key in _obj) {
        if (_obj[key] === null || _obj[key] === undefined || _obj[key] === "") {
            delete _obj[key];
        }
    }
    return _obj;
};

/**
 * 跳转页面
 * @param route 跳转的路由对象 path-路由，title-标题，params-参数，applyName-应用名称, routeType-路由类型(replaceState/pushState)
 */
const jumpPage = (route) => {
    const {
        path = "",
        title = "",
        params = null,
        applyName = "sub-vue2",
        routeType = "pushState",
    } = route;
    const _paramsStr =
        params &&
        Object.keys(params)
            .map((key) => {
                if (Array.isArray(params[key])) {
                    let list = params[key].map((item) => {
                        return `${key}=${encodeURI(item)}`;
                    });
                    return list.join("&");
                } else {
                    return `${key}=${encodeURI(params[key])}`;
                }
            })
            .join("&");
    let _path = `${path}`;
    if (_paramsStr) {
        _path = `${_path}?${_paramsStr}`;
    }
    window.history[routeType](null, title, _path);
    if (applyName === "sub-vue2" && Cookies.get("apply-name") != "sub-vue2") {
        location.reload();
    }
    Cookies.set("apply-name", applyName);
};

/**
 * 获取url参数
 * @param url-页面地址
 */
const getUrlParams = (url = "") => {
    if (url?.indexOf("?") < 0) {
        return {};
    }
    return transParams(joinParams(url));
    function joinParams(url) {
        const _obj = {};
        url?.split("?")[1]
            .split("&")
            .forEach((item) => {
                let _key = item?.split("=")[0];
                let _val = decodeURI(item?.split("=")[1]);
                if (_obj[_key]) {
                    _obj[_key].push(_val);
                } else {
                    _obj[_key] = [_val];
                }
            });
        return _obj;
    }
    function transParams(obj) {
        for (let key in obj) {
            if (obj[key].length === 1) {
                obj[key] = obj[key][0];
            }
        }
        return obj;
    }
};

/**
 * 转换路由的path为name
 * @param url的path
 */
const transPathToName = (path) => {
    return path.substring(1).replace(new RegExp("/", "g"), "-");
};

export {
    isValidVal,
    isValidArr,
    clearInvalidKey,
    jumpPage,
    getUrlParams,
    transPathToName,
};
