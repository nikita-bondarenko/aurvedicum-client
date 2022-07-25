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
    {{ title }}
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
            <button @click.prevent="select(item)" class="drop-box__button">
              {{ item.title }}
            </button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent, ref, computed, watch } from 'vue'
import useEditors from '@/hooks/useEditors'
export default defineComponent({
  props: ['items', 'placeholder', 'id'],
  emits: ['update:id', 'update:title'],

  setup(props, { emit }) {
    const isSelectHover = ref(false)
    const isSelectOpen = ref(false)
    const selectElement = ref(null)
    const dropBox = ref(null)
    const { editVolumeFormat } = useEditors()
    const title = computed(() => {
      const item = props.items.find((item) => item.id === props.id)
      if (!item) return props.placeholder

      return item.title
    })

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
      emit('update:id', item.id)
      emit('update:title', item.title)
    }
    return {
      select,
      editVolumeFormat,
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
$almostDark: #222;
$light: #d1d1d1;
$inputBackground: #fafafa;

ul {
  list-style-type: none;
  padding: 0;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}

.select {
  position: relative;
  cursor: pointer;
  display: inline-block;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid transparent;
  padding: 13px 30px 13px 20px;
  font-size: 16px;
  line-height: 1;
  transition: border-color 0.2s ease-in-out;
  background-color: $inputBackground;
  &:hover {
    border-color: $almostDark;
  }
}

.select--open {
  border-color: $almostDark;
  .drop-box__body {
    background-color: $light;
    height: auto;
  }

  .drop-box__list {
    border-color: $almostDark;
    background-color: white;
  }
}

.item__content {
  margin: 0 auto;

  p {
    display: block;
    margin-bottom: 10px;
  }
}

.select-arrow {
  pointer-events: none;
  position: absolute;
  top: calc(100% / 2 - 10px);
  right: 20px;

  width: 8px;
  height: 8px;
  transform: rotate(180deg);
  transform-origin: 4px 10px;
  transition: transform 0.5s ease-in-out, top 0.5s linear;
  svg {
    width: 100%;
    height: 100%;
  }

  path {
    // fill: $dark;
    transition: fill 0.2s ease-in-out;
  }

  &--open {
    // top: 8px;
    transform: rotate(0deg);
  }
}

.drop-box__body {
  transform: translateY(-100%);
}

.drop-box {
  z-index: 1000;
  pointer-events: none;

  position: absolute;
  bottom: -1px;
  left: 0;
  width: 100%;
  overflow: hidden;
  transform: translateY(100%);

  &__body {
    position: relative;
    background-color: transparent;
    transition: height 1s ease-in-out;
    height: 0;
  }

  &__list {
    width: 100%;

    display: flex;
    flex-direction: column;
    align-items: stretch;
    top: 0;

    border: 1px solid transparent;
    margin-block-start: 0;
    margin-block-end: 0;
    background-color: transparent;
  }

  &__item {
    line-height: 0;
    margin: 0;
    padding: 0;
  }

  &__button {
    // color: $dark;
    // background-color: $colorBright;
    text-align: start;
    transition-property: color, background-color;
    transition-duration: 0.2s;
    transition-timing-function: ease-in-out;
    cursor: pointer;
    border: none;
    width: 100%;
    padding: 4px 20px;
    color: $almostDark;
    background-color: transparent;

    &:hover {
      color: white;
      background-color: $almostDark;
    }
  }
}

.drop-box--hidden {
  .drop-box__body {
    animation: closeBox 0.5s ease-in-out;
    transform: translateY(-100%);
    height: auto;
  }

  .drop-box__list {
    border-color: $almostDark;
    background-color: white;
  }
}
.drop-box--open {
  pointer-events: auto;
  .drop-box__body {
    animation: dropBox 0.5s alternate ease-in-out;
    transform: translateY(0);
  }

  .drop-box__list {
    border-color: $almostDark;
  }
}

.form__label--select::after {
  transition: transform, 0.4s ease-in-out;
}
.item__select {
  position: relative;
  display: inline-block;
  width: auto;
  height: 40px;
  display: flex;
  justify-content: start;
  align-items: center;
  border-color: transparent;
  padding: 2px 10px 2px 15px;
  margin-left: -15px;
  color: $almostDark !important;
  .select-arrow {
    right: 15px;
  }
}

@keyframes dropBox {
  from {
    transform: translateY(-100%);
  }

  to {
    transform: translateY(0);
  }
}

@keyframes closeBox {
  from {
    transform: translateY(0);
  }

  to {
    transform: translateY(-100%);
  }
}
</style>
