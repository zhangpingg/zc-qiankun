import { renderFunc, judgeParams } from './const';

// 模板==============================================================================================

/**
 * 姓名 【 姓名 name 】
 * 示例1：personNameNormalColumn()
 * 示例2：personNameNormalColumn('姓名2'),
 * 示例3：personNameNormalColumn(null, 'aa')
 * 示例4：personNameNormalColumn('姓名4', 'aa')
 * 示例5：personNameNormalColumn({ minWidth: 80})
 * 示例6：personNameNormalColumn({ title: '姓名6', key: 'aa', minWidth: 80 })
 */
const personNameNormalColumn = (titleOrOptions, key) => {
    const params = judgeParams(titleOrOptions);
    return {
        title: params.title || '姓名',
        minWidth: 120,
        render: (h, p) => renderFunc(p, params.options?.key || key, 'name'),
        ...params.options,
    };
};

// 手机号 【 手机号 phone 】
const personPhoneNormalColumn = (titleOrOptions, key) => {
    const params = judgeParams(titleOrOptions);
    return {
        title: params.title || '手机号',
        minWidth: 140,
        render: (h, p) => renderFunc(p, params.options?.key || key, 'phone'),
        ...params.options,
    };
};

// 时间 YYYY-MM-DD HH:mm:ss 【 创建时间 createDate 】
const dateNormalColumn = (titleOrOptions, key) => {
    const params = judgeParams(titleOrOptions);
    return {
        title: params.title || '创建时间',
        minWidth: 180,
        render: (h, p) => renderFunc(p, params.options?.key || key, 'createDate'),
        ...params.options,
    };
};

// 金额/数字 【 金额 amount 】
const numberNormalColumn = (titleOrOptions, key) => {
    const params = judgeParams(titleOrOptions);
    return {
        title: params.title || '金额',
        minWidth: 120,
        render: (h, p) => renderFunc(p, params.options?.key || key, 'amount'),
        ...params.options,
    };
};

// ID/短编号 【 ID id 】
const idNormalColumn = (titleOrOptions, key) => {
    const params = judgeParams(titleOrOptions);
    return {
        title: params.title || 'ID',
        minWidth: 100,
        render: (h, p) => renderFunc(p, params.options?.key || key, 'id'),
        ...params.options,
    };
};

// xx名称 【 xx名称 nameKey 】
const nameStrNormalColumn = (titleOrOptions, key) => {
    const params = judgeParams(titleOrOptions);
    return {
        title: params.title || 'xx名称',
        minWidth: 180,
        render: (h, p) => renderFunc(p, params.options?.key || key, 'nameKey'),
        ...params.options,
    };
};

// 备注/长描述 【 备注 remark 】
const remarkNormalColumn = (titleOrOptions, key) => {
    const params = judgeParams(titleOrOptions);
    return {
        title: params.title || '备注',
        minWidth: 240,
        render: (h, p) => renderFunc(p, params.options?.key || key, 'remark'),
        ...params.options,
    };
};

// 业务==============================================================================================

// 订单编号 【 订单编号 orderNo 】
const orderNoNormalColumn = (titleOrOptions, key) => {
    const params = judgeParams(titleOrOptions);
    return {
        title: params.title || '订单编号',
        minWidth: 300,
        render: (h, p) => renderFunc(p, params.options?.key || key, 'orderNo'),
        ...params.options,
    };
};

export {
    personNameNormalColumn,
    personPhoneNormalColumn,
    dateNormalColumn,
    numberNormalColumn,
    idNormalColumn,
    nameStrNormalColumn,
    remarkNormalColumn,
    orderNoNormalColumn,
};
