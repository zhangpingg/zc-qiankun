// 待联调接口

import { queryList } from '@api/dealers';

// 【经销商】
const distributorSelectItem = {
    type: 'select',
    label: '经销商',
    prop: 'distributorId',
    options: [],
    loading: true,
    filterable: true,
};
// 获取经销商列表
const getDistributor = async () => {
    let params = {
        size: 99999,
    };
    distributorSelectItem.loading = true;
    queryList(params).then(
        (res) => {
            distributorSelectItem.loading = false;
            if (!res || res.records.length <= 0) {
                distributorSelectItem.options = [];
                return false;
            }
            distributorSelectItem.options = res.records.map((item) => {
                return {
                    label: item.name,
                    value: item.id,
                };
            });
        },
        () => {
            distributorSelectItem.options = [];
            distributorSelectItem.loading = false;
        },
    );
};
//getDistributor();

export { distributorSelectItem };
