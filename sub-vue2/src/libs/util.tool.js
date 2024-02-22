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
 * @param route 跳转的路由对象 path-路由，title-标题，params-参数，applyName-应用名称
 */
const jumpPage = (route) => {
    const {
        path = "",
        title = "",
        params = null,
        applyName = "sub-vue2",
    } = route;
    window.history.pushState(params, title, path);
    if (applyName === "sub-vue2" && Cookies.get("apply-name") != "sub-vue2") {
        location.reload();
    }
    Cookies.set("apply-name", applyName);
};

export { isValidVal, isValidArr, clearInvalidKey, jumpPage };
