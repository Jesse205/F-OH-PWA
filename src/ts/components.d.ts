import { VList } from 'vuetify/components'

declare module 'vue' {
  export interface GlobalComponents {
    AppCategoryList: typeof VList
  }
}
