// Utilities
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useHomeStore = defineStore('home', {
  state: () => {
    const fragmentTitle = ref('')
    return { fragmentTitle }
  }
})
