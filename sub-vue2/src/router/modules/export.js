import { applyRoute } from "../const";
import ExportListIndex from "@/pages/exportList/index";

const exportRoutes = [
    {
        path: `${applyRoute}/exportList/index`,
        meta: {
            title: "导出列表",
            auth: true,
            cache: true,
        },
        component: ExportListIndex,
    },
];

export { exportRoutes };
