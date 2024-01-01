<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
const $router = useRouter();

const jump = () => {
  $router.push("sub-vue/home");
};
</script>

<template>
  <h4>登录页面</h4>
  <button @click="jump">跳转到子应用vue3</button>
</template>

<style scoped></style>
