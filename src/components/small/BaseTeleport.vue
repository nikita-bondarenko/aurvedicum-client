<template>
  <teleport :to="to">
    <slot></slot>
  </teleport>
</template>
<script setup>
/* eslint-disable */
import { defineProps } from 'vue'
const props = defineProps(['to'])
</script>
