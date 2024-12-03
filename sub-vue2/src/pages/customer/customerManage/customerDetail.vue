<template>
    <div>
        客户管理详情(vue2)
        <Button @click="jumpPrevPage">返回</Button>
    </div>
</template>

<script setup>
import util from "@/libs/util";

const { jumpPage, transPathToName } = util.menu;

// 返回的时候，关闭顶部的tab，并返回到列表页
const jumpPrevPage = () => {
    window.$basePageStore.closeTab(transPathToName(location.pathname));
    jumpPage({ path: "/sub-vue2/customer/customerManage/index" });
};
</script>

<style scoped></style>
