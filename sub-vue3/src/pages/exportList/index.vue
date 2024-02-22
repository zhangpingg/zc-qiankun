<template>
    <div>
        导出列表(vue3) <br />
        <Button type="primary" @click="getData">掉接口</Button>
    </div>
</template>

<script setup>
import { GetExportList, SaveOrUpdateTag } from '@/api/export';

const getData = async () => {
    const params1 = { current: 1, size: 10 };
    const res1 = await GetExportList(params1);
    const params2 = { tagType: 1, tagValue: '4444' };
    const res2 = await SaveOrUpdateTag(params2);
    console.log('接口返回结果：', res1, res2);
};
</script>

<style scoped></style>
