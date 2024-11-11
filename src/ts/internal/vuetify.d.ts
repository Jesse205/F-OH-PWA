declare type DefaultsInstance =
  | undefined
  | {
      [key: string]: undefined | Record<string, unknown>
      global?: Record<string, unknown>
    }

declare module 'vuetify/lib/composables/defaults' {
  function provideDefaults(
    defaults?: MaybeRef<DefaultsInstance | undefined>,
    options?: {
      disabled?: MaybeRef<boolean | undefined>
      reset?: MaybeRef<number | string | undefined>
      root?: MaybeRef<boolean | string | undefined>
      scoped?: MaybeRef<boolean | undefined>
    },
  ): DefaultsInstance
}
