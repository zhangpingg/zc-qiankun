import request from '@/libs/request';

// 登录接口
export function AccountLogin(data) {
    return request({
        url: '/auth/login',
        method: 'post',
        params: data,
    });
}

// 获取用户信息接口
export function AccountInfo(data) {
    return request({
        url: '/auth/user/findByUserName',
        method: 'get',
        params: data,
    });
}

// 修改账户 密码
export function ResetPassword(data) {
    return request({
        url: '/distributor/system/user/updatePwd',
        method: 'post',
        data,
    });
}

// 获取导出列表
export function GetExportList(data) {
    return request({
        url: '/download/page',
        method: 'get',
        params: data,
    });
}
