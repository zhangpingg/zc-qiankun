/**
 * 登录、退出
 */

import { defineStore } from 'pinia';
import { Modal } from 'view-ui-plus';
import { AccountLogin, AccountInfo } from '@/api/account';
import useUserStore from './useUser';
import useLayoutStore from './useLayout';
import { siderTreeList } from './const';
import util from '@/libs/util';
import { onUnmounted, ref } from 'vue';

const { jumpPage, getMenuPathList } = util.menu;
const { setCookie } = util.cookies;

const useAccount = defineStore('Base-account', () => {
    const userStore = useUserStore();
    const layoutStore = useLayoutStore();
    const timer = ref();

    // 登录
    const login = async (data) => {
        const { username = '' } = data;
        return new Promise((resolve, reject) => {
            // 登录接口
            AccountLogin(data)
                .then(async (res) => {
                    setCookie('token', res.accessToken);
                    setCookie('username', username);
                    // 获取用户的信息接口，如相关页面路由
                    await AccountInfo({ username: username }).then(async (info) => {
                        //let menu = [...info.menuDTOS];
                        info.menu = siderTreeList; // 菜单tree列表
                        info.menuPaths = getMenuPathList(siderTreeList); // 获取菜单对应的path权限列表
                        delete info.menuDTOS;
                        setCookie('uuid', info.id);
                        localStorage.setItem('Base-isPdaChooseStore', info.isPdaChooseStore ? 'isPdaChooseStore' : '');
                        userStore.setUserInfo(info);
                    });
                    // 结束
                    resolve();
                })
                .catch((err) => {
                    reject(err);
                });
        });
    };

    // 退出登录
    const logout = () => {
        if (layoutStore.layoutInfo.isLogoutConfirm) {
            Modal.confirm({
                title: '退出登录确认',
                content: '您确定退出登录当前账户吗？打开的标签页和个人设置将会保存。',
                onOk() {
                    clearStore();
                },
            });
        } else {
            clearStore();
        }
        function clearStore() {
            jumpPage({ path: '/login', applyName: 'base' });
            timer.value = setTimeout(() => {
                localStorage.clear();
                sessionStorage.clear();
                document.cookie.split(';').forEach(function (c) {
                    document.cookie = c.trim().split('=')[0] + '=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/';
                });
            }, 0);
        }
    };
    onUnmounted(() => {
        clearInterval(timer);
    });

    return { login, logout };
});

export default useAccount;
