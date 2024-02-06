<template>
    <MenuItem :name="menu?.name" @click="jumpMenu(menu)">
        <SideMenuTitle :menu="menu" :hide-title="hideTitle" />
    </MenuItem>
</template>

<script setup>
import { MenuItem } from 'view-ui-plus';
import SideMenuTitle from './SideMenuTitle.vue';
import util from '@/libs/util';

const { jumpPage } = util.menu;

defineProps({
    menu: {
        type: Object,
        default() {
            return {};
        },
    },
    hideTitle: {
        type: Boolean,
        default: false,
    },
});

// 跳转页面
const jumpMenu = (menu) => {
    const { applyName, path } = menu;
    jumpPage({ path, applyName });
};
</script>

<style scoped></style>
