<template>
  <main class="container content">
    <BaseSpinner v-if="store.isLoading"></BaseSpinner>
    <BasePageItem v-else :data="data"></BasePageItem>
  </main>
</template>
<script>
import { defineComponent } from 'vue'
import { agreement } from '@/hooks/useContent'
export default defineComponent(agreement)
</script>
