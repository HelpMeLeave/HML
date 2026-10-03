'use client'

export const P = ({ ...props }: Props) => (
  <p
    {...props}
    style={{
      fontSize: '0.75rem',
      fontWeight: 500,
      marginTop: '1rem',
      marginBottom: 12,
      color: 'var(--theme-secondary)',
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      ...props.style,
    }}
  />
)
