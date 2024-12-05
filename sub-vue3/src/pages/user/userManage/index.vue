<template>
    <div>
        <!--<PageHeader title="用户管理(vue3)" back hidden-breadcrumb></PageHeader>-->
        <!--<Button type="primary" @click="jumpDetails1">用户详情</Button>-->
        <TableForm
            ref="tableFormNewRef"
            :formConfig="{ labelWidth: 140 }"
            :formList="formList"
            @onSubmit="search"
            @onReset="reset"
        >
            <template #extraBtn>
                <Button type="error" class="ml-8">导出</Button>
            </template>
        </TableForm>
        <!--<button @click="getFormData">获取表单数据</button>
        <TablePage
            :tableConfig="tableData.tableConfig"
            :pageConfig="tableData.pageConfig"
            @onPageChange="onPageChange"
            @onPageSizeChange="onPageSizeChange"
            @handleSelect="handleSelect"
            @handleSelectCancel="handleSelectCancel"
            @handleSelectAll="handleSelectAll"
            @handleSelectAllCancel="handleSelectAllCancel"
        >
            <template #extra>这是底部插槽</template>
        </TablePage>-->
    </div>
</template>

<script setup>
import { ref, reactive, onMounted, markRaw, watch } from 'vue';
import { Button } from 'view-ui-plus';
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

const jumpDetails1 = () => {
    jumpPage({ path: '/sub-vue3/user/userManage/detail' });
};

const formRef = ref(null);
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

// 查询
const search = (formData) => {
    console.log('查询条件：', formData);
};
// 重置
const reset = (formData) => {
    console.log('点击重置了', formData);
};

onMounted(() => {});
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
