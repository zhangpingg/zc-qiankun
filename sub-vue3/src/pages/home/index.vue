<script setup>
import { ref, onMounted } from 'vue';
import { GetExportList, tagSaveOrUpdate } from '@/api/account';

const name = ref();

const getApiData = async () => {
    const params2 = { current: 1, size: 10 };
    const res2 = await GetExportList(params2);
    console.log(res2);
    const params3 = { tagType: 1, tagValue: '444' };
    const res3 = await tagSaveOrUpdate(params3);
    console.log(res3);
};
const jumpPage = () => {
    history.pushState(null, '标题', '/sub-vue3/pageA');
};
onMounted(() => {
    console.log('路由参数：', history.state);
});
</script>

<template>
    <div>
        <h4>子应用: vue3-home</h4>
        <Input v-model="name" placeholder="请输入" style="width: 200px" />
        <Button @click="getApiData">调接口</Button> <br />
        <Button type="primary" @click="jumpPage">跳转pageA</Button>
    </div>
</template>

<style scoped></style>
