<script setup>
import { useRouter } from 'vue-router';
import Menu from '@/components/menu/index.vue';

const router = useRouter();
const a = 1;

console.log(11, router.currentRoute);
</script>

<template>
    <div>
        <div>基座-内容</div>
        <Menu />
        <hr />
        <div id="subConatiner"></div>
        <router-view v-slot="{ Component, route }">
            <transition name="router-fade" mode="out-in">
                <keep-alive :exclude="[]">
                    <component :is="Component" :key="route.fullPath" />
                </keep-alive>
            </transition>
        </router-view>
    </div>
</template>

<style scoped></style>
