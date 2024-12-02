<template>
    <span class="smt">
        <span class="smt-iconWrap" v-if="menu.icon || menu.img">
            <Icon :type="menu.icon" v-if="menu.icon" />
            <img :src="menu.img" class="smt-iconWrap-img por" v-else-if="menu.img" />
        </span>
        <span v-if="isShowTitle"> {{ menu.title }} </span>
    </span>
</template>

<script setup>
import { Icon } from 'view-ui-plus';

defineProps({
    menu: {
        type: Object,
        default() {
            return {};
        },
    },
    isShowTitle: {
        type: Boolean,
        default: true,
    },
    // 用于侧边栏收起 Dropdown 当前高亮
    selected: {
        type: Boolean,
        default: false,
    },
});
</script>

<style scoped lang="less">
.smt {
    white-space: nowrap;
    .smt-iconWrap {
        margin-right: 10px;
        .smt-iconWrap-img {
            width: 14px;
            height: 14px;
            top: 2px;
        }
    }
}
</style>
