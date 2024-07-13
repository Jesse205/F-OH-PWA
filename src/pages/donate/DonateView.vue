<script setup lang="ts">
import ICON from '@/assets/images/icon.svg'
import AppMain from '@/components/AppMain.vue'
import BackButton from '@/components/appbar/BackButton.vue'
import { donateData, type DonatePlatform } from '@/data/donate'
import { useTitle } from '@/composables/title'
import { mdiCursorDefaultOutline } from '@mdi/js'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import DonateCard from './components/DonateCard.vue'

const { t } = useI18n()
useTitle(computed(() => t('action.donate')))

const donateAds: DonatePlatform[] = [
  {
    name: '加入我们',
    key: 'join',
  },
  {
    name: '参与开发',
    key: 'develop',
  },
]
</script>

<template>
  <v-app-bar>
    <back-button />
    <v-app-bar-title>{{ $t('action.donate') }}</v-app-bar-title>
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
      <!-- 广告 -->
      <DonateCard :platforms="donateAds" name="参与贡献" summary="欢迎加入 F-OH 开发！" #="{ selectedKey }">
        <v-btn
          v-if="selectedKey === 'join'"
          class="donate-content-btn"
          variant="text"
          color=""
          rounded="0"
          href="https://ohos-dev.github.io/"
          target="_blank"
        >
          <div class="description">
            <img :src="ICON" class="description__icon" />
            <div class="text-h6">OHOS Dev</div>
            <div class="text-body-1">加入 OHOS Dev，共建 OpenHarmony 生态!</div>
            <div class="description__hint">
              <v-icon size="large" :icon="mdiCursorDefaultOutline" />
              点击这里转到组织
            </div>
          </div>
        </v-btn>
        <v-btn
          v-else-if="selectedKey === 'develop'"
          class="donate-content-btn"
          variant="text"
          color=""
          rounded="0"
          href="https://ohos-dev.github.io/project/f-oh/"
          target="_blank"
        >
          <div class="description">
            <img :src="ICON" class="description__icon" />
            <div class="text-h6">F-OH</div>
            <div class="text-body-1">帮助我们开发 F-OH！</div>
            <div class="description__hint">
              <v-icon size="large" :icon="mdiCursorDefaultOutline" />
              点击这里转到项目
            </div>
          </div>
        </v-btn>
      </DonateCard>
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

.donate-content-btn {
  padding: 24px;
  width: 100%;
  height: 100%;
  aspect-ratio: 1;
  &.v-btn {
    display: flex;
    :deep(.v-btn__content) {
      width: 100%;
      height: 100%;
    }
    @supports selector(:focus-visible) {
      &::after {
        outline-offset: -2px;
      }
    }
  }
  .description {
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
    &__hint {
      position: absolute;
      bottom: 16px;
      left: 0;
      right: 0;
    }
  }
}
</style>
