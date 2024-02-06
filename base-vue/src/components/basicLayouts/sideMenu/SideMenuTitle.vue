<template>
    <span class="smt">
        <span class="smt-iconWrap" v-if="menu.icon || menu.custom || menu.img">
            <Icon :type="menu.icon" v-if="menu.icon" />
            <Icon :custom="menu.custom" v-else-if="menu.custom" />
            <img :src="menu.img" v-else-if="menu.img" />
        </span>
        <span v-if="!hideTitle"> {{ menu.title }} </span>
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
    hideTitle: {
        type: Boolean,
        default: false,
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
    }
}
</style>
