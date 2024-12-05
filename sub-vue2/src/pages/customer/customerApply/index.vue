<template>
    <div>
        员工申请(vue2) <br />
        <Button type="primary" @click="jumpDetails">申请详情</Button>
    </div>
</template>

<script setup>
import { jumpPage } from '@/libs/util.menu';

const jumpDetails = () => {
    jumpPage({ path: '/sub-vue2/customer/userApply/detail' });
};
</script>

<style scoped></style>
