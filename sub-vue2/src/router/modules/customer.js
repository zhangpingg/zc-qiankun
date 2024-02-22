import CustomerManage from "@/pages/customer/customerManage/index.vue";
import customerManageDetail from "@/pages/customer/customerManage/customerDetail";
import CustomerApply from "@/pages/customer/customerApply/index";
import CustomerApplyDetail from "@/pages/customer/customerApply/applyDetail";
import { applyRoute } from "../const";

const customerRoutes = [
    {
        path: `${applyRoute}/customer/customerManage`,
        meta: {
            title: "客户管理",
            auth: true,
            cache: true,
        },
        component: CustomerManage,
    },
    {
        path: `${applyRoute}/customer/customerManage/detail`,
        meta: {
            title: "客户管理详情",
            auth: true,
            cache: true,
        },
        component: customerManageDetail,
    },
    {
        path: `${applyRoute}/customer/customerApply`,
        meta: {
            title: "用户申请",
            auth: true,
            cache: true,
        },
        component: CustomerApply,
    },
    {
        path: `${applyRoute}/customer/userApply/detail`,
        meta: {
            title: "申请详情",
            auth: true,
            cache: true,
        },
        component: CustomerApplyDetail,
    },
];

export { customerRoutes };
