/**
 * 顶部多标签页
 */

import { reactive } from 'vue';
import { defineStore } from 'pinia';
import util from '@/libs/util';

const { jumpPage } = util.menu;

const usePage = defineStore(
    'Base-page',
    () => {
        const pageInfo = reactive({
            menuTabsPool: [], // 可以在多页 tab 模式下显示的页面（所有菜单路由平铺后的列表，包括详情）
            openedTabList: [], // 已经打开的tab列表
            currentRouteName: '', // 当前页面路由的 name（真实的路由name）
            currentMenuActiveRouteName: '', // 当前左侧菜单激活路由 name（如果是子级页面，但左侧并没有子级菜单，则需要点亮父级的背景色，即取父级的name）
        });

        /**
         * @description 打开一个新的页面
         * @param {Object} menu 从路由钩子的 to 对象上获取 { name, params, query, fullPath } 路由信息
         */
        const openTab = async (menu) => {
            const { name, path, fullPath } = menu;
            let openedList = pageInfo.openedTabList; // 已经打开的页面
            // 判断此页面是否已经打开，并且记录位置
            let pageOpenedIndex = 0;
            const pageOpened = openedList.find((page, index) => {
                const same = page.name === name;
                pageOpenedIndex = same ? index : pageOpenedIndex;
                return same;
            });
            if (!pageOpened) {
                // 页面以前没有打开过
                let page = pageInfo.menuTabsPool.find((t) => t.name === name);
                // 如果这里没有找到 page 代表这个路由虽然在框架内 但是不参与标签页显示
                if (page) {
                    pageInfo.openedTabList.push({ ...page, path, fullPath: fullPath });
                }
            }
        };

        /**
         * @description 设置当前激活的页面 name
         * @param {String} routeName 当前页面路由的name
         */
        const setRouteName = (routeName) => {
            pageInfo.currentRouteName = routeName;
        };
        /**
         * @description 设置当前左侧菜单激活的页面 name
         * @param {String} routeName 当前页面路由的name
         */
        const setMenuActiveRouteName = (routeName) => {
            pageInfo.currentMenuActiveRouteName = routeName;
        };
        /**
         * @description 设置路由池
         * @param {Array} routes 路由tree
         */
        const setRoutePool = (routes) => {
            const routePool = [];
            const pushRoute = function (routes) {
                routes.forEach((route) => {
                    if (route.children) {
                        pushRoute(route.children);
                    } else {
                        const { title, name, path, applyName, parentName, activeName } = route;
                        routePool.push({ title, name, path, applyName, parentName, activeName });
                    }
                });
            };
            pushRoute(routes);
            pageInfo.menuTabsPool = routePool;
        };
        /**
         * @description 关闭一个 tag (关闭一个页面)
         * @param {Object} param  tagName: 要关闭的标签名字
         */
        const closeTab = async (tagName) => {
            // 下个新的页面
            let newPage = pageInfo.openedTabList[0];
            const isCurrent = pageInfo.currentRouteName === tagName;
            // 如果关闭的页面是否是当前显示的页面
            if (isCurrent) {
                // 去找一个新的页面
                let len = pageInfo.openedTabList.length;
                for (let i = 0; i < len; i++) {
                    if (pageInfo.openedTabList[i].name === tagName) {
                        // 是否只剩最后一个，是则跳首页
                        if (len > 1) {
                            // 如果是最后一个，则向前一个跳，否则向下一个跳
                            if (i === len - 1) {
                                newPage = pageInfo.openedTabList[i - 1];
                            } else {
                                newPage = pageInfo.openedTabList[i + 1];
                            }
                        } else {
                            newPage = {};
                        }
                        break;
                    }
                }
            }
            // 找到这个页面在已经打开的数据里是第几个
            const index = pageInfo.openedTabList.findIndex((page) => page.name === tagName);
            if (index >= 0) {
                // 更新数据 删除关闭的页面
                pageInfo.openedTabList.splice(index, 1);
            }
            if (isCurrent) {
                const { fullPath = '/home', applyName = 'base' } = newPage;
                jumpPage({ path: fullPath, applyName });
            }
        };
        // 关闭当前标签左边的标签
        const closeLeftTab = () => {
            let currentIndex = 0;
            pageInfo.openedTabList.forEach((page, index) => {
                if (page.name === pageInfo.currentRouteName) {
                    currentIndex = index;
                }
            });
            if (currentIndex > 0) {
                pageInfo.openedTabList.splice(1, currentIndex - 1);
            }
        };
        // 关闭当前标签右边的标签
        const closeRightTab = () => {
            let currentIndex = 0;
            pageInfo.openedTabList.forEach((page, index) => {
                if (page.name === pageInfo.currentRouteName) {
                    currentIndex = index;
                }
            });
            // 删除打开的页面 并在缓存设置中删除
            pageInfo.openedTabList.splice(currentIndex + 1);
        };
        // 关闭当前标签之外的所有标签
        const closeOtherTab = () => {
            let currentIndex = 0;
            pageInfo.openedTabList.forEach((page, index) => {
                if (page.name === pageInfo.currentRouteName) {
                    currentIndex = index;
                }
            });
            // 删除打开的页面数据 并更新缓存设置
            if (currentIndex === 0) {
                pageInfo.openedTabList.splice(1);
            } else {
                pageInfo.openedTabList.splice(currentIndex + 1);
                pageInfo.openedTabList.splice(1, currentIndex - 1);
            }
        };
        // 关闭所有标签
        const closeAllTab = () => {
            // 删除打开的页面 并在缓存设置中删除
            pageInfo.openedTabList.splice(1);
            if (pageInfo.currentRouteName !== 'home') {
                jumpPage({ path: '/home', applyName: 'base' });
            }
        };

        return {
            pageInfo,
            openTab,
            setRoutePool,
            setRouteName,
            setMenuActiveRouteName,
            closeTab,
            closeLeftTab,
            closeRightTab,
            closeOtherTab,
            closeAllTab,
        };
    },
    {
        persist: {
            enabled: true,
            strategies: [
                {
                    storage: localStorage,
                },
            ],
        },
    }
);

export default usePage;
