declare module 'react' {
  interface CSSProperties {
    [`[${string}]`]: CSSProperties
  }
}

export {}
