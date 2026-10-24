export const P = ({ ...props }: Props) => (
  <p
    {...props}
    style={{
      marginBottom: 12,
      letterSpacing: '0.05em',
      ...props.style,
    }}
    className='mt-4 text-[0.75rem] font-medium text-accent uppercase'
  />
)
