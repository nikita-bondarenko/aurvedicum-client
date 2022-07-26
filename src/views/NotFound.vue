<template>
  <div class="container">
    <span>Не удалось найти страницу</span>
  </div>
</template>
<script setup>
import { store } from '@/store/store'
store.updateProp('adminPage', 'adminProducts')
</script>
