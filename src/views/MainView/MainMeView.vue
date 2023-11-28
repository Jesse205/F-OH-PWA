<script setup lang="ts">
// import { useI18n } from 'vue-i18n'
// const { t } = useI18n()
</script>

<template>
  <v-container class="py-0">
    <!-- <div class="py-2">
      <v-list-item rounded="lg" lines="two" :title="userStore.nameShow" :subtitle="userStore.email" link
        @click="userStore.loginState ? $router.push({ name: 'User' }) : userStore.login()"
        append-icon="mdi-chevron-right">
        <template v-slot:prepend>
          <v-avatar class="border" size="56">
            <v-img :src="userStore.avatar" />
          </v-avatar>
        </template>
      </v-list-item>
    </div> -->

    <!-- 用户面板 -->
    <v-list class="my-4 prependIconPrimaryItem">
      <v-list-item title="我的关注" link prepend-icon="mdi-apps" append-icon="mdi-chevron-right" disabled />
      <v-list-item
        :title="$t('manager.apps')"
        link
        prepend-icon="mdi-apps"
        append-icon="mdi-chevron-right"
        :to="{ name: 'Manager' }"
        disabled
      />
    </v-list>

    <!-- 软件面板 -->
    <v-list class="my-4 prependIconPrimaryItem">
      <v-list-item
        :title="$t('settings.name')"
        prepend-icon="mdi-cog-outline"
        append-icon="mdi-chevron-right"
        :to="{ name: 'Settings' }"
      />
      <v-list-item
        :title="$t('about.name')"
        link
        prepend-icon="mdi-information-outline"
        append-icon="mdi-chevron-right"
        :to="{ name: 'About' }"
      />
    </v-list>
  </v-container>
</template>

<!-- <style scoped></style> -->
