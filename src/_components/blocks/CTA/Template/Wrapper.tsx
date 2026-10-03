export const Wrapper = ({ children }: { children: ReactNode }) => (
  <div className='cta-preview **:[.cta-primary]:text-slate-0! mx-auto w-screen max-w-lg **:[.cta-primary]:bg-accent **:[.cta-primary]:hover:opacity-75'>
    {children}
  </div>
)
