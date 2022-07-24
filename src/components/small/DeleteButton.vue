<template>
  <button type="button" class="close">
    <svg width="20" height="20" fill="currentColor">
      <g id="color" />
      <g id="hair" />
      <g id="skin" />
      <g id="skin-shadow" />
      <g id="line">
        <line
          x1="0"
          x2="20"
          y1="0"
          y2="20"
          fill="none"
          stroke="#000000"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-miterlimit="10"
          stroke-width="2"
        />

        <line
          x1="20"
          x2="0"
          y1="0"
          y2="20"
          fill="none"
          stroke="#000000"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-miterlimit="10"
          stroke-width="2"
        />
      </g>
    </svg>
  </button>
</template>
<script setup>
/* eslint-disable no-unused-vars */
</script>
<style lang="scss">
@import '@/styles/style.scss';
.close {
  z-index: 100;
  top: 1.25em;
  right: 1.25em;
  cursor: pointer;
  width: 20px;
  height: 20px;
  position: absolute;
  border-color: transparent;
  background-color: transparent;
  padding: 0;
  border: none;
}
.close svg {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
.close::after {
  z-index: -1;
  content: '';
  position: absolute;
  top: -10px;
  right: -10px;
  bottom: -10px;
  left: -10px;
  background-color: $red;
  border-radius: 50px;
  transition: transform 0.2s ease-in-out;
  transform: scale(0);
}
.close:hover:after {
  transform: scale(1);
}
.close #line line {
  z-index: 100;
  transition: stroke 0.2s ease-in-out;
}
.close:hover #line line {
  stroke: white;
}
.close:active:after {
  transform: scale(0);
}
.close:active #line line {
  stroke: #000;
  transition-duration: 0;
}
</style>
