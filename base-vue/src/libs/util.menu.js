import { usePageStore } from '@/store';
import { isValidArr } from './util.tool';
import { setCookie, getCookie } from './util.cookies';

/**
 * 获取当前权限菜单对应所有的path路径列表
 * @param menu 菜单列表
 * @return {*[]} 菜单路径列表
 */
const getMenuPathList = (menu) => {
    let paths = [];
    for (let item of menu) {
        if (item.children && item.children.length > 0) {
            paths = [...paths, ...getMenuPathList(item.children)];
        } else {
            paths.push(item.path);
            delete item.children;
        }
    }
    return paths;
};

/**
 * 跳转页面
 * @param route 跳转的路由对象 path-路由，title-标题，params-参数，applyName-应用名称, routeType-路由类型(replaceState/pushState)
 */
const jumpPage = (route) => {
    const { path = '', title = '', params = null, applyName = 'base', routeType = 'pushState' } = route;
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
    if (applyName === 'sub-vue2' && getCookie('apply-name') != 'sub-vue2') {
        location.reload();
    }
    setCookie('apply-name', applyName);
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
 * 根据路由name获取当前菜单对象
 * @param {string} routeName 当前菜单的路由name
 * @return {} 返回当前菜单的菜单对象
 */
const getMenuItemByName = (routeName) => {
    const pageStore = usePageStore();
    const menuItem = pageStore?.pageInfo?.menuTabsPool?.filter((item) => item.name == routeName);
    if (isValidArr(menuItem)) {
        return menuItem[0];
    } else {
        return {};
    }
};

/**
 * 根据路由name获取当前左侧菜单的激活路由
 * @param {string} routeName 当前菜单的路由name
 * @return {} 返回当前左侧菜单的激活路由
 */
const getMenuActiveNameByName = (routeName) => {
    const pageStore = usePageStore();
    const menuItem = pageStore?.pageInfo?.menuTabsPool?.filter((item) => item.name == routeName);
    return menuItem[0]?.activeName || menuItem[0]?.name;
};

/**
 * 根据接口返回的菜单权限标识，前端控制左侧菜单tree的展示
 * @param {[]} authMarkList 当前用户的权限列表
 * @param {[]} siderTreeList 前端静态的所有页面tree
 * @return {[]} 返回最终的左侧菜单tree
 */
const getHasAuthSiderTreeList = (authMarkList, siderTreeList) => {
    siderTreeList.forEach((item) => {
        if (!authMarkList.includes(item.authMark)) {
            item.isShow = false;
        }
        if (item.children) {
            getHasAuthSiderTreeList(authMarkList, item.children);
        }
    });
    return siderTreeList;
};

export { getMenuPathList, jumpPage, getUrlParams, getMenuItemByName, getMenuActiveNameByName, getHasAuthSiderTreeList };
