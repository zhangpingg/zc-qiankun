// 接口
const apiFn = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const data = [
                { label: '选项一', value: 1 },
                { label: '选项二', value: 2 },
                { label: '选项三', value: 3 },
            ];
            resolve(data);
        });
    });
};

// 【动态-下拉框】
const dynamicSelectItem = {
    type: 'select',
    label: '动态-下拉框',
    prop: 'jj',
    options: [],
    loading: true,
    filterable: true,
    //value: 2,
};

// 获取下拉数据
const getOptionsData = async () => {
    try {
        dynamicSelectItem.loading = true;
        const res = await apiFn();
        dynamicSelectItem.options = res;
        dynamicSelectItem.loading = false;
    } catch (err) {
        dynamicSelectItem.loading = false;
    }
};
getOptionsData();

export { dynamicSelectItem };
