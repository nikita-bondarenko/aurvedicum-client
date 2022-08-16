<template>
  <main class="container content">
    <span>Не удалось найти страницу</span>
  </main>
</template>
<script setup>
import { store } from '@/store/store'
store.updateProp('adminPage', 'adminProducts')
</script>
