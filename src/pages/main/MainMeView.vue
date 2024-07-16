<script setup lang="ts"></script>

<template>
  <app-main>
    <v-container class="py-0">
      <!-- 软件面板 -->
      <v-list class="my-4 prependIconPrimaryItem">
        <v-list-item :title="$t('settings')" prepend-icon="$settings" append-icon="$next" :to="{ name: 'Settings' }" />
        <v-list-item :title="$t('about')" link prepend-icon="$info" append-icon="$next" :to="{ name: 'About' }" />
      </v-list>
    </v-container>
  </app-main>
</template>
