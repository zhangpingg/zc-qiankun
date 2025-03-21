/**
 * 登录、退出、获取账户信息
 */

import { defineStore } from 'pinia';
import { Modal } from 'view-ui-plus';
import { AccountLogin, AccountInfo } from '@/api/account';
import useUserStore from './useUser';
import useLayoutStore from './useLayout';
import { siderTreeList, resData } from './const';
import util from '@/libs/util';
import Setting from '@/setting';

const { jumpPage, getMenuPathList, getHasAuthSiderTreeList } = util.menu;
const { setCookie } = util.cookies;

const useAccount = defineStore('Base-account', () => {
    const userStore = useUserStore();
    const layoutStore = useLayoutStore();

    // 获取账户信息（用户的信息，页面路由等）
    const getAccountInfo = async (username) => {
        await AccountInfo({ username: username }).then((info) => {
            info.menu = getHasAuthSiderTreeList(info.authMarkList, siderTreeList); // 菜单tree列表
            info.menuPaths = getMenuPathList(siderTreeList); // 获取菜单对应的path权限列表
            setCookie('uuid', info.id);
            localStorage.setItem('Base-isPdaChooseStore', info.isPdaChooseStore ? 'isPdaChooseStore' : '');
            userStore.setUserInfo(info);
        });
    };
    // 登录
    const login = async (data) => {
        const { username = '' } = data;
        return new Promise((resolve, reject) => {
            // (1)登录接口 API
            //AccountLogin(data)
            //    .then(async (res) => {
            //        setCookie('token', res.accessToken);
            //        setCookie('username', username);
            //        await getAccountInfo();
            //        resolve();
            //    })
            //    .catch((err) => {
            //        reject(err);
            //    });
            // (2)静态的模拟数据
            setCookie('token', 'token-112233445566');
            setCookie('username', username);
            let info = resData;
            info.menu = getHasAuthSiderTreeList(info.authMarkList, siderTreeList); // 有权限的菜单tree列表
            info.menuPaths = getMenuPathList(siderTreeList); // 获取全部菜单对应所有的path路径列表
            setCookie('uuid', info.id);
            localStorage.setItem('Base-isPdaChooseStore', info.isPdaChooseStore ? 'isPdaChooseStore' : '');
            userStore.setUserInfo(info);
            resolve();
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
            Promise.resolve().then(() => {
                localStorage.clear();
                sessionStorage.clear();
                document.cookie.split(';').forEach(function (c) {
                    document.cookie = c.trim().split('=')[0] + '=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/';
                });
            });
            setTimeout(() => {
                Setting.detailCacheNameList.forEach((name) => {
                    localStorage.removeItem(name);
                });
            }, 0);
        }
    };

    return { login, logout, getAccountInfo };
});

export default useAccount;
