<script setup>
import { ref } from 'vue';
const name = ref();
</script>

<template>
    <div>
        <h4>pageA页面</h4>
        <Input v-model="name" placeholder="请输入" style="width: 200px" />
        <router-link to="/sub-vue3/home">跳转pageA</router-link>
    </div>
</template>

<style scoped></style>
