<script setup lang="ts"></script>

<template>
  <v-main scrollable>
    <!-- 软件面板 -->
    <app-list class="v-list--with-prepend-icon" un-margin="4">
      <app-list-category :subheader="'More'">
        <app-list-item
          :title="$t('settings')"
          prepend-icon="$settings"
          append-icon="$next"
          :to="{ name: 'Settings' }"
        />
        <app-list-item
          :title="$t('about')"
          link
          prepend-icon="$info"
          append-icon="$next"
          :to="{ name: 'About' }"
          lastInVertical
        />
      </app-list-category>
    </app-list>
  </v-main>
</template>
