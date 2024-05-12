<template>
    <el-form ref="formRef" :model="formData" :rules="formRules" style="max-width: 600px" label-width="auto">
        <el-form-item label="输入框" prop="aa">
            <el-input v-model="formData.aa" />
        </el-form-item>
        <el-form-item label="下拉框" prop="bb">
            <el-select v-model="formData.bb" placeholder="请选择">
                <el-option label="上海" value="shanghai" />
                <el-option label="杭州" value="hangzhou" />
            </el-select>
        </el-form-item>
        <el-form-item label="下拉框-虚拟化选择器" prop="cc">
            <el-select-v2 v-model="formData.cc" placeholder="请选择" :options="ccOptions" />
        </el-form-item>
        <el-form-item label="开关" prop="dd">
            <el-switch v-model="formData.dd" />
        </el-form-item>
        <el-form-item label="分段控制器" prop="ee">
            <el-segmented v-model="formData.ee" :options="eeOptions" />
        </el-form-item>
        <el-form-item label="复选框" prop="ff">
            <el-checkbox-group v-model="formData.ff">
                <el-checkbox value="1" name="type">选项1</el-checkbox>
                <el-checkbox value="2" name="type">选项2</el-checkbox>
                <el-checkbox value="3" name="type">选项3</el-checkbox>
                <el-checkbox value="4" name="type">选项4</el-checkbox>
            </el-checkbox-group>
        </el-form-item>
        <el-form-item label="单选框" prop="gg">
            <el-radio-group v-model="formData.gg">
                <el-radio value="1">男</el-radio>
                <el-radio value="2">女</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="文本域" prop="hh">
            <el-input v-model="formData.hh" type="textarea" />
        </el-form-item>
        <el-form-item label="一行多个框" required>
            <el-col :span="11">
                <el-form-item prop="ii1">
                    <el-input v-model="formData.ii1" />
                </el-form-item>
            </el-col>
            <el-col :span="2">
                <span>-</span>
            </el-col>
            <el-col :span="11">
                <el-form-item prop="ii2">
                    <el-input v-model="formData.ii2" />
                </el-form-item>
            </el-col>
        </el-form-item>
        <el-form-item label="自定义校验" prop="jj">
            <el-input v-model="formData.jj" />
        </el-form-item>
        <el-form-item label="级联-动态加载" prop="kk">
            <el-cascader :props="kkProps" />
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="saveForm(formRef)">查询</el-button>
            <el-button @click="resetForm(formRef)">重置</el-button>
        </el-form-item>
    </el-form>
</template>

<script setup>
import { reactive, ref } from 'vue';

const formRef = ref();
const formData = reactive({
    aa: '',
    bb: '',
    cc: '',
    dd: false,
    ee: '',
    ff: [],
    gg: '',
    hh: '',
    ii1: '',
    ii2: '',
});
// 自定义校验
const customCheck = (rule, value, callback) => {
    if (!value) {
        return callback(new Error('请输入jj'));
    }
    if (String(value).length < 5) {
        callback(new Error('请最少输入5个字'));
    } else {
        callback();
    }
};
const formRules = reactive({
    aa: [
        { required: true, message: '请输入aa', trigger: 'blur' },
        { min: 3, max: 5, message: '请输入长度3~5', trigger: 'blur' },
    ],
    bb: [{ required: true, message: '请选择bb', trigger: 'change' }],
    cc: [{ required: true, message: '请选择cc', trigger: 'change' }],
    ee: [{ required: true, message: '请选择ee', trigger: 'change' }],
    ff: [{ type: 'array', required: true, message: '请选择ff', trigger: 'change' }],
    gg: [{ required: true, message: '请选择gg', trigger: 'change' }],
    hh: [{ required: true, message: '请输入hh', trigger: 'blur' }],
    ii1: [{ required: true, message: '请输入ii1', trigger: 'change' }],
    ii2: [{ required: true, message: '请输入ii2', trigger: 'change' }],
    jj: [{ required: true, validator: customCheck, trigger: 'blur' }],
});

// 下拉框-虚拟化选择器-列表项
const ccOptions = Array.from({ length: 10000 }).map((_, idx) => ({
    value: `${idx + 1}`,
    label: `${idx + 1}`,
}));
// 分段选择器
const eeOptions = ['选项一', '选项二', '选项三'];
// 级联-动态加载
const kkProps = {
    lazy: true,
    lazyLoad(node, resolve) {
        const { level } = node;
        setTimeout(() => {
            const nodes = Array.from({ length: level + 1 }).map((item, index) => ({
                value: ++index,
                label: `Option-${index}`,
                leaf: level >= 2,
            }));
            resolve(nodes);
        }, 1000);
    },
};

// 保存表单
const saveForm = async (formEl) => {
    if (!formEl) return;
    await formEl.validate((valid) => {
        if (valid) {
            console.log('表单数据', formData);
        }
    });
};
// 重置表单
const resetForm = (formEl) => {
    if (!formEl) return;
    formEl.resetFields();
};
</script>
