<template>
    <div>
        <Table
            ref="tableRef"
            v-bind="{ rowKey: 'id', noDataText: '亲，没有找到相关记录哦！~', ...tableConfig }"
            @on-selection-change="onSelectionChange"
            @on-current-change="onRowClick"
        >
            <template
                v-for="item in tableConfig.columns.filter((item) => !!item.slot)"
                :key="index.slot"
                v-slot:[item.slot]="{ row }"
            >
                <slot :name="item.slot" :row="row"></slot>
            </template>
        </Table>
        <slot name="extra"></slot>
        <div class="ivu-mt ivu-text-right" v-if="isHasPage">
            <Page
                :current.sync="pageConfig.current"
                :page-size-opts="[10, 20, 30, 40]"
                show-sizer
                show-elevator
                show-total
                v-bind="pageConfig"
                @on-change="onChangePageCurrent"
                @on-page-size-change="onChangePageSize"
            />
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { Table, Page } from 'view-ui-plus';

const props = defineProps({
    // 表格配置
    tableConfig: {
        type: Object,
        default() {
            return { columns: [], data: [] };
        },
    },
    // 分页配置
    pageConfig: {
        type: Object,
        default() {
            return {};
        },
    },
    // 是否有页码
    isHasPage: {
        type: Boolean,
        default: true,
    },
});

const emit = defineEmits(['onSelectionChange', 'onRowClick', 'onChangePageCurrent', 'onChangePageSize']);

const tableRef = ref();

// 选项改变
const onSelectionChange = (selection) => {
    emit('onSelectionChange', selection);
};
// 当某一行被点击时会触发
const onRowClick = (row, column, event) => {
    emit('onRowClick', row, column, event);
};
// change-分页页码
const onChangePageCurrent = (val) => {
    emit('onChangePageCurrent', val);
};
// change-分页条数
const onChangePageSize = (val) => {
    emit('onChangePageSize', val);
};
// 清空已选中的item
const clearSelection = (flag) => {
    tableRef.value.selectAll(flag);
};

defineExpose({ clearSelection, tableRef });
</script>

<style lang="less" scoped></style>
