<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
const $router = useRouter();

const jump2 = () => {
    $router.push("sub-vue2/home");
};
const jump3 = () => {
    $router.push("sub-vue3/home");
};
</script>

<template>
    <h4>基座-登录页面</h4>
    <Button type="primary" @click="jump2">跳转到子应用vue2</Button> <br /><br />
    <Button type="primary" @click="jump3">跳转到子应用vue3</Button>
</template>

<style scoped></style>
