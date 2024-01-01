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
  <button @click="jump2">跳转到子应用vue2</button>
  <button @click="jump3">跳转到子应用vue3</button>
</template>

<style scoped></style>
