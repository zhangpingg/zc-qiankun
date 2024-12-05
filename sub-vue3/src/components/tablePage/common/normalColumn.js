import { renderFunc, judgeParams } from './const';

// 模板==============================================================================================
/**
 * 时间 YYYY-MM-DD HH:mm:ss 【 创建时间 createDate 】
 */
const dateNormalColumn = (titleOrOptions, key) => {
    const params = judgeParams(titleOrOptions);
    return {
        title: params.title || '创建时间',
        minWidth: 160,
        render: (h, p) => renderFunc(p, params.options?.key || key, 'createDate'),
        ...params.options,
    };
};
/**
 * 姓名 【 姓名 name 】
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
/**
 * 手机号 【 手机号 phone 】
 */
const personPhoneNormalColumn = (titleOrOptions, key) => {
    const params = judgeParams(titleOrOptions);
    return {
        title: params.title || '手机号',
        minWidth: 120,
        render: (h, p) => renderFunc(p, params.options?.key || key, 'phone'),
        ...params.options,
    };
};
/**
 * xx名称 【 xx名称 nameKey 】
 */
const nameStrNormalColumn = (titleOrOptions, key) => {
    const params = judgeParams(titleOrOptions);
    return {
        title: params.title || 'xx名称',
        minWidth: 180,
        render: (h, p) => renderFunc(p, params.options?.key || key, 'nameKey'),
        ...params.options,
    };
};
/**
 * 备注/长描述 【 备注 remark 】
 */
const remarkNormalColumn = (titleOrOptions, key) => {
    const params = judgeParams(titleOrOptions);
    return {
        title: params.title || '备注',
        minWidth: 160,
        render: (h, p) => renderFunc(p, params.options?.key || key, 'remark'),
        ...params.options,
    };
};
/**
 * 金额/数字 【 金额 amount 】
 */
const numberNormalColumn = (titleOrOptions, key) => {
    const params = judgeParams(titleOrOptions);
    return {
        title: params.title || '金额',
        minWidth: 120,
        render: (h, p) => renderFunc(p, params.options?.key || key, 'amount'),
        ...params.options,
    };
};
/**
 * ID/短编号 【 ID id 】
 */
const idNormalColumn = (titleOrOptions, key) => {
    const params = judgeParams(titleOrOptions);
    return {
        title: params.title || 'ID',
        minWidth: 100,
        render: (h, p) => renderFunc(p, params.options?.key || key, 'id'),
        ...params.options,
    };
};
// 业务==============================================================================================
/**
 * 联系人 【 联系人 ownerName 】
 */
const ownerNameNormalColumn = (titleOrOptions, key) => {
    const params = judgeParams(titleOrOptions);
    return {
        title: params.title || '联系人',
        minWidth: 120,
        render: (h, p) => renderFunc(p, params.options?.key || key, 'ownerName'),
        ...params.options,
    };
};
/**
 * 联系方式 【 联系方式 ownerPhone 】
 */
const ownerPhoneNormalColumn = (titleOrOptions, key) => {
    const params = judgeParams(titleOrOptions);
    return {
        title: params.title || '联系方式',
        minWidth: 120,
        render: (h, p) => renderFunc(p, params.options?.key || key, 'ownerPhone'),
        ...params.options,
    };
};
/**
 * 商品名称 【 商品名称 productName 】
 */
const productNameNormalColumn = (titleOrOptions, key) => {
    const params = judgeParams(titleOrOptions);
    return {
        title: params.title || '商品名称',
        minWidth: 220,
        render: (h, p) => renderFunc(p, params.options?.key || key, 'productName'),
        ...params.options,
    };
};
/**
 * 门店名称 【 门店名称 storeName 】
 */
const storeNameNormalColumn = (titleOrOptions, key) => {
    const params = judgeParams(titleOrOptions);
    return {
        title: params.title || '门店名称',
        minWidth: 220,
        render: (h, p) => renderFunc(p, params.options?.key || key, 'storeName'),
        ...params.options,
    };
};
/**
 * 门店编号 【 门店编号 storeSn 】
 */
const storeSnNormalColumn = (titleOrOptions, key) => {
    const params = judgeParams(titleOrOptions);
    return {
        title: params.title || '门店编号',
        minWidth: 120,
        render: (h, p) => renderFunc(p, params.options?.key || key, 'storeSn'),
        ...params.options,
    };
};
/**
 * 经销商 【 经销商 distributorName 】
 */
