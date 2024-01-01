<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
const $router = useRouter();

const jump3 = () => {
  $router.push("sub-vue/home");
};
const jump2 = () => {
  $router.push("/childVue");
};
</script>

<template>
  <h4>登录页面</h4>
  <button @click="jump3">跳转到子应用vue3</button>
  <button @click="jump2">跳转到子应用vue2</button>
</template>

<style scoped></style>
