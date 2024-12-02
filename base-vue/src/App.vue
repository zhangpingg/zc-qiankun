<template>
    <router-view />
</template>

<script setup>
import { onMounted, onUnmounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useUserStore, useMenuStore, usePageStore, useLayoutStore } from '@/store';
import util from '@/libs/util';

const route = useRoute();
const menuStore = useMenuStore();
const userStore = useUserStore();
const pageStore = usePageStore();
const layoutStore = useLayoutStore();
const { getMenuItemByName, getMenuActiveNameByName } = util.menu;

layoutStore.listenFullscreen(); // 初始化全屏监听

// 获取-窗口媒体查询
const getWindowMedia = () => {
    const matchMedia = window.matchMedia;
    if (matchMedia('(max-width: 1050px)').matches) {
        layoutStore.setDeviceIsPC(false);
    } else {
        layoutStore.setDeviceIsPC(true);
    }
};

onMounted(() => {
    getWindowMedia();
    window.addEventListener('resize', getWindowMedia);
});
watch(route, (newRoute) => {
    menuStore.setSiderMenuTree(userStore.userInfo.menu); // 侧边栏菜单tree
    menuStore.setSideMenuOpenNames(getMenuItemByName(newRoute.name)?.parentName); // 设置侧边栏菜单展开的name
    pageStore.setRouteName(newRoute.name);
    pageStore.setMenuActiveRouteName(getMenuActiveNameByName(newRoute.name)); // 设置当前左侧菜单激活的页面 name
    // 设置路由池：可以在多页 tab 模式下显示的页面（有权限的菜单路由平铺后的列表，包括详情）
    pageStore.setRoutePool(userStore.userInfo.menu || []);
});
onUnmounted(() => {
    window.removeEventListener('resize', getWindowMedia);
});
</script>

<style scoped></style>
