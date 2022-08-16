<template>
  <main class="container content">
    <BaseSpinner v-if="store.isLoading"></BaseSpinner>
    <BasePageItem v-else :data="data"></BasePageItem>
  </main>
</template>
<script>
import { defineComponent } from 'vue'
import { politic } from '@/hooks/useContent'
export default defineComponent(politic)
</script>
