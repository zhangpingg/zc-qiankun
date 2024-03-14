<template>
    <Dropdown placement="right-start" class="smc">
        <li
            class="smc-title ivu-menu-item"
            :class="{
                'ivu-menu-item-sideMenuCollapse': layoutStore.layoutInfo.isMenuCollapse,
            }"
        >
            <SideMenuTitle :menu="menu" hide-title />
        </li>
        <template #list>
            <DropdownMenu style="width: auto" class="smc-dropdownMenu">
                <template v-for="(item, index) in menu.children">
                    <div
                        v-if="!isValidArr(item.children) && item.isShow && !item.activeName"
                        :key="index"
                        @click="jumpMenu(item)"
                    >
                        <DropdownItem
                            :divided="item.divided"
                            :class="{
                                'smc-dropdownMenu-collapseItemSelected':
                                    item.name === pageStore.pageInfo.currentRouteName,
                            }"
                        >
                            <SideMenuTitle :menu="item" />
                        </DropdownItem>
                    </div>
                    <SideMenuCollapse v-if="isValidArr(item.children) && item.isShow" :menu="item" :key="item.id" />
                </template>
            </DropdownMenu>
        </template>
    </Dropdown>
</template>

<script setup>
import { Dropdown, DropdownMenu, DropdownItem } from 'view-ui-plus';
import { useLayoutStore, usePageStore } from '@/store';
import SideMenuTitle from './SideMenuTitle.vue';
import SideMenuCollapse from './SideMenuCollapse.vue';
import util from '@/libs/util';

const layoutStore = useLayoutStore();
const pageStore = usePageStore();
const { jumpPage } = util.menu;
const { isValidArr } = util.tool;

defineProps({
    menu: {
        type: Object,
        default() {
            return {};
        },
    },
    // 是否是第一级，区分在于左侧和展开侧
    topLevel: {
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

<style scoped lang="less">
.smc {
    .smc-title {
        color: rgba(255, 255, 255, 0.7);
    }
    .smc-dropdownMenu {
        background: #191a23;
        margin: 5px 0 5px 3px;
        padding: 5px;
        .smc-dropdownMenu-collapseItemSelected {
            background-color: #2d8cf0 !important;
            color: #fff !important;
        }
    }
    .ivu-menu-item-sideMenuCollapse {
        padding: 14px 0;
        text-align: center;
    }
}
:deep(.ivu-select-dropdown) {
    padding: 0;
    margin: 0;
    background: #191a23;
    .ivu-dropdown-item {
        color: rgba(255, 255, 255, 0.7);
    }
    .ivu-dropdown-item:hover {
        background: transparent;
        color: #fff;
    }
}
</style>
