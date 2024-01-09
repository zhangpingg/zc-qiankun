<template>
    <div>
        子应用：vue2 <br />
        <Button type="primary" @click="getData">调接口</Button>
        <Input v-model="value" placeholder="请输入" style="width: 200px" />
    </div>
</template>

<script>
import { GetExportList, tagSaveOrUpdate } from "@/api/account";
export default {
    data() {
        return {
            value: "",
        };
    },
    methods: {
        async getData() {
            const params2 = { current: 1, size: 10 };
            const res2 = await GetExportList(params2);
            const params3 = { tagType: 1, tagValue: "444" };
            const res3 = await tagSaveOrUpdate(params3);
            console.log(11, res2, res3);
        },
    },
};
</script>
