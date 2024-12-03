// 【上架状态】（项目中暂时没有用到）
const listingStatusSelectItem = {
    type: 'select',
    label: '上架状态',
    prop: 'isShelf',
    options: [
        { label: '上架', value: 1 },
        { label: '下架', value: 0 },
    ],
};

// 【启用状态】（项目中暂时没有用到）
const enableStatusSelectItem = {
    type: 'select',
    label: '启用状态',
    prop: 'isEnabled',
    options: [
        { label: '启用', value: 1 },
        { label: '禁用', value: 0 },
    ],
    isConvertToBoolean: true,
};

export { listingStatusSelectItem, enableStatusSelectItem };
