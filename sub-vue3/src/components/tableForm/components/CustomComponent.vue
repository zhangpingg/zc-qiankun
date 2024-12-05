<template>
    <Select
        :loading="loading"
        v-model="cityId"
        v-bind="{ filterable: true, clearable: true, placeholder: '请选择', ...restItem }"
        @on-query-change="onQueryChange"
        @on-change="onchange"
    >
        <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
    </Select>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { Select, Option } from 'view-ui-plus';

const props = defineProps({
    value: {
        type: String,
        default: () => null,
    },
    restItem: {
        type: Object,
        default: () => {},
    },
});
const emit = defineEmits(['onChange']);

const cityId = ref();
const cityList = ref([]);
const loading = ref(false);

// 获取-城市列表
const getCityList = async (keyword) => {
    try {
        loading.value = true;
        //console.log('关键词', keyword);
        const res = [
            { value: 'shanghai', label: '上海' },
            { value: 'hangzhou', label: '杭州' },
        ];
        cityList.value = res;
        loading.value = false;
    } catch (err) {
        loading.value = false;
    }
};
// chnage-搜索词时
const onQueryChange = (keyword) => {
    getCityList(keyword);
};
// change-选项时
const onchange = (val) => {
    emit('onChange', val);
};

onMounted(() => {
    getCityList();
});
watch(
    () => props.value,
    (newVal) => {
        cityId.value = newVal;
    },
    {
        immediate: true,
        deep: true,
    }
);
</script>
