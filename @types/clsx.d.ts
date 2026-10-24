type KeyTypes = boolean | string | number

type NormalizedExtraction<T extends string> = T extends `-${infer S}` ? S : never

type NormalizedKey<T extends KeyTypes> =
  T extends `-${string}` ? NormalizedExtraction<T>
  : T extends number ? `${T}`
  : T

declare module 'class-variance-authority' {
  type VariantConfig<T extends Record<string, KeyTypes>> = {
    [Variant in keyof Required<T>]: Record<NormalizedKey<T[Variant]>, string | string[]>
  }

  type VariantComponentProps<T extends Record<string, KeyTypes>> = Prettify<
    {
      [Variant in keyof T]: Exclude<T[Variant], `-${string}`>
    } & Partial<
      Record<
        NormalizedExtraction<
          {
            [Variant in keyof T]: Extract<T[Variant], `-${string}`>
          }[keyof T]
        >,
        boolean
      >
    >
  >
}

export {}
