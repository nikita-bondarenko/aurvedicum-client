<template>
  <div class="form__counter counter">
    <button
      @click="minus"
      type="button"
      class="counter__button button__minus"
      aria-label="Убрать один товар"
    >
      <!-- Generator: Adobe Illustrator 19.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
      <svg
        version="1.1"
        id="Capa_1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        viewBox="0 0 52.161 52.161"
        style="enable-background: new 0 0 52.161 52.161"
        xml:space="preserve"
      >
        <g>
          <path
            class="button__minus--icon"
            d="M52.161,26.081c0,3.246-2.63,5.875-5.875,5.875H5.875C2.63,31.956,0,29.327,0,26.081l0,0c0-3.245,2.63-5.875,5.875-5.875 h40.411C49.531,20.206,52.161,22.835,52.161,26.081L52.161,26.081z"
          />
        </g>
      </svg>
    </button>

    <input
      :class="{ 'input--disabled': route.name === 'basket' }"
      type="number"
      v-model="value"
    />

    <button
      type="button"
      aria-label="Добавить один товар"
      class="counter__button button__plus"
      @click="value += 1"
    >
      <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
      <svg
        version="1.1"
        id="Capa_1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        width="45.402px"
        height="45.402px"
        viewBox="0 0 45.402 45.402"
        style="enable-background: new 0 0 45.402 45.402"
        xml:space="preserve"
      >
        <g>
          <path
            class="button__plus--icon"
            d="M41.267,18.557H26.832V4.134C26.832,1.851,24.99,0,22.707,0c-2.283,0-4.124,1.851-4.124,4.135v14.432H4.141c-2.283,0-4.139,1.851-4.138,4.135c-0.001,1.141,0.46,2.187,1.207,2.934c0.748,0.749,1.78,1.222,2.92,1.222h14.453V41.27c0,1.142,0.453,2.176,1.201,2.922c0.748,0.748,1.777,1.211,2.919,1.211c2.282,0,4.129-1.851,4.129-4.133V26.857h14.435c2.283,0,4.134-1.867,4.133-4.15C45.399,20.425,43.548,18.557,41.267,18.557z"
          />
        </g>
      </svg>
    </button>
    <BaseMessage
      v-model:open="isErrorMax"
      :text="
        route.name === 'item'
          ? 'Вы можете установить только значение, не превышающее количество товара в наличии.'
          : 'Не получилось изменить количество товара в корзине. Товар закончился.'
      "
    ></BaseMessage>
  </div>
</template>
<script setup>
import { defineProps, defineEmits, computed, ref } from 'vue'
import BaseMessage from '@/components/BaseMessage.vue'
import { useRoute } from 'vue-router'

const props = defineProps(['quantity', 'volume'])
const emit = defineEmits(['update:quantity'])
const isErrorMax = ref(false)
const isButtonClick = ref(false)
const route = useRoute()
const value = computed({
  get() {
    return props.quantity
  },
  set(value) {
    if (
      value > props.volume.quantity &&
      !isButtonClick.value &&
      route.name === 'item'
    ) {
      isErrorMax.value = true
      isButtonClick.value = false
      return
    } else if (props.volume.quantity <= 0 && !isButtonClick.value) {
      isErrorMax.value = true
      isButtonClick.value = false

      return
    }
    isButtonClick.value = false

    emit('update:quantity', value)
  }
})

const minus = () => {
  if (value.value - 1 > 0) {
    isButtonClick.value = true
    value.value -= 1
  }
}
</script>
<style lang="scss">
@import '@/styles/style.scss';

.input--disabled {
  pointer-events: none;
}

.form__counter {
  input:focus-visible {
    outline: none;
  }
  button {
    background: none !important;
    :focus {
      outline: none;
      background: none !important ;
    }
    [class*='--icon'] {
      transition: fill 0.2s ease-in-out;
    }
    svg {
      width: 13px;
      height: 13px;
    }
    border: 1px solid $grey;
    transition: border 0.2s ease-in-out;
    &.button__plus {
      &:hover {
        .button__plus--icon {
          fill: $green;
        }
        border: 3px solid $green;
      }
    }
    &.button__minus {
      svg {
        transform: translateY(0.5px);
      }
      &:hover {
        .button__minus--icon {
          fill: $red;
        }
        border: 3px solid $red;
      }
    }
  }
}
</style>
