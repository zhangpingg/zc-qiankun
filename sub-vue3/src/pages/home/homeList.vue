<script setup>
import { ref } from 'vue';
import { GetExportList, tagSaveOrUpdate } from '@/api/account';

const name = ref();

const getData = async () => {
    const params2 = { current: 1, size: 10 };
    const res2 = await GetExportList(params2);
    console.log(res2);
    const params3 = { tagType: 1, tagValue: '444' };
    const res3 = await tagSaveOrUpdate(params3);
    console.log(res3);
};
</script>

<template>
    <div>
        <h4>子应用: vue3</h4>
        <router-link to="/sub-vue3/pageA">跳转pageA</router-link>
        <Button type="primary" @click="getData">调接口</Button>
        <Input v-model="name" placeholder="请输入" style="width: 200px" />
    </div>
</template>

<style scoped></style>
