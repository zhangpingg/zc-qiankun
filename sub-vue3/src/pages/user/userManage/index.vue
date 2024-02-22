<template>
    <div>
        用户管理(vue3) <br />
        <Button type="primary" @click="jumpDetails1">用户详情</Button>
    </div>
</template>

<script setup>
import util from '@/libs/util';

const { jumpPage } = util.tool;

const jumpDetails1 = () => {
    jumpPage({ path: '/sub-vue3/user/userManage/userDetail' });
};
</script>

<style scoped></style>
