import dayjs from 'dayjs';

// 方法 ===============================================================================
// 获取-当前年
const getCurrentYear = () => {
    let yearNow = new Date().getFullYear();
    return `${yearNow}`;
};
// 获取-上一个年月（如：1999-01）
const getPrevYearMoth = () => {
    let prevMonth = new Date().getMonth();
    let yearNow = new Date().getFullYear();
    if (prevMonth === 0) {
        prevMonth = 12;
        yearNow = yearNow - 1;
    }
    if (prevMonth < 10) {
        prevMonth = `0${prevMonth}`;
    }
    return `${yearNow}-${prevMonth}`;
};
// 获取-当前年月（如：2000-01）
const getCurrYearMoth = () => {
    return dayjs().format('YYYY-MM');
};
// 月份禁止选择 prev上月/current当前月/next次月 之前可选
const monthDisabled = (type = 'current') => {
    let endTime = '';
    switch (type) {
        case 'prev':
            endTime = dayjs().subtract(1, 'month').format('YYYYMM');
            break;
        case 'current':
            endTime = dayjs().format('YYYYMM');
            break;
        case 'next':
            endTime = dayjs().add(1, 'month').format('YYYYMM');
            break;
    }
    return (date) => {
        const selectTime = dayjs(date).format('YYYYMM');
        return selectTime > endTime;
    };
};

// 模板==============================================================================================
// 【日期区间】
const dateRangeTmplItem = { type: 'daterange', label: '日期选择区间', prop: ['startDate', 'endDate'] };

// 【日期时间区间】
const dateTimeRangeTmplItem = {
    type: 'datetimerange',
    label: '日期时间选择区间',
    prop: ['startDateTime', 'endDateTime'],
};

// 业务==================================================================================================
// 【年份】
const yearDateItem = { type: 'year', label: '年份', prop: 'year' };

// 【月份】
const monthDateItem = { type: 'month', label: '月份', prop: 'month', valueFormat: 'YYYY-MM' };

// 【月份区间】
const monthRangeDateItem = { type: 'monthrange', label: '月份', prop: ['startMonth', 'endMonth'] };

export {
    getCurrentYear,
    getPrevYearMoth,
    getCurrYearMoth,
    dateRangeTmplItem,
    dateTimeRangeTmplItem,
    yearDateItem,
    monthDateItem,
    monthRangeDateItem,
    monthDisabled,
};
