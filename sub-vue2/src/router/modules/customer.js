import CustomerManageIndex from '@/pages/customer/customerManage/index.vue';
import customerManageDetail from '@/pages/customer/customerManage/detail';
import CustomerApplyIndex from '@/pages/customer/customerApply/index';
import CustomerApplyDetail from '@/pages/customer/customerApply/detail';
import { applyRoute } from '../const';

const customerRoutes = [
    {
        path: `${applyRoute}/customer/customerManage/index`,
        meta: {
            title: '客户管理',
            auth: true,
            cache: true,
        },
        component: CustomerManageIndex,
    },
    {
        path: `${applyRoute}/customer/customerManage/detail`,
        meta: {
            title: '客户管理详情',
            auth: true,
            cache: false,
        },
        component: customerManageDetail,
    },
    {
        path: `${applyRoute}/customer/userApply/index`,
        meta: {
            title: '用户申请',
            auth: true,
            cache: true,
        },
        component: CustomerApplyIndex,
    },
    {
        path: `${applyRoute}/customer/userApply/detail`,
        meta: {
            title: '用户申请详情',
            auth: true,
            cache: false,
        },
        component: CustomerApplyDetail,
    },
];

export { customerRoutes };
