<template>
    <div id="app">
        <keep-alive>
            <router-view v-if="$route.meta.cache" />
        </keep-alive>
        <router-view v-if="!$route.meta.cache" />
    </div>
</template>

<script>
export default {
    data() {
        return {};
    },
};
</script>
