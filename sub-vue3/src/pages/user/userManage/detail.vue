<template>
    <div>
        <PageHeader title="用户详情(vue3)" hidden-breadcrumb>
            <template #back>
                <div @click="jumpPrevPage"><Icon type="md-arrow-back" /></div>
            </template>
        </PageHeader>
        <Card :bordered="false" dis-hover class="mt-15 mb-50">
            <el-input v-model="formData.aa" placeholder="请输入" style="width: 240px" />
        </Card>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted, onActivated } from 'vue';
import { useRoute } from 'vue-router';
import { goBack, transPathToName, getUrlParams, updateFullPathParams } from '@/libs/util.menu';
import { emitter } from '@/libs/eventBus.js';

const route = useRoute();
const urlQueryData = reactive(getUrlParams());

const formData = ref({ aa: null });

// 返回的时候，关闭顶部的tab，并返回到列表页
const jumpPrevPage = () => {
    window.$basePageStore.closeTab(transPathToName(location.pathname));
    goBack();
};
// 获取详情
const getDetails = () => {
    setTimeout(() => {
        let res = { aa: (Math.random() * 100).toFixed(0) };
        if (urlQueryData.openType === 'TAG') {
            const _formData = JSON.parse(localStorage.getItem(transPathToName(route.path)));
            if (_formData) {
                formData.value = _formData;
            } else {
                formData.value = { ...res, unit: String(res.unit) };
            }
        } else {
            formData.value = { ...res, unit: String(res.unit) };
        }
    }, 1000);
};
// 存储当前临时数据
const saveCurrentTemporaryData = () => {
    localStorage.setItem(transPathToName(route.path), JSON.stringify(formData.value));
};

onMounted(() => {
    formData.value.aa = null;
    updateFullPathParams();
    console.log('详情', urlQueryData);
    if (urlQueryData.mode == 'ADD') {
        if (urlQueryData.openType === 'TAG') {
            const _formData = JSON.parse(localStorage.getItem(transPathToName(route.path)));
            if (_formData) {
                formData.value = _formData;
            }
        }
    } else {
        getDetails();
    }
    emitter.on(transPathToName(route.path), saveCurrentTemporaryData);
});
onActivated(() => {
    console.log('onActivated');
});
onUnmounted(() => {
    emitter.off(transPathToName(route.path), saveCurrentTemporaryData);
});
</script>

<style scoped></style>
