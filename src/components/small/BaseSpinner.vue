<template>
  <div class="spinner">
    <div class="spinner-limb"></div>
  </div>
</template>
<style lang="scss">
@import '@/styles/style.scss';
.spinner {
  position: relative;
  width: 200px;
  height: 200px;
  margin: 30px auto;
  padding: 10px;
  &-limb {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    border: 20px solid transparent;
    border-radius: 100%;
    border-bottom-color: $red;
    animation: rotate 0.4s linear reverse infinite;
  }
}

@keyframes rotate {
  from {
    transform: rotate(360deg);
  }
  to {
    transform: rotate(0);
  }
}
</style>
