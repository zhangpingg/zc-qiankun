<template>
    <span class="hp pl-10 pr-10 cup dib" @click="openModal">修改密码</span>
    <Modal v-model="isShowModal" :mask-closable="false" title="修改密码">
        <Spin fix v-if="loadings.submit"> 提交中... </Spin>
        <Form ref="formRef" :label-width="80" :model="passwordForm" :rules="formRules">
            <FormItem label="旧密码" prop="oldpassword">
                <Input v-model="passwordForm.oldpassword" placeholder="请输入旧密码" type="password" :maxlength="16" />
            </FormItem>
            <FormItem label="新密码" prop="password">
                <Input
                    v-model="passwordForm.password"
                    minlength="6"
                    placeholder="6-16位，需包含大小写字母和数字"
                    type="password"
                    :maxlength="16"
                />
            </FormItem>
            <FormItem label="确认密码" prop="repassword">
                <Input
                    v-model="passwordForm.repassword"
                    placeholder="请再输入一遍密码"
                    type="password"
                    :maxlength="16"
                />
            </FormItem>
        </Form>
        <template #footer>
            <Button type="text" size="large" @click="closeModal">取消</Button>
            <Button type="primary" size="large" @click="onDoneBtnClick" :loading="loadings.submit">确定</Button>
        </template>
    </Modal>
</template>

<script setup>
import { ref, reactive, computed } from 'vue';
import { Modal, Spin, Form, FormItem, Input, Button } from 'view-ui-plus';
import { useUserStore } from '@/store';
import { ResetPassword } from '@/api/account';
import { Notice } from 'view-ui-plus';
import util from '@/libs/util';

const userStore = useUserStore();
const { REG_PWD } = util.regular;

const isShowModal = ref(false);
const loadings = reactive({ submit: false });
const passwordForm = reactive({ oldpassword: '', password: '', repassword: '', level: 0, status: 'pass' });
const formRef = ref();

// 校验-新密码
const validatePass = (rule, value, callback) => {
    if (value === '') {
        callback(new Error('请输入密码'));
    } else {
        if (value.length < 6) {
            callback(new Error('密码不能少于6位!'));
        } else if (!REG_PWD.test(value)) {
            callback(new Error('至少包含1位大写字母、1位小写字母和1位数字!'));
        } else {
            callback();
        }
    }
};
// 再次校验-新密码
const repasswordCheck = (rule, value, callback) => {
    if (value === '') {
        callback(new Error('请再次输入密码'));
    } else {
        if (value.length < 6) {
            callback(new Error('密码不能少于6位!'));
        } else if (!REG_PWD.test(value)) {
            callback(new Error('至少包含1位大写字母、1位小写字母和1位数字!'));
        } else if (value !== passwordForm.password) {
            callback(new Error('两次输入密码不一致!'));
        } else {
            callback();
        }
    }
};
// 表单-规则
const formRules = computed(() => {
    return {
        oldpassword: [{ required: true, message: '请输入旧密码' }],
        password: [
            { required: true, validator: validatePass },
            { type: 'string', min: 6, message: '密码长度不能小于6位' },
        ],
        repassword: [
            { required: true, validator: repasswordCheck },
            { type: 'string', min: 6, message: '密码长度不能小于6位' },
        ],
    };
});

// 打开弹框
const openModal = () => {
    loadings.submit = false;
    formRef.value.resetFields();
    isShowModal.value = true;
};
// 关闭弹框
const closeModal = () => {
    loadings.submit = false;
    formRef.value.resetFields();
    isShowModal.value = false;
};
// 提交
const onDoneBtnClick = () => {
    formRef.value.validate((valid) => {
        if (valid) {
            loadings.submit = true;
            let params = {
                id: userStore.userInfo.id,
                oldPassword: passwordForm.oldpassword,
                newPassword: passwordForm.password,
            };
            ResetPassword(params).then(
                () => {
                    Notice.success({ title: '修改成功' });
                    closeModal();
                },
                () => {
                    loadings.submit = false;
                }
            );
        }
    });
};
</script>

<style scoped>
.hp {
    height: 64px;
    color: #2d8cf0;
    &:hover {
        background: #f8f8f9;
    }
}
</style>
