<template>
    <div class="table-page">
        <Table
            row-key="id"
            :disabled-hover="disHover"
            :stripe="list.stripe"
            :border="border"
            :columns="list.columns"
            :highlight-row="highlightRow"
            :data="list.data"
            :loading="list.loading"
            :load-data="list.handleLoadData"
            @on-selection-change="onSelectionChange"
            @on-current-change="onCurrentChange"
            @on-select="handleSelect"
            @on-select-cancel="handleSelectCancel"
            @on-select-all="handleSelectAll"
            @on-select-all-cancel="handleSelectAllCancel"
            :no-data-text="list.noDataText || '亲，没有找到相关记录哦！~'"
        ></Table>
        <slot name="extra"></slot>
        <div class="ivu-mt ivu-text-right" v-if="hasPage">
            <Page
                :current.sync="list.current"
                :total="Number(list.total)"
                :page-size-opts="[10, 20, 30, 40]"
                :page-size="list.size || 10"
                show-sizer
                show-elevator
                show-total
                @on-change="onPageChange"
                @on-page-size-change="onPageSizeChange"
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
        list: {
            type: Object,
            default: () => {},
        },
        border: {
            type: Boolean,
            default: false,
        },
        hasPage: {
            type: Boolean,
            default: true,
        },
        highlightRow: {
            type: Boolean,
            default: false,
        },
        disHover: {
            type: Boolean,
            default: false,
        },
    },
    methods: {
        onSelectionChange(selection) {
            this.$emit('onSelectionChange', selection);
        },
        onPageChange(val) {
            this.$emit('onPageChange', val);
        },
        onPageSizeChange(val) {
            this.$emit('onPageSizeChange', val);
        },
        getData() {
            this.$emit('getData');
        },
        onCurrentChange(currentRow) {
            this.$emit('highlightRowChange', currentRow);
        },
        handleSelect(selection, row) {
            this.$emit('handleSelect', selection, row);
        },
        handleSelectCancel(selection, row) {
            this.$emit('handleSelectCancel', selection, row);
        },
        handleSelectAll(selection) {
            this.$emit('handleSelectAll', selection);
        },
        handleSelectAllCancel(val) {
            this.$emit('handleSelectAllCancel', val);
        },
    },
};
</script>
