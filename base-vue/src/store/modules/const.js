const testPage = [
    // 示例1
    {
        id: '1',
        path: '/home',
        title: '首页',
        icon: 'md-home',
        applyName: 'base',
        auth: true,
        name: 'home',
    },
    {
        id: '2',
        path: '/sub-vue2/home',
        icon: 'md-home',
        title: 'vue2-home 标题',
        applyName: 'sub-vue2',
        auth: true,
        name: 'sub-vue2-home',
    },
    {
        id: '3',
        path: '/sub-vue2/pageB',
        icon: 'md-home',
        title: 'vue2-pageB 标题',
        applyName: 'sub-vue2',
        auth: true,
        name: 'sub-vue2-pageB',
    },
    {
        id: '4',
        path: '/sub-vue3/home',
        icon: 'md-home',
        title: 'vue3-home 标题',
        applyName: 'sub-vue3',
        auth: true,
        name: 'sub-vue3-home',
    },
    {
        id: '5',
        path: '/sub-vue3/pageA',
        icon: 'md-home',
        title: 'vue3-pageA 标题',
        applyName: 'sub-vue3',
        auth: true,
        name: 'sub-vue3-pageA',
    },
];

const projectPage = [
    // 示例1
    {
        id: '2859371797253997506',
        path: '/home',
        title: '首页',
        icon: 'md-home',
        applyName: 'base',
        auth: true,
        name: 'home',
    },
    {
        id: '2859371797253997512',
        path: '/sub-vue2/export/list',
        title: '导出列表',
        applyName: 'sub-vue2',
        icon: 'md-download',
        auth: true,
        name: 'export-list',
    },
    // 示例2
    {
        id: '2859347264400802624',
        path: '/warehouse',
        name: 'warehouse',
        title: '条码入库',
        icon: 'ios-archive',
        children: [
            {
                id: '2',
                path: '/sub-vue2/warehouse/entry/list',
                title: '入库管理',
                applyName: 'sub-vue2',
                auth: true,
                name: 'sub-vue2-warehouse-entry-list',
                parentName: 'warehouse',
            },
            {
                id: '299',
                path: '/sub-vue2/warehouse/entry/edit',
                title: '入库管理订单详情',
                icon: '',
                applyName: 'sub-vue2',
                auth: true,
                name: 'sub-vue2-warehouse-entry-edit',
                parentName: 'warehouse',
                isHidden: true,
            },
        ],
    },
    {
        id: '2859352624519988096',
        path: '/scan',
        name: 'scan',
        title: '扫码管理',
        icon: 'md-camera',
        children: [
            {
                id: '3',
                path: '/sub-vue2/scan/flow/list',
                title: '扫码流水',
                applyName: 'sub-vue2',
                auth: true,
                name: 'sub-vue2-scan-flow-list',
                parentName: 'scan',
            },
            {
                id: '31',
                path: '/sub-vue2/scan/flow/detail',
                title: '扫码详情',
                applyName: 'sub-vue2',
                auth: true,
                name: 'sub-vue2-scan-flow-detail',
                parentName: 'scan',
                isHidden: true,
            },
            {
                id: '5',
                path: '/sub-vue2/scan/distributor/list',
                title: '经销商扫码异常',
                applyName: 'sub-vue2',
                auth: true,
                name: 'sub-vue2-scan-distributor-list',
                parentName: 'scan',
            },
            {
                id: '6',
                path: '/sub-vue2/scan/query/list',
                title: '条码/胎号查询',
                applyName: 'sub-vue2',
                auth: true,
                name: 'sub-vue2-scan-query-list',
                parentName: 'scan',
            },
        ],
    },
    //{
    //    id: '2859371797253997505',
    //    path: '/customer',
    //    title: '客户管理',
    //    icon: 'md-people',
    //    children: [
    //        {
    //            id: '7',
    //            path: '/customer/manage/list',
    //            title: '客户管理',
    //            icon: '',
    //            children: [],
    //            auth: true,
    //            cache: true,
    //        },
    //        {
    //            id: '34',
    //            path: '/customer/storeSign/list',
    //            title: '门店签署管理',
    //            icon: '',
    //            children: [],
    //            auth: true,
    //            cache: true,
    //        },
    //    ],
    //},
    //{
    //    id: '2859371797253997511',
    //    path: '/credit',
    //    title: '授信管理',
    //    icon: 'logo-euro',
    //    children: [
    //        {
    //            id: '9',
    //            path: '/credit/creditAccount/list',
    //            title: '授信账户',
    //            icon: '',
    //            children: [],
    //            auth: true,
    //            cache: true,
    //        },
    //        {
    //            id: '10',
    //            path: '/credit/creditDetail/use',
    //            title: '授信使用',
    //            icon: '',
    //            children: [],
    //            auth: true,
    //            cache: true,
    //        },
    //        {
    //            id: '11',
    //            path: '/credit/creditDetail/collection',
    //            title: '授信收款',
    //            icon: '',
    //            children: [],
    //            auth: true,
    //            cache: true,
    //        },
    //        {
    //            id: '12',
    //            path: '/credit/creditDetail/amount',
    //            title: '授信额度',
    //            icon: '',
    //            children: [],
    //            auth: true,
    //            cache: true,
    //        },
    //        {
    //            id: '13',
    //            path: '/credit/creditSetting/list',
    //            title: '授信设置',
    //            icon: '',
    //            children: [],
    //            auth: true,
    //            cache: true,
    //        },
    //    ],
    //},
    //{
    //    id: '1',
    //    path: '/decoration',
    //    title: '门店装修管理',
    //    icon: 'ios-construct',
    //    children: [
    //        {
    //            id: '22',
    //            path: '/decoration/decorateAudit/list',
    //            title: '装修审核',
    //            icon: '',
    //            children: [],
    //            auth: true,
    //            cache: true,
    //        },
    //        {
    //            id: '30',
    //            path: '/decoration/directlyStoreSign/list',
    //            title: '直营门店签署管理',
    //            icon: '',
    //            children: [],
    //            auth: true,
    //            cache: true,
    //        },
    //    ],
    //},
    //{
    //    id: '4',
    //    path: '/group',
    //    title: '集团管理',
    //    icon: 'ios-folder-open',
    //    children: [
    //        {
    //            id: '8',
    //            path: '/group/groupCus/list',
    //            title: '集团客户',
    //            icon: '',
    //            children: [],
    //            auth: true,
    //            cache: true,
    //        },
    //        {
    //            id: '29',
    //            path: '/group/groupBidding/index',
    //            title: '集团客户招标',
    //            icon: '',
    //            children: [],
    //            auth: true,
    //            cache: true,
    //        },
    //    ],
    //},
    //{
    //    id: '2859371797253997507',
    //    path: '/statistics',
    //    title: '统计中心',
    //    icon: 'md-pie',
    //    children: [
    //        {
    //            id: '14',
    //            path: '/statistics/stock/list',
    //            title: '扫码库存',
    //            icon: '',
    //            children: [],
    //            auth: true,
    //            cache: true,
    //        },
    //        {
    //            id: '15',
    //            path: '/statistics/rebate/list',
    //            title: '经销商扫码有效统计',
    //            icon: '',
    //            children: [],
    //            auth: true,
    //            cache: true,
    //        },
    //        {
    //            id: '16',
    //            path: '/statistics/store/rebate',
    //            title: '门店积分返利',
    //            icon: '',
    //            children: [],
    //            auth: true,
    //            cache: true,
    //        },
    //        {
    //            id: '17',
    //            path: '/statistics/group/list',
    //            title: '集团单位发票/发货单统计',
    //            icon: '',
    //            children: [],
    //            auth: true,
    //            cache: true,
    //        },
    //        {
    //            id: '18',
    //            path: '/statistics/cruise/list',
    //            title: '业务员巡店统计表',
    //            icon: '',
    //            children: [],
    //            auth: true,
    //            cache: true,
    //        },
    //        {
    //            id: '19',
    //            path: '/statistics/storeSign/list',
    //            title: '签署门店销售任务量',
    //            icon: '',
    //            children: [],
    //            auth: true,
    //            cache: true,
    //        },
    //        {
    //            id: '20',
    //            path: '/statistics/inspection/list',
    //            title: '门店店检统计',
    //            icon: '',
    //            children: [],
    //            auth: true,
    //            cache: true,
    //        },
    //        {
    //            id: '21',
    //            path: '/statistics/yearInspection/list',
    //            title: '门店店检年度统计',
    //            icon: '',
    //            children: [],
    //            auth: true,
    //            cache: true,
    //        },
    //        {
    //            id: '35',
    //            path: '/statistics/rentSubsidy/list',
    //            title: '新零售补贴审核',
    //            icon: '',
    //            children: [],
    //            auth: true,
    //            cache: true,
    //        },
    //        {
    //            id: '36',
    //            path: '/statistics/credit/handingFeeList',
    //            title: '授信手续费统计',
    //            icon: '',
    //            children: [],
    //            auth: true,
    //            cache: true,
    //        },
    //        {
    //            id: '37',
    //            path: '/statistics/swordsmanSignRebate/list',
    //            title: '侠系列签约返利',
    //            icon: '',
    //            children: [],
    //            auth: true,
    //            cache: true,
    //        },
    //        {
    //            id: '38',
    //            path: '/statistics/dealerScanScore/index',
    //            title: '经销商扫码积分',
    //            icon: null,
    //            children: [],
    //            auth: true,
    //            cache: true,
    //        },
    //    ],
    //},
    //{
    //    id: '2859371797253997508',
    //    path: '/sales',
    //    title: '线上轮胎销售',
    //    icon: 'md-appstore',
    //    children: [
    //        {
    //            id: '24',
    //            path: '/sales/order/list',
    //            title: '销售订单',
    //            icon: '',
    //            children: [],
    //            auth: true,
    //            cache: true,
    //        },
    //        {
    //            id: '25',
    //            path: '/sales/rebateAudit/list',
    //            title: '购胎入库返利',
    //            icon: '',
    //            children: [],
    //            auth: true,
    //            cache: true,
    //        },
    //        {
    //            id: '23',
    //            path: '/sales/storePay/list',
    //            title: '月度门店线上支付统计',
    //            icon: '',
    //            children: [],
    //            auth: true,
    //            cache: true,
    //        },
    //    ],
    //},
    //{
    //    id: '2859371797253997510',
    //    path: '/assets',
    //    title: '资产中心',
    //    icon: 'logo-yen',
    //    children: [
    //        {
    //            id: '26',
    //            path: '/assets/withdrawal/index',
    //            title: '提现',
    //            icon: '',
    //            children: [],
    //            auth: true,
    //            cache: true,
    //        },
    //        {
    //            id: '27',
    //            path: '/assets/reconciliation/index',
    //            title: '对账',
    //            icon: '',
    //            children: [],
    //            auth: true,
    //            cache: true,
    //        },
    //        {
    //            id: '28',
    //            path: '/assets/dealerAccount/list',
    //            title: '账户管理',
    //            icon: '',
    //            children: [],
    //            auth: true,
    //            cache: true,
    //        },
    //    ],
    //},
    //{
    //    id: '2859371797253997504',
    //    path: '/setting',
    //    title: '系统设置',
    //    icon: 'md-settings',
    //    children: [
    //        {
    //            id: '31',
    //            path: '/setting/account/list',
    //            title: '账号管理',
    //            icon: '',
    //            children: [],
    //            auth: true,
    //            cache: true,
    //        },
    //        {
    //            id: '32',
    //            path: '/setting/role/list',
    //            title: '角色管理',
    //            icon: '',
    //            children: [],
    //            auth: true,
    //            cache: true,
    //        },
    //        {
    //            id: '33',
    //            path: '/setting/company/add',
    //            title: '企业认证',
    //            icon: '',
    //            children: [],
    //            auth: true,
    //            cache: true,
    //        },
    //    ],
    //},
];

const siderTreeList = [...testPage, ...projectPage];

export { siderTreeList };
