<template>
    <div>
        <Table
            v-bind="{ rowKey: 'id', noDataText: '亲，没有找到相关记录哦！~', ...tableConfig }"
            @on-selection-change="onSelectionChange"
            @on-current-change="onRowClick"
        ></Table>
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

<script>
export default {
    data() {
        return {};
    },
    components: {},
    props: {
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
    },
    methods: {
        // 选择-表格复选框
        onSelectionChange(selection) {
            this.$emit('onSelectionChange', selection);
        },
        // 当某一行被点击时会触发
        onRowClick(currentRow) {
            this.$emit('highlightRowChange', currentRow);
        },
        // 清空选中的项
        clearSelection() {
            //tableRef.value.clearSelection();
        },
        // change-分页页码
        onChangePageCurrent(val) {
            this.$emit('onChangePageCurrent', val);
        },
        // change-分页条数
        onChangePageSize(val) {
            this.$emit('onChangePageSize', val);
        },
    },
};
</script>
