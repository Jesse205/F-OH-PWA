<script lang="ts" setup>
import { useGlobalStore } from '@/store/global'

const globalStore = useGlobalStore()
</script>

<template>
  <div class="splash-view">
    <img class="logo" src="@/assets/images/icon.svg" />
    <span un-mt="4">{{ globalStore.appName }}</span>
  </div>
</template>

<style lang="scss" scoped>
.splash-view {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  .logo {
    width: 80px;
    height: 80px;
    flex: none;
  }
}
</style>
