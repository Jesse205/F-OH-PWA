import 'vue-router'
export declare module 'vue-router' {
  export interface RouteMeta extends Record<string | number | symbol, unknown> {
    transition: string
  }
}
