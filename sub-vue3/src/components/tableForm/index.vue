<!--
 * @Author: zhangping
 * @Date: 2024-05-15 14:12:05
 * @Description: 表格上方的查询条件组件
 * 选项类型：
 * input：普通输入框
 * select：下拉框
       isConvertToBoolean: true/false 是否转换为boolean
 * cascader：级联
 * year：年
 * month: 月
 * daterange: 日期区间
       isJoinTimeSuffix: true/false 是否拼接时间后缀
 * datetimerange：日期时间区间、
       isJoinTimeSuffix: true/false 是否拼接时间后缀
 * monthrange：月份区间
 * custom：自定义组件
-->

<template>
    <Form :model="formData" ref="formRef" v-bind="{ labelWidth: 110, ...formConfig }">
        <Row>
            <Col
                v-for="{ type, label, prop, options, customComponent, ...restItem } in formList"
                :key="getStrProp(prop)"
                span="8"
            >
                <!--输入框-->
                <FormItem :label="label && label + ':'" :prop="prop" v-if="type == 'input'">
                    <Input v-model="formData[prop]" v-bind="{ clearable: true, placeholder: '请输入', ...restItem }" />
                </FormItem>
                <!--下拉框-->
                <FormItem :label="label && label + ':'" :prop="prop" v-if="type == 'select'">
                    <Select
                        v-model="formData[prop]"
                        v-bind="{ placeholder: '请选择', clearable: true, ...restItem }"
                        @on-change="restItem?.onChange"
                        @on-open-change="restItem?.onOpenChange"
                        @on-query-change="restItem?.onQueryChange"
                        @remote-method="restItem?.remoteMethod"
                    >
                        <Option v-for="item in options" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </FormItem>
                <!--级联-->
                <FormItem :label="label && label + ':'" :prop="prop" v-if="type == 'cascader'">
                    <Cascader
                        :data="options"
                        v-model="formData[prop]"
                        :change-on-select="true"
                        v-bind="{ placeholder: '请选择', ...restItem }"
                        @on-change="restItem?.onChange"
                    />
                </FormItem>
                <!--级联+异步加载-->
                <FormItem :label="label && label + ':'" :prop="prop" v-if="type == 'cascaderLoadData'">
                    <Cascader
                        :data="options"
                        v-model="formData[prop]"
                        :change-on-select="true"
                        v-bind="{ placeholder: '请选择', ...restItem }"
                        @on-change="restItem?.onChange"
                    />
                </FormItem>
                <!--年份-->
                <FormItem :label="label && label + ':'" :prop="prop" v-if="type == 'year'">
                    <DatePicker
                        type="year"
                        v-model="formData[prop]"
                        v-bind="{ class: 'w100', placeholder: '请选择', ...restItem }"
                    />
                </FormItem>
                <!--月份-->
                <FormItem :label="label && label + ':'" :prop="prop" v-if="type == 'month'">
                    <DatePicker
                        type="month"
                        v-model="formData[prop]"
                        :options="options"
                        v-bind="{ format: 'yyyy-MM', class: 'w100', placeholder: '请选择', ...restItem }"
                    />
                </FormItem>
                <!--月份区间-->
                <FormItem :label="label && label + ':'" :prop="getStrProp(prop)" v-if="type == 'monthrange'">
                    <el-date-picker
                        v-model="formData[getStrProp(prop)]"
                        type="monthrange"
                        v-bind="{
                            format: 'YYYY-MM',
                            valueFormat: 'YYYY-MM',
                            class: 'w100',
                            rangeSeparator: '-',
                            startPlaceholder: '开始月份',
                            endPlaceholder: '结束月份',
                            ...restItem,
                        }"
                    ></el-date-picker>
                </FormItem>
                <!--日期选择区间-->
                <FormItem :label="label && label + ':'" :prop="getStrProp(prop)" v-if="type == 'daterange'">
                    <DatePicker
                        type="daterange"
                        v-model="formData[getStrProp(prop)]"
                        v-bind="{
                            format: 'yyyy-MM-dd',
                            clearable: true,
                            class: 'w100',
                            placeholder: '请选择',
                            ...restItem,
                        }"
                    />
                </FormItem>
                <!--日期时间选择区间-->
                <FormItem :label="label && label + ':'" :prop="getStrProp(prop)" v-if="type == 'datetimerange'">
                    <DatePicker
                        type="datetimerange"
                        v-model="formData[getStrProp(prop)]"
                        v-bind="{
                            format: 'yyyy-MM-dd HH:mm',
                            clearable: true,
                            class: 'w100',
                            placeholder: '请选择',
                            ...restItem,
                        }"
                    />
                </FormItem>
                <!--自定义表单项-->
                <FormItem :label="label && label + ':'" :prop="prop" v-if="type === 'custom'">
                    <component
                        :is="customComponent"
                        :value="formData[prop]"
                        :restItem="restItem"
                        @onChange="(val) => changeCustomComponent(prop, val, restItem.onChange)"
                    />
                </FormItem>
            </Col>
            <Col class="tar" :span="btnLayoutSpan">
                <FormItem>
                    <Button type="primary" @click="searchForm">查询</Button>
                    <Button @click="resetForm" class="ml-8">重置</Button>
                    <slot name="extraBtn" />
                </FormItem>
            </Col>
        </Row>
    </Form>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue';
