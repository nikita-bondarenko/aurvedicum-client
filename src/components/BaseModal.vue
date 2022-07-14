<template lang="">
  <teleport v-if="open" to="#teleport-target">
    <div
      :class="{ 'out-content': isOutContent }"
      class="teleport-blackout"
    ></div>
    <div class="teleport-modal" @click="onOutsideClick">
      <div
        ref="contentElement"
        @mouseleave="isOutContent = true"
        @mouseenter="isOutContent = false"
        class="teleport-modal__content"
      >
        <slot></slot>
        <DeleteButton
          class="teleport-modal__close"
          @click="doClose"
        ></DeleteButton>
      </div>
    </div>
  </teleport>
</template>
<script>
/* eslint-disable */

import { defineComponent, ref, watch } from 'vue'
import useModal from '@/hooks/useModal'
import DeleteButton from '@/components/DeleteButton.vue'

export default defineComponent({
  props: {
    open: { type: Boolean }
  },
  emits: ['update:open'],
  components: { DeleteButton },
  setup(props, { emit: $emit }) {
    const contentElement = ref(null)

    const { doOpen, doClose } = useModal()

    const isOutContent = ref(true)

    const doCloseModal = () => {
      $emit('update:open', false)
      doClose()
    }

    const onOutsideClick = ($event) => {
      if (
        $event.target !== contentElement.value &&
        $event.target.contains(contentElement.value)
      ) {
        doCloseModal()
      }
    }

    watch(
      () => props.open,
      (isOpen) => {
        if (isOpen) {
          doOpen()
        } else {
          doCloseModal()
        }
      },
      { immediate: true }
    )

    return {
      isOutContent,
      onOutsideClick,
      doClose: doCloseModal,
      contentElement
    }
  }
})
</script>
<style lang="scss">
.teleport-blackout {
  z-index: 1010;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.75;
  background-color: #000;
  transition: opacity 0.2s ease-in-out;
}

.out-content {
  opacity: 0.85;
}

.teleport-modal {
  cursor: pointer;

  z-index: 1010;
  overflow: auto;
  // overflow-y: scroll;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 50%;
  width: 100%;
  height: 100%;
  padding: 20px;
  transform: translatex(-50%);

  .form {
    &__input {
      padding-top: 15px;
    }
  }
}

.teleport-modal__content {
  z-index: 1011;
  cursor: auto;
  position: relative;
  margin-top: auto;
  margin-bottom: auto;
  padding: 40px;
  background-color: #fff;
}
</style>
