<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { AccountLogin, GetExportList, tagSaveOrUpdate } from '@/api/account';
import util from '@/libs/util';

const router = useRouter();

const getData = async () => {
    const params = { mobile: 13621814014, password: 'Zp123456' };
    const res = await AccountLogin(params);
    util.cookies.set('token', res.accessToken);
    const params2 = { current: 1, size: 10 };
    const res2 = await GetExportList(params2);
    const params3 = { tagType: 1, tagValue: '44' };
    const res3 = await tagSaveOrUpdate(params3);
};
const jump2 = () => {
    router.push('/sub-vue2/home');
};
const jump22 = () => {
    router.push('/sub-vue2/pageB');
};
const jump3 = () => {
    router.push('/sub-vue3/home');
};
const jump33 = () => {
    router.push('/sub-vue3/pageA');
};
const goLogin = () => {
    window.location.assign('/login');
};
</script>

<template>
    <h4>基座-左侧菜单</h4>
    <Button @click="getData">调接口</Button> <br /><br />
    <Button type="primary" @click="jump2">跳转到子应用vue2</Button> <br />
    <Button type="primary" @click="jump22">跳转到子应用vue2-pageB</Button> <br />
    <Button type="primary" @click="jump3">跳转到子应用vue3</Button><br />
    <Button type="primary" @click="jump33">跳转到子应用vue3-pageA</Button><br />
    <Button type="primary" @click="goLogin">基座-登录页</Button>
</template>

<style scoped></style>
