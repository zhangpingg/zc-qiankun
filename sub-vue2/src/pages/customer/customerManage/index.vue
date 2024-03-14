<template>
    <div>
        客户管理(vue2) <br />
        <Button type="primary" @click="jumpDetails1">客户管理详情</Button>
    </div>
</template>

<script setup>
import util from "@/libs/util";

const { jumpPage } = util.menu;

const jumpDetails1 = () => {
    jumpPage({ path: "/sub-vue2/customer/customerManage/detail" });
};
</script>

<style scoped></style>
