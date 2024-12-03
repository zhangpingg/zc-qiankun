<template>
    <Select
        :loading="loading"
        v-model="distributorId"
        v-bind="{ filterable: true, clearable: true, placeholder: '请选择', ...restItem }"
        @on-query-change="onQueryChange"
        @on-change="onchange"
    >
        <Option v-for="item in distributorList" :value="item.value" :key="item.value">{{ item.label }}</Option>
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
            distributorId: null,
            distributorList: [],
        };
    },
    mounted() {
        this.getDistributorUserList();
    },
    watch: {
        value: {
            handler(val) {
                this.distributorId = val;
            },
            immediate: true,
        },
    },
    methods: {
        // 获取-经销商用户列表
        async getDistributorUserList() {
            try {
                const res = [
                    { value: 'ali', label: '阿里巴巴' },
                    { value: '163', label: '网易' },
                ];
                this.distributorList = res;
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
