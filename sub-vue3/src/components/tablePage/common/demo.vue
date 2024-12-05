<template>
    <div>
        <Table :columns="columns1" :data="data1"></Table>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { personNameNormalColumn } from '@/components/tablePage/common/normalColumn';
import { statusBadgeRenderColumn, tagsRenderColumn } from '@/components/tablePage/common/renderColumn';
const columns1 = ref([
    // 默认
    personNameNormalColumn(),
    // 修改title或key
    personNameNormalColumn('姓名'),
    personNameNormalColumn(null, 'name'),
    personNameNormalColumn('姓名', 'name'),
    // 修改其他属性
    personNameNormalColumn({ title: '姓名', key: 'name', minWidth: 100, fixed: 'left' }),
    personNameNormalColumn({ minWidth: 100, fixed: 'left' }),
    // render状态
    statusBadgeRenderColumn(null, ['假', '真']),
    statusBadgeRenderColumn({ title: '某种状态', key: 'someStatus', minWidth: 160 }, ['假', '真']),
    // render标签
    tagsRenderColumn(null, onClose),
    tagsRenderColumn({ title: '某种标签', key: 'someTags', minWidth: 160 }, onClose),
]);
const data1 = ref([]);
const onClose = (row, tagItem) => {
    console.log('单个标签删除事件', row, tagItem);
};
</script>

