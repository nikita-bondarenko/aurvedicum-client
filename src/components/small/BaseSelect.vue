<template>
  <div
    class="select"
    ref="selectElement"
    @mouseenter="isSelectHover = true"
    @mouseleave="isSelectHover = false"
    @click.prevent="isSelectOpen = !isSelectOpen"
    :class="{
      'select--open': isSelectOpen,
      item__select: isItem
    }"
  >
    {{ isItem ? editVolumeFormat(volume.volume) : title }}
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
          <li class="drop-box__item" v-for="item in items" :key="item.id">
            <button
              @click.prevent="
                isItem
                  ? $emit('update:volume', item)
                  : $emit('update:modelValue', item.id)
              "
              class="drop-box__button"
            >
              {{ isItem ? editVolumeFormat(item.volume) : item.title }}
            </button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent, ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import useEditors from '@/hooks/useEditors'
export default defineComponent({
  props: {
    open: Boolean,
    id: {
      type: String,
      default: ''
    },
    modelValue: {
      type: String,
      default: ''
    },
    items: Object,
    placeholder: String,
    volume: {
      default: {}
    }
  },
  emits: ['update:modelValue', 'update:volume', 'update:open'],

  setup(props, { emit }) {
    const isSelectHover = ref(false)
    const isSelectOpen = ref(false)
    const selectElement = ref(null)
    const dropBox = ref(null)
    const isItem = ref(useRoute().name === 'item')
    const { editVolumeFormat } = useEditors()
    const title = computed(() => {
      if (props.modelValue.trim().length > 0 && props.items.length > 0) {
        return props.items.find((item) => item.id === props.modelValue).title
      }
      return props.placeholder
    })

    watch(
      () => isSelectOpen.value,
      (value) => {
        if (!value) {
          emit('update:open', value)
          dropBox.value.classList.add('drop-box--hidden')
          dropBox.value.classList.remove('drop-box--open')

          setTimeout(
            () => dropBox.value.classList.remove('drop-box--hidden'),
            500
          )
        } else {
          emit('update:open', value)
          dropBox.value.classList.add('drop-box--open')
        }
      }
    )

    document.body.addEventListener('click', () =>
      !isSelectHover.value && isSelectOpen.value
        ? (isSelectOpen.value = false)
        : 1
    )
    return {
      editVolumeFormat,
      isItem,
      title,
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
