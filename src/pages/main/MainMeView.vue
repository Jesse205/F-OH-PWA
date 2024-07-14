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

      <!-- 软件面板 -->
      <v-list class="my-4 prependIconPrimaryItem">
        <v-list-item :title="$t('settings')" prepend-icon="$settings" append-icon="$next" :to="{ name: 'Settings' }" />
        <v-list-item :title="$t('about')" link prepend-icon="$info" append-icon="$next" :to="{ name: 'About' }" />
      </v-list> </v-container
  ></app-main>
</template>

<!-- <style scoped></style> -->
