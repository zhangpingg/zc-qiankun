<template>
    <div class="headerTool">
        <span
            class="headerTool-comHoverBg pl-10 pr-10 cup dib"
            @click="expandOrCollapseSideMenu"
            v-if="isShowSiderCollapseBtn"
        >
            <Icon custom="i-icon i-icon-menu-unfold fs-20" v-if="isMenuCollapse" />
            <Icon custom="i-icon i-icon-menu-fold fs-20" v-else />
        </span>
        <span class="headerTool-comHoverBg cup pl-10 pr-10 dib" @click="refreshPage" v-if="isShowReloadbtn">
            <Icon custom="i-icon i-icon-refresh fs-20" />
        </span>
        <span v-show="titlePrefix">
            <Tag color="blue"> 当前{{ titlePrefix }}环境 </Tag>
        </span>
        <span>欢迎您，{{ userStore.userInfo?.realName }}</span>
        <div class="fr headerTool">
            <span class="pr-10" @click="goEnterpriseCertification" v-if="isPC">
                <span v-if="certificationStatus === 1 && certificationName">
                    <Button type="primary" class="ivu-mr-16">企业认证</Button>
                    <span>{{ certificationName }}</span>
                </span>
                <Button type="text" v-else>企业账号认证</Button>
            </span>
            <span
                class="headerTool-comHoverBg pl-10 pr-10 dib cup"
                @click="toggleFullscreen"
                v-if="isShowFullscreenBtn"
            >
                <Icon custom="i-icon i-icon-full-screen fs-20" v-show="!isFullscreen" />
                <Icon custom="i-icon i-icon-exit-full-screen fs-20" v-show="isFullscreen" />
            </span>
            <span class="headerTool-comHoverBg pl-10 pr-10 dib cup">
                <Dropdown trigger="hover" class="i-layout-header-user" @on-click="openAccountDropdown">
                    <Avatar size="small" :src="avatar" v-if="avatar" />
                    <Avatar size="small" icon="ios-person" v-else />
                    <span class="ml-10">{{ mobile }}</span>
                    <template #list>
                        <DropdownMenu>
                            <DropdownItem divided name="logout">
                                <Icon type="ios-log-out mr-10" />
                                <span>退出登录</span>
                            </DropdownItem>
                        </DropdownMenu>
                    </template>
                </Dropdown>
            </span>
            <HeaderPassword />
        </div>
    </div>
</template>

<script setup>
import { toRefs } from 'vue';
import { Icon, Tag, Dropdown, DropdownMenu, DropdownItem, Button, Avatar } from 'view-ui-plus';
import { useLayoutStore, useUserStore, useAccountStore } from '@/store';
import util from '@/libs/util';
import HeaderPassword from './headerPassword';

const layoutStore = useLayoutStore();
const userStore = useUserStore();
const accoutStore = useAccountStore();

const { isMenuCollapse, isShowSiderCollapseBtn, isShowReloadbtn, isShowFullscreenBtn, isFullscreen, isPC } = toRefs(
    layoutStore.layoutInfo
);
const { certificationStatus, certificationName } = toRefs(userStore.userInfo);
const { titlePrefix } = util.win;
const { avatar, mobile } = toRefs(userStore.userInfo);

// 展开/收起-侧边栏
const expandOrCollapseSideMenu = () => {
    layoutStore.updateMenuCollapse(!isMenuCollapse.value);
};
// 刷新网页
const refreshPage = () => {
    location.reload();
};
// 企业认证
const goEnterpriseCertification = () => {};
// 切换全屏
const toggleFullscreen = () => {
    layoutStore.toggleFullscreen();
};
// 打开-账号的下拉列表
const openAccountDropdown = (name) => {
    if (name === 'logout') {
        accoutStore.logout();
    }
};
</script>

<style lang="less" scoped>
.headerTool {
    .headerTool-comHoverBg {
        height: 64px;
        &:hover {
            background: #f8f8f9;
        }
    }
}
</style>
