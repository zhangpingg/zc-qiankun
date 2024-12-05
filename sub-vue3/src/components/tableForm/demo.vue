<template>
    <TableForm :formList="formList" @onSubmit="search" @onReset="reset" ref="formRef">
        <template #extraBtn>
            <Button type="error" class="ml-8">导出</Button>
        </template>
    </TableForm>
    <button @click="getFormData">获取表单数据</button>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import TableForm from './index.vue';
import { inputTmplItem, storeInputItem } from '@/components/tableForm/common/inputItem';
import {
    getCurrentYear,
    getPrevYearMoth,
    yearDateItem,
    monthDateItem,
    monthRangeDateItem,
    dateRangeTmplItem,
    dateTimeRangeTmplItem,
} from '@/components/tableForm/common/dateItem';

// 异步加载级联数据
const loadCascaderData = (item, callback) => {
    item.loading = true;
    setTimeout(() => {
        if (item.value === 'beijing') {
            item.children = [
                {
                    value: 'csdn',
                    label: 'CSDN',
                },
                {
                    value: 'baidu',
                    label: '百度',
                },
                {
                    value: 'sina',
                    label: '新浪',
                },
            ];
        } else if (item.value === 'hangzhou') {
            item.children = [
                {
                    value: 'ali',
                    label: '阿里巴巴',
                },
                {
                    value: '163',
                    label: '网易',
                },
            ];
        }
        item.loading = false;
        callback();
    }, 1000);
};

const formRef = ref(null);
const formList = reactive([
    { ...inputTmplItem, label: '自定义名称', prop: '自定义key' }, // 自定义输入框模板，扩展后，可拼接自定义数据
    storeInputItem, // 门店（也可以扩展后，拼接自定义数据，下面均同理）
    { ...yearDateItem, value: getCurrentYear() }, // 年份，默认当前年
    { ...monthDateItem, value: getPrevYearMoth() }, // 月份，默认上一个月
    monthRangeDateItem, // 月份区间
    { ...dateRangeTmplItem, isJoinTimeSuffix: true }, // 日期区间-模板
    dateTimeRangeTmplItem, // 日期时间区间-模板

    {
        type: 'select',
        label: '静态下拉框',
        prop: 'bb',
        options: [
            {
                label: '启用',
                value: 1,
            },
            {
                label: '停用',
                value: 2,
            },
        ],
    },
    {
        type: 'select',
        label: '静态下拉框+默认值',
        prop: 'cc',
        options: [
            {
                label: '原材料仓库',
                value: 0,
            },
            {
                label: '半成品仓库',
                value: 1,
            },
            {
                label: '产成品仓库',
                value: 2,
            },
            {
                label: '五金仓库',
                value: 3,
            },
        ],
        value: 1,
    },
    {
        type: 'select',
        label: '异步获取下拉的数据',
        prop: 'dd',
        options: [],
    },
    {
        type: 'cascader',
        label: '级联+异步',
        prop: 'ee',
        placeholder: '请选择',
        options: [],
        filterable: true,
    },
    {
        type: 'cascaderLoadData',
        label: '级联+懒加载',
        prop: 'ff',
        options: [
            {
                value: 'beijing',
                label: '北京',
                children: [],
                loading: false,
            },
            {
                value: 'hangzhou',
                label: '杭州',
                children: [],
                loading: false,
            },
        ],
        loadData: loadCascaderData,
    },
    // 经销商用户列表，异步搜索加载数据
    {
        type: 'custom',
        label: '自定义选项',
        prop: 'zz',
        placeholder: '占位符',
        customComponent: 'DistributorUser',
    },
]);

// 获取-dd的options-异步
const getDdOptions = () => {
    setTimeout(() => {
        const list = [
            {
                label: '原材料仓库2',
                value: 0,
            },
            {
                label: '半成品仓库2',
                value: 1,
            },
            {
                label: '产成品仓库2',
                value: 2,
            },
        ];
        formList[3].options = list;
    }, 2000);
};
// 获取-级联数据
const getCascaderData = () => {
    setTimeout(() => {
        const list = [
            {
                value: '0',
                label: '挂牌店',
                children: [
                    {
                        value: '10',
                        label: '布门头',
                    },
                    {
                        value: '11',
                        label: '彩钢',
                    },
                    {
                        value: '12',
                        label: '铝塑板+PVC ',
                    },
                    {
                        value: '13',
                        label: '铝塑板+发光字 ',
                    },
                ],
            },
            {
                value: '1',
                label: '快捷服务店   ',
                children: [
                    {
                        value: '20',
                        label: '标准店',
                    },
                    {
                        value: '21',
                        label: '高阶店',
                    },
                    {
                        value: '22',
                        label: '集装箱店',
                    },
                ],
            },
            {
                value: '2',
                label: '车空间',
                children: [
                    {
                        value: '30',
                        label: '经销商车空间',
                    },
                    {
                        value: '31',
                        label: '零售商车空间',
                    },
                    {
                        value: '32',
                        label: '集装箱店',
                    },
                ],
            },
        ];
        formList[4].options = list;
    }, 2000);
};
// 查询
const search = (formData) => {
    console.log('查询条件：', formData);
};
// 重置
const reset = (formData) => {
    console.log('点击重置了', formData);
};
// 获取表单数据
const getFormData = () => {
    console.log('数据', formRef.value.getFormData());
};

onMounted(() => {
    getDdOptions();
    getCascaderData();
});
</script>

<style scoped></style>
