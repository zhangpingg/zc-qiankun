<template>
    <div class="t">
        <PageHeader title="test(vue3)【表格：2.0】" hidden-breadcrumb>
            <template #action>
                <Button type="primary" :loading="loadings.export">导出</Button>
            </template>
        </PageHeader>
        <div class="main-card t-main">
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
            <TablePageNew
                ref="tablePageRef"
                :tableConfig="tablePageData.tableConfig"
                :pageConfig="tablePageData.pageConfig"
                @onSelectionChange="changeSelection"
                @onChangePageCurrent="changePageCurrent"
                @onChangePageSize="changePageSize"
            >
                <template #ii1="{ row }">
                    <span :style="{ color: getLabelByValue(aduitStatusDict, row.ii, 'color') }">
                        {{ getLabelByValue(aduitStatusDict, row.ii) }}
                    </span>
                </template>
                <template #ii2="{ row }">
                    <Badge
                        :color="getLabelByValue(aduitStatusDict, row.ii, 'color')"
                        :text="getLabelByValue(aduitStatusDict, row.ii)"
                        v-if="isValidVal(row.ii)"
                    />
                    <span v-else>-</span>
                </template>
                <template #jj="{ row }">
                    <div v-if="isValidArr(row.jj)">
                        <Tag v-for="item in row.jj" :key="item.value" closable @on-close="deleteTag(row, item)">
                            {{ item.label }}
                        </Tag>
                    </div>
                    <span v-else>-</span>
                </template>
                <template #kk="{ row }">
                    <div v-viewer="{ movable: true }" class="pt-2" v-if="isValidArr(row.kk)">
                        <div
                            class="mr-5 mt-2 mb-2"
                            v-for="item in row.kk"
                            :key="item"
                            style="position: relative; width: 60px; height: 40px; display: inline-block"
                        >
                            <img :src="item" style="width: 60px; height: 40px" />
                            <Icon
                                type="ios-add-circle-outline"
                                style="z-index: 1; position: absolute; bottom: 2px; right: 2px; color: #fff"
                            />
                        </div>
                    </div>
                    <span v-else>-</span>
                </template>
                <template #ll="{ row }">
                    <Input
                        v-model="row.ll"
                        @onChange="
                            (e) => {
                                tablePageData.tableConfig.data[row._index].ll = e?.target.value;
                            }
                        "
                    />
                </template>
                <template #action="{ row }">
                    <Button type="primary" size="small" @click="checkDetail(row)">查看</Button>
                </template>
            </TablePageNew>
            <Button @click="getTableList">获取列表数据</Button>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted, markRaw, watch, getCurrentInstance } from 'vue';
import { Button, Input, Alert } from 'view-ui-plus';
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
import TablePageNew from '@/components/tablePageNew';
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
import { getLabelByValue, aduitStatusDict } from '@/dicts.js';
import { isValidVal, isValidArr } from '@/libs/util.tool';
// 其他
import { jumpPage } from '@/libs/util.menu';
import { resMock } from './const';

const {
    proxy: { globalConst },
} = getCurrentInstance();

const tableFormRef = ref();
const tablePageRef = ref(null);
const loadings = reactive({ export: false });
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
            { title: '审核状态', key: 'ii', slot: 'ii1', minWidth: 120 }, // 彩色文字
            { title: '审核状态', key: 'ii', slot: 'ii2', minWidth: 120 }, // Badge 徽章
            { title: '某种标签', key: 'jj', slot: 'jj', minWidth: 180 }, // Tag标签列表（带删除功能）
            { title: '字典', key: '_ii', minWidth: 100 }, // 字典
            { title: '预览图片', key: 'kk', slot: 'kk', minWidth: 200 }, // 预览图片
            //  编辑输入框
            {
                title: '编辑输入框',
                key: 'll',
                slot: 'll',
                minWidth: 160,
                renderHeader: (h, p) => {
                    const btn = h(
                        'span',
                        {
                            style: { color: '#2d8cf0', cursor: 'pointer' },
                            onClick: () => {
                                tablePageData.tableConfig.data.map((item) => {
                                    item.ll = null;
                                });
                            },
                        },
                        '清空'
                    );
                    return h('div', [h('span', { class: 'mr-10' }, '编辑输入框'), btn]);
                },
            },
            // 可展开（此处使用插槽无效，仍使用 h 函数）
            {
                title: '可展开',
                key: 'mm',
                type: 'expand',
                minWidth: 100,
                render: (h, { row }) => {
                    return h('div', row.mm);
                },
            },
            { title: '操作', slot: 'action', fixed: 'right', minWidth: 100 }, // 操作列
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
        tablePageData.tableConfig.data = resMock.list.map((item) => {
            item._ii = getLabelByValue(aduitStatusDict, item.ii);
            return item;
        });
        tablePageData.pageConfig.total = Number(resMock.total);
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
// 查看详情
const checkDetail = (row) => {
    console.log('查看', row);
    jumpPage({ path: '/sub-vue3/user/userApply/detail' });
};
// 获取列表数据
const getTableList = () => {
    console.log(11, tablePageData.tableConfig.data);
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

<style lang="less" scoped>
.t {
    .t-main {
        :deep(.ivu-table-cell-with-expand) {
            position: relative;
            left: -25px;
        }
        :deep(.ivu-table-expanded-cell) {
            padding-left: 80px;
        }
    }
}
</style>
