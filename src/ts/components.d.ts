import { VList, VMenu } from 'vuetify/components'

declare module 'vue' {
  export interface GlobalComponents {
    AppCategoryList: typeof VList
    DialogContentList: typeof VList
    AppBarOverflowMenu: typeof VMenu
  }
}