import { Form, FormItem, Row, Col, Input, Select, Option, Cascader, DatePicker, Button } from 'view-ui-plus';
//import { ElDatePicker } from 'element-plus';
import { isValidArr, clearInvalidKey } from '@/libs/util.tool';
import dayjs from 'dayjs';

const props = defineProps({
    // form配置
    formConfig: {
        type: Object,
        default: () => {},
    },
    // 查询条件列表
    formList: {
        type: Array,
        default: () => [],
    },
    // 是否显示查询/设置按钮
    isShowSearchReset: {
        type: Boolean,
        default: true,
    },
});
const emit = defineEmits(['onSubmit', 'onReset']);

const formData = reactive({});
const formRef = ref(null);

// 查询按钮的布局span
const btnLayoutSpan = computed(() => {
    const _layoutSpanMap = {
        0: 24,
        1: 16,
        2: 8,
    };
    return _layoutSpanMap[props.formList.length % 3];
});
// 获取字符串prop
const getStrProp = (prop) => {
    return isValidArr(prop) ? prop.join(',') : prop;
};
// 初始化查询的参数，赋默认值
const initSearchParams = () => {
    props.formList.forEach((item) => {
        if (item.value) {
            formData[item.prop] = item.value;
        }
    });
};
/**
 * @description 根据key获取其相应的选项
 * @param {Array} list 对象数组
 * @param {String} key 对象中的某个key
 * @returns {String} 返回选项
 */
const getItemByKey = (list, key) => {
    const _item = list.find((item) => {
        const _flag = (isValidArr(item.prop) ? item.prop.join(',') : item.prop) === key;
        return _flag;
    });
    return _item;
};
/**
 * @description 格式化对象，清除value是null，undefined的key，并格式化拼接时间
 * @param {Object} data 需要格式化的对象
 * @returns {Object} 返回格式化后的对象
 */
const formatFormData = (data) => {
    const _data = clearInvalidKey(data);
    for (let key in _data) {
        let _item = getItemByKey(props.formList, key);
        if (_item) {
            switch (_item.type) {
                case 'select':
                    if (_item.isConvertToBoolean) {
                        _data[key] = !!Number(_data[key]);
                    }
                    break;
                case 'year':
                    if (_data[key]) {
                        _data[key] = dayjs(_data[key]).format('YYYY');
                    }
                    break;
                case 'month':
                    if (_data[key]) {
                        _data[key] = dayjs(_data[key]).format(_item.valueFormat || 'YYYY-MM');
                    }
                    break;
                case 'monthrange':
                    _data[key.split(',')[0]] = _data[key][0];
                    _data[key.split(',')[1]] = _data[key][1];
                    break;
                case 'daterange':
                    _data[key.split(',')[0]] =
                        _data[key][0] &&
                        dayjs(_data[key][0]).format('YYYY-MM-DD') + (_item.isJoinTimeSuffix ? ' 00:00:00' : '');
                    _data[key.split(',')[1]] =
                        _data[key][1] &&
                        dayjs(_data[key][1]).format('YYYY-MM-DD') + (_item.isJoinTimeSuffix ? ' 23:59:59' : '');
                    break;
                case 'datetimerange':
                    _data[key.split(',')[0]] =
                        _data[key][0] &&
                        dayjs(`${_data[key][0]}`).format('YYYY-MM-DD HH:mm') + (_item.isJoinTimeSuffix ? ':00' : '');
                    _data[key.split(',')[1]] =
                        _data[key][1] &&
                        dayjs(`${_data[key][1]}`).format('YYYY-MM-DD HH:mm') + (_item.isJoinTimeSuffix ? ':59' : '');
                    break;
            }
        }
        if (key.indexOf(',') > -1) {
            delete _data[key];
        }
    }
    return clearInvalidKey(_data);
};
// change-自定义组件
const changeCustomComponent = (prop, val, callback) => {
    formData[prop] = val;
    callback && callback();
};
// 查询-表单
const searchForm = () => {
    const _formData = formatFormData(formData);
    emit('onSubmit', _formData);
};
// 重置-表单
const resetForm = () => {
    formRef.value.resetFields();
    initSearchParams();
    const _formData = formatFormData(formData);
    emit('onReset', _formData);
};
// 获取-form数据
const getFormData = () => {
    const _formData = formatFormData(formData);
    return formatFormData(_formData);
};

defineExpose({ getFormData });
onMounted(() => {
    initSearchParams();
});
</script>

<style lang="less" scoped>
:deep(.el-date-editor) {
    width: 100%;
}
</style>
