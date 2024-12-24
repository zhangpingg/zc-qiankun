<template>
    <div>
        <PageHeader title="用户管理(vue3)【表格：1.0】" hidden-breadcrumb>
            <template #action>
                <Button type="primary" :loading="loadings.export">导出</Button>
            </template>
        </PageHeader>
        <Button type="primary" @click="jumpDetails">查看详情</Button>
        <div class="main-card">
            <TableForm
                ref="tableFormRef"
                :formConfig="{ labelWidth: 140 }"
                :formList="formList"
                @onSubmit="onSubmit"
                @onReset="onReset"
            >
                <template #extraBtn>
                    <Button type="error" class="ml-8">导出</Button>
                </template>
            </TableForm>
            <Alert show-icon class="ivu-mt cm-alert">
                <div>
                    已选择 <strong :style="{ color: ' #2d8cf0' }">{{ selectList.length }}</strong> 项
                    <a class="ivu-ml" @click="clearSelected">清空</a>
                </div>
            </Alert>
            <TablePage
                ref="tablePageRef"
                :tableConfig="tablePageData.tableConfig"
                :pageConfig="tablePageData.pageConfig"
                @onSelectionChange="changeSelection"
                @onChangePageCurrent="changePageCurrent"
                @onChangePageSize="changePageSize"
            >
                <template #extra>这是底部插槽</template>
            </TablePage>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted, markRaw, watch, getCurrentInstance } from 'vue';
import { Button, Alert } from 'view-ui-plus';
// 筛选条件
import TableForm from '@/components/tableForm';
import { storeInputItem } from '@/components/tableForm/common/inputItem';
import { enableStatusSelectItem } from '@/components/tableForm/common/selectItem';
import {
    getCurrentYear,
    getPrevYearMoth,
    yearDateItem,
    monthDateItem,
    monthRangeDateItem,
    dateRangeTmplItem,
    dateTimeRangeTmplItem,
} from '@/components/tableForm/common/dateItem';
import { dynamicSelectItem, dynamicSelectItemOptions } from '@/components/tableForm/common/dynamicSelectItem';
import { dynamicCascaderItem, dynamicCascaderItemOptions } from '@/components/tableForm/common/dynamicCascaderItem';
import CustomComponent from '@/components/tableForm/components/CustomComponent';
// 表格
import TablePage from '@/components/tablePage';
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
import { badgeRenderColumn, tagsRenderColumn } from '@/components/tablePage/common/renderColumn';
import { getLabelByValue, aduitStatusDict } from '@/dicts.js';
// 其他
import { jumpPage } from '@/libs/util.menu.js';
import { resData } from './const';

const {
    proxy: { globalConst },
} = getCurrentInstance();

const tableFormRef = ref();
const tablePageRef = ref(null);
const formList = reactive([
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
        value: ['1', '1-2'],
    },
    dynamicSelectItem,
    dynamicCascaderItem,
    {
        type: 'custom',
        label: '自定义-城市',
        prop: 'zz',
        customComponent: markRaw(CustomComponent),
        placeholder: '占位符',
        value: 'hangzhou',
    },
]);
const tablePageData = reactive({
    tableConfig: {
        loading: false,
        columns: [
            { type: 'selection', width: 60, align: 'center', fixed: 'left' },
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
            badgeRenderColumn({ title: '审核状态', key: 'ii' }, aduitStatusDict), // Badge 徽章
            tagsRenderColumn({ title: '某种标签', key: 'jj' }, (row, item) => deleteTag(row, item)), // Tag标签列表（带删除功能）
            { title: '字典', key: '_ii', minWidth: 100 }, // 字典
        ],
        data: [],
    },
    pageConfig: {
        current: 1,
        pageSize: globalConst.paginationMap.pageSize,
        total: 0,
    },
});
const selectList = ref([]);
const loadings = reactive({ export: false });

// 获取数据
const getData = async () => {
    try {
        const { current, pageSize } = tablePageData.pageConfig;
        const params = {
            ...tableFormRef.value.getFormData(),
            current: current,
            sise: pageSize,
        };
        console.log('筛选条件', params);
        tablePageData.tableConfig.loading = true;
        tablePageData.tableConfig.data = resData.map((item) => {
            item._ii = getLabelByValue(aduitStatusDict, item.ii);
            return item;
        });
        tablePageData.pageConfig.total = 100;
        tablePageData.tableConfig.loading = false;
    } catch (error) {
        tablePageData.tableConfig.loading = false;
    }
};
// change-复选框
const changeSelection = (list) => {
    selectList.value = list.map((item) => item.id);
};
// 清空已选中的item
const clearSelected = () => {
    tablePageRef.value.clearSelection(false);
};
// change-分页页码
const changePageCurrent = (val) => {
    tablePageData.pageConfig.current = val;
    getData();
};
// change-分页条数
const changePageSize = (val) => {
    tablePageData.pageConfig.pageSize = val;
    tablePageData.pageConfig.current = 1;
    getData();
};
// 查询
const onSubmit = () => {
    tablePageData.pageConfig.current = 1;
    getData();
};
// 重置
const onReset = () => {
    tablePageData.pageConfig.pageSize = globalConst.paginationMap.pageSize;
    tablePageData.pageConfig.current = 1;
    getData();
};
// 删除标签
const deleteTag = (row, item) => {
    console.log('删除标签', row, item);
};
const jumpDetails = () => {
    jumpPage({ path: '/sub-vue3/user/userManage/detail' });
};

onMounted(() => {
    getData();
});
// 需要赋值，页面才会重新渲染；直接修改内部值是，页面是不好重新渲染的
watch(
    [dynamicSelectItemOptions, dynamicCascaderItemOptions],
    ([newVal1, newVal2]) => {
        formList[10].options = newVal1;
        formList[11].options = newVal2;
    },
    {
        deep: true,
    }
);
</script>

<style lang="less" scoped></style>

