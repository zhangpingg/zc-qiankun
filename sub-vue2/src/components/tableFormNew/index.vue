<!-- eslint-disable vue/no-unused-vars -->
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
    <Form :model="formData" ref="formRef" v-bind="{ 'label-width': 110, ...formConfig }" :key="updateKey">
        <Row>
            <Col
                v-for="{ type, label, prop, options, customComponent, ...restItem } in formList"
                :key="judgeIsValidArr(prop) ? prop.join(',') : prop"
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
                        @on-change="restItem.onChange || null"
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
                        @on-change="restItem.onChange || null"
                    />
                </FormItem>
                <!--级联+异步加载-->
                <FormItem :label="label && label + ':'" :prop="prop" v-if="type == 'cascaderLoadData'">
                    <Cascader
                        :data="options"
                        v-model="formData[prop]"
                        :change-on-select="true"
                        v-bind="{ placeholder: '请选择', ...restItem }"
                        @on-change="restItem.onChange || null"
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
                <FormItem
                    :label="label && label + ':'"
                    :prop="judgeIsValidArr(prop) ? prop.join(',') : prop"
                    v-if="type == 'monthrange'"
                >
                    <el-date-picker
                        v-model="formData[judgeIsValidArr(prop) ? prop.join(',') : prop]"
                        type="monthrange"
                        v-bind="{
                            format: 'yyyy-MM',
                            valueFormat: 'yyyy-MM',
                            class: 'w100',
                            rangeSeparator: '-',
                            startPlaceholder: '开始月份',
                            endPlaceholder: '结束月份',
                            ...restItem,
                        }"
                    ></el-date-picker>
                </FormItem>
                <!--日期选择区间-->
                <FormItem
                    :label="label && label + ':'"
                    :prop="judgeIsValidArr(prop) ? prop.join(',') : prop"
                    v-if="type == 'daterange'"
                >
                    <DatePicker
                        type="daterange"
                        v-model="formData[judgeIsValidArr(prop) ? prop.join(',') : prop]"
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
                <FormItem
                    :label="label && label + ':'"
                    :prop="judgeIsValidArr(prop) ? prop.join(',') : prop"
                    v-if="type == 'datetimerange'"
                >
                    <DatePicker
                        type="datetimerange"
                        v-model="formData[judgeIsValidArr(prop) ? prop.join(',') : prop]"
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
                        :is="getCustomComponentMap(customComponent)"
                        :value="formData[prop]"
                        :restItem="restItem"
                        @onChange="(val) => changeCustomComponent(prop, val, restItem.onChange)"
                    />
                </FormItem>
            </Col>
            <Col class="tar" :span="btnLayoutSpan" v-if="isShowSearchReset">
                <FormItem>
                    <slot name="extraContent" />
                    <Button type="primary" @click="searchForm">查询</Button>
                    <Button @click="resetForm" class="ml-8">重置</Button>
                    <slot name="extraBtn" />
                </FormItem>
            </Col>
        </Row>
    </Form>
</template>

<script>
import Vue from 'vue';
import { isValidArr, clearInvalidKey } from '@/libs/util.tool';
import dayjs from 'dayjs';
import { CustomComponentMap } from './const';
export default {
    props: {
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
            default: () => true,
        },
    },
    data() {
        return {
            formData: {},
            formRef: null,
            updateKey: 0,
        };
    },
    computed: {
        // 查询按钮的布局span
        btnLayoutSpan: function () {
            const _layoutSpanMap = {
                0: 24,
                1: 16,
                2: 8,
            };
            return _layoutSpanMap[this.formList.length % 3];
        },
    },
    mounted() {
        this.initSearchParams();
    },
    methods: {
        // 获取自定义组件
        getCustomComponentMap(componentsName) {
            return CustomComponentMap[componentsName];
        },
        // 判断-是否是有效的非空数组
        judgeIsValidArr(list) {
            return isValidArr(list);
        },
        // change-自定义组件
        changeCustomComponent(prop, val, callback) {
            Vue.set(this.formData, prop, val);
            callback && callback();
        },
        // 初始化查询的参数，赋默认值
        initSearchParams() {
            this.formList.forEach((item) => {
                if (item.value) {
                    Vue.set(this.formData, item.prop, item.value);
                }
            });
        },
        /**
         * @description 根据key获取其相应的选项
         * @param {Array} list 对象数组
         * @param {String} key 对象中的某个key
         * @returns {String} 返回选项
         */
        getItemByKey(list, key) {
            const _item = list.find((item) => {
                const _flag = (isValidArr(item.prop) ? item.prop.join(',') : item.prop) === key;
                return _flag;
            });
            return _item;
        },
        /**
         * @description 格式化对象，清除value是null，undefined的key，并格式化拼接时间
         * @param {Object} data 需要格式化的对象
         * @returns {Object} 返回格式化后的对象
         */
        formatFormData(data) {
            const _data = clearInvalidKey(data);
            for (let key in _data) {
                let _item = this.getItemByKey(this.formList, key);
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
                                dayjs(`${_data[key][0]}`).format('YYYY-MM-DD HH:mm') +
                                    (_item.isJoinTimeSuffix ? ':00' : '');
                            _data[key.split(',')[1]] =
                                _data[key][1] &&
                                dayjs(`${_data[key][1]}`).format('YYYY-MM-DD HH:mm') +
                                    (_item.isJoinTimeSuffix ? ':59' : '');
                            break;
                    }
                }
                if (key.indexOf(',') > -1) {
                    delete _data[key];
                }
            }
            return clearInvalidKey(_data);
        },
        // 查询-表单
        searchForm() {
            const _formData = this.formatFormData(this.formData);
            this.$emit('onSubmit', _formData);
        },
        // 重置-表单
        resetForm() {
            this.$refs['formRef'].resetFields();
            this.formList.forEach((item) => {
                switch (item.type) {
                    case 'cascader':
                    case 'cascaderLoadData':
                        Vue.set(this.formData, item.prop, []);
                        break;
                }
            });
            this.initSearchParams();
            const _formData = this.formatFormData(this.formData);
            this.$emit('onReset', _formData);
            this.updateKey++;
        },
        // 获取-form数据
        getFormData() {
            const _formData = this.formatFormData(this.formData);
            return _formData;
        },
        // 动态设置formData中选项的的默认值
        setFormDataItemValue(prop, val) {
            Vue.set(this.formData, prop, val);
        },
    },
};
</script>

<style lang="less" scoped>
.el-date-editor--monthrange.el-input__inner {
    width: 100%;
}
</style>
