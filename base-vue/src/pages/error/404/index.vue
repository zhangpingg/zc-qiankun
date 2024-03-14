<template>
    <Exception type="404" img-color :desc="ErrorInfo.desc404" :back-text="ErrorInfo.backText" />
</template>

<script setup>
import { Exception } from 'view-ui-plus';
import { ErrorInfo } from '../const';
</script>

<style scoped></style>
