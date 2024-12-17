<template>
    <div>
        <Table ref="tableRef" v-bind="{ rowKey: 'id', noDataText: '亲，没有找到相关记录哦！~', ...tableConfig }">
            <template
                v-slot:[item.slot]
                v-for="(item, index) in tableConfig.columns.filter((item) => !!item.slot)"
                :key="index"
            >
                <slot :name="item.slot"></slot>
            </template>
        </Table>
    </div>
</template>

<script setup>
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
    // 空单元格内容
    emptyCellContent: {
        type: String,
        default: '-',
    },
});
</script>

<style lang="less" scoped></style>
