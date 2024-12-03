<template>
    <div>
        <PageHeader title="客户管理(vue2) " hidden-breadcrumb>
            <div slot="action">
                <Button class="ivu-ml-8" type="error" :loading="loadings.export"> 导出 </Button>
            </div>
        </PageHeader>
        <Card :bordered="false" dis-hover class="ivu-mt">
            <TableFormNew
                ref="tableFormNewRef"
                :formConfig="{ 'label-width': 140 }"
                :formList="formList"
                @onSubmit="onSubmit"
                @onReset="onReset"
            />
            <TablePage
                :list="tableConfig"
                @onPageChange="onPageChange"
                @onPageSizeChange="onPageSizeChange"
                @onSelectionChange="onSelectionChange"
            />
        </Card>
        <Button type="primary">客户管理详情</Button>
    </div>
</template>

<script>
import TableFormNew from '@/components/tableFormNew';
import TablePage from '@/components/tablePage';
import { inputTmplItem, storeInputItem } from '@/components/tableFormNew/common/inputItem';
import {
    getCurrentYear,
    getPrevYearMoth,
    yearDateItem,
    monthDateItem,
    monthRangeDateItem,
    dateRangeTmplItem,
    dateTimeRangeTmplItem,
} from '@/components/tableFormNew/common/dateItem';
//import { renderButton } from '@/libs/util.render';
export default {
    components: { TableFormNew, TablePage },
    data() {
        return {
            formList: [
                { ...inputTmplItem, label: '输入框', prop: 'aa' }, // 自定义输入框模板，扩展后，可拼接自定义数据
                storeInputItem, // 业务-门店（也可以扩展后，拼接自定义数据，下面均同理）
                {
                    type: 'select',
                    label: '静态下拉框',
                    prop: 'bb',
                    options: [
                        { label: '启用', value: 1 },
                        { label: '停用', value: 2 },
                    ],
                    value: 1,
                },
                { ...yearDateItem, value: getCurrentYear() }, // 年份，默认当前年
                { ...monthDateItem, value: getPrevYearMoth() }, // 月份，默认上一个月
                monthRangeDateItem, // 月份区间
                { ...dateRangeTmplItem, isJoinTimeSuffix: true }, // 日期区间-模板
                dateTimeRangeTmplItem, // 日期时间区间-模板
                {
                    type: 'cascader',
                    label: '级联+异步',
                    prop: 'cc',
                    placeholder: '请选择',
                    options: [
                        {
                            value: '1',
                            label: '一级',
                            children: [
                                {
                                    value: '1-1',
                                    label: '一级-子级1',
                                },
                                {
                                    value: '1-2',
                                    label: '一级-子级2',
                                },
                            ],
                        },
                        {
                            value: '2',
                            label: '二级',
                            children: [
                                {
                                    value: '2-1',
                                    label: '二级-子级1',
                                },
                            ],
                        },
                    ],
                    filterable: true,
                    //value: ['1', '1-2'],
                },
                //departmentCascaderItem,
                //distributorEnableSelectItem,
                //businessStatusItem,
                //reimburseStatusItem,
                //materialInfoStatusItem,
            ],
            tableConfig: {
                current: 1,
                size: window?.$pageSize,
                total: 0,
                columns: [
                    //...columns,
                    { title: 'ID', key: 'sn', minWidth: 160 },
                    //{
                    //    title: '操作',
                    //    width: 140,
                    //    fixed: 'right',
                    //    render: (h, p) => {
                    //        let btnList = [
                    //            renderButton(h, { text: '查看', type: 'primary' }, () => {
                    //                this.checkDetail(p.row);
                    //            }),
                    //        ];
                    //        return btnList;
                    //    },
                    //},
                ],
                data: [],
                loading: false,
            },
            selectList: [],
            loadings: {
                export: false,
            },
        };
    },
    methods: {
        // 获取数据
        async getData() {
            try {
                this.tableConfig.loading = true;
                let formData = this.$refs['tableFormNewRef'].getFormData();
                console.log(11, formData);
                this.tableConfig.loading = false;
            } catch (error) {
                this.tableConfig.loading = false;
            }
        },
        onPageChange(val) {
            this.tableConfig.current = val;
            this.getData();
        },
        onPageSizeChange(val) {
            this.tableConfig.current = 1;
            this.tableConfig.size = val;
            this.getData();
        },
        onSelectionChange(data) {
            this.selectList = data;
        },
        // 查询
        onSubmit() {
            this.tableConfig.current = 1;
            this.getData();
        },
        // 重置
        onReset() {
            this.tableConfig.current = 1;
            this.tableConfig.size = window.$pageSize;
            this.getData();
        },
        // 查看详情
        checkDetail(row) {
            console.log(11, row);
        },
    },
};
</script>
<!--<script setup>
import util from "@/libs/util";

const { jumpPage } = util.menu;

const jumpDetails1 = () => {
    jumpPage({ path: "/sub-vue2/customer/customerManage/detail" });
};
</script>-->

<style lang="less" scoped></style>
