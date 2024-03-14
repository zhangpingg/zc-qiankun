<template>
    <Exception type="500" img-color :desc="ErrorInfo.desc500" :back-text="ErrorInfo.backText" />
</template>

<script setup>
import { Exception } from 'view-ui-plus';
import { ErrorInfo } from '../const';
</script>

<style scoped></style>
