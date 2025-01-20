<template>
    <div class="headerTabs" id="headerTabs">
        <div class="tabs-main">
            <Tabs
                type="card"
                :model-value="pageStore.pageInfo.currentRouteName"
                :animated="false"
                closable
                @on-click="changeTab"
                @on-tab-remove="closeSingleTab"
            >
                <TabPane
                    v-for="page in [...pageStore.pageInfo.openedTabList]"
                    :key="page.name"
                    :label="(h) => tabLabel(h, page)"
                    :name="page.name"
                />
            </Tabs>
            <Dropdown placement="bottom-end" class="tabs-main-close" @on-click="closeMultipleTab">
                <div class="tabs-main-close-icon">
                    <Icon type="ios-arrow-down" />
                </div>
                <template #list>
                    <DropdownMenu>
                        <DropdownItem name="Left"> <Icon type="md-arrow-back" /> 关闭左侧 </DropdownItem>
                        <DropdownItem name="Right"> <Icon type="md-arrow-forward" /> 关闭右侧 </DropdownItem>
                        <DropdownItem name="Other"> <Icon type="md-close" /> 关闭其它 </DropdownItem>
                        <DropdownItem name="All"> <Icon type="md-close-circle" /> 全部关闭 </DropdownItem>
                    </DropdownMenu>
                </template>
            </Dropdown>
        </div>
    </div>
</template>

<script setup>
import { Tabs, TabPane, Dropdown, DropdownMenu, DropdownItem, Icon } from 'view-ui-plus';
import { usePageStore } from '@/store';
import util from '@/libs/util';
import Setting from '@/setting';

const pageStore = usePageStore();
const { jumpPage, getUrlParams } = util.menu;

const tabLabel = (h, page) => {
    const title = h('span', page?.title || '未命名');
    return h(
        'div',
        {
            class: 'tabs-main-title',
        },
        [title]
    );
};
// 切换-标签页
const changeTab = (tabName) => {
    const page = pageStore.pageInfo.openedTabList.find((page) => page.name === tabName);
    if (page) {
        const { fullPath, path, applyName } = page;
        let _query = getUrlParams(fullPath);
        if (Setting.detailCacheNameList.includes(tabName)) {
            _query = { ..._query, openType: 'TAG' };
        }
        if (tabName === pageStore.pageInfo.currentRouteName) {
            return;
        }
        jumpPage({ path, params: _query, applyName });
    }
};
// 关闭-标签（单个）
const closeSingleTab = (tagName) => {
    pageStore.closeTab(tagName, 'tag');
};
// 关闭-标签（多个）
const closeMultipleTab = (closeType) => {
    pageStore[`close${closeType}Tab`]();
};
</script>

<style scoped lang="less">
.headerTabs {
    width: 100%;
    background-color: #f5f7f9;
    transition: all 0.2s ease-in-out;
    .tabs-main {
        background: #f5f7f9;
        padding: 6px 0;
        margin: 0 12px 0 12px;
        display: flex;
        .ivu-tabs {
            -webkit-box-flex: 1;
            -ms-flex-positive: 1;
            flex-grow: 1;
            -ms-flex-negative: 1;
            flex-shrink: 1;
        }
        .tabs-main-close {
            flex-grow: 0;
            flex-shrink: 0;
            .tabs-main-close-icon {
                width: 32px;
                height: 32px;
                line-height: 32px;
                text-align: center;
                background-color: #fff;
                border-radius: 2px;
                cursor: pointer;
            }
        }
        :deep(.tabs-main-title) {
            display: inline-block;
            img,
            i {
                display: inline-block;
                height: 20px;
                vertical-align: middle;
                margin-right: 8px;
            }
            span {
                display: inline-block;
                vertical-align: middle;
            }
        }
    }
}
#headerTabs {
    :deep(.ivu-tabs-bar) {
        border-bottom: none;
        .ivu-tabs-tab {
            height: 32px;
            background: #fff;
            border-radius: 3px;
            border: none;
            margin-right: 6px;
            color: #808695;
            &:hover {
                color: #2d8cf0;
            }
        }
        .ivu-tabs-tab-active {
            height: 32px;
            background: #fff;
            color: #2d8cf0;
            &:hover {
                color: #2d8cf0;
            }
        }
        .ivu-tabs-nav-scrollable {
            padding: 0 32px;
            .ivu-tabs-nav-prev,
            .ivu-tabs-nav-next {
                width: 32px;
                text-align: center;
            }
        }
    }
    :deep(.ivu-tabs.ivu-tabs-card > .ivu-tabs-bar .ivu-tabs-tab .ivu-icon-ios-close) {
        width: 22px;
        margin-right: -6px;
        transform: translateZ(0);
    }
}
</style>
