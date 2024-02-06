<template>
    <div class="login pb-11 mt-12">
        <div class="login-container">
            <div class="login-container-mian">
                <div class="login-container-mian-content">
                    <div class="lcmc-header">
                        <div class="lcmc-header-logo">
                            <img src="@/assets/images/login-logo.png" alt="logo" />
                        </div>
                        <div class="lcmc-header-desc">你好！欢迎登录卡车胎经销商平台</div>
                    </div>
                    <Login class="lcmc-footer w100" @on-submit="submitLogin" enter-to-submit>
                        <UserName name="username" />
                        <Password name="password" enter-to-submit />
                        <div class="lcmc-footer-phone">
                            <Checkbox v-model="autoLogin" size="large">记住用户名/手机号</Checkbox>
                        </div>
                        <Submit :loading="submit" class="ivu-mb-8">{{ submit ? '登录中...' : '立即登录' }}</Submit>
                    </Login>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { Message } from 'view-ui-plus';
import { useRouter } from 'vue-router';
import { useAccountStore } from '@/store';

const router = useRouter();
const accountStore = useAccountStore();
const submit = ref(false);
const autoLogin = ref(true);

// 登录
const submitLogin = async (valid, values) => {
    if (valid) {
        Message.loading({
            content: '登录中...',
            duration: 0,
        });
        try {
            await accountStore.login(values);
            submit.value = false;
            Message?.destroy();
            Message.success({
                content: '登录成功！',
            });
            history.replaceState(null, '', router.currentRoute.value.query.redirect || '/');
            if (router.currentRoute.value.query.redirect) {
                location.reload();
            }
        } catch (err) {
            submit.value = false;
            Message?.destroy();
        }
    }
};
</script>

<style scoped>
.login {
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow: hidden;
    &:before {
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        content: '';
        width: 100%;
        height: 100%;
        background: linear-gradient(#4b3dfa, #1273fe);
    }
    .login-container {
        width: 100%;
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: nowrap;
        overflow: auto;
        position: relative;
        background: #1797d3 url('@/assets/images/page-bg.jpg') no-repeat 50% 50%;
        background-size: 100% 100%;
        border-radius: 20px;
        @media screen and (max-width: 992px) {
            background: none;
        }
        .login-container-mian {
            width: 1080px;
            height: 600px;
            margin: auto;
            background: url('@/assets/images/login-bg.jpg') no-repeat 50% 50%;
            background-size: 100% 100%;
            border-radius: 8px;
            padding-left: 480px;
            display: flex;
            align-items: center;
            justify-content: center;
            .login-container-mian-result {
                width: 100%;
            }
            @media screen and (max-width: 992px) {
                width: 90%;
                height: 550px;
                margin: auto;
                background: #ffff;
                padding-left: 0;
            }
            .ivu-global-footer {
                bottom: 50px;
                width: 360px;
                margin-bottom: 0;
                position: absolute;
            }
        }
        .login-container-mian-content {
            background: #fff;
            width: 368px;
            margin: 0 auto;
            @media screen and (max-width: 992px) {
                width: 80%;
                margin: auto;
            }
        }
        .lcmc-header {
            width: 100%;
            padding: 0 0 40px 0;
            text-align: center;
            .lcmc-header-logo {
                img {
                    width: 100%;
                    max-width: 394px;
                    display: block;
                    margin: 0 auto 29px;
                }
            }
            .lcmc-header-desc {
                font-size: 14px;
                color: rgba(0, 0, 0, 0.67);
                text-align: left;
                b {
                    color: #333;
                }
            }
        }
        .lcmc-footer {
            .lcmc-footer-phone {
                margin-bottom: 24px;
                text-align: left;
                a {
                    float: right;
                }
            }
        }
    }
}
</style>
