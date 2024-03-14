<template>
    <Exception type="403" img-color :desc="ErrorInfo.desc403" :back-text="ErrorInfo.backText" />
</template>

<script setup>
import { Exception } from 'view-ui-plus';
import { ErrorInfo } from '../const';
</script>

<style scoped></style>
