<template>
    <router-view v-slot="{ Component, route }">
        <keep-alive>
            <component :is="Component" :key="route.fullPath" v-if="route.meta.cache" />
        </keep-alive>
        <component :is="Component" :key="route.fullPath" v-if="!route.meta.cache" />
    </router-view>
</template>

<script setup></script>

<style lang="less" scoped></style>
