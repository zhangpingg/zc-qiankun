<template>
    <Select
        v-model="cityId"
        v-bind="{ filterable: true, clearable: true, placeholder: '请选择', ...restItem }"
        @on-query-change="onQueryChange"
        @on-change="onchange"
    >
        <Option v-for="item in cityList" :value="item?.value" :key="item.value">{{ item.label }}</Option>
    </Select>
</template>

<script>
export default {
    props: {
        value: {
            type: String,
            default: () => null,
        },
        restItem: {
            type: Object,
            default: () => {},
        },
    },
    data() {
        return {
            cityId: null,
            cityList: [],
        };
    },
    mounted() {
        this.getCityList();
    },
    watch: {
        value: {
            handler(val) {
                this.cityId = val;
            },
            immediate: true,
        },
    },
    methods: {
        // 获取-城市列表
        async getCityList() {
            try {
                const res = [
                    { value: 'shanghai', label: '上海' },
                    { value: 'hangzhou', label: '杭州' },
                ];
                this.cityList = res;
            } catch (err) {
                console.log(err);
            }
        },
        // chnage-搜索词时
        onQueryChange(keyword) {
            this.getDistributorUserList(keyword);
        },
        // change-选项时
        onchange(val) {
            this.$emit('onChange', val);
        },
    },
};
</script>
