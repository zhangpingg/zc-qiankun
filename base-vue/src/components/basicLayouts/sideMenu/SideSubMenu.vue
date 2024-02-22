<template>
    <Submenu :name="menu.name">
        <template v-slot:title>
            <SideMenuTitle :menu="menu" />
        </template>
        <template v-for="item in menu.children">
            <SideSubMenu v-if="isValidArr(item.children)" :menu="item" :key="item.id" />
            <SideMenuItem :menu="item" :key="item.id" v-if="!isValidArr(item.children) && !item.activeName" />
        </template>
    </Submenu>
</template>

<script setup>
import { Submenu } from 'view-ui-plus';
import SideMenuItem from './SideMenuItem.vue';
import SideMenuTitle from './SideMenuTitle.vue';
import { isValidArr } from '@/libs/util.tool';

defineProps({
    menu: {
        type: Object,
        default() {
            return {};
        },
    },
});
</script>

<style scoped></style>
