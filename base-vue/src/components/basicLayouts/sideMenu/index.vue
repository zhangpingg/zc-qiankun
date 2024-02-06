<template>
    <div class="sideMenu">
        <div class="sideMenu-logo" @click="goHome">
            <img src="@/assets/images/logo-small.png" v-if="isMenuCollapse" />
            <img src="@/assets/images/logo-dark.png" v-else />
        </div>
        <div class="c-hideScrollbar sideMenu-menuList">
            <Menu
                ref="menu"
                theme="dark"
                :accordion="isMenuAccordion"
                :open-names="menuStore.menuInfo.sideMenuOpenNames"
                :active-name="pageStore.pageInfo.currentRouteName"
                width="auto"
                class="sideMenu-menuList-menu"
            >
                <template v-if="!isMenuCollapse">
                    <template v-for="item in menuStore.menuInfo.siderMenuTree">
                        <SideSubMenu :menu="item" :key="item.id" v-if="isValidArr(item.children)" />
                        <SideMenuItem :menu="item" :key="item.id" v-else />
                    </template>
                </template>
                <template v-else>
                    <template v-for="item in menuStore.menuInfo.siderMenuTree" :key="item.id">
                        <SideMenuCollapse
                            :menu="item"
                            :key="item.id"
                            style="width: 100%"
                            v-if="isValidArr(item.children)"
                        />
                        <Tooltip :content="item.title" placement="right" :key="item.id" style="width: 100%" v-else>
                            <SideMenuItem
                                :menu="item"
                                hide-title
                                :class="{
                                    'sideMenu-menuList-menu-itemCollapse': isMenuCollapse,
                                }"
                            />
                        </Tooltip>
                    </template>
                </template>
            </Menu>
        </div>
    </div>
</template>

<script setup>
import { toRefs } from 'vue';
import { useLayoutStore, useMenuStore, usePageStore } from '@/store';
import SideMenuItem from './SideMenuItem.vue';
import SideSubMenu from './SideSubMenu.vue';
import SideMenuCollapse from './SideMenuCollapse.vue';
import util from '@/libs/util';

const layoutStore = useLayoutStore();
const menuStore = useMenuStore();
const pageStore = usePageStore();
const { isMenuAccordion, isMenuCollapse } = toRefs(layoutStore.layoutInfo);
const { jumpPage } = util.menu;
const { isValidArr } = util.tool;

defineProps({
    hideLogo: {
        type: Boolean,
        default: false,
    },
});

const goHome = () => {
    jumpPage({ path: '/home', applyName: 'base' });
};
</script>

<style scoped lang="less">
/* 侧边栏背景色 */
.ivu-menu-dark {
    background: #191a23;
}
/* 侧边栏一级的标题背景色 */
:deep(.ivu-menu-dark.ivu-menu-vertical .ivu-menu-opened .ivu-menu-submenu-title) {
    background: #191a23;
}
/* 侧边栏一级的标题背景色 hover 时 */
:deep(.ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu-title:hover) {
    background: #191a23;
}
/* 侧边栏二级的背景色 */
.ivu-menu-dark.ivu-menu-vertical .ivu-menu-opened {
    background: #101117;
}
:deep(.ivu-menu-submenu-title) {
    span {
        i {
            margin-right: 0;
        }
    }
}
.sideMenu {
    height: 100%;
    background: #191a23;
    .sideMenu-logo {
        height: 63px;
        line-height: 63px;
        text-align: center;
        border-bottom: 1px solid #101117;
        overflow: hidden;
        cursor: pointer;
        img {
            height: 60%;
            vertical-align: middle;
        }
    }
    .sideMenu-menuList {
        height: calc(100% - 63px);
        overflow-y: auto;
        overflow-x: hidden;
        :deep(.ivu-select-dropdown) {
            width: auto;
            margin: 5px 0 5px 5px;
        }
        .sideMenu-menuList-menu {
            position: static;
        }
        .ivu-menu-item-active {
            color: #fff !important;
        }
        .ivu-menu-dark.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu) {
            background: #101117;
        }
        .ivu-menu-dark.ivu-menu-vertical .ivu-menu-item:hover {
            background: transparent;
        }
        .sideMenu-menuList-menu-itemCollapse {
            padding: 14px 0;
            text-align: center;
        }
    }
}
</style>