<template>
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
    </TablePage>
</template>

<script setup>
import { reactive, onMounted, resolveComponent, getCurrentInstance } from 'vue';
import TablePage from '@/components/tablePage';

const {
    proxy: { globalConst },
} = getCurrentInstance();

const tableData = reactive({
    tableConfig: {
        loading: false,
        columns: [
            { title: '全选', type: 'selection', align: 'center', width: 60, fixed: 'left' },
            { title: '门店名称', key: 'storeName', align: 'center', minWidth: 150 },
            {
                title: '联系人',
                key: 'ownerName',
                align: 'center',
                minWidth: 120,
                render: (h, p) => {
                    return [p.row.ownerName || '-'];
                },
            },
            {
                title: '操作',
                key: 'oprate',
                align: 'center',
                width: 110,
                fixed: 'right',
                render: (h, p) => {
                    return h(
                        resolveComponent('Button'),
                        {
                            type: 'primary',
                            onClick: () => {
                                goDetail(p.row);
                            },
                        },
                        () => '详情'
                    );
                },
            },
        ],
        data: [],
    },
    pageConfig: {
        current: 1,
        pageSize: globalConst.paginationMap.pageSize,
        total: 0,
    },
});

const selectedData = reactive([]);

onMounted(() => {
    getData();
});

// 获取数据
const getData = () => {
    const { current, pageSize } = tableData.pageConfig;
    const params = {
        current,
        size: pageSize,
    };
    console.log('params:', params);
    tableData.tableConfig.loading = true;
    setTimeout(() => {
        tableData.tableConfig.data = [
            { id: '1', storeName: '门店A', ownerName: '联系人1' },
            { id: '2', storeName: '门店B', ownerName: '' },
            { id: '3', storeName: '门店C', ownerName: '联系人1' },
        ];
        tableData.pageConfig.total = 3;
        tableData.tableConfig.loading = false;
    }, 1000);
};

// 详情点击事件
const goDetail = (row) => {
    console.log(row.id);
};
// current改变
const onPageChange = (val) => {
    tableData.pageConfig.current = val;
    getData();
};
// size改变
const onPageSizeChange = (val) => {
    tableData.pageConfig.current = 1;
    tableData.pageConfig.pageSize = val;
    getData();
};
// 选中一项，将数据添加至已选项中
const handleSelect = (selection, row) => {
    selectedData.push(row);
};
// 取消选中一项，将取消的数据从已选项中删除
const handleSelectCancel = (selection, row) => {
    const index = selectedData.findIndex((item) => item.id === row.id);
    selectedData.splice(index, 1);
};
// 当前页全选时，判断已选数据是否存在，不存在则添加
const handleSelectAll = (selection) => {
    selection.forEach((item) => {
        if (selectedData.findIndex((i) => i.id === item.id) < 0) {
            selectedData.push(item);
        }
    });
};
// 取消当前页全选时，将当前页的数据从已选项中删除
const handleSelectAllCancel = () => {
    const selection = tableData.tableConfig.data;
    selection.forEach((item) => {
        const index = selectedData.findIndex((i) => i.id === item.id);
        if (index >= 0) {
            selectedData.splice(index, 1);
        }
    });
};
</script>

<style lang="less" scoped></style>

