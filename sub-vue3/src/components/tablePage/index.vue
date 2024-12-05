<!--
 * @Author: chengleilei
 * @Date: 2024-02-06 09:22:23
 * @Description: 表格组件
-->
<template>
    <Table
        no-data-text="亲，没有找到相关记录哦！~"
        :stripe="true"
        @on-selection-change="handleSelectionChange"
        @on-select="handleSelect"
        @on-select-cancel="handleSelectCancel"
        @on-select-all="handleSelectAll"
        @on-select-all-cancel="handleSelectAllCancel"
        v-bind="tableConfig"
    />
    <slot name="extra"></slot>
    <div class="ivu-mt ivu-text-right" v-if="hasPage">
        <Page
            show-sizer
            show-elevator
            show-total
            :model-value="pageConfig.current"
            :page-size="globalConst.paginationMap.pageSize"
            :page-size-opts="globalConst.paginationMap.pageSizeOpts"
            @on-change="onPageChange"
            @on-page-size-change="onPageSizeChange"
            v-bind="pageConfig"
        />
    </div>
</template>

<script setup>
defineProps({
    // 表格配置
    tableConfig: {
        type: Object,
        default: () => {
            return { loading: false, columns: [], data: [] };
        },
    },
    // 分页配置
    pageConfig: {
        type: Object,
        default: () => {
            return { current: 1 };
        },
    },
    // 是否有页码
    hasPage: {
        type: Boolean,
        default: true,
    },
});
const emit = defineEmits([
    'onPageChange',
    'onPageSizeChange',
    'handleSelectionChange',
    'handleSelect',
    'handleSelectCancel',
    'handleSelectAll',
    'handleSelectAllCancel',
]);

// current改变
const onPageChange = (val) => {
    emit('onPageChange', val);
};
// size改变
const onPageSizeChange = (val) => {
    emit('onPageSizeChange', val);
};
// 选项改变
const handleSelectionChange = (selection) => {
    emit('handleSelectionChange', selection);
};
// 选择某一项
const handleSelect = (selection, row) => {
    emit('handleSelect', selection, row);
};
// 取消选择某一项
const handleSelectCancel = (selection, row) => {
    emit('handleSelectCancel', selection, row);
};
// 全选
const handleSelectAll = (selection) => {
    emit('handleSelectAll', selection);
};
// 取消全选
const handleSelectAllCancel = (val) => {
    emit('handleSelectAllCancel', val);
};
</script>

<style lang="less" scoped></style>
