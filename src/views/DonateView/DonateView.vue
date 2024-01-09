<script setup lang="ts">
import ICON from '@/assets/images/icon.svg'
import AppMain from '@/components/AppMain.vue'
import BackButton from '@/components/BackButton.vue'
import { donateData } from '@/data/donate'
import { useTitle } from '@/composables/title'
import { mdiCursorDefaultOutline } from '@mdi/js'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import DonateCard from './components/DonateCard.vue'

const { t } = useI18n()
useTitle(computed(() => t('donate.name')))

const adTabValue = ref<'join' | 'develop'>('join')
</script>

<template>
  <v-app-bar>
    <back-button />
    <v-app-bar-title>{{ $t('donate.name') }}</v-app-bar-title>
  </v-app-bar>
  <app-main>
    <v-container class="container">
      <DonateCard
        v-for="person in donateData"
        :key="person.key"
        :platforms="person.platforms"
        :name="person.name"
        :summary="person.summary"
      />

      <!-- 广告开始 -->
      <v-card class="donate-card">
        <v-tabs v-model="adTabValue">
          <v-tab value="join">加入我们</v-tab>
          <v-tab value="develop">参与开发</v-tab>
        </v-tabs>
        <v-divider />
        <!-- 加入我们 -->
        <v-btn
          v-if="adTabValue === 'join'"
          variant="text"
          class="donate-card__content-btn"
          color=""
          rounded="0"
          href="https://ohos-dev.github.io/"
          target="_blank"
        >
          <div class="donate-card__content-btn__description">
            <img :src="ICON" class="donate-card__content-btn__description__icon" />
            <div class="text-h6">OHOS Dev</div>
            <div class="text-body-1">加入 OHOS Dev，共建 OpenHarmony 生态!</div>
            <div class="donate-card__content-btn__description__click-hint">
              <v-icon size="large" :icon="mdiCursorDefaultOutline" />
              点击这里转到组织
            </div>
          </div>
        </v-btn>
        <!-- 参与开发 -->
        <v-btn
          v-else-if="adTabValue === 'develop'"
          variant="text"
          class="donate-card__content-btn"
          color=""
          rounded="0"
          href="https://ohos-dev.github.io/project/f-oh/"
          target="_blank"
        >
          <div class="donate-card__content-btn__description">
            <img :src="ICON" class="donate-card__content-btn__description__icon" />
            <div class="text-h6">F-OH</div>
            <div class="text-body-1">帮助我们开发 F-OH！</div>
            <div class="donate-card__content-btn__description__click-hint">
              <v-icon size="large" :icon="mdiCursorDefaultOutline" />
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
}

.donate-card {
  margin: 8px;
  width: 100%;
  max-width: 360px;

  &__image,
  &__content-btn {
    width: 100%;
    aspect-ratio: 1;
  }
  &__content-btn {
    padding: 24px;
    &.v-btn {
      height: unset;
      display: flex;
      :deep(.v-btn__content) {
        width: 100%;
        height: 100%;
      }
    }
    &__description {
      width: 100%;
      white-space: pre-line;
      text-align: center;

      * {
        max-width: 100%;
        overflow-wrap: break-word;
      }
      &__icon {
        width: 96px;
        height: 96px;
        flex: none;
      }
      &__click-hint {
        position: absolute;
        bottom: 16px;
        left: 0;
        right: 0;
      }
    }
  }
}
</style>
