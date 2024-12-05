// 左侧菜单tree（全部：有权限的+无权限的）
const siderTreeList = [
    {
        id: '1',
        path: '/home',
        title: '首页',
        icon: 'md-home', // 一级菜单的前面的 icon（引用的 view-ui-plus ）
        // 一级菜单的前面的 icon（也可以是自定义的图片，优先用icon）
        img: 'https://ms.bdimg.com/pacific/0/pic/-535040324_687599536.jpg?x=0&y=0&h=150&w=242&vh=150.00&vw=242.00&oh=150.00&ow=242.00',
        applyName: 'base', // 应用表示
        auth: true, // 是否需要登录才可以进入：表示该页面，需要用户登录后，才可以访问（如：用户中心，需要登录才可以访问的；而登录页面不需要登录就可以访问）
        name: 'home', // 菜单的name
        authMark: '1', // 页面权限标识（唯一）（登录用户有该页面权限标识，表示有该页面的权限）
        isShow: true, // 是否显示该菜单
    },
    // sub-vue2
    {
        id: '2',
        path: '/sub-vue2/exportList/index',
        title: '导出列表2',
        applyName: 'sub-vue2',
        icon: 'md-download',
        auth: true,
        name: 'sub-vue2-exportList-index',
        authMark: '2',
        isShow: true,
    },
    {
        id: '3',
        path: '/customer',
        name: 'customer',
        title: '客户管理2',
        icon: 'ios-archive',
        authMark: '3',
        isShow: true,
        children: [
            {
                id: '3-1',
                path: '/sub-vue2/customer/customerManage/index',
                title: '客户管理',
                applyName: 'sub-vue2',
                auth: true,
                name: 'sub-vue2-customer-customerManage-index',
                parentName: 'customer', // 父级的name
                authMark: '3-1',
                isShow: true,
            },
            {
                id: '3-2',
                path: '/sub-vue2/customer/customerManage/detail',
                title: '客户管理详情',
                icon: '',
                applyName: 'sub-vue2',
                auth: true,
                name: 'sub-vue2-customer-customerManage-detail',
                activeName: 'sub-vue2-customer-customerManage-index',
                parentName: 'customer',
                authMark: '3-1',
                isShow: true,
            },
            {
                id: '3-3',
                path: '/sub-vue2/customer/userApply/index',
                title: '用户申请',
                applyName: 'sub-vue2',
                auth: true,
                name: 'sub-vue2-customer-userApply-index',
                parentName: 'customer',
                authMark: '3-2',
                isShow: true,
            },
            {
                id: '3-4',
                path: '/sub-vue2/customer/userApply/detail',
                title: '用户申请详情',
                icon: '',
                applyName: 'sub-vue2',
                auth: true,
                name: 'sub-vue2-customer-userApply-detail',
                activeName: 'sub-vue2-customer-userApply-index',
                parentName: 'customer',
                authMark: '3-2',
                isShow: true,
            },
        ],
    },
    // sub-vue3
    {
        id: '4',
        path: '/sub-vue3/exportList/index',
        title: '导出列表3',
        applyName: 'sub-vue3',
        icon: 'md-download',
        auth: true,
        name: 'sub-vue3-exportList-index',
        authMark: '4',
        isShow: true,
    },
    {
        id: '5',
        path: '/user',
        name: 'user',
        title: '用户管理3',
        icon: 'ios-archive',
        authMark: '5',
        isShow: true,
        children: [
            {
                id: '5-1',
                path: '/sub-vue3/user/userManage/index',
                title: '用户管理',
                applyName: 'sub-vue3',
                auth: true,
                name: 'sub-vue3-user-userManage-index',
                parentName: 'user',
                authMark: '5-1',
                isShow: true,
            },
            {
                id: '5-2',
                path: '/sub-vue3/user/userManage/detail',
                title: '用户管理详情',
                icon: '',
                applyName: 'sub-vue3',
                auth: true,
                name: 'sub-vue3-user-userManage-detail',
                activeName: 'sub-vue3-user-userManage-index',
                parentName: 'user',
                authMark: '5-1',
                isShow: true,
            },
            {
                id: '5-3',
                path: '/sub-vue3/user/userApply/index',
                title: '用户申请',
                applyName: 'sub-vue3',
                auth: true,
                name: 'sub-vue3-user-userApply-index',
                parentName: 'user',
                authMark: '5-2',
                isShow: true,
            },
            {
                id: '5-4',
                path: '/sub-vue3/user/userApply/detail',
                title: '用户申请详情',
                icon: '',
                applyName: 'sub-vue3',
                auth: true,
                name: 'sub-vue3-user-userApply-detail',
                activeName: 'sub-vue3-user-userApply-index',
                parentName: 'user',
                authMark: '5-2',
                isShow: true,
            },
        ],
    },
    {
        id: '6',
        path: '/elementPlus',
        name: 'elementPlus',
        title: 'elementPlus 示例',
        icon: 'ios-archive',
        authMark: '6',
        isShow: true,
        children: [
            {
                id: '6-1',
                path: '/sub-vue3/elementPlus/form/index',
                title: 'form 表单',
                applyName: 'sub-vue3',
                auth: true,
                name: 'sub-vue3-elementPlus-form-index',
                parentName: 'elementPlus',
                authMark: '6-1',
                isShow: true,
            },
            {
                id: '6-2',
                path: '/sub-vue3/elementPlus/treeDraggable/index',
                title: 'tree 树拖拽位置',
                applyName: 'sub-vue3',
                auth: true,
                name: 'sub-vue3-elementPlus-treeDraggable-index',
                parentName: 'elementPlus',
                authMark: '6-2',
                isShow: true,
            },
        ],
    },
    {
        id: '7',
        path: '/functionExample',
        name: 'functionExample',
        title: '功能示例',
        icon: 'ios-archive',
        authMark: '6',
        isShow: true,
        children: [
            {
                id: '7-1',
                path: '/sub-vue3/functionExample/imgDotting/index',
                title: '图片上打点',
                applyName: 'sub-vue3',
                auth: true,
                name: 'sub-vue3-functionExample-imgDotting/indx',
                parentName: 'functionExample',
                authMark: '7-1',
                isShow: true,
            },
        ],
    },
];
// 模拟接口数据
const resData = {
    id: '342',
    createDate: '2020-10-08 08:43:54',
    modifyDate: '2024-02-06 14:49:14',
    realName: '张三',
    userName: '18857375652',
    mobile: '18857375652',
    email: null,
    enabledDate: null,
    isMaster: true,
    password: '57091af1260966a65cf521d4fe1eb63b',
    distributorId: '218',
    loginFailureCount: 0,
    certificationStatus: 1,
    certificationName: '北京医科智谷资讯有限公司',
    isLocked: false,
    remark: null,
    lockedDate: '2022-11-29 17:21:30',
    isPda: true,
    isLoginRemind: false,
    isEnabled: true,
    isDelete: false,
    distributorName: 'test-不要动服务部',
    isPdaChooseStore: true,
    roleDTOS: null,
    roleTye: false,
    menu: [], // 菜单
    // 左侧菜单权限
    authMarkList: [
        '1',
        '2',
        '3',
        '3-1',
        '3-2',
        '3-3',
        '3-4',
        '4',
        '5',
        '5-1',
        '5-2',
        '5-3',
        '5-4',
        '6',
        '6-1',
        '6-2',
        '7',
        '7-1',
    ],
};

export { siderTreeList, resData };
