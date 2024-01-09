import request from '@/libs/request';

// 登录接口
export function AccountLogin(data) {
    return request({
        url: 'auth/login',
        method: 'post',
        params: data,
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

// 新增或修改（标签/标签分类）
export function tagSaveOrUpdate(data) {
    return request({
        url: `/product/figure/tag/saveOrUpdate`,
        method: 'post',
        data,
    });
}
