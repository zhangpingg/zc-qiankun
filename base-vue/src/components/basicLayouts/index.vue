<template>
    <Layout class="basicLayouts">
        <Sider class="basicLayouts-sider" hide-trigger :width="menuSideWidth">
            <SideMenu />
        </Sider>
        <Layout class="basicLayouts-right" :style="{ marginLeft: menuSideWidth + 'px' }">
            <Header class="basicLayouts-right-header">
                <HeaderTool />
                <HeaderTabs />
            </Header>
            <Content class="basicLayouts-right-content">
                <router-view v-slot="{ Component, route }">
                    <keep-alive :exclude="[]">
                        <component :is="Component" :key="route.fullPath" />
                    </keep-alive>
                </router-view>
                <div id="subContainer"></div>
            </Content>
        </Layout>
    </Layout>
</template>

<script setup>
import { computed } from 'vue';
import { Layout, Sider, Header, Content } from 'view-ui-plus';
import { useLayoutStore } from '@/store';
import SideMenu from './sideMenu';
import HeaderTabs from './headerTabs';
import Setting from '@/setting';
import HeaderTool from './headerTool';

const layoutStore = useLayoutStore();

// 左侧菜单栏宽度
const menuSideWidth = computed(() => {
    return layoutStore.layoutInfo.isMenuCollapse ? 80 : Setting.menuSideWidth;
});
</script>

<style scoped lang="less">
.basicLayouts {
    height: 100%;
    .basicLayouts-sider {
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 13;
    }
    .basicLayouts-right {
        transition: all 0.3s;
        .basicLayouts-right-header {
            background: #fff;
            padding: 0;
            height: 103px;
        }
        .basicLayouts-right-content {
            height: calc(100% - 116px);
            overflow-y: auto;
            padding: 0px 24px 24px 24px;
            margin-top: 10px;
        }
    }
}
</style>
