const Setting = {
    titleSuffix: '经销商后台', // 网页标题的后缀
    showProgressBar: true, // 页面切换时，是否显示模拟的进度条
    cookiesExpires: 1, // Cookies 默认保存时间，单位：天
    noticeDuration: 3, // 接口请求返回错误时，错误提示的持续时间，单位：秒
    // 布局配置
    menuSideWidth: 210, // 侧边菜单宽度，单位 px
    layout: {
        isMenuAccordion: true, // 侧边菜单栏是否开启手风琴模式
        isShowSiderCollapseBtn: true, // 是否显示折叠侧边栏按钮
        isMenuCollapse: false, // 侧边菜单栏是否默认折起
        isShowReloadbtn: true, // 是否显示重载按钮
        isShowFullscreenBtn: true, // 是否显示全屏按钮
        isLogoutConfirm: true, // 退出登录时，是否二次确认
    },
    // 详情页缓存-name列表
    detailCacheNameList: ['sub-vue3-user-userManage-detail'],
};

export default Setting;
