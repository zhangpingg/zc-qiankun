<template>
    <div>
        用户详情(vue3)
        <Button @click="jumpPrevPage">返回</Button>
    </div>
</template>

<script setup>
import { goBack, transPathToName } from '@/libs/util.menu';

// 返回的时候，关闭顶部的tab，并返回到列表页
const jumpPrevPage = () => {
    window.$basePageStore.closeTab(transPathToName(location.pathname));
    //jumpPage({ path: '/sub-vue3/user/userManage/index' });
    goBack();
};
</script>

<style scoped></style>
