<template>
    <div v-if="props.visible" class="detail">
        <!-- 修改和新增 -->
        <el-form
            v-if="state.actionType === 'ADD' || state.actionType === 'edit'"
            ref="ruleFormRef"
            :model="formData"
            label-width="auto"
            status-icon
        >
            <el-form-item label="名称" prop="name">
                <el-input v-model="formData.name" clearable />
            </el-form-item>
            <el-form-item label="电话" prop="phone">
                <el-input v-model="formData.phone" clearable />
            </el-form-item>
            <el-form-item label="地址" prop="address">
                <el-input v-model="formData.address" clearable />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm">确定</el-button>
                <el-button @click="closeModal">取消</el-button>
            </el-form-item>
        </el-form>
        <template v-if="state.actionType === 'EDIT'">
            <el-button class="close-button" :link="true" @click="closeModal">
                <el-icon alt="修改"><Close /></el-icon>
            </el-button>
            <div class="name view-item">
                <div>
                    {{ formData?.name }}
                </div>
                <div class="action">
                    <el-button :link="true" @click="() => (state.actionType = 'edit')">
                        <el-icon alt="修改"><EditPen /></el-icon>
                    </el-button>
                    <el-popconfirm
                        title="确定要删除吗?"
                        @confirm="deleteItem"
                        cancel-button-text="取消"
                        confirm-button-text="确定"
                    >
                        <template #reference>
                            <el-button :link="true">
                                <el-icon alt="删除"><Delete /></el-icon>
                            </el-button>
                        </template>
                    </el-popconfirm>
                </div>
            </div>
            <div class="view-item">
                <el-icon><Phone /></el-icon> {{ formData?.phone }}
            </div>
            <div class="view-item">
                <el-icon><Location /></el-icon>{{ formData?.address }}
            </div>
        </template>
    </div>
</template>

<script setup>
import { defineProps, defineEmits, reactive, ref, watch } from 'vue';
import { ElMessage } from 'element-plus';
import { Phone, Location, Delete, EditPen, Close } from '@element-plus/icons-vue';
import info from '../store';

const ruleFormRef = ref();
const props = defineProps({
    visible: {
        type: Boolean,
        required: true,
    },
    record: {
        type: Object,
        required: false,
    },
    actionType: {
        type: String,
        required: false,
        default: 'ADD',
    },
});
const emits = defineEmits(['onUpdate:visible', 'deleteIcon', 'handleSuccess']);
const state = reactive({
    actionType: '', // ADD EDIT edit
});
const formData = ref(props.record || {}); // 表单数据

// 关闭新增/编辑弹框
const closeModal = () => {
    if (state.actionType !== props.actionType) {
        state.actionType = props.actionType;
    } else {
        emits('onUpdate:visible', false);
    }
};
// 删除该icon
const deleteItem = () => {
    info.deleteInfo(props.record?.id);
    ElMessage({
        message: '信息删除成功',
        type: 'success',
    });
    closeModal();
    emits('deleteIcon');
};
// 提交form表单
const submitForm = () => {
    const key = state.actionType === 'ADD' ? +Date.now() : props.record?.id;
    info.editInfo(key, {
        ...props.record,
        ...formData.value,
    });
    if (state.actionType === 'ADD') {
        formData.value = {};
        ElMessage({
            message: '信息添加成功',
            type: 'success',
        });
        closeModal();
        emits('handleSuccess');
    } else {
        ElMessage({
            message: '信息修改成功',
            type: 'success',
        });
    }
};

// 监听props
watch(props, () => {
    const { x, y, ...rest } = props.record;
    if (rest?.id !== formData.value?.id) {
        formData.value = rest;
    }
    state.actionType = props.actionType;
});
</script>

<style scoped>
.close-button {
    position: absolute;
    right: 0.2em;
    top: 0.2em;
    font-size: 1.2em;
}
.detail {
    position: absolute;
    top: 0;
    left: 0;
    width: 400px;
    z-index: 2;
    background: #fff;
    display: flex;
    flex-direction: column;
    text-align: left;
    gap: 8px;
    font-size: 12px;
    padding: 10px;
}
.detail .view-item {
    display: flex;
    align-items: center;
    gap: 6px;
}
.name {
    justify-content: space-between;
    font-weight: 600;
}
.action {
    flex: 0 0 60px;
    text-align: right0;
}
</style>
