type ThemeWithScales = 'poppy' | 'pine' | 'mulberry' | 'grey'
type ThemeStatic = 'hml-red' | 'hml-yellow' | 'hml-grey' | 'hml-mulberry' | 'hml-slate'

type CustomThemeColors = StringUnion<ThemeStatic | ThemeWithScales>

type TWStaticKeys = 'inherit' | 'current' | 'transparent' | 'black' | 'white' | 'background'

declare module 'TW' {
  type Prefix = ColorKeys
  type BaseColors = Keys<DefaultColorObj>

  type AllColors = StringUnion<BaseColors | CustomThemeColors>
  type ColorScale = Keys<DefaultColorObj[Exclude<Scalable, ThemeWithScales>]>

  type NonScalable = StringUnion<TWStaticKeys | ThemeStatic>

  type Scalable = Exclude<AllColors, NonScalable>

  type ColorEntry<Color extends Scalable | NonScalable> = {
    [C in Color]: Color extends Scalable ? `${C}-${ColorScale}` : C
  }[Color]

  type PrefixEntry<Item extends Prefix, S extends Scalable | NonScalable> = {
    [P in Prefix]: `${P}-${ColorEntry<S>}`
  }[Item]

  export type TextColors = PrefixEntry<'text', Scalable | NonScalable>
}
