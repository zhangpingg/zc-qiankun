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
    menuStore.setSiderMenuTree(userStore.userInfo.menu);
    menuStore.setSideMenuOpenNames(getMenuItemByName(newRoute.name)?.parentName);
    pageStore.setRouteName(newRoute.name);
    pageStore.setMenuActiveRouteName(getMenuActiveNameByName(newRoute.name));
    pageStore.setRoutePool(userStore.userInfo.menu || []);
});
onUnmounted(() => {
    window.removeEventListener('resize', getWindowMedia);
});
</script>

<style scoped></style>

