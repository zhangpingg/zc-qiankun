// 待联调接口

import { ALLDistributor } from '@api/dealers';

// 【经销商】
const distributorAllSelectItem = {
    type: 'select',
    label: '经销商',
    prop: 'distributorId',
    options: [],
    loading: true,
    filterable: true,
};
// 获取经销商列表（所有的）
const getDistributor = async () => {
    distributorAllSelectItem.loading = true;
    ALLDistributor().then(
        (res) => {
            distributorAllSelectItem.loading = false;
            if (!res || res.length <= 0) {
                distributorAllSelectItem.options = [];
                return false;
            }
            distributorAllSelectItem.options = res.map((item) => {
                return {
                    label: item.name,
                    value: item.id,
                };
            });
        },
        () => {
            distributorAllSelectItem.options = [];
            distributorAllSelectItem.loading = false;
        },
    );
};
//getDistributor();

export { distributorAllSelectItem };
