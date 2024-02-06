import Cookies from 'js-cookie';
import Setting from '@/setting';

/**
 * @description 存储 cookie 值
 * @param {String} name cookie的key
 * @param {String} value cookie的值
 * @param {Object} cookieSetting cookie的其他需要存储的对象
 */
const setCookie = (name = '', value = '', cookieSetting = {}) => {
    let currentCookieSetting = {
        expires: Setting.cookiesExpires,
    };
    Object.assign(currentCookieSetting, cookieSetting);
    Cookies.set(`Base-${name}`, value, currentCookieSetting);
};

/**
 * @description 获取 cookie 值
 * @param {String} name cookie的key
 */
const getCookie = (name) => {
    return Cookies.get(`Base-${name}`);
};

/**
 * @description 获取 cookie 存储的所有数据
 */
const getAllCookie = () => {
    return Cookies.get();
};

/**
 * @description 删除 cookie
 * @param {String} name cookie的key
 */
const removeCookie = (name) => {
    return Cookies.remove(`Base-${name}`);
};

export { setCookie, getCookie, getAllCookie, removeCookie };
