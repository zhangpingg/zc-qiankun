/**
 * @description 默认获取label值
 * @param {Array} options 字典数组
 * @param {Number} value value值，（如果是多个用','隔开，如:value:'1,2'）
 * @param {String} label 取某个key的值，默认label
 * @returns {String} 返回value对应的文本汉字值
 */
export const getLabelByValue = (options, value, label = 'label') => {
    if ([null, undefined, ''].includes(value)) {
        return '-';
    }
    let _list = options.filter((item) => String(value).split(',').includes(String(item.value)));
    let _label = _list.map((item) => item[label]).join('、');
    return _label;
};

// 字典集合 ===========================================================================================
// 【审核状态】
export const aduitStatusDict = [
    { value: 1, label: '审核中', color: 'blue' },
    { value: 2, label: '审核失败', color: 'red' },
    { value: 3, label: '审核成功', color: 'green' },
];
