<script setup lang="ts">
// import { useI18n } from 'vue-i18n'
// const { t } = useI18n()
</script>

<template>
  <app-main>
    <v-container class="py-0">
      <!-- <div class="py-2">
      <v-list-item rounded="lg" lines="two" :title="userStore.nameShow" :subtitle="userStore.email" link
        @click="userStore.loginState ? $router.push({ name: 'User' }) : userStore.login()"
        append-icon="$next">
        <template #prepend>
          <v-avatar class="border" size="56">
            <v-img :src="userStore.avatar" />
          </v-avatar>
        </template>
      </v-list-item>
    </div> -->

      <!-- 用户面板 -->
      <v-list class="my-4 prependIconPrimaryItem">
        <v-list-item :title="$t('watching.my')" link prepend-icon="$apps" append-icon="$next" disabled />
        <v-list-item
          :title="$t('manager.apps')"
          link
          prepend-icon="$apps"
          append-icon="$next"
          :to="{ name: 'Manager' }"
          disabled
        />
      </v-list>

      <!-- 软件面板 -->
      <v-list class="my-4 prependIconPrimaryItem">
        <v-list-item
          :title="$t('settings.name')"
          prepend-icon="$settings"
          append-icon="$next"
          :to="{ name: 'Settings' }"
        />
        <v-list-item :title="$t('about.name')" link prepend-icon="$info" append-icon="$next" :to="{ name: 'About' }" />
      </v-list> </v-container
  ></app-main>
</template>

<!-- <style scoped></style> -->
