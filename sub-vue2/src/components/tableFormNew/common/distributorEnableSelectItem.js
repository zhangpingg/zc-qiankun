// 待联调接口

import { apiGetEnableDistributorList } from '@api/common.js';

// 【经销商】
const distributorEnableSelectItem = {
    type: 'select',
    label: '经销商',
    prop: 'distributorId',
    options: [],
    loading: true,
    filterable: true,
};
// 获取经销商列表
const getDistributor = async () => {
    const params = {
        current: 1,
        size: 9999,
    };
    distributorEnableSelectItem.loading = true;
    apiGetEnableDistributorList(params).then(
        (res) => {
            distributorEnableSelectItem.loading = false;
            if (!res || res.list.length <= 0) {
                distributorEnableSelectItem.options = [];
                return false;
            }
            distributorEnableSelectItem.options = res.list.map((item) => {
                return {
                    label: item.name,
                    value: item.id,
                };
            });
        },
        () => {
            distributorEnableSelectItem.options = [];
            distributorEnableSelectItem.loading = false;
        },
    );
};
//getDistributor();

export { distributorEnableSelectItem };
