<template>
  <div
    class="select volume-row__item"
    ref="selectElement"
    @mouseenter="isSelectHover = true"
    @mouseleave="isSelectHover = false"
    @click.prevent="isSelectOpen = !isSelectOpen"
    :class="{
      'select--open': isSelectOpen
    }"
  >
    {{ item.title || '' }}
    <div
      class="select-arrow"
      :class="{
        'select-arrow--hover': isSelectHover,
        'select-arrow--open': isSelectOpen
      }"
    >
      <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
      <svg
        version="1.1"
        id="Capa_1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        width="30.021px"
        height="30.021px"
        viewBox="0 0 30.021 30.021"
        style="enable-background: new 0 0 30.021 30.021"
        xml:space="preserve"
      >
        <g>
          <path
            d="M29.069,22.276c-0.791,0.932-1.917,1.409-3.052,1.409c-0.913,0-1.834-0.312-2.587-0.949l-8.42-7.152l-8.42,7.151
  c-1.683,1.43-4.208,1.225-5.639-0.459c-1.43-1.686-1.224-4.208,0.46-5.64l11.01-9.351c1.493-1.269,3.686-1.269,5.178,0
  l11.011,9.351C30.294,18.068,30.499,20.591,29.069,22.276z"
          />
        </g>
      </svg>
    </div>
    <div ref="dropBox" class="drop-box">
      <div class="drop-box__body">
        <ul class="drop-box__list">
          <li
            class="drop-box__item"
            v-show="status.id !== item.id"
            v-for="status in items"
            :key="status.id"
          >
            <button @click.prevent="select(status)" class="drop-box__button">
              {{ status.title || '' }}
            </button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent, ref, watch } from 'vue'
import useEditors from '@/hooks/useEditors'
export default defineComponent({
  props: ['items', 'item'],
  emits: ['update:item', 'submit'],
  setup(props, { emit }) {
    const isSelectHover = ref(false)
    const isSelectOpen = ref(false)
    const selectElement = ref(null)
    const dropBox = ref(null)
    const { editVolumeFormat } = useEditors()
    watch(
      () => isSelectOpen.value,
      (value) => {
        if (!value) {
          dropBox.value.classList.add('drop-box--hidden')
          dropBox.value.classList.remove('drop-box--open')

          setTimeout(
            () => dropBox.value.classList.remove('drop-box--hidden'),
            500
          )
        } else {
          dropBox.value.classList.add('drop-box--open')
        }
      }
    )

    document.body.addEventListener('click', () =>
      !isSelectHover.value && isSelectOpen.value
        ? (isSelectOpen.value = false)
        : 1
    )

    const select = (item) => {
      emit('update:item', item)
      emit('submit')
    }
    return {
      select,
      editVolumeFormat,
      isSelectHover,
      isSelectOpen,
      selectElement,
      dropBox
    }
  }
})
</script>
<style lang="scss">
@import '@/styles/select.scss';
</style>
