import { isValidVal } from '@/libs/util.tool';

const renderFunc = (p, key, defaultKey) => {
    const value = p.row[key || defaultKey];
    return [isValidVal(value) ? value : '-'];
};

// 判断参数是字符串，还是对象，然后整合为一个对象
const judgeParams = (titleOrOptions) => {
    const params = {
        title: '',
        options: {},
    };
    let toString = Object.prototype.toString;
    if (['[object String]', '[object Undefined]', '[object Null]'].includes(toString.call(titleOrOptions))) {
        params.title = titleOrOptions;
    } else if (['[object Object]'].includes(toString.call(titleOrOptions))) {
        params.options = { ...titleOrOptions };
    } else {
        console.error('参数类型错误', toString.call(titleOrOptions));
    }
    return params;
};

export { renderFunc, judgeParams };