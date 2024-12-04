// 接口
const apiFn = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const data = [
                {
                    name: '安徽省',
                    id: '1',
                    children: [
                        { name: '黄山市', id: '1-1' },
                        { name: '安庆市', id: '1-2' },
                    ],
                },
                {
                    name: '浙江省',
                    id: '2',
                    children: [
                        { name: '杭州市', id: '2-1' },
                        { name: '金华市', id: '2-2' },
                    ],
                },
            ];
            resolve(data);
        });
    });
};

// 【动态-级联】
const dynamicCascaderItem = {
    type: 'cascader',
    label: '动态-级联',
    prop: 'kk',
    options: [],
};
// 递归-转换key
const recursion = (arr) => {
    for (let i = 0; i < arr.length; i++) {
        arr[i]['label'] = arr[i]['name'];
        arr[i]['value'] = arr[i]['id'];
        if (arr[i].children) {
            recursion(arr[i].children);
        } else {
            delete arr[i].children;
        }
    }
    return arr;
};
// 获取下拉数据
const getOptionsData = async () => {
    const res = await apiFn();
    dynamicCascaderItem.options = recursion(res);
};
getOptionsData();

export { dynamicCascaderItem };
