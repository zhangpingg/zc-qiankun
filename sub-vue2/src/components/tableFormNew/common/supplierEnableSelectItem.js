// 待联调接口

import { apiGetEnablesupplierList } from '@api/common.js';

// 【供应商】
const supplierEnableSelectItem = {
    type: 'select',
    label: '供应商',
    prop: 'supplierId',
    options: [],
    loading: true,
    filterable: true,
};
// 获取供应商列表(启用的)
const getEnableSupplier = async () => {
    supplierEnableSelectItem.loading = true;
    apiGetEnablesupplierList().then(
        (res) => {
            supplierEnableSelectItem.loading = false;
            if (!res || res.length <= 0) {
                supplierEnableSelectItem.options = [];
                return false;
            }
            supplierEnableSelectItem.options = res.map((item) => {
                return {
                    label: item.name,
                    value: item.id,
                };
            });
        },
        () => {
            supplierEnableSelectItem.options = [];
            supplierEnableSelectItem.loading = false;
        },
    );
};
//getEnableSupplier();

export { supplierEnableSelectItem };
