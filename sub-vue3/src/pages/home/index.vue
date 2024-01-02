<script setup>
import { ref } from "vue";
</script>

<template>
    <div>
        <h4>子应用: vue3</h4>
        <router-link to="/sub-vue3/pageA">跳转pageA</router-link>
        <Button type="primary">Ui按钮</Button>
    </div>
</template>

<style scoped></style>
