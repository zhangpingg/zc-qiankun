<template>
    <div>
        用户申请(vue3) <br />
        <Button type="primary" @click="jumpDetails1">申请详情</Button>
    </div>
</template>

<script setup>
import util from '@/libs/util';

const { jumpPage } = util.tool;

const jumpDetails1 = () => {
    jumpPage({ path: '/sub-vue3/user/userApply/applyDetail' });
};
</script>

<style scoped></style>
