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
 * @param route 跳转的路由对象 path-路由，title-标题，params-参数，applyName-应用名称
 */
const jumpPage = (route) => {
    const { path = '', title = '', params = null, applyName = '' } = route;
    window.history.pushState(params, title, path);
    if (applyName === 'sub-vue2' && getCookie('apply-name') != 'sub-vue2') {
        location.reload();
    }
    setCookie('apply-name', applyName);
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

export { getMenuPathList, jumpPage, getMenuItemByName };
