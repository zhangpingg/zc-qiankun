<template>
    <div>
        <el-tree
            :data="resData"
            node-key="id"
            default-expand-all
            @node-drop="handleDrop"
            draggable
            :allow-drop="allowDrop"
        >
        </el-tree>
    </div>
</template>

<script setup>
import { resData } from './const';

// 拖拽成功完成时触发
const handleDrop = (draggingNode, dropNode) => {
    console.log('拖拽完成: ', draggingNode.data, dropNode.data);
    // 在此处调接口，并刷新tree树
};
// 判断节点能否被拖拽
const allowDrop = (draggingNode) => {
    if (draggingNode.data.id === 7) {
        return false;
    } else {
        return true;
    }
};
</script>

<style scoped></style>
