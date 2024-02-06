<script setup>
import { ref } from 'vue';
const name = ref();

const jumpPage = () => {
    window.history.pushState(null, '标题', '/sub-vue3/home');
};
</script>

<template>
    <div>
        <h4>子应用: vue3-pageA</h4>
        <Input v-model="name" placeholder="请输入" style="width: 200px" /> <br>
        <Button type="primary" @click="jumpPage">跳转home</Button>
    </div>
</template>

<style scoped></style>
