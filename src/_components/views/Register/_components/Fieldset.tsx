export const Fieldset = ({ label, ...props }: Props<'fieldset'> & { label: string }) => {
  return (
    <fieldset className='mb-6 flex flex-col gap-4'>
      <legend className='mb-4 w-full border-b-2 border-accent text-xl font-semibold'>
        {label}
      </legend>
      <div className='flex flex-col gap-6 pl-4'>{props.children}</div>
    </fieldset>
  )
}
