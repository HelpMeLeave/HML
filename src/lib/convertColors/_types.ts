// #region ! ---------- HEX CHARS ----------
type HEX_CHARS = string
  & ('A' | 'B' | 'C' | 'D' | 'E' | 'F' | '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9')
// #endregion ! --------------------

// #region ! ---------- HEX LENGTHS ----------
type VALID_HEX_LENGTHS =
  | [AnySafe, AnySafe, AnySafe]
  | [AnySafe, AnySafe, AnySafe, AnySafe, AnySafe, AnySafe]
  | [AnySafe, AnySafe, AnySafe, AnySafe, AnySafe, AnySafe, AnySafe, AnySafe]

type Hex_Length<T extends string> =
  T extends `${infer Char}${infer Rest}` ?
    Rest extends '' ?
      [T]
    : [Char, ...Hex_Length<Rest>]
  : never
// #endregion ! --------------------

// #region ! ---------- HEX STRING ----------
type ToHexString<T extends string> =
  T extends `${HEX_CHARS}${infer Rest}` ?
    Rest extends '' ?
      T
    : `${T extends `${infer First}${Rest}` ? First : never}${ToHexString<Rest>}`
  : never
// #endregion ! --------------------

export type HexBase = `#${string}`

export type HEX<T extends HexBase> =
  Hex_Length<T> extends VALID_HEX_LENGTHS ? `#${ToHexString<T>}` | ToHexString<T> : never

export type EntryProps = {
  RGB: { r: number; g: number; b: number; a: number }
  LAB: { l: number; a: number; b: number; alpha?: number }
  LinearRGB: { r: number; g: number; bl: number; alpha?: number }
  XYZ: { x: number; y: number; z: number }
}
