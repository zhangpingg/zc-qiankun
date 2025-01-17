import Cookies from 'js-cookie';

/**
 * 跳转页面
 * @param route 跳转的路由对象 path-路由，title-标题，params-参数，applyName-应用名称, routeType-路由类型(replaceState/pushState)
 */
const jumpPage = (route) => {
    const { path = '', title = '', params = null, applyName = 'sub-vue2', routeType = 'pushState' } = route;
    const _paramsStr =
        params &&
        Object.keys(params)
            .map((key) => {
                if (Array.isArray(params[key])) {
                    let list = params[key].map((item) => {
                        return `${key}=${encodeURI(item)}`;
                    });
                    return list.join('&');
                } else {
                    return `${key}=${encodeURI(params[key])}`;
                }
            })
            .join('&');
    let _path = `${path}`;
    if (_paramsStr) {
        _path = `${_path}?${_paramsStr}`;
    }
    window.history[routeType](null, title, _path);
    if (applyName === 'sub-vue2' && Cookies.get('Base-apply-name') != 'sub-vue2') {
        location.reload();
    }
    Cookies.set('Base-apply-name', applyName);
};

/**
 * 获取url参数
 * @param url-页面地址
 */
const getUrlParams = (url = '') => {
    if (url?.indexOf('?') < 0) {
        return {};
    }
    return transParams(joinParams(url));
    function joinParams(url) {
        const _obj = {};
        url?.split('?')[1]
            .split('&')
            .forEach((item) => {
                let _key = item?.split('=')[0];
                let _val = decodeURI(item?.split('=')[1]);
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
    return path.substring(1).replace(new RegExp('/', 'g'), '-');
};

/**
 * 返回上一页
 * @param applyName 上一页的应用名称
 */
const goBack = (applyName = 'sub-vue2') => {
    Cookies.set('Base-apply-name', applyName);
    window.history.back();
};

export { jumpPage, getUrlParams, transPathToName, goBack };
