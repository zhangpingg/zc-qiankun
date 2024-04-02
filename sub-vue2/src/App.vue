<template>
    <keep-alive>
        <router-view v-if="$route.meta.cache" />
    </keep-alive>
    <router-view v-if="!$route.meta.cache" />
</template>

<script>
export default {
    data() {
        return {};
    },
};
</script>
