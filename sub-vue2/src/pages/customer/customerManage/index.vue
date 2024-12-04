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
                :tableConfig="tablePageData.tableConfig"
                :pageConfig="tablePageData.pageConfig"
                @onSelectionChange="onSelectionChange"
                @onChangePageCurrent="changePageCurrent"
                @onChangePageSize="changePageSize"
            />
        </Card>
        <Button type="primary">客户管理详情</Button>
    </div>
</template>

<script>
import TableFormNew from '@/components/tableFormNew';
import TablePage from '@/components/tablePage';
import { storeInputItem } from '@/components/tableFormNew/common/inputItem';
import { enableStatusSelectItem } from '@/components/tableFormNew/common/selectItem';
import {
    getCurrentYear,
    getPrevYearMoth,
    yearDateItem,
    monthDateItem,
    monthRangeDateItem,
    dateRangeTmplItem,
    dateTimeRangeTmplItem,
} from '@/components/tableFormNew/common/dateItem';
import { dynamicSelectItem } from '@/components/tableFormNew/common/dynamicSelectItem';
import { dynamicCascaderItem } from '@/components/tableFormNew/common/dynamicCascaderItem';
import CustomComponent from '@/components/tableFormNew/components/CustomComponent';
import {
    personNameNormalColumn,
    personPhoneNormalColumn,
    dateNormalColumn,
    numberNormalColumn,
    idNormalColumn,
    nameStrNormalColumn,
    remarkNormalColumn,
    orderNoNormalColumn,
} from '@/components/tablePage/common/normalColumn';
import Setting from '@/setting';
import { resData } from './const';
//import { renderButton } from '@/libs/util.render';

export default {
    components: { TableFormNew, TablePage },
    data() {
        return {
            formList: [
                { type: 'input', label: '输入框', prop: 'aa' }, // 输入框
                { ...storeInputItem, prop: 'bb' }, // 业务-输入框（也可以扩展后，拼接自定义数据，下面均同理）
                {
                    type: 'select',
                    label: '静态-下拉框',
                    prop: 'cc',
                    options: [
                        { label: '选项一', value: 1 },
                        { label: '选项二', value: 2 },
                        { label: '选项三', value: 3 },
                    ],
                    value: 1,
                },
                { ...enableStatusSelectItem, prop: 'cc2' }, // 业务-下拉框
                { ...yearDateItem, value: getCurrentYear(), prop: 'dd' }, // 年份，默认当前年
                { ...monthDateItem, value: getPrevYearMoth(), prop: 'ee' }, // 月份，默认上一个月
                { ...monthRangeDateItem, prop: ['ff1', 'ff2'] }, // 月份区间
                { ...dateRangeTmplItem, isJoinTimeSuffix: true, prop: ['gg1', 'gg2'] }, // 日期区间-模板
                { ...dateTimeRangeTmplItem, prop: ['hh1', 'hh2'] }, // 日期时间区间-模板
                {
                    type: 'cascader',
                    label: '级联',
                    prop: 'ii',
                    placeholder: '请选择',
                    options: [
                        {
                            label: '安徽省',
                            value: '1',
                            children: [
                                { label: '黄山市', value: '1-1' },
                                { label: '安庆市', value: '1-2' },
                            ],
                        },
                        {
                            label: '浙江省',
                            value: '2',
                            children: [
                                { label: '杭州市', value: '2-1' },
                                { label: '金华市', value: '2-2' },
                            ],
                        },
                    ],
                    filterable: true,
                    //value: ['1', '1-2'],
                },
                dynamicSelectItem,
                dynamicCascaderItem,
                {
                    type: 'custom',
                    label: '自定义-城市',
                    prop: 'zz',
                    customComponent: CustomComponent,
                    placeholder: '占位符',
                    //value: 'hangzhou'
                },
            ],
            tablePageData: {
                tableConfig: {
                    loading: false,
                    columns: [
                        { title: '正常列', key: 'id', minWidth: 100 }, // 正常列
                        personNameNormalColumn(), // 姓名（默认）
                        personNameNormalColumn('姓名2'),
                        personNameNormalColumn(null, 'aa'),
                        personNameNormalColumn('姓名4', 'aa'),
                        personNameNormalColumn({ minWidth: 80 }),
                        personNameNormalColumn({ title: '姓名6', key: 'aa', minWidth: 80 }),
                        personPhoneNormalColumn(null, 'bb'), // 手机号
                        dateNormalColumn(null, 'cc'), // 时间
                        numberNormalColumn(null, 'dd'), // 数字、金额
                        idNormalColumn('编号', 'ee'), // 编号
                        nameStrNormalColumn('公司名称', 'ff'), // 某某什么名称  如：公司名称
                        remarkNormalColumn(null, 'gg'), // 备注
                        orderNoNormalColumn(null, 'hh'), // 业务-订单编号
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
                },
                pageConfig: {
                    current: 1,
                    pageSize: Setting.pageSize,
                    total: 0,
                },
            },

            selectList: [],
            loadings: {
                export: false,
            },
        };
    },
    mounted() {
        this.getData();
    },
    methods: {
        // 获取数据
        async getData() {
            try {
                const { current, pageSize } = this.tablePageData.pageConfig;
                this.tablePageData.tableConfig.loading = true;
                let formData = this.$refs['tableFormNewRef'].getFormData();
                const params = {
                    ...formData,
                    current,
                    pageSize,
                };
                console.log('筛选条件', params);
                this.tablePageData.tableConfig.data = resData;
                this.tablePageData.pageConfig.total = 100;
                this.tablePageData.tableConfig.loading = false;
            } catch (error) {
                this.tablePageData.tableConfig.loading = false;
            }
        },
        // change-分页页码
        changePageCurrent(val) {
            this.tablePageData.pageConfig.current = val;
            this.getData();
        },
        // change-分页条数
        changePageSize(val) {
            this.tablePageData.pageConfig.current = 1;
            this.tablePageData.pageConfig.pageSize = val;
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

<style lang="less" scoped></style>
