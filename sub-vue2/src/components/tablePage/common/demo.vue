<template>
    <div>
        <Table :columns="columns1" :data="data1"></Table>
    </div>
</template>

<script>
import { personNameNormalColumn } from '@/components/tablePage/common/normalColumn';
import { statusBadgeRenderColumn, tagsRenderColumn } from '@/components/tablePage/common/renderColumn';

export default {
    data() {
        return {
            columns1: [
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
                tagsRenderColumn(null, this.onClose),
                tagsRenderColumn({ title: '某种标签', key: 'someTags', minWidth: 160 }, this.onClose),
            ],
            data1: [],
        };
    },
    methods: {
        onClose(row, tagItem) {
            console.log('单个标签删除事件', row, tagItem);
        },
    },
};
</script>
