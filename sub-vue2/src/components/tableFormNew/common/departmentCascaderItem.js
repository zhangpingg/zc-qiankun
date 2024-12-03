// 待联调接口

import { GetDept } from '@api/dealers';

// 【科室-部门】
const departmentCascaderItem = {
    type: 'cascader',
    label: '科室-部门',
    prop: 'dept',
    options: [],
};
// 递归科室部门
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
// 获取科室部门
const getDept = async () => {
    const res = await GetDept();
    departmentCascaderItem.options = recursion(res[0].children);
};
//getDept();

export { departmentCascaderItem };
