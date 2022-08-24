<template>
  <div
    :class="{
      'modal--open': store.isMenuOpen
    }"
    @mousedown="swipeOn"
    @mouseup="swipeOff"
    class="modal"
    ref="modal"
  >
    <div ref="nav" class="nav" :class="{ 'nav--open': store.isMenuOpen }">
      <h3 class="nav__title title">Меню</h3>
      <nav class="nav__nav">
        <ul ref="list" class="nav__list">
          <li class="nav__item">
            <router-link :to="{ name: 'catalog' }">Каталог</router-link>
          </li>
          <li class="nav__item">
            <router-link :to="{ name: 'basket' }">Корзина</router-link>
          </li>
          <li class="nav__item">
            <router-link :to="{ name: 'news' }">Новости</router-link>
          </li>
          <li class="nav__item">
            <router-link :to="{ name: 'articles' }">Статьи</router-link>
          </li>

          <li class="nav__item">
            <router-link :to="{ name: 'contacts' }">Контакты</router-link>
          </li>
          <li class="nav__item">
            <router-link :to="{ name: 'admin' }"
              >Кабинет администратора</router-link
            >
          </li>
          <li class="nav__item">
            <router-link :to="{ name: 'history' }"
              >История кампании</router-link
            >
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>
<script setup>
/* eslint-disable  no-unused-vars */
import { ref, onMounted, watch } from 'vue'
import { store } from '@/store/store'
import { useRoute } from 'vue-router'
const route = useRoute()

const modal = ref(null)
const nav = ref(null)
const list = ref(null)
onMounted(() => {
  const arr = Array.from([modal, nav, list])

  arr.forEach((element) => {
    element.value.addEventListener(
      'click',
      (event) => {
        if (store.isDisabled) return
        event.stopPropagation()
        if (event.currentTarget === modal.value) {
          store.updateProp('isMenuOpen', false)
        }
      },
      { capture: false }
    )
    element.value.addEventListener(
      'mouseover',
      (event) => {
        event.stopPropagation()
        if (event.currentTarget === modal.value) {
          modal.value.classList.add('modal--hover')
        } else {
          modal.value.classList.remove('modal--hover')
        }
      },
      { capture: false }
    )
  })
})

watch(
  () => route.name,
  () => {
    store.updateProp('isMenuOpen', false)
  }
)
let timeoutId
watch(
  () => store.isMenuOpen,
  (value) => {
    if (value) {
      document.body.style.overflowX = 'hidden'
      document.body.classList.add('menu-open')
    } else {
      document.body.classList.remove('menu-open')
      timeoutId = setTimeout(
        () => (document.body.style.overflowX = 'auto'),
        200
      )
    }
  }
)

onMounted(() => {
  let x
  const left = -nav.value.clientWidth

  /* eslint-disable */
  nav.value.style.left = `${left}px`

  const disable = () => {
    store.updateProp('isDisabled', true)
    setTimeout(() => store.updateProp('isDisabled', false), 500)
  }

  watch(
    () => store.isMenuOpen,
    (value) => {
      if (value) {
        nav.value.style.left = '0'
        disable()
      } else {
        nav.value.style.left = `${left}px`
        disable()
      }
    },
    { immediate: true }
  )

  function onMove(event) {
    if (store.isDisabled) return
    if (Math.floor(event.changedTouches[0].clientX) < x) {
      nav.value.style.left = `${
        Math.floor(event.changedTouches[0].clientX) - x
      }px`
    }
  }

  modal.value.addEventListener('touchstart', (event) => {
    if (!store.isMenuOpen) return
    nav.value.classList.add('touched')
    x = Math.floor(event.changedTouches[0].clientX)

    window.addEventListener('touchmove', onMove)
  })

  const close = (e) => {
    if (store.isDisabled) return
    if (x - Math.floor(e.changedTouches[0].clientX) > 50) {
      store.updateProp('isMenuOpen', false)
    } else {
      nav.value.style.left = '0'
    }
  }

  document.addEventListener('touchend', (e) => {
    if (!store.isMenuOpen) return
    nav.value.classList.remove('touched')

    window.removeEventListener('touchmove', onMove)
    close(e)
  })
})
</script>
<style lang="scss">
@import '@/styles/modal-menu.scss';
</style>