const distributorNormalColumn = (titleOrOptions, key) => {
    const params = judgeParams(titleOrOptions);
    return {
        title: params.title || '经销商',
        minWidth: 220,
        render: (h, p) => renderFunc(p, params.options?.key || key, 'distributorName'),
        ...params.options,
    };
};
/**
 * 科室 【 科室 dept 】
 */
const deptNormalColumn = (titleOrOptions, key) => {
    const params = judgeParams(titleOrOptions);
    return {
        title: params.title || '科室',
        minWidth: 80,
        render: (h, p) => renderFunc(p, params.options?.key || key, 'dept'),
        ...params.options,
    };
};
/**
 * 部门 【 部门 region 】
 */
const regionNormalColumn = (titleOrOptions, key) => {
    const params = judgeParams(titleOrOptions);
    return {
        title: params.title || '部门',
        minWidth: 140,
        render: (h, p) => renderFunc(p, params.options?.key || key, 'region'),
        ...params.options,
    };
};
/**
 * 规格 【 规格 tireSpec 】
 */
const specNormalColumn = (titleOrOptions, key) => {
    const params = judgeParams(titleOrOptions);
    return {
        title: params.title || '规格',
        minWidth: 120,
        render: (h, p) => renderFunc(p, params.options?.key || key, 'tireSpec'),
        ...params.options,
    };
};
/**
 * 层级 【 层级 tireLayer 】
 */
const layerNormalColumn = (titleOrOptions, key) => {
    const params = judgeParams(titleOrOptions);
    return {
        title: params.title || '层级',
        minWidth: 120,
        render: (h, p) => renderFunc(p, params.options?.key || key, 'tireLayer'),
        ...params.options,
    };
};
/**
 * 花纹 【 花纹 tireFigure 】
 */
const figureNormalColumn = (titleOrOptions, key) => {
    const params = judgeParams(titleOrOptions);
    return {
        title: params.title || '花纹',
        minWidth: 120,
        render: (h, p) => renderFunc(p, params.options?.key || key, 'tireFigure'),
        ...params.options,
    };
};
/**
 * 尺寸 【 尺寸 tireSize 】
 */
const tireSizeNormalColumn = (titleOrOptions, key) => {
    const params = judgeParams(titleOrOptions);
    return {
        title: params.title || '尺寸',
        minWidth: 120,
        render: (h, p) => renderFunc(p, params.options?.key || key, 'tireSize'),
        ...params.options,
    };
};
/**
 * 品牌 【 品牌 brandName 】
 */
const brandNormalColumn = (titleOrOptions, key) => {
    const params = judgeParams(titleOrOptions);
    return {
        title: params.title || '品牌',
        minWidth: 160,
        render: (h, p) => renderFunc(p, params.options?.key || key, 'brandName'),
        ...params.options,
    };
};
/**
 * 订单编号 【 订单编号 orderNo 】
 */
const orderNoNormalColumn = (titleOrOptions, key) => {
    const params = judgeParams(titleOrOptions);
    return {
        title: params.title || '订单编号',
        minWidth: 300,
        render: (h, p) => renderFunc(p, params.options?.key || key, 'orderNo'),
        ...params.options,
    };
};
/**
 * 交易流水号 【 交易流水号 paySn 】
 */
const paySnNormalColumn = (titleOrOptions, key) => {
    const params = judgeParams(titleOrOptions);
    return {
        title: params.title || '交易流水号',
        minWidth: 240,
        render: (h, p) => renderFunc(p, params.options?.key || key, 'paySn'),
        ...params.options,
    };
};

export {
    dateNormalColumn,
    personNameNormalColumn,
    personPhoneNormalColumn,
    nameStrNormalColumn,
    remarkNormalColumn,
    numberNormalColumn,
    idNormalColumn,
    ownerNameNormalColumn,
    ownerPhoneNormalColumn,
    productNameNormalColumn,
    storeNameNormalColumn,
    storeSnNormalColumn,
    distributorNormalColumn,
    deptNormalColumn,
    regionNormalColumn,
    specNormalColumn,
    layerNormalColumn,
    figureNormalColumn,
    tireSizeNormalColumn,
    brandNormalColumn,
    orderNoNormalColumn,
    paySnNormalColumn,
};

