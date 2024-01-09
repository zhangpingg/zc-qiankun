<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { AccountLogin, GetExportList, tagSaveOrUpdate } from '@/api/account';
import util from '@/libs/util';

const router = useRouter();

const login = async () => {
    const params = { mobile: 13621814014, password: 'Zp123456' };
    const res = await AccountLogin(params);
    util.cookies.set('token', res.accessToken);
    const params2 = { current: 1, size: 10 };
    const res2 = await GetExportList(params2);
    const params3 = { tagType: 1, tagValue: '44' };
    const res3 = await tagSaveOrUpdate(params3);
};
const jump2 = () => {
    router.push('sub-vue2/home');
};
const jump3 = () => {
    router.push('sub-vue3/home');
};
</script>

<template>
    <h4>基座-登录页面</h4>
    <!--<Button @click="login">基座-登录</Button> <br /><br />
    <Button type="primary" @click="jump2">跳转到子应用vue2</Button> <br /><br />
    <Button type="primary" @click="jump3">跳转到子应用vue3</Button>-->
</template>

<style scoped></style>
