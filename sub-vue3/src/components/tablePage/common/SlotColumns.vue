<template>
    <template v-if="slotType === 'colorText'">
        <span :style="{ color: getLabelByValue(dict, value, 'color') }"> {{ getLabelByValue(dict, value) }}</span>
    </template>
    <template v-if="slotType === 'badge'">
        <Badge :color="getLabelByValue(dict, value, 'color')" :text="getLabelByValue(dict, value)" />
    </template>
    <template v-if="slotType === 'tag'">
        <div v-if="isValidArr(value)">
            <Tag v-for="item in value" :key="item.value" closable @on-close="deleteTag(row, item)">
                {{ item.label }}
            </Tag>
        </div>
        <span v-else>-</span>
    </template>
    <template v-if="slotType === 'imgPreview'">
        <div v-viewer="{ movable: true }" class="pt-2" v-if="isValidArr(value)">
            <div
                class="mr-5 mt-2 mb-2"
                v-for="item in value"
                :key="item"
                style="position: relative; width: 60px; height: 40px; display: inline-block"
            >
                <img :src="item" style="width: 60px; height: 40px" />
                <Icon
                    type="ios-add-circle-outline"
                    style="z-index: 1; position: absolute; bottom: 2px; right: 2px; color: #fff"
                />
            </div>
        </div>
        <span v-else>-</span>
    </template>
</template>

<script setup>
import { Badge } from 'view-ui-plus';
import { getLabelByValue } from '@/dicts.js';
import { isValidArr } from '@/libs/util.tool';

const props = defineProps({
    // 插槽模板类型
    slotType: {
        type: String,
        default: () => 'colorText', // colorText-彩色文字  badge-小圆点+文字  tag-标签  imgPreview-图片预览
    },
    // 值
    value: {
        type: [Boolean, String, Number, Array],
        default: () => null,
    },
    // 字典
    dict: {
        type: Array,
        default: () => [],
    },
});
</script>
