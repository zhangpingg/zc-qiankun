<template>
    <div>
        <Table :columns="tablePageData.tableConfig.columns" :data="tablePageData.tableConfig.data">
            <template #bb="{ row }">
                <strong>{{ row.bb }}</strong>
            </template>
        </Table>
        <!-- <TablePageNew :tableConfig="tablePageData.tableConfig">
            <template #bb="p">
                <div>{{ p }}11</div>
            </template>
        </TablePageNew> -->
    </div>
</template>

<script setup>
import { reactive, getCurrentInstance } from 'vue';
import { Table, Page } from 'view-ui-plus';
import TablePageNew from '@/components/tablePageNew';

const {
    proxy: { globalConst },
} = getCurrentInstance();

const tablePageData = reactive({
    tableConfig: {
        loading: false,
        columns: [
            { title: '姓名', key: 'aa', minWidth: 150 },
            { title: '姓名', slot: 'bb', minWidth: 150 },

            // { label: '全选', type: 'selection', width: 60, align: 'center', fixed: 'left' },
            // { label: '姓名', prop: 'aa', minWidth: 150 },
            // // personPhoneColumn('手机号', 'bb'),
            // { label: '状态1', prop: 'productLevel', minWidth: 100, slotName: 'productLevel' },
            // { label: '状态2', prop: 'dd', minWidth: 100, slotName: 'dd' },
            // { label: '状态3', prop: 'ee', minWidth: 100, slotName: 'ee' },
            // { label: '审核结论', prop: 'auditStatus', minWidth: 140, slotName: 'auditStatus' },
        ],
        data: [
            { id: 1, aa: '张三', bb: '18258261040', productLevel: 1, dd: true, ee: 1, auditStatus: 1 },
            { id: 2, aa: '李四', bb: '18258261041', productLevel: 2, dd: true, ee: 2, auditStatus: 2 },
            { id: 3, aa: '王五', bb: '18258261042', productLevel: 3, dd: false, ee: 3, auditStatus: 3 },
            { id: 4, aa: '赵六', bb: '18258261043', productLevel: 4, dd: null, ee: 4, auditStatus: 4 },
        ],
    },
    pageConfig: {
        currentPage: 1,
        pageSize: globalConst.paginationMap.pageSize,
        total: 0,
    },
});

// 获取数据
const getData = async () => {
    const { currentPage, pageSize } = tablePageData.pageConfig;
    const _params = {
        // ...tableFormRef.value.getFormData(),
        current: currentPage,
        sise: pageSize,
    };
    console.log('调接口', _params);
    try {
        tablePageData.tableConfig.loading = true;
        //const res = await apiGetRoleListByPage(_params);
        //tablePageData.tableConfig.data = res.list || [];
        //tablePageData.pageConfig.total = Number(res.total);
        tablePageData.tableConfig.loading = false;
    } catch (error) {
        tablePageData.tableConfig.loading = false;
    }
};
</script>

<style lang="less" scoped></style>
