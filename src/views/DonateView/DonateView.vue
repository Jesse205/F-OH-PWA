<script setup lang="ts">
import AppMain from '@/components/AppMain.vue'
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useDonate } from '@/data/donate'
import ICON from '@/assets/images/icon.svg'
import { useTitle } from '@/events/title'
import BackButton from '@/components/BackButton.vue'

const { t } = useI18n()
useTitle(computed(() => t('donate.name')))

const data = useDonate()

const adTabValue = ref<'join' | 'develop'>('join')
</script>

<template>
  <v-app-bar>
    <back-button />
    <v-app-bar-title>{{ $t('donate.name') }}</v-app-bar-title>
  </v-app-bar>
  <app-main>
    <v-container class="container">
      <v-card v-for="(persion, index) in data" :key="index" class="card">
        <v-tabs v-model="persion.selected">
          <v-tab v-for="(platform, index) in persion.platforms" :key="index" :value="index" :color="platform.color">
            {{ platform.name }}
          </v-tab>
        </v-tabs>
        <v-divider />
        <v-img class="card-image" cover :src="persion.platforms[persion.selected].image" />
        <v-divider />
        <v-card-item>
          <div>
            <div class="text-h6 mb-1">{{ persion.name }}</div>
            <div class="text-caption">{{ persion.summary }}</div>
          </div>
        </v-card-item>
      </v-card>

      <!-- 广告开始 -->
      <v-card class="card">
        <v-tabs v-model="adTabValue">
          <v-tab value="join">加入我们</v-tab>
          <v-tab value="develop">参与开发</v-tab>
        </v-tabs>
        <v-divider />
        <!-- 加入我们 -->
        <v-btn
          v-if="adTabValue === 'join'"
          variant="text"
          class="card-image ad-btn"
          color=""
          rounded="0"
          href="https://ohos-dev.github.io/"
          target="_blank"
        >
          <div class="ad-description">
            <img :src="ICON" class="icon" />
            <div class="title text-h6">OHOS Dev</div>
            <div class="text-body-1">加入 OHOS Dev，共建 OpenHarmony 生态!</div>
            <div class="click-hint">
              <v-icon size="large" icon="mdi-cursor-default-outline" />
              点击这里转到组织
            </div>
          </div>
        </v-btn>
        <!-- 参与开发 -->
        <v-btn
          v-else-if="adTabValue === 'develop'"
          variant="text"
          class="card-image ad-btn"
          color=""
          rounded="0"
          href="https://ohos-dev.github.io/project/f-oh/"
          target="_blank"
        >
          <div class="ad-description">
            <img :src="ICON" class="icon" />
            <div class="title text-h6">F-OH</div>
            <div class="text-body-1">帮助我们开发 F-OH！</div>
            <div class="click-hint">
              <v-icon size="large" icon="mdi-cursor-default-outline" />
              点击这里转到项目
            </div>
          </div>
        </v-btn>
        <v-divider />
        <v-card-item>
          <div>
            <div class="text-h6 mb-1">参与贡献</div>
            <div class="text-caption">欢迎加入 F-OH 开发！</div>
          </div>
        </v-card-item>
      </v-card>
      <!-- 广告结束 -->
    </v-container>
  </app-main>
</template>

<style scoped lang="scss">
.container {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 8px;

  > .card {
    margin: 8px;
    width: 100%;
    max-width: 360px;

    .card-image {
      width: 100%;
      aspect-ratio: 1;

      .image-ontainer {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        flex-direction: column;
      }
    }
  }
}
.ad-btn {
  padding: 24px;
  &.v-btn {
    height: unset;
    display: flex;
    :deep(.v-btn__content) {
      width: 100%;
      height: 100%;
    }
  }
}
.ad-description {
  width: 100%;
  white-space: pre-line;
  text-align: center;

  * {
    max-width: 100%;
    overflow-wrap: break-word;
  }
  .icon {
    width: 96px;
    height: 96px;
    flex: none;
  }
  .click-hint {
    position: absolute;
    bottom: 16px;
    left: 0;
    right: 0;
  }
}
</style>
