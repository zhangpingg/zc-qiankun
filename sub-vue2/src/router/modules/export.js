import { applyRoute } from "../const";
import ExportList from "@/pages/exportList/index";

const exportRoutes = [
    {
        path: `${applyRoute}/export/exportList`,
        meta: {
            title: "导出列表",
            auth: true,
            cache: true,
        },
        component: ExportList,
    },
];

export { exportRoutes };
