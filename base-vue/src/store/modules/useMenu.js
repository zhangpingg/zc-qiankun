/**
 * 侧边栏菜单、顶部菜单
 */

import { reactive } from 'vue';
import { defineStore } from 'pinia';

const useMenu = defineStore(
    'Base-menu',
    () => {
        const menuInfo = reactive({
            siderMenuTree: [], // 侧边栏菜单tree
            sideMenuOpenNames: [], // 侧边栏展开的菜单name
        });

        /**
         * @description 设置侧边栏菜单
         * @param {Array} menu 侧边栏菜单tree
         */
        const setSiderMenuTree = (menu) => {
            menuInfo.siderMenuTree = menu;
        };
        /**
         * @description 设置侧边栏菜单展开的name
         * @param {String} name 子菜单的name
         */
        const setSideMenuOpenNames = (name) => {
            menuInfo.sideMenuOpenNames = [name];
        };

        return { menuInfo, setSiderMenuTree, setSideMenuOpenNames };
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

export default useMenu;
