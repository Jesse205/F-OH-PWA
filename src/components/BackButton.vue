<script setup lang="ts">

</script>

<template>
  <v-btn v-if="$router.options.history.state.back" icon="mdi-arrow-left" @click.stop="$router.back" />
</template>

<style scoped>

</style>
