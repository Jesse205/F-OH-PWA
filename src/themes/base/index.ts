export interface DesignFeatures {
  page: {
    transition?: {
      enter: string
      leave: string
    }
  }
  dialog: {
    actionButtonLayout: 'fill' | 'side'
  }
  list: {
    divider?: 'categories' | 'items'
  }
}
